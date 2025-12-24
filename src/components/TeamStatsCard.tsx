import { TeamStats } from '@/types/football';
import { MatchCard } from './MatchCard';
import { TrendingUp, TrendingDown, Flag, AlertTriangle, Target } from 'lucide-react';

interface TeamStatsCardProps {
  stats: TeamStats;
  delay?: number;
}

export function TeamStatsCard({ stats, delay = 0 }: TeamStatsCardProps) {
  const form = stats.matches.slice(0, 5).map((m) => {
    const isWin = m.isHome ? m.homeScore > m.awayScore : m.awayScore > m.homeScore;
    const isDraw = m.homeScore === m.awayScore;
    return isWin ? 'W' : isDraw ? 'D' : 'L';
  });

  return (
    <div 
      className="glass-card p-6 animate-fade-in-up opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">{stats.teamName}</h3>
        <div className="flex gap-1">
          {form.map((result, i) => (
            <span
              key={i}
              className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                result === 'W'
                  ? 'bg-success/20 text-success'
                  : result === 'D'
                  ? 'bg-warning/20 text-warning'
                  : 'bg-destructive/20 text-destructive'
              }`}
            >
              {result === 'W' ? 'V' : result === 'D' ? 'E' : 'D'}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="stat-card text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-xs text-muted-foreground">Gols Marcados</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.totalGoalsScored}</p>
          <p className="text-xs text-muted-foreground">
            Média: <span className="text-success font-semibold">{stats.avgGoalsScored.toFixed(1)}</span>
          </p>
        </div>

        <div className="stat-card text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <TrendingDown className="h-4 w-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Gols Sofridos</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.totalGoalsConceded}</p>
          <p className="text-xs text-muted-foreground">
            Média: <span className="text-destructive font-semibold">{stats.avgGoalsConceded.toFixed(1)}</span>
          </p>
        </div>

        <div className="stat-card text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Flag className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Escanteios</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.totalCorners}</p>
          <p className="text-xs text-muted-foreground">
            Média: <span className="text-primary font-semibold">{stats.avgCorners.toFixed(1)}</span>
          </p>
        </div>

        <div className="stat-card text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-xs text-muted-foreground">Cartões</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.totalYellowCards + stats.totalRedCards}</p>
          <p className="text-xs text-muted-foreground">
            Média: <span className="text-warning font-semibold">{stats.avgCards.toFixed(1)}</span>
          </p>
        </div>
      </div>

      {/* Record */}
      <div className="flex items-center justify-center gap-6 mb-6 py-3 bg-secondary/30 rounded-lg">
        <div className="text-center">
          <p className="text-lg font-bold text-success">{stats.wins}</p>
          <p className="text-xs text-muted-foreground">Vitórias</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-warning">{stats.draws}</p>
          <p className="text-xs text-muted-foreground">Empates</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-destructive">{stats.losses}</p>
          <p className="text-xs text-muted-foreground">Derrotas</p>
        </div>
      </div>

      {/* Matches */}
      <h4 className="text-sm font-semibold text-muted-foreground mb-3">Últimos 5 Jogos</h4>
      <div className="grid gap-3">
        {stats.matches.map((match) => (
          <MatchCard key={match.id} match={match} teamName={stats.teamName} />
        ))}
      </div>
    </div>
  );
}
