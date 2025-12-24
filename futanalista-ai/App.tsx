import React, { useState } from 'react';
import { fetchMatchAnalysis } from './services/geminiService';
import { AnalysisData } from './types';
import MatchHeader from './components/MatchHeader';
import RecentForm from './components/RecentForm';
import HeadToHead from './components/HeadToHead';
import AnalysisTabs from './components/AnalysisTabs';
import ConclusionCard from './components/ConclusionCard';
import LoadingScreen from './components/LoadingScreen';
import { Search, Loader2, Info, ArrowRight } from 'lucide-react';

function App() {
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const data = await fetchMatchAnalysis(teamName);
      setAnalysis(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao analisar a partida. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Navbar / Hero */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center transform rotate-3">
               <span className="text-white font-bold text-lg">F</span>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              FutAnalista AI
            </h1>
          </div>
          <div className="text-xs text-slate-500 font-mono hidden sm:block">
            Powered by Gemini 2.5
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Search Section - Only show when NOT loading and NO analysis (or to search again) */}
        {!loading && (
          <div className="text-center mb-12">
             {!analysis && (
                 <>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                      Previsões inteligentes <br/>
                      <span className="text-emerald-500">baseadas em dados reais</span>
                  </h2>
                  <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
                      Digite o nome do seu time e deixe nossa IA analisar o próximo confronto com estatísticas detalhadas de forma, escanteios e cartões.
                  </p>
                 </>
             )}

            <form onSubmit={handleSearch} className="relative max-w-lg mx-auto">
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Ex: Arsenal, Flamengo, Real Madrid..."
                className="w-full bg-slate-800/80 border border-slate-700 text-white pl-5 pr-14 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-xl text-lg placeholder-slate-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !teamName.trim()}
                className="absolute right-2 top-2 h-10 w-10 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* Loading State */}
        {loading && <LoadingScreen />}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-400 max-w-2xl mx-auto mb-8 animate-fade-in">
            <Info className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Results Section */}
        {analysis && !loading && (
          <div className="space-y-8 animate-fade-in-up">
            
            {/* Header */}
            <MatchHeader match={analysis.nextMatch} />

            {/* Teams Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecentForm stats={analysis.mainTeamAnalysis} />
              <RecentForm stats={analysis.opponentTeamAnalysis} isOpponent />
            </div>

            {/* H2H Section (New Component) */}
            <HeadToHead 
              data={analysis.headToHead} 
              homeTeamName={analysis.nextMatch.homeTeam}
              awayTeamName={analysis.nextMatch.awayTeam}
            />

            {/* Analysis Tabs (Scenarios, Corners, Cards) */}
            <AnalysisTabs data={analysis} />

            {/* Conclusion */}
            <ConclusionCard data={analysis.conclusion} />

            {/* Sources (Grounding) */}
            {analysis.sources && analysis.sources.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-800">
                <h4 className="text-sm font-semibold text-slate-500 mb-3">Fontes da Pesquisa</h4>
                <ul className="flex flex-wrap gap-3">
                  {analysis.sources.map((source, idx) => (
                    <li key={idx}>
                      <a 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 hover:border-emerald-500/30"
                      >
                        {source.title}
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;