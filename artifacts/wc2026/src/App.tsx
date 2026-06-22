import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { usePredictMatch } from "@workspace/api-client-react";
import { teams, matches, standings, Match, TeamData } from "./data";
import { Activity, Trophy, History, Brain, ChevronRight, BarChart3, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Prediction } from "@workspace/api-client-react/src/generated/api.schemas";

export default function App() {
  const [history, setHistory] = useState<{ match: Match; prediction: Prediction; timestamp: number }[]>([]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
              <Trophy size={18} />
            </div>
            <h1 className="font-bold text-lg tracking-tight uppercase">WC26 Predictor</h1>
          </div>
          <div className="text-sm font-mono text-muted-foreground flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            SYSTEM ONLINE
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8 bg-card border border-border/50">
            <TabsTrigger value="matches" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Activity className="w-4 h-4 mr-2" />
              Matches
            </TabsTrigger>
            <TabsTrigger value="standings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-4 h-4 mr-2" />
              Standings
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {Object.entries(
              matches.reduce((acc, match) => {
                if (!acc[match.date]) acc[match.date] = [];
                acc[match.date].push(match);
                return acc;
              }, {} as Record<string, Match[]>)
            ).map(([date, dateMatches]) => (
              <div key={date} className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight border-b border-border/50 pb-2 text-primary">{date}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {dateMatches.map((match) => (
                    <MatchCard key={match.id} match={match} onPrediction={(p) => setHistory(prev => [{match, prediction: p, timestamp: Date.now()}, ...prev])} />
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="standings" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(standings).map(([group, teams]) => (
                <Card key={group} className="border-border/50 bg-card/50 overflow-hidden">
                  <div className="bg-muted px-4 py-2 border-b border-border/50">
                    <h3 className="font-bold text-sm">Group {group}</h3>
                  </div>
                  <CardContent className="p-0">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/30 text-muted-foreground text-xs uppercase tracking-wider">
                          <th className="text-left py-2 pl-4 font-medium">Team</th>
                          <th className="text-right py-2 pr-4 font-medium">Pts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teams.map((t, idx) => (
                          <tr key={t.team} className={cn(
                            "border-b border-border/20 last:border-0",
                            idx < 2 ? "bg-accent/5" : ""
                          )}>
                            <td className="py-2 pl-4 flex items-center gap-2">
                              <span className={cn(
                                "w-4 text-xs font-mono text-muted-foreground",
                                idx < 2 ? "text-accent font-bold" : ""
                              )}>{idx + 1}</span>
                              <span className="font-medium">{t.team}</span>
                              {t.text && <span className="text-[10px] text-muted-foreground ml-1">({t.text})</span>}
                            </td>
                            <td className="text-right py-2 pr-4 font-mono font-bold">{t.pts}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            {history.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-border/50 rounded-xl bg-card/20">
                <Brain className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-foreground">No predictions yet</h3>
                <p className="text-sm text-muted-foreground mt-1">Run some simulations from the Matches tab.</p>
              </div>
            ) : (
              history.map((item, idx) => (
                <Card key={idx} className="bg-card/50 border-border/50">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">{new Date(item.timestamp).toLocaleTimeString()}</div>
                      <div className="font-bold flex items-center gap-2">
                        <span>{item.match.home}</span>
                        <span className="text-primary">{item.prediction.predictedScore}</span>
                        <span>{item.match.away}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {item.prediction.confidence} Confidence
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function MatchCard({ match, onPrediction }: { match: Match, onPrediction: (p: Prediction) => void }) {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const predict = usePredictMatch();

  const handlePredict = () => {
    const homeData = teams[match.home];
    const awayData = teams[match.away];

    predict.mutate({
      data: {
        id: match.id,
        home: match.home,
        away: match.away,
        group: match.group,
        venue: match.venue,
        date: match.date,
        time: match.time,
        homeRank: homeData[1],
        awayRank: awayData[1],
        homeForm: homeData[2],
        awayForm: awayData[2],
        homeGF: homeData[3],
        homeGA: homeData[4],
        awayGF: awayData[3],
        awayGA: awayData[4]
      }
    }, {
      onSuccess: (res) => {
        setPrediction(res);
        onPrediction(res);
      }
    });
  };

  const homeData = teams[match.home];
  const awayData = teams[match.away];

  return (
    <Card className="border-border/50 bg-card overflow-hidden group">
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-center text-xs text-muted-foreground mb-4 pb-2 border-b border-border/30">
            <span>Group {match.group} • {match.time}</span>
            <span className="truncate max-w-[150px]">{match.venue}</span>
          </div>

          <div className="space-y-4 mb-6">
            <TeamRow name={match.home} data={homeData} />
            <TeamRow name={match.away} data={awayData} />
          </div>
        </div>

        {prediction ? (
          <div className="mt-4 pt-4 border-t border-border/30 space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="text-center pb-2">
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Predicted Score</div>
              <div className="text-3xl font-bold font-mono text-primary drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">
                {prediction.predictedScore}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className={prediction.homeWinPct > prediction.awayWinPct ? "text-accent" : ""}>{prediction.homeWinPct}%</span>
                <span className="text-muted-foreground">DRAW {prediction.drawPct}%</span>
                <span className={prediction.awayWinPct > prediction.homeWinPct ? "text-accent" : ""}>{prediction.awayWinPct}%</span>
              </div>
              <div className="h-2 flex rounded-full overflow-hidden opacity-90">
                <div style={{ width: `${prediction.homeWinPct}%` }} className="bg-white/80 transition-all duration-1000" />
                <div style={{ width: `${prediction.drawPct}%` }} className="bg-muted transition-all duration-1000" />
                <div style={{ width: `${prediction.awayWinPct}%` }} className="bg-primary transition-all duration-1000" />
              </div>
            </div>

            <div className="bg-black/20 p-3 rounded-lg text-sm border border-border/50">
              <div className="flex items-center gap-2 mb-2 font-medium text-primary">
                <Brain className="w-4 h-4" />
                <span>AI Analysis</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{prediction.analysis}</p>
            </div>
          </div>
        ) : (
          <Button 
            className="w-full font-bold uppercase tracking-wider relative overflow-hidden" 
            onClick={handlePredict}
            disabled={predict.isPending}
          >
            {predict.isPending ? (
              <>
                <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  Simulating...
                </div>
              </>
            ) : (
              <>
                Run Prediction
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        )}
      </div>
    </Card>
  );
}

function TeamRow({ name, data }: { name: string; data: TeamData }) {
  if (!data) return null;
  const [flag, rank, form] = data;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl drop-shadow-md">{flag}</span>
        <div>
          <div className="font-bold">{name}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <span>FIFA Rank: #{rank}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        {form.split('').map((result, i) => (
          <div 
            key={i} 
            className={cn(
              "w-2.5 h-2.5 rounded-full",
              result === 'W' ? "bg-accent" : result === 'D' ? "bg-muted-foreground" : "bg-destructive"
            )}
            title={result}
          />
        ))}
      </div>
    </div>
  );
}
