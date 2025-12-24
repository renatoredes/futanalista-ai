import { Match } from '@/types/football';
import { Calendar, Flag, AlertTriangle, Square } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MatchCardProps {
  match: Match;
  teamName: string;
}

export function MatchCard({ match, teamName }: MatchCardProps) {
  const isWin = match.isHome
    ? match.homeScore > match.awayScore
    : match.awayScore > match.homeScore;
  const isDraw = match.homeScore === match.awayScore;
  const isLoss = !isWin && !isDraw;

  const resultColor = isWin
    ? 'bg-success/20 text-success border-success/30'
    : isDraw
    ? 'bg-warning/20 text-warning border-warning/30'
    : 'bg-destructive/20 text-destructive border-destructive/30';

  const resultLabel = isWin ? 'V' : isDraw ? 'E' : 'D';

  const teamCorners = match.isHome ? match.homeCorners : match.awayCorners;
  const teamYellowCards = match.isHome ? match.homeYellowCards : match.awayYellowCards;
  const teamRedCards = match.isHome ? match.homeRedCards : match.awayRedCards;

  return (
    <div className="stat-card hover:border-primary/30 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Calendar className="h-3.5 w-3.5" />
          <span>{format(new Date(match.date), "dd MMM", { locale: ptBR })}</span>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${resultColor}`}>
          {resultLabel}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className={`font-semibold ${match.isHome ? 'text-primary' : 'text-foreground'}`}>
            {match.homeTeam}
          </p>
          <p className={`font-semibold ${!match.isHome ? 'text-primary' : 'text-foreground'}`}>
            {match.awayTeam}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold font-mono">
            {match.homeScore} - {match.awayScore}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border/50 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Flag className="h-3.5 w-3.5" />
          <span>{teamCorners}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Square className="h-3 w-3 fill-warning text-warning" />
            <span className="text-muted-foreground">{teamYellowCards}</span>
          </div>
          {teamRedCards > 0 && (
            <div className="flex items-center gap-1">
              <Square className="h-3 w-3 fill-destructive text-destructive" />
              <span className="text-muted-foreground">{teamRedCards}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
