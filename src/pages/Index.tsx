import { useState } from 'react';
import { TeamInput } from '@/components/TeamInput';
import { AnalysisResults } from '@/components/AnalysisResults';
import { getMockAnalysis } from '@/data/mockData';
import { AnalysisResult } from '@/types/football';
import { Activity, TrendingUp, Target, Zap } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (team1: string, team2: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const analysisResult = getMockAnalysis(team1, team2);
    setResult(analysisResult);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-warning/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 glow-border">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">FutAnalise Pro</h1>
                  <p className="text-xs text-muted-foreground">Análise Inteligente de Futebol</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span>Dados em Tempo Real</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="h-4 w-4 text-warning" />
                  <span>Alta Precisão</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4">
          <div className="container mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Powered by AI & Estatísticas Avançadas
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 leading-tight">
              Análise de{' '}
              <span className="text-gradient">Apostas Esportivas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compare times, analise estatísticas dos últimos jogos e receba recomendações 
              inteligentes para suas apostas.
            </p>
          </div>

          {/* Team Input */}
          <TeamInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        </section>

        {/* Loading State */}
        {isLoading && (
          <div className="container mx-auto px-4 pb-12">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-warning/50 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              </div>
              <p className="mt-6 text-muted-foreground animate-pulse">Analisando dados dos últimos jogos...</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isLoading && (
          <section className="container mx-auto px-4 pb-20">
            <AnalysisResults result={result} />
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-border/50 bg-card/30 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 FutAnalise Pro. Dados atualizados dos últimos jogos.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
