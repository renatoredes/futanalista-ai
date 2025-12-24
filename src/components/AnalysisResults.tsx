import { AnalysisResult } from '@/types/football';
import { TeamStatsCard } from './TeamStatsCard';
import { RecommendationCard } from './RecommendationCard';
import { StatsChart } from './StatsChart';
import { Sparkles, BarChart3, Users } from 'lucide-react';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  return (
    <div className="space-y-8">
      {/* Recommendations Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Análise de Apostas</h2>
            <p className="text-sm text-muted-foreground">Recomendações baseadas nos últimos 5 jogos</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {result.recommendations.map((rec, index) => (
            <RecommendationCard key={index} recommendation={rec} index={index} />
          ))}
        </div>
      </section>

      {/* Chart Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-warning/10">
            <BarChart3 className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Estatísticas Comparativas</h2>
            <p className="text-sm text-muted-foreground">Médias por jogo de cada equipe</p>
          </div>
        </div>
        <StatsChart team1Stats={result.team1Stats} team2Stats={result.team2Stats} />
      </section>

      {/* Teams Stats Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-success/10">
            <Users className="h-5 w-5 text-success" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Desempenho dos Times</h2>
            <p className="text-sm text-muted-foreground">Estatísticas detalhadas dos últimos jogos</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <TeamStatsCard stats={result.team1Stats} delay={100} />
          <TeamStatsCard stats={result.team2Stats} delay={200} />
        </div>
      </section>
    </div>
  );
}
