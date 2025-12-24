import { useState, useEffect } from 'react';
import { Search, Zap, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getOpponent } from '@/data/mockData';

interface TeamInputProps {
  onAnalyze: (team1: string, team2: string) => void;
  isLoading: boolean;
}

export function TeamInput({ onAnalyze, isLoading }: TeamInputProps) {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  useEffect(() => {
    if (team1.trim()) {
      const opponent = getOpponent(team1.trim());
      if (opponent) {
        setTeam2(opponent);
        // Auto-trigger analysis when opponent is found
        onAnalyze(team1.trim(), opponent);
      } else {
        setTeam2('');
      }
    } else {
      setTeam2('');
    }
  }, [team1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (team1.trim() && team2.trim()) {
      onAnalyze(team1.trim(), team2.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="glass-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Digite o Time
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
                placeholder="Ex: Arsenal, Chelsea, Liverpool..."
                className="pl-10 bg-secondary/50 border-border/50 h-12 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold text-sm shrink-0 mt-6 md:mt-0">
            VS
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              Adversário
              <Lock className="h-3 w-3 text-muted-foreground/70" />
              <span className="text-xs text-muted-foreground/70">(automático)</span>
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              <Input
                type="text"
                value={team2}
                readOnly
                disabled
                placeholder="Preenchido automaticamente"
                className="pl-10 bg-secondary/30 border-border/30 h-12 text-foreground/80 placeholder:text-muted-foreground/50 cursor-not-allowed"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !team1.trim() || !team2.trim()}
            className="w-full md:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-6 md:mt-6 gap-2 glow-border"
          >
            <Zap className="h-4 w-4" />
            {isLoading ? 'Analisando...' : 'Analisar'}
          </Button>
        </div>
        
        {team1.trim() && !team2 && (
          <p className="text-sm text-amber-400 mt-4 text-center">
            Time não encontrado. Times disponíveis: Arsenal, Chelsea, Liverpool, Manchester United, Manchester City, Tottenham...
          </p>
        )}
      </div>
    </form>
  );
}
