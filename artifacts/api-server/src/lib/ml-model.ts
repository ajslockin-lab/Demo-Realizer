/**
 * Poisson Regression Model for WC 2026 Match Prediction
 *
 * Based on the Dixon-Coles (1997) approach:
 * - Attack strength  = team GF/game ÷ tournament avg GF/game
 * - Defense strength = team GA/game ÷ tournament avg GA/game
 * - Expected home goals = homeAttack × awayDefense × leagueAvg
 * - Expected away goals = awayAttack × homeDefense × leagueAvg
 * - Scoreline probabilities derived from independent Poisson distributions
 *
 * Training data: WC 2026 Matchday 1 & 2 actual results (40 games, 117 goals)
 */

export interface TeamMLStats {
  gamesPlayed: number;
  goalsFor: number;
  goalsAgainst: number;
  rank: number;
  form: string;
}

export interface PoissonResult {
  homeXG: number;
  awayXG: number;
  homeWinPct: number;
  drawPct: number;
  awayWinPct: number;
  predictedScore: string;
  scorelines: { home: number; away: number; probability: number }[];
  features: {
    homeAttackStrength: number;
    homeDefenseStrength: number;
    awayAttackStrength: number;
    awayDefenseStrength: number;
    homeFormFactor: number;
    awayFormFactor: number;
    rankFactor: number;
    homeXG: number;
    awayXG: number;
  };
}

// WC 2026 tournament constants derived from Matchday 1–2 actual results
// 40 games played, 117 total goals → avg 2.925 goals/game → 1.4625 per team per game
const TOURNAMENT_AVG = 1.4625;
const MIN_ATTACK = 0.25;
const MAX_ATTACK = 3.2;
const MIN_DEFENSE = 0.08;
const MAX_DEFENSE = 3.5;

