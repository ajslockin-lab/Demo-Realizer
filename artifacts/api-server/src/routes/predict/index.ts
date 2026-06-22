import { Router } from "express";
import { PredictMatchBody } from "@workspace/api-zod";

const router = Router();

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

function fallbackPrediction(home: string, away: string, homeRank: number, awayRank: number, homeForm: string, awayForm: string, homeGF: number, homeGA: number, awayGF: number, awayGA: number) {
  const formPts = (s: string) => [...s].reduce((acc, c, i) => acc + (c === "W" ? 3 : c === "D" ? 1 : 0) * (0.85 ** (4 - i)), 0);
  const rankEdge = Math.min(35, Math.max(-35, (awayRank - homeRank) * 0.45));
  const formEdge = Math.min(12, Math.max(-12, (formPts(homeForm) - formPts(awayForm)) * 4));
  const wcEdge = Math.min(8, Math.max(-8, (homeGF - homeGA) - (awayGF - awayGA)));
  const raw = 47 + rankEdge + formEdge + wcEdge;
  const homeWinPct = Math.round(Math.min(75, Math.max(10, raw)));
  const drawPct = Math.round(Math.max(12, 28 - Math.abs(raw - 47) * 0.3));
  const awayWinPct = Math.max(5, 100 - homeWinPct - drawPct);
  const hG = Math.max(0, Math.round((homeGF / Math.max(homeGA, 0.5)) * 0.8));
  const aG = Math.max(0, Math.round((awayGF / Math.max(awayGA, 0.5)) * 0.65));
  return {
    homeWinPct,
    drawPct,
    awayWinPct,
    predictedScore: `${hG}–${aG}`,
    keyFactors: [
      `${home} (FIFA #${homeRank}) vs ${away} (FIFA #${awayRank}) — ${homeRank < awayRank ? home : away} ranked higher`,
      `Recent form: ${home} ${homeForm} · ${away} ${awayForm}`,
      `WC 2026 stats: ${home} ${homeGF}GF/${homeGA}GA — ${away} ${awayGF}GF/${awayGA}GA`,
    ],
    confidence: Math.abs(homeRank - awayRank) > 40 ? "High" as const : "Medium" as const,
    analysis: `Statistical model favors ${homeWinPct > awayWinPct ? home : awayWinPct > homeWinPct ? away : "a draw"} based on FIFA rankings, form, and WC 2026 performance. Predicted score: ${hG}–${aG}.`,
  };
}

router.post("/predict", async (req, res) => {
  const parsed = PredictMatchBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { home, away, group, venue, date, time, homeRank, awayRank, homeForm, awayForm, homeGF, homeGA, awayGF, awayGA } = parsed.data;

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    req.log.warn("GROQ_API_KEY not set, using fallback");
    const fallback = fallbackPrediction(home, away, homeRank, awayRank, homeForm, awayForm, homeGF, homeGA, awayGF, awayGA);
    res.json(fallback);
    return;
  }

  const prompt = `You are a FIFA World Cup 2026 data-science analyst. Predict this upcoming match with full statistical reasoning.

MATCH: ${home} vs ${away} | Group ${group} | ${date} ${time}
VENUE: ${venue}

${home}: FIFA Rank #${homeRank} | Last 5: ${homeForm} | WC 2026: ${homeGF}GF / ${homeGA}GA
${away}: FIFA Rank #${awayRank} | Last 5: ${awayForm} | WC 2026: ${awayGF}GF / ${awayGA}GA

Consider: FIFA ranking differential, recent form, tournament momentum, defensive solidity, scoring potency, historical H2H, and tactical context.

Respond with ONLY valid JSON — no markdown fences, no preamble:
{
  "homeWinPct": <integer>,
  "drawPct": <integer>,
  "awayWinPct": <integer>,
  "predictedScore": "<h>–<a>",
  "keyFactors": ["<factor1>","<factor2>","<factor3>"],
  "confidence": "High" | "Medium" | "Low",
  "analysis": "<2-sentence expert analysis>"
}
IMPORTANT: homeWinPct + drawPct + awayWinPct must equal exactly 100.`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 600,
        temperature: 0.4,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const groqData = await response.json() as { choices: Array<{ message: { content: string } }> };
    const raw = groqData.choices?.[0]?.message?.content ?? "";
    const clean = raw.replace(/```json|```/g, "").trim();
    const result = JSON.parse(clean) as {
      homeWinPct: number;
      drawPct: number;
      awayWinPct: number;
      predictedScore: string;
      keyFactors: string[];
      confidence: "High" | "Medium" | "Low";
      analysis: string;
    };

    const sum = (result.homeWinPct || 0) + (result.drawPct || 0) + (result.awayWinPct || 0);
    if (sum !== 100) {
      result.awayWinPct = Math.max(0, 100 - result.homeWinPct - result.drawPct);
    }

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Groq prediction failed, using fallback");
    const fallback = fallbackPrediction(home, away, homeRank, awayRank, homeForm, awayForm, homeGF, homeGA, awayGF, awayGA);
    res.json(fallback);
  }
});

export default router;
