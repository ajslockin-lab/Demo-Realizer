import { Router } from "express";
import { PredictMatchBody } from "@workspace/api-zod";
import { runPoissonModel, TEAM_STATS } from "../../lib/ml-model.js";
import { getPlayersForTeam } from "../../lib/player-data.js";

const router = Router();

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

router.post("/predict", async (req, res) => {
  const parsed = PredictMatchBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { id, home, away, group, venue, date, time } = parsed.data;
  void id;

  const mlResult = runPoissonModel(home, away);
  const homeStats = TEAM_STATS[home];
  const awayStats = TEAM_STATS[away];
  const homePlayers = getPlayersForTeam(home);
  const awayPlayers = getPlayersForTeam(away);

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    req.log.warn("GROQ_API_KEY not set — using ML model only, no goalscorer AI");
    res.json(buildFallbackResponse(mlResult, home, away, homePlayers, awayPlayers));
    return;
  }

  const homePlayerStr = homePlayers.map(p =>
    `${p.name} (${p.position}, ${p.scoringRate.toFixed(2)} G/game, ${p.wcGoals} WC26 goals, ${p.club})`
  ).join("\n  ");

  const awayPlayerStr = awayPlayers.map(p =>
    `${p.name} (${p.position}, ${p.scoringRate.toFixed(2)} G/game, ${p.wcGoals} WC26 goals, ${p.club})`
  ).join("\n  ");

  const prompt = `You are an elite FIFA World Cup 2026 data-science analyst. A Poisson regression model has already been run. Your job is to:
1. Predict the 2 most likely goalscorers for each team (with estimated probability 0-100)
2. Predict how many goals each scorer will score (usually 1, occasionally 2)
3. Write a rich 3-sentence expert tactical analysis
4. Assign a confidence level

MATCH: ${home} vs ${away} | Group ${group} | ${date} ${time}
VENUE: ${venue}

POISSON MODEL OUTPUT:
- ${home} xG: ${mlResult.homeXG} | ${away} xG: ${mlResult.awayXG}
- Win %: ${home} ${mlResult.homeWinPct}% | Draw ${mlResult.drawPct}% | ${away} ${mlResult.awayWinPct}%
- Most likely score: ${mlResult.predictedScore}
- Attack strength: ${home} ${mlResult.features.homeAttackStrength} | ${away} ${mlResult.features.awayAttackStrength}
- Defense strength: ${home} ${mlResult.features.homeDefenseStrength} | ${away} ${mlResult.features.awayDefenseStrength}

WC 2026 TOURNAMENT DATA:
${home}: ${homeStats ? `${homeStats.gamesPlayed} games, ${homeStats.goalsFor}GF/${homeStats.goalsAgainst}GA, form ${homeStats.form}` : "no WC data yet"}
${away}: ${awayStats ? `${awayStats.gamesPlayed} games, ${awayStats.goalsFor}GF/${awayStats.goalsAgainst}GA, form ${awayStats.form}` : "no WC data yet"}

${home} KEY PLAYERS:
  ${homePlayerStr || "Data unavailable"}

${away} KEY PLAYERS:
  ${awayPlayerStr || "Data unavailable"}

Respond ONLY with valid JSON — no markdown, no preamble:
{
  "goalscorers": {
    "home": [
      {"name": "<player name>", "probability": <0-100>, "goals": <1 or 2>},
      {"name": "<player name>", "probability": <0-100>, "goals": <1>}
    ],
    "away": [
      {"name": "<player name>", "probability": <0-100>, "goals": <1 or 2>},
      {"name": "<player name>", "probability": <0-100>, "goals": <1>}
    ]
  },
  "keyFactors": ["<factor1>","<factor2>","<factor3>"],
  "confidence": "High" | "Medium" | "Low",
  "analysis": "<3-sentence expert tactical analysis referencing xG, attacking threats, defensive shape, and tournament context>"
}`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 900,
        temperature: 0.35,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) throw new Error(`Groq error: ${response.status}`);

    const groqData = await response.json() as { choices: Array<{ message: { content: string } }> };
    const raw = groqData.choices?.[0]?.message?.content ?? "";
    // Extract the JSON object robustly — find first { and last }
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON object in Groq response");
    const jsonStr = raw.slice(jsonStart, jsonEnd + 1);
    const groq = JSON.parse(jsonStr) as {
      goalscorers: { home: { name: string; probability: number; goals: number }[]; away: { name: string; probability: number; goals: number }[] };
      keyFactors: string[];
      confidence: "High" | "Medium" | "Low";
      analysis: string;
    };

    res.json({
      ...mlResult,
      goalscorers: groq.goalscorers,
      keyFactors: groq.keyFactors,
      confidence: groq.confidence,
      analysis: groq.analysis,
      modelFeatures: mlResult.features,
    });
  } catch (err) {
    req.log.error({ err }, "Groq call failed — using ML fallback");
    res.json(buildFallbackResponse(mlResult, home, away, homePlayers, awayPlayers));
  }
});

function buildFallbackResponse(
  mlResult: ReturnType<typeof runPoissonModel>,
  home: string,
  away: string,
  homePlayers: ReturnType<typeof getPlayersForTeam>,
  awayPlayers: ReturnType<typeof getPlayersForTeam>,
) {
  const topHome = homePlayers.sort((a, b) => b.scoringRate - a.scoringRate).slice(0, 2);
  const topAway = awayPlayers.sort((a, b) => b.scoringRate - a.scoringRate).slice(0, 2);

  return {
    ...mlResult,
    goalscorers: {
      home: topHome.map(p => ({ name: p.name, probability: Math.round(p.scoringRate * 65), goals: 1 })),
      away: topAway.map(p => ({ name: p.name, probability: Math.round(p.scoringRate * 55), goals: 1 })),
    },
    keyFactors: [
      `Poisson xG: ${home} ${mlResult.homeXG} vs ${away} ${mlResult.awayXG}`,
      `Attack strengths: ${home} ${mlResult.features.homeAttackStrength} | ${away} ${mlResult.features.awayAttackStrength}`,
      `Form factors: ${home} ${mlResult.features.homeFormFactor} | ${away} ${mlResult.features.awayFormFactor}`,
    ],
    confidence: Math.abs(mlResult.homeWinPct - mlResult.awayWinPct) > 25 ? "High" as const : "Medium" as const,
    analysis: `Statistical Poisson regression gives ${home} an xG of ${mlResult.homeXG} and ${away} an xG of ${mlResult.awayXG}, yielding a predicted score of ${mlResult.predictedScore}. The model weights WC 2026 tournament goals, FIFA ranking prior, and recent form across a 5-game window. Most likely outcome by probability: ${mlResult.homeWinPct > mlResult.awayWinPct ? home + " win" : mlResult.awayWinPct > mlResult.homeWinPct ? away + " win" : "draw"} at ${Math.max(mlResult.homeWinPct, mlResult.awayWinPct, mlResult.drawPct)}%.`,
    modelFeatures: mlResult.features,
  };
}

export default router;