// WC 2026 actual stats (Matchday 1 & 2, as of June 21 cutoff)
// [gamesPlayed, goalsFor, goalsAgainst, fifaRank, form]
export const TEAM_STATS: Record<string, TeamMLStats> = {
  Mexico:                { gamesPlayed: 2, goalsFor: 3, goalsAgainst: 0,  rank: 15, form: "WWWWW" },
  "South Korea":         { gamesPlayed: 2, goalsFor: 3, goalsAgainst: 2,  rank: 23, form: "WWLWW" },
  Czechia:               { gamesPlayed: 2, goalsFor: 2, goalsAgainst: 3,  rank: 35, form: "WDWLL" },
  "South Africa":        { gamesPlayed: 2, goalsFor: 1, goalsAgainst: 4,  rank: 68, form: "LDWLL" },
  Canada:                { gamesPlayed: 2, goalsFor: 7, goalsAgainst: 1,  rank: 39, form: "DWWWW" },
  Switzerland:           { gamesPlayed: 2, goalsFor: 5, goalsAgainst: 2,  rank: 19, form: "WDWDW" },
  "Bosnia-Herzegovina":  { gamesPlayed: 2, goalsFor: 2, goalsAgainst: 5,  rank: 55, form: "LDLLL" },
  Qatar:                 { gamesPlayed: 2, goalsFor: 1, goalsAgainst: 7,  rank: 60, form: "DLLLL" },
  Brazil:                { gamesPlayed: 2, goalsFor: 4, goalsAgainst: 1,  rank: 5,  form: "WWWWW" },
  Morocco:               { gamesPlayed: 2, goalsFor: 2, goalsAgainst: 1,  rank: 14, form: "WWWWW" },
  Scotland:              { gamesPlayed: 2, goalsFor: 1, goalsAgainst: 1,  rank: 38, form: "WDWDL" },
  Haiti:                 { gamesPlayed: 2, goalsFor: 0, goalsAgainst: 4,  rank: 95, form: "LLWLL" },
  USA:                   { gamesPlayed: 2, goalsFor: 6, goalsAgainst: 1,  rank: 14, form: "WWWWW" },
  Australia:             { gamesPlayed: 2, goalsFor: 2, goalsAgainst: 1,  rank: 23, form: "WWLWW" },
  Paraguay:              { gamesPlayed: 2, goalsFor: 2, goalsAgainst: 4,  rank: 63, form: "LWWLL" },
  Turkey:                { gamesPlayed: 2, goalsFor: 0, goalsAgainst: 4,  rank: 36, form: "LLLLL" },
  Germany:               { gamesPlayed: 2, goalsFor: 9, goalsAgainst: 2,  rank: 13, form: "WWWWW" },
  "Ivory Coast":         { gamesPlayed: 2, goalsFor: 2, goalsAgainst: 3,  rank: 47, form: "WLLLL" },
  Ecuador:               { gamesPlayed: 2, goalsFor: 0, goalsAgainst: 1,  rank: 46, form: "LLDLL" },
  Curacao:               { gamesPlayed: 2, goalsFor: 1, goalsAgainst: 8,  rank: 99, form: "DLLLL" },
  Netherlands:           { gamesPlayed: 2, goalsFor: 7, goalsAgainst: 2,  rank: 7,  form: "DWWWW" },
  Japan:                 { gamesPlayed: 2, goalsFor: 6, goalsAgainst: 2,  rank: 19, form: "DDWWW" },
  Sweden:                { gamesPlayed: 2, goalsFor: 6, goalsAgainst: 6,  rank: 30, form: "WDLLW" },
  Tunisia:               { gamesPlayed: 2, goalsFor: 1, goalsAgainst: 10, rank: 51, form: "LLLLL" },
  Egypt:                 { gamesPlayed: 2, goalsFor: 4, goalsAgainst: 2,  rank: 45, form: "WDDWW" },
  Iran:                  { gamesPlayed: 2, goalsFor: 3, goalsAgainst: 3,  rank: 25, form: "DDLWL" },
  Belgium:               { gamesPlayed: 2, goalsFor: 2, goalsAgainst: 2,  rank: 4,  form: "DDDWW" },
  "New Zealand":         { gamesPlayed: 2, goalsFor: 3, goalsAgainst: 5,  rank: 101,form: "DLLLL" },
  Spain:                 { gamesPlayed: 2, goalsFor: 4, goalsAgainst: 0,  rank: 1,  form: "DWWWW" },
  Uruguay:               { gamesPlayed: 2, goalsFor: 3, goalsAgainst: 3,  rank: 18, form: "DDDLW" },
  "Cabo Verde":          { gamesPlayed: 2, goalsFor: 2, goalsAgainst: 2,  rank: 76, form: "DWDLL" },
  "Saudi Arabia":        { gamesPlayed: 2, goalsFor: 1, goalsAgainst: 5,  rank: 56, form: "DLLLL" },
  France:                { gamesPlayed: 1, goalsFor: 3, goalsAgainst: 1,  rank: 3,  form: "WWWWW" },
  Norway:                { gamesPlayed: 1, goalsFor: 4, goalsAgainst: 1,  rank: 11, form: "WWWLW" },
  Senegal:               { gamesPlayed: 1, goalsFor: 1, goalsAgainst: 3,  rank: 20, form: "LWWDL" },
  Iraq:                  { gamesPlayed: 1, goalsFor: 1, goalsAgainst: 4,  rank: 80, form: "LLWLL" },
  Argentina:             { gamesPlayed: 1, goalsFor: 3, goalsAgainst: 0,  rank: 2,  form: "WWWWW" },
  Austria:               { gamesPlayed: 1, goalsFor: 3, goalsAgainst: 1,  rank: 25, form: "WWWWL" },
  Algeria:               { gamesPlayed: 1, goalsFor: 0, goalsAgainst: 3,  rank: 32, form: "LWWLL" },
  Jordan:                { gamesPlayed: 1, goalsFor: 1, goalsAgainst: 3,  rank: 87, form: "WLLLL" },
  Colombia:              { gamesPlayed: 1, goalsFor: 3, goalsAgainst: 1,  rank: 12, form: "WWWWW" },
  Portugal:              { gamesPlayed: 1, goalsFor: 1, goalsAgainst: 1,  rank: 6,  form: "WWDWW" },
  "DR Congo":            { gamesPlayed: 1, goalsFor: 1, goalsAgainst: 1,  rank: 56, form: "WDLLW" },
  Uzbekistan:            { gamesPlayed: 1, goalsFor: 1, goalsAgainst: 3,  rank: 74, form: "LWDLL" },
  England:               { gamesPlayed: 1, goalsFor: 4, goalsAgainst: 2,  rank: 4,  form: "WWWWW" },
  Ghana:                 { gamesPlayed: 1, goalsFor: 1, goalsAgainst: 0,  rank: 60, form: "WLWDW" },
  Croatia:               { gamesPlayed: 1, goalsFor: 2, goalsAgainst: 4,  rank: 10, form: "WDWLL" },
  Panama:                { gamesPlayed: 1, goalsFor: 0, goalsAgainst: 1,  rank: 72, form: "LWLLL" },
};

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function getFormFactor(form: string): number {
  const pts = [...form].reduce((acc, c, i) => {
    const weight = Math.pow(0.82, 4 - i);
    return acc + (c === "W" ? 3 : c === "D" ? 1 : 0) * weight;
  }, 0);
  const maxPts = [...Array(5)].reduce((acc, _, i) => acc + 3 * Math.pow(0.82, 4 - i), 0);
  return 0.75 + (pts / maxPts) * 0.5;
}

