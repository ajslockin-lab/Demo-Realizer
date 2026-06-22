import { Router } from "express";
import { GetLineupBody } from "@workspace/api-zod";
import { TEAM_STATS } from "../../lib/ml-model.js";
import { getPlayersForTeam } from "../../lib/player-data.js";

const router = Router();

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

// In-memory cache: key = "home|away|date", value = lineup result
const lineupCache = new Map<string, unknown>();

router.post("/lineup", async (req, res) => {
  const parsed = GetLineupBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { home, away, group, date } = parsed.data;
  const cacheKey = `${home}|${away}|${date}`;

  // Return cached result immediately if available
  if (lineupCache.has(cacheKey)) {
    res.json(lineupCache.get(cacheKey));
    return;
  }

  const homeStats = TEAM_STATS[home];
  const awayStats = TEAM_STATS[away];
  const homePlayers = getPlayersForTeam(home);
  const awayPlayers = getPlayersForTeam(away);

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.json(buildFallbackLineup(home, away, homePlayers, awayPlayers));
    return;
  }

  const homePlayerList = homePlayers.map(p =>
    `${p.name} (${p.position}, ${p.club})`
  ).join(", ");
  const awayPlayerList = awayPlayers.map(p =>
    `${p.name} (${p.position}, ${p.club})`
  ).join(", ");

  const prompt = `You are a World Cup 2026 tactical analyst. It is ${date}, and the official lineups have NOT been announced yet.

MATCH: ${home} vs ${away} | Group ${group} | ${date}

WC 2026 TOURNAMENT CONTEXT:
${home}: ${homeStats ? `${homeStats.gamesPlayed} games played, form ${homeStats.form}, ${homeStats.goalsFor}GF/${homeStats.goalsAgainst}GA` : "Matchday 1"}
${away}: ${awayStats ? `${awayStats.gamesPlayed} games played, form ${awayStats.form}, ${awayStats.goalsFor}GF/${awayStats.goalsAgainst}GA` : "Matchday 1"}

KNOWN SQUAD MEMBERS:
${home}: ${homePlayerList || "Key squad members not catalogued"}
${away}: ${awayPlayerList || "Key squad members not catalogued"}

Your task: Predict the most likely starting XI for BOTH teams based on:
1. Tactical systems each team typically uses at WC 2026
2. Player fitness, suspensions, rotation needs (use your knowledge up to WC 2026)
3. Opponent matchup considerations
4. Squad depth and likely rotation after previous matches

Respond ONLY with valid JSON — no markdown, no preamble:
{
  "home": {
    "formation": "<e.g. 4-3-3>",
    "xi": [
      {"name": "<player>", "position": "<GK|CB|LB|RB|LWB|RWB|CDM|CM|CAM|LW|RW|SS|ST>", "number": <shirt number>, "isStar": <true|false>}
    ],
    "tactics": "<1-sentence tactical approach>",
    "keyThreat": "<name of biggest attacking threat>",
    "injuryAlert": "<any known injury/suspension concern or null>"
  },
  "away": {
    "formation": "<e.g. 4-2-3-1>",
    "xi": [
      {"name": "<player>", "position": "<GK|CB|LB|RB|LWB|RWB|CDM|CM|CAM|LW|RW|SS|ST>", "number": <shirt number>, "isStar": <true|false>}
    ],
    "tactics": "<1-sentence tactical approach>",
    "keyThreat": "<name of biggest attacking threat>",
    "injuryAlert": "<any known injury/suspension concern or null>"
  }
}
IMPORTANT: xi must contain exactly 11 players.`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 1200,
        temperature: 0.3,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) throw new Error(`Groq error: ${response.status}`);

    const data = await response.json() as { choices: Array<{ message: { content: string } }> };
    const raw = data.choices?.[0]?.message?.content ?? "";
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON in response");
    const result = JSON.parse(raw.slice(jsonStart, jsonEnd + 1));

    lineupCache.set(cacheKey, result);
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Lineup prediction failed, using fallback");
    res.json(buildFallbackLineup(home, away, homePlayers, awayPlayers));
  }
});

function buildFallbackLineup(
  home: string,
  away: string,
  homePlayers: ReturnType<typeof getPlayersForTeam>,
  awayPlayers: ReturnType<typeof getPlayersForTeam>,
) {
  const makeXI = (players: ReturnType<typeof getPlayersForTeam>, teamName: string) => {
    const sorted = [...players].sort((a, b) => b.scoringRate - a.scoringRate);
    const xi = sorted.slice(0, Math.min(players.length, 7)).map((p, i) => ({
      name: p.name,
      position: p.position,
      number: i + 7,
      isStar: p.scoringRate > 0.4,
    }));
    // Fill to 11 with generic positions
    const positions = ["GK", "CB", "CB", "LB", "RB"].slice(0, 11 - xi.length);
    positions.forEach((pos, i) => xi.unshift({ name: `${teamName} ${pos}`, position: pos, number: i + 1, isStar: false }));
    return xi.slice(0, 11);
  };

  return {
    home: {
      formation: "4-3-3",
      xi: makeXI(homePlayers, home),
      tactics: `${home} expected to press high and exploit wide areas`,
      keyThreat: homePlayers[0]?.name ?? "TBC",
      injuryAlert: null,
    },
    away: {
      formation: "4-2-3-1",
      xi: makeXI(awayPlayers, away),
      tactics: `${away} likely to sit compact and counter-attack`,
      keyThreat: awayPlayers[0]?.name ?? "TBC",
      injuryAlert: null,
    },
  };
}

export default router;
