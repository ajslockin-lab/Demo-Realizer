import { useState, useEffect } from "react";
import { usePredictMatch, useGetLineup } from "@workspace/api-client-react";
import type { Prediction, LineupPrediction } from "@workspace/api-client-react/src/generated/api.schemas";
import { teams, matches, standings, DAYS, Match } from "./data";
import { cn } from "@/lib/utils";
import {
  Trophy, History, Brain, ChevronRight, BarChart3, Cpu, Target, Zap,
  TrendingUp, Shield, Activity, Calendar, Users, AlertTriangle, Star
} from "lucide-react";

export default function App() {
  const [tab, setTab] = useState<"matches" | "standings" | "history">("matches");
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [history, setHistory] = useState<{ match: Match; prediction: Prediction; ts: number }[]>([]);

  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  const dayMatches = matches.filter(m => m.date === selectedDay);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
              <Trophy size={14} className="text-primary-foreground" />
            </div>
            <span className="font-black text-base tracking-tight uppercase">WC26 AI Predictor</span>
            <span className="hidden sm:inline text-[10px] bg-primary/20 text-primary border border-primary/30 px-1.5 py-0.5 rounded font-mono ml-1">
              Poisson ML + AI Lineups
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            SYSTEM ONLINE
          </div>
        </div>
      </header>

      {/* Nav */}
      <div className="border-b border-border/30 bg-background/80">
        <div className="max-w-6xl mx-auto px-4 flex gap-0">
          {[
            { id: "matches", icon: Activity, label: "Matches" },
            { id: "standings", icon: BarChart3, label: "Standings" },
            { id: "history", icon: History, label: "History" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id as typeof tab)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                tab === id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={14} />
              {label}
              {id === "history" && history.length > 0 && (
                <span className="bg-primary text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {history.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">

        {/* MATCHES TAB */}
        {tab === "matches" && (
          <div>
            {/* Day selector */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">
                <Calendar size={12} />
                Select matchday
              </div>
              <div className="flex flex-wrap gap-2">
                {DAYS.map(day => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-bold border transition-all duration-150",
                      selectedDay === day
                        ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_rgba(255,215,0,0.3)]"
                        : "bg-card border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    )}
                  >
                    {day}
                    <span className="ml-1.5 text-[10px] opacity-60">
                      ({matches.filter(m => m.date === day).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Day header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-border/40" />
              <h2 className="text-sm font-mono text-primary font-bold tracking-widest uppercase">
                {selectedDay} — {dayMatches.length} Matches
              </h2>
              <div className="h-px flex-1 bg-border/40" />
            </div>

            {/* Matches */}
            <div className="space-y-5">
              {dayMatches.map((match, idx) => (
                <MatchDetailCard
                  key={match.id}
                  match={match}
                  matchIndex={idx}
                  onPrediction={p => setHistory(prev => [{ match, prediction: p, ts: Date.now() }, ...prev])}
                />
              ))}
            </div>
          </div>
        )}

        {/* STANDINGS TAB */}
        {tab === "standings" && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-border/40" />
              <h2 className="text-sm font-mono text-primary font-bold tracking-widest uppercase">Group Standings — MD2</h2>
              <div className="h-px flex-1 bg-border/40" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(standings).map(([group, rows]) => (
                <div key={group} className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
                  <div className="bg-muted/60 px-4 py-2 border-b border-border/40 flex items-center gap-2">
                    <span className="text-xs font-mono text-primary font-bold">GROUP {group}</span>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border/30">
                        <th className="text-left py-1.5 pl-4 font-medium">Team</th>
                        <th className="text-right py-1.5 pr-4 font-medium">PTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((t, i) => {
                        const meta = teams[t.team];
                        return (
                          <tr key={t.team} className={cn(
                            "border-b border-border/20 last:border-0",
                            i < 2 ? "bg-primary/5" : ""
                          )}>
                            <td className="py-2 pl-4 flex items-center gap-2">
                              <span className={cn("text-xs font-mono w-4", i < 2 ? "text-primary font-bold" : "text-muted-foreground")}>
                                {i + 1}
                              </span>
                              {meta && <span>{meta.flag}</span>}
                              <span className="font-medium">{t.team}</span>
                              {i < 2 && (
                                <span className="text-[9px] bg-primary/20 text-primary px-1 rounded font-mono">ADV</span>
                              )}
                            </td>
                            <td className="text-right py-2 pr-4 font-mono font-bold">{t.pts}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HISTORY TAB */}
        {tab === "history" && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-border/40" />
              <h2 className="text-sm font-mono text-primary font-bold tracking-widest uppercase">Prediction History</h2>
              <div className="h-px flex-1 bg-border/40" />
            </div>
            {history.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border/40 rounded-2xl bg-card/20">
                <Brain className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-30" />
                <p className="text-muted-foreground">No predictions run yet. Go to Matches and run the ML model.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((item, i) => {
                  const hm = teams[item.match.home];
                  const am = teams[item.match.away];
                  const winner = item.prediction.homeWinPct > item.prediction.awayWinPct
                    ? item.match.home
                    : item.prediction.awayWinPct > item.prediction.homeWinPct
                    ? item.match.away : "Draw";
                  return (
                    <div key={i} className="rounded-xl border border-border/50 bg-card/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className="text-xs text-muted-foreground font-mono">
                          {new Date(item.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          <div className="text-[10px]">{item.match.date}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{hm?.flag}</span>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">vs</div>
                            <div className="text-lg font-black font-mono text-primary">{item.prediction.predictedScore}</div>
                          </div>
                          <span className="text-xl">{am?.flag}</span>
                        </div>
                        <div>
                          <div className="font-bold text-sm">{item.match.home} vs {item.match.away}</div>
                          <div className="text-xs text-muted-foreground">
                            xG: {item.prediction.homeXG} — {item.prediction.awayXG} · Predicted winner: {winner}
                          </div>
                        </div>
                      </div>
                      <span className={cn(
                        "text-xs px-2 py-1 rounded font-mono font-bold border flex-shrink-0",
                        item.prediction.confidence === "High" ? "bg-green-500/10 text-green-400 border-green-500/30"
                          : item.prediction.confidence === "Medium" ? "bg-primary/10 text-primary border-primary/30"
                          : "bg-muted text-muted-foreground border-border/50"
                      )}>
                        {item.prediction.confidence}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

/* ── Match Detail Card ──────────────────────────────────────── */

function MatchDetailCard({ match, matchIndex, onPrediction }: { match: Match; matchIndex: number; onPrediction: (p: Prediction) => void }) {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [showLineup, setShowLineup] = useState(false);
  const [lineup, setLineup] = useState<LineupPrediction | null>(null);
  const predict = usePredictMatch();
  const lineupMutation = useGetLineup();

  // Auto-fetch lineup on mount — staggered by index to avoid hitting Groq rate limits
  useEffect(() => {
    const delay = matchIndex * 1500;
    const timer = setTimeout(() => {
      lineupMutation.mutate(
        { data: { home: match.home, away: match.away, group: match.group, date: match.date } },
        { onSuccess: (data) => setLineup(data) }
      );
    }, delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.id]);

  const hm = teams[match.home];
  const am = teams[match.away];

  const handlePredict = () => {
    predict.mutate(
      { data: { id: match.id, home: match.home, away: match.away, group: match.group, venue: match.venue, date: match.date, time: match.time } },
      { onSuccess: (res) => { setPrediction(res); onPrediction(res); } }
    );
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden">
      {/* Match header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-5">
          <span className="font-mono bg-muted/60 px-2 py-0.5 rounded">GROUP {match.group}</span>
          <span>{match.time}</span>
          <span className="text-right max-w-[200px] truncate">{match.venue}</span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <TeamBlock name={match.home} meta={hm} align="left" />
          <div className="flex flex-col items-center gap-1">
            {prediction ? (
              <div className="text-3xl font-black font-mono text-primary drop-shadow-[0_0_10px_rgba(255,215,0,0.4)] leading-none">
                {prediction.predictedScore}
              </div>
            ) : (
              <div className="text-xl font-bold text-muted-foreground/40 font-mono">vs</div>
            )}
            {prediction && (
              <span className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded border font-bold",
                prediction.confidence === "High" ? "bg-green-500/10 text-green-400 border-green-500/30"
                  : prediction.confidence === "Medium" ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-muted/60 text-muted-foreground border-border/50"
              )}>
                {prediction.confidence} conf.
              </span>
            )}
          </div>
          <TeamBlock name={match.away} meta={am} align="right" />
        </div>
      </div>

      {/* Lineup toggle */}
      <div className="px-5 pb-3">
        <button
          onClick={() => setShowLineup(v => !v)}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition-colors",
            showLineup
              ? "bg-primary/10 border-primary/30 text-primary"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:text-foreground hover:border-border/70"
          )}
        >
          <div className="flex items-center gap-1.5">
            <Users size={12} />
            <span>Predicted Lineup &amp; Formation</span>
            {lineupMutation.isPending && (
              <span className="text-[10px] font-mono text-muted-foreground ml-1 animate-pulse">Fetching AI intel…</span>
            )}
            {lineup && !lineupMutation.isPending && (
              <span className="text-[10px] bg-green-500/15 text-green-400 border border-green-500/25 px-1.5 rounded font-mono">READY</span>
            )}
          </div>
          <span className={cn("transition-transform duration-200", showLineup ? "rotate-90" : "")}><ChevronRight size={12} /></span>
        </button>

        {showLineup && lineup && (
          <LineupPanel lineup={lineup} homeName={match.home} awayName={match.away} />
        )}
        {showLineup && lineupMutation.isPending && (
          <div className="mt-2 p-4 rounded-lg border border-border/30 bg-muted/20 text-center text-xs text-muted-foreground animate-pulse">
            AI is predicting starting lineups based on squad data and tournament context…
          </div>
        )}
      </div>

      {/* Predict panel or button */}
      {prediction ? (
        <PredictionPanel match={match} prediction={prediction} />
      ) : (
        <div className="px-5 pb-5">
          <button
            onClick={handlePredict}
            disabled={predict.isPending}
            className={cn(
              "w-full py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-200",
              "bg-primary text-primary-foreground",
              "hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:scale-[1.01]",
              "disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100",
              "flex items-center justify-center gap-2 relative overflow-hidden group"
            )}
          >
            {predict.isPending ? (
              <>
                <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                <span>Running Poisson Model + AI…</span>
              </>
            ) : (
              <>
                <Cpu size={15} />
                Run ML Prediction
                <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          {predict.isError && (
            <p className="text-xs text-destructive text-center mt-2">Prediction failed — please try again.</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Lineup Panel ───────────────────────────────────────────── */

function LineupPanel({ lineup, homeName, awayName }: { lineup: LineupPrediction; homeName: string; awayName: string }) {
  const positionOrder = ["GK","CB","LB","RB","LWB","RWB","CDM","CM","CAM","SS","LW","RW","ST"];
  const sortPlayers = (xi: typeof lineup.home.xi) =>
    [...xi].sort((a, b) => positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position));

  return (
    <div className="mt-2 rounded-xl border border-border/30 bg-muted/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="grid grid-cols-2 divide-x divide-border/30">
        {([
          { team: lineup.home, name: homeName },
          { team: lineup.away, name: awayName },
        ] as const).map(({ team, name }) => (
          <div key={name} className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-foreground">{name}</span>
              <span className="text-[10px] font-mono bg-primary/15 text-primary px-1.5 py-0.5 rounded border border-primary/25">
                {team.formation}
              </span>
            </div>

            {/* Players */}
            <div className="space-y-1 mb-2">
              {sortPlayers(team.xi).map((p, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-muted-foreground w-5 text-right flex-shrink-0">{p.number}</span>
                  <span className={cn(
                    "text-[10px] font-mono px-1 rounded w-8 text-center flex-shrink-0",
                    p.position === "GK" ? "bg-yellow-500/20 text-yellow-400" :
                    ["CB","LB","RB","LWB","RWB"].includes(p.position) ? "bg-blue-500/15 text-blue-400" :
                    ["CDM","CM","CAM"].includes(p.position) ? "bg-green-500/15 text-green-400" :
                    "bg-red-500/15 text-red-400"
                  )}>
                    {p.position}
                  </span>
                  <span className={cn("text-xs truncate", p.isStar ? "font-bold text-primary" : "text-foreground/80")}>
                    {p.name}
                  </span>
                  {p.isStar && <Star size={9} className="text-primary flex-shrink-0 fill-primary" />}
                </div>
              ))}
            </div>

            {/* Tactics & key threat */}
            <div className="border-t border-border/25 pt-2 space-y-1">
              <p className="text-[10px] text-muted-foreground leading-snug">{team.tactics}</p>
              <div className="flex items-center gap-1">
                <Zap size={9} className="text-primary flex-shrink-0" />
                <span className="text-[10px] text-primary font-medium">Key threat: {team.keyThreat}</span>
              </div>
              {team.injuryAlert && (
                <div className="flex items-center gap-1">
                  <AlertTriangle size={9} className="text-amber-400 flex-shrink-0" />
                  <span className="text-[10px] text-amber-400">{team.injuryAlert}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-1.5 border-t border-border/25 bg-muted/20 text-[10px] text-muted-foreground font-mono text-center">
        AI predicted lineup · Official XI announced ~1hr before kickoff
      </div>
    </div>
  );
}

/* ── Team Block ─────────────────────────────────────────────── */

function TeamBlock({ name, meta, align }: { name: string; meta?: { flag: string; rank: number; form: string }; align: "left" | "right" }) {
  if (!meta) return <div className="font-bold">{name}</div>;
  return (
    <div className={cn("flex flex-col gap-1", align === "right" ? "items-end" : "items-start")}>
      <span className="text-3xl">{meta.flag}</span>
      <span className="font-black text-sm leading-tight">{name}</span>
      <span className="text-[10px] text-muted-foreground font-mono">FIFA #{meta.rank}</span>
      <div className={cn("flex gap-0.5", align === "right" ? "flex-row-reverse" : "flex-row")}>
        {meta.form.split("").map((r, i) => (
          <div key={i} title={r === "W" ? "Win" : r === "D" ? "Draw" : "Loss"}
            className={cn("w-2 h-2 rounded-full",
              r === "W" ? "bg-green-400" : r === "D" ? "bg-muted-foreground/60" : "bg-destructive/70"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Prediction Panel ───────────────────────────────────────── */

function PredictionPanel({ match, prediction }: { match: Match; prediction: Prediction }) {
  const f = prediction.modelFeatures;
  const maxProb = Math.max(...(prediction.scorelines?.map(s => s.probability) ?? [1]));

  return (
    <div className="border-t border-border/40 animate-in fade-in slide-in-from-bottom-3 duration-500">
      {/* Win probability bar */}
      <div className="px-5 py-4 border-b border-border/30">
        <div className="flex justify-between text-xs font-mono mb-1.5">
          <span className={cn("font-bold", prediction.homeWinPct > prediction.awayWinPct ? "text-green-400" : "text-muted-foreground")}>
            {match.home} {prediction.homeWinPct}%
          </span>
          <span className="text-muted-foreground">Draw {prediction.drawPct}%</span>
          <span className={cn("font-bold", prediction.awayWinPct > prediction.homeWinPct ? "text-primary" : "text-muted-foreground")}>
            {prediction.awayWinPct}% {match.away}
          </span>
        </div>
        <div className="h-2.5 flex rounded-full overflow-hidden">
          <div style={{ width: `${prediction.homeWinPct}%` }} className="bg-green-500/80 transition-all duration-1000" />
          <div style={{ width: `${prediction.drawPct}%` }} className="bg-muted-foreground/40 transition-all duration-1000" />
          <div style={{ width: `${prediction.awayWinPct}%` }} className="bg-primary transition-all duration-1000" />
        </div>
      </div>

      {/* Model features */}
      {f && (
        <div className="px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <Cpu size={12} />
            Poisson Regression Features
          </div>
          <div className="grid grid-cols-1 gap-3 text-xs">
            <MetricRow icon={<Target size={11} />} label="Expected Goals (xG)" homeVal={f.homeXG} awayVal={f.awayXG} format={v => v.toFixed(2)} higherIsBetter />
            <MetricRow icon={<Zap size={11} />} label="Attack Strength" homeVal={f.homeAttackStrength} awayVal={f.awayAttackStrength} format={v => v.toFixed(2)} higherIsBetter />
            <MetricRow icon={<Shield size={11} />} label="Defense Weakness" homeVal={f.homeDefenseStrength} awayVal={f.awayDefenseStrength} format={v => v.toFixed(2)} higherIsBetter={false} />
            <MetricRow icon={<TrendingUp size={11} />} label="Form Factor" homeVal={f.homeFormFactor} awayVal={f.awayFormFactor} format={v => v.toFixed(2)} higherIsBetter />
          </div>
          <div className="mt-3 text-[10px] text-muted-foreground font-mono border border-border/30 rounded-lg px-3 py-2 bg-muted/20">
            λ_home = {f.homeAttackStrength} × {f.awayDefenseStrength} × 1.4625 × {f.homeFormFactor} × {f.rankFactor} = <span className="text-primary font-bold">{f.homeXG}</span>
            &nbsp;|&nbsp;
            λ_away = {f.awayAttackStrength} × {f.homeDefenseStrength} × 1.4625 × {f.awayFormFactor} / {f.rankFactor} = <span className="text-primary font-bold">{f.awayXG}</span>
          </div>
        </div>
      )}

      {/* Scoreline probability grid */}
      {prediction.scorelines && prediction.scorelines.length > 0 && (
        <div className="px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <BarChart3 size={12} />
            Scoreline Probability Distribution
          </div>
          <div className="grid grid-cols-3 gap-2">
            {prediction.scorelines.slice(0, 9).map((s, i) => {
              const intensity = s.probability / maxProb;
              const isTop = i === 0;
              return (
                <div key={i}
                  style={{ backgroundColor: isTop ? undefined : `rgba(255,215,0,${intensity * 0.18})` }}
                  className={cn(
                    "rounded-lg p-2.5 text-center border transition-all",
                    isTop ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_rgba(255,215,0,0.3)]"
                      : "border-primary/20 text-foreground"
                  )}
                >
                  <div className={cn("text-lg font-black font-mono leading-none", isTop ? "" : "text-primary")}>
                    {s.home}–{s.away}
                  </div>
                  <div className={cn("text-[11px] font-mono mt-0.5", isTop ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {s.probability.toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 font-mono">
            P(h,a) = Poisson(λ_h,h) × Poisson(λ_a,a) · WC 2026 MD1–2 training data (40 games, 117 goals)
          </p>
        </div>
      )}

      {/* Goalscorers */}
      {prediction.goalscorers && (
        <div className="px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <Brain size={12} />
            AI Goalscorer Predictions
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { side: prediction.goalscorers.home, label: match.home },
              { side: prediction.goalscorers.away, label: match.away },
            ].map(({ side, label }) => (
              <div key={label}>
                <div className="text-[10px] font-mono text-muted-foreground uppercase mb-2">{label}</div>
                <div className="space-y-2">
                  {(side ?? []).map((scorer, i) => (
                    <ScorerRow key={i} scorer={scorer} />
                  ))}
                  {(side ?? []).length === 0 && <span className="text-xs text-muted-foreground">No data</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key factors */}
      {prediction.keyFactors && prediction.keyFactors.length > 0 && (
        <div className="px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <Zap size={12} />
            Key Factors
          </div>
          <ul className="space-y-1.5">
            {prediction.keyFactors.map((factor, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AI analysis */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <Brain size={12} />
          AI Tactical Analysis
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{prediction.analysis}</p>
      </div>
    </div>
  );
}

/* ── Metric Row ─────────────────────────────────────────────── */

function MetricRow({ icon, label, homeVal, awayVal, format, higherIsBetter }: {
  icon: React.ReactNode; label: string; homeVal: number; awayVal: number;
  format: (v: number) => string; higherIsBetter: boolean;
}) {
  const homeWins = higherIsBetter ? homeVal > awayVal : homeVal < awayVal;
  const awayWins = higherIsBetter ? awayVal > homeVal : awayVal < homeVal;
  const total = homeVal + awayVal || 1;
  const homeWidth = Math.round((homeVal / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1 text-muted-foreground">
          {icon}
          <span className="text-[10px] uppercase tracking-wider">{label}</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className={cn("font-bold", homeWins ? "text-green-400" : "text-muted-foreground")}>{format(homeVal)}</span>
          <span className="text-muted-foreground/40 text-[10px]">vs</span>
          <span className={cn("font-bold", awayWins ? "text-primary" : "text-muted-foreground")}>{format(awayVal)}</span>
        </div>
      </div>
      <div className="h-1.5 flex rounded-full overflow-hidden bg-muted/40">
        <div style={{ width: `${homeWidth}%` }}
          className={cn("transition-all duration-700", homeWins ? "bg-green-500/70" : "bg-muted-foreground/40")} />
        <div style={{ width: `${100 - homeWidth}%` }}
          className={cn("transition-all duration-700", awayWins ? "bg-primary/80" : "bg-muted-foreground/30")} />
      </div>
    </div>
  );
}

/* ── Scorer Row ─────────────────────────────────────────────── */

function ScorerRow({ scorer }: { scorer: { name: string; probability: number; goals: number } }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold truncate">{scorer.name}</div>
        <div className="h-1 mt-0.5 bg-muted/40 rounded-full overflow-hidden">
          <div style={{ width: `${Math.min(scorer.probability, 100)}%` }}
            className="h-full bg-primary/70 rounded-full transition-all duration-700" />
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
        <div className="text-[11px] font-mono text-primary font-bold">{scorer.probability}%</div>
        <div className="text-[10px] text-muted-foreground font-mono">{scorer.goals === 2 ? "brace" : "1 goal"}</div>
      </div>
    </div>
  );
}