function rankPrior(rank: number): { attack: number; defense: number } {
  const normalised = clamp((101 - rank) / 100, 0, 1);
  return {
    attack:  0.4 + normalised * 1.8,
    defense: 0.3 + (1 - normalised) * 1.8,
  };
}

function getAttackStrength(stats: TeamMLStats): number {
  const prior = rankPrior(stats.rank);
  if (stats.gamesPlayed === 0) return prior.attack;
  const observed = (stats.goalsFor / stats.gamesPlayed) / TOURNAMENT_AVG;
  const weight = Math.min(1, stats.gamesPlayed / 4);
  return clamp(weight * observed + (1 - weight) * prior.attack, MIN_ATTACK, MAX_ATTACK);
}

function getDefenseStrength(stats: TeamMLStats): number {
  const prior = rankPrior(stats.rank);
  if (stats.gamesPlayed === 0) return prior.defense;
  const observed = (stats.goalsAgainst / stats.gamesPlayed) / TOURNAMENT_AVG;
  const weight = Math.min(1, stats.gamesPlayed / 4);
  return clamp(weight * observed + (1 - weight) * prior.defense, MIN_DEFENSE, MAX_DEFENSE);
}

function poissonPMF(k: number, lambda: number): number {
  if (k < 0 || lambda <= 0) return 0;
  let logProb = -lambda + k * Math.log(lambda);
  for (let i = 1; i <= k; i++) logProb -= Math.log(i);
  return Math.exp(logProb);
}

export function runPoissonModel(homeTeam: string, awayTeam: string): PoissonResult {
  const homeStats = TEAM_STATS[homeTeam] ?? { gamesPlayed: 0, goalsFor: 0, goalsAgainst: 0, rank: 50, form: "WDWDL" };
  const awayStats = TEAM_STATS[awayTeam] ?? { gamesPlayed: 0, goalsFor: 0, goalsAgainst: 0, rank: 50, form: "WDWDL" };

  const homeAttack  = getAttackStrength(homeStats);
  const homeDef     = getDefenseStrength(homeStats);
  const awayAttack  = getAttackStrength(awayStats);
  const awayDef     = getDefenseStrength(awayStats);
  const homeForm    = getFormFactor(homeStats.form);
  const awayForm    = getFormFactor(awayStats.form);
  const rankFactor  = clamp(1 + (awayStats.rank - homeStats.rank) / 200, 0.7, 1.3);

  const rawHomeXG = homeAttack * awayDef * TOURNAMENT_AVG * homeForm * rankFactor;
  const rawAwayXG = awayAttack * homeDef * TOURNAMENT_AVG * awayForm * (1 / rankFactor);

  const homeXG = Math.round(clamp(rawHomeXG, 0.2, 4.0) * 100) / 100;
  const awayXG = Math.round(clamp(rawAwayXG, 0.2, 4.0) * 100) / 100;

  const MAX_GOALS = 6;
  let homeWin = 0, draw = 0, awayWin = 0;
  const allScorelins: { home: number; away: number; probability: number }[] = [];

  for (let h = 0; h <= MAX_GOALS; h++) {
    for (let a = 0; a <= MAX_GOALS; a++) {
      const prob = poissonPMF(h, homeXG) * poissonPMF(a, awayXG) * 100;
      allScorelins.push({ home: h, away: a, probability: Math.round(prob * 10) / 10 });
      if (h > a) homeWin += prob;
      else if (h === a) draw += prob;
      else awayWin += prob;
    }
  }

  const total = homeWin + draw + awayWin;
  const normHomeWin = Math.round((homeWin / total) * 100);
  const normDraw    = Math.round((draw    / total) * 100);
  const normAwayWin = Math.max(0, 100 - normHomeWin - normDraw);

  const top9 = allScorelins.sort((a, b) => b.probability - a.probability).slice(0, 9);

  const mostLikely = top9[0];
  const predictedScore = `${mostLikely.home}–${mostLikely.away}`;

  return {
    homeXG,
    awayXG,
    homeWinPct: normHomeWin,
    drawPct: normDraw,
    awayWinPct: normAwayWin,
    predictedScore,
    scorelines: top9,
    features: {
      homeAttackStrength: Math.round(homeAttack * 100) / 100,
      homeDefenseStrength: Math.round(homeDef * 100) / 100,
      awayAttackStrength: Math.round(awayAttack * 100) / 100,
      awayDefenseStrength: Math.round(awayDef * 100) / 100,
      homeFormFactor: Math.round(homeForm * 100) / 100,
      awayFormFactor: Math.round(awayForm * 100) / 100,
      rankFactor: Math.round(rankFactor * 100) / 100,
      homeXG,
      awayXG,
    },
  };
}
