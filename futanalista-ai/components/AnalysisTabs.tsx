import React, { useState } from 'react';
import { AnalysisData } from '../types';
import Scenarios from './Scenarios';
import { Flag, Copy, RefreshCcw, Goal, Wallet, AlertOctagon, TrendingUp, Info, BarChart3, Clock, ListFilter, Trophy, Handshake, ChevronUp, ChevronDown, Minus } from 'lucide-react';

interface AnalysisTabsProps {
  data: AnalysisData;
}

const AnalysisTabs: React.FC<AnalysisTabsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'standings' | 'goals' | 'corners' | 'cards' | 'bets'>('standings');

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Baixo': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Médio': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Alto': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-slate-700">
         <button
          onClick={() => setActiveTab('standings')}
          className={`flex-1 py-4 px-2 text-sm font-medium flex items-center justify-center gap-2 transition-colors min-w-[100px] ${
            activeTab === 'standings'
              ? 'bg-slate-800 text-amber-400 border-b-2 border-amber-500'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span className="hidden sm:inline">Tabela</span>
        </button>
        <button
          onClick={() => setActiveTab('goals')}
          className={`flex-1 py-4 px-2 text-sm font-medium flex items-center justify-center gap-2 transition-colors min-w-[100px] ${
            activeTab === 'goals'
              ? 'bg-slate-800 text-emerald-400 border-b-2 border-emerald-500'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Goal className="w-4 h-4" />
          <span className="hidden sm:inline">Cenários</span>
        </button>
        <button
          onClick={() => setActiveTab('corners')}
          className={`flex-1 py-4 px-2 text-sm font-medium flex items-center justify-center gap-2 transition-colors min-w-[100px] ${
            activeTab === 'corners'
              ? 'bg-slate-800 text-blue-400 border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Flag className="w-4 h-4" />
          <span className="hidden sm:inline">Escanteios</span>
        </button>
        <button
          onClick={() => setActiveTab('cards')}
          className={`flex-1 py-4 px-2 text-sm font-medium flex items-center justify-center gap-2 transition-colors min-w-[100px] ${
            activeTab === 'cards'
              ? 'bg-slate-800 text-yellow-400 border-b-2 border-yellow-500'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Copy className="w-4 h-4 transform rotate-90" />
          <span className="hidden sm:inline">Cartões</span>
        </button>
        <button
          onClick={() => setActiveTab('bets')}
          className={`flex-1 py-4 px-2 text-sm font-medium flex items-center justify-center gap-2 transition-colors min-w-[100px] ${
            activeTab === 'bets'
              ? 'bg-slate-800 text-purple-400 border-b-2 border-purple-500'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span className="hidden sm:inline">Palpites</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 min-h-[300px]">
        {activeTab === 'standings' && (
           <div className="animate-fade-in">
             <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-amber-400" />
                Situação na Competição
            </h3>

            {data.leagueStandings.isLeagueMatch ? (
               <div className="space-y-6">
                  <div className="text-center">
                     <span className="inline-block bg-slate-900 px-4 py-1 rounded-full text-xs font-bold text-slate-400 uppercase tracking-wider border border-slate-700">
                        {data.leagueStandings.leagueName} • {data.leagueStandings.matchContext}
                     </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:gap-8">
                      {/* Home Team Position */}
                      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center overflow-hidden group hover:border-emerald-500/30 transition-all">
                          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                          <span className="text-sm text-slate-400 uppercase tracking-wider mb-2 font-semibold">{data.nextMatch.homeTeam}</span>
                          <div className="flex items-baseline gap-1">
                              <span className="text-4xl md:text-5xl font-black text-white">{data.leagueStandings.homePosition}º</span>
                              <span className="text-sm text-slate-500">lugar</span>
                          </div>
                          <div className="mt-2 text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1 rounded-full text-sm">
                              {data.leagueStandings.homePoints || 'N/A'}
                          </div>
                      </div>

                       {/* Away Team Position */}
                      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center overflow-hidden group hover:border-blue-500/30 transition-all">
                          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                          <span className="text-sm text-slate-400 uppercase tracking-wider mb-2 font-semibold">{data.nextMatch.awayTeam}</span>
                           <div className="flex items-baseline gap-1">
                              <span className="text-4xl md:text-5xl font-black text-white">{data.leagueStandings.awayPosition}º</span>
                              <span className="text-sm text-slate-500">lugar</span>
                          </div>
                          <div className="mt-2 text-blue-400 font-bold bg-blue-400/10 px-3 py-1 rounded-full text-sm">
                              {data.leagueStandings.awayPoints || 'N/A'}
                          </div>
                      </div>
                  </div>

                  {/* League Table Grid */}
                  {data.leagueStandings.table && data.leagueStandings.table.length > 0 && (
                      <div className="rounded-xl border border-slate-700/50 bg-slate-900/20 overflow-hidden flex flex-col max-h-[600px]">
                        <div className="overflow-y-auto custom-scrollbar">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="bg-slate-900 text-slate-400 text-xs uppercase font-medium sticky top-0 z-10 shadow-md">
                                    <tr>
                                        <th className="px-4 py-3 text-center w-12 bg-slate-900">#</th>
                                        <th className="px-4 py-3 bg-slate-900">Time</th>
                                        <th className="px-4 py-3 text-center bg-slate-900">J</th>
                                        <th className="px-4 py-3 text-center bg-slate-900">SG</th>
                                        <th className="px-4 py-3 text-center font-bold text-white bg-slate-900">Pts</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {data.leagueStandings.table.map((row, idx) => {
                                        // Highlight logic: Check if row.teamName contains match team names
                                        const isHome = row.teamName.toLowerCase().includes(data.nextMatch.homeTeam.toLowerCase()) || data.nextMatch.homeTeam.toLowerCase().includes(row.teamName.toLowerCase());
                                        const isAway = row.teamName.toLowerCase().includes(data.nextMatch.awayTeam.toLowerCase()) || data.nextMatch.awayTeam.toLowerCase().includes(row.teamName.toLowerCase());
                                        const isHighlight = isHome || isAway;

                                        return (
                                            <tr key={idx} className={`${isHighlight ? 'bg-slate-700/50' : 'hover:bg-slate-800/30'} transition-colors`}>
                                                <td className="px-4 py-3 text-center font-mono text-slate-500">{row.position}</td>
                                                <td className="px-4 py-3 font-medium text-slate-300">
                                                    {row.teamName}
                                                    {isHome && <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">CASA</span>}
                                                    {isAway && <span className="ml-2 text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30">FORA</span>}
                                                </td>
                                                <td className="px-4 py-3 text-center text-slate-500">{row.gamesPlayed}</td>
                                                <td className="px-4 py-3 text-center text-slate-500">
                                                    {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                                                </td>
                                                <td className="px-4 py-3 text-center font-bold text-white">{row.points}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                      </div>
                  )}
               </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 bg-slate-900/50 border border-slate-800 rounded-xl border-dashed">
                  <Handshake className="w-16 h-16 text-slate-600 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Jogo Amistoso / Mata-Mata</h4>
                  <p className="text-slate-400 text-center max-w-md">
                    Esta partida não é válida por uma liga de pontos corridos ou a tabela não é o fator determinante (ex: Copas ou Amistosos).
                  </p>
                  <div className="mt-4 inline-block bg-slate-800 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium border border-slate-700">
                      {data.leagueStandings.matchContext || 'Partida Única'}
                  </div>
              </div>
            )}
           </div>
        )}

        {activeTab === 'goals' && (
          <div className="animate-fade-in">
             <Scenarios scenarios={data.scenarios} />
          </div>
        )}

        {activeTab === 'corners' && (
          <div className="animate-fade-in space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                <Flag className="w-5 h-5 text-blue-400" />
                Análise de Escanteios
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl text-center">
                    <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">{data.nextMatch.homeTeam} (Média)</span>
                    <span className="text-2xl font-bold text-white">{data.corners.homeAvg.toFixed(1)}</span>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl text-center">
                    <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">Total Esperado</span>
                    <span className="text-3xl font-bold text-blue-400">{data.corners.totalAvg.toFixed(1)}</span>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl text-center">
                    <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">{data.nextMatch.awayTeam} (Média)</span>
                    <span className="text-2xl font-bold text-white">{data.corners.awayAvg.toFixed(1)}</span>
                </div>
            </div>

            <div className="bg-blue-900/10 border border-blue-500/20 p-5 rounded-xl">
                <div className="flex items-start gap-3">
                    <RefreshCcw className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                        <h4 className="font-semibold text-blue-300 mb-1">Tendência & Previsão</h4>
                        <p className="text-slate-300 text-sm mb-2">{data.corners.trend}</p>
                        <div className="inline-block bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
                            {data.corners.prediction}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="animate-fade-in space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                <Copy className="w-5 h-5 text-yellow-400 transform rotate-90" />
                Análise Disciplinar
            </h3>

            <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center">
                    <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">{data.nextMatch.homeTeam}</span>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-4 bg-yellow-500 rounded-sm"></div>
                        <span className="text-xl font-bold text-white">{data.cards.homeYellowAvg.toFixed(1)}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1">média cartões</span>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center">
                    <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">{data.nextMatch.awayTeam}</span>
                    <div className="flex items-center gap-2">
                         <div className="w-3 h-4 bg-yellow-500 rounded-sm"></div>
                        <span className="text-xl font-bold text-white">{data.cards.awayYellowAvg.toFixed(1)}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1">média cartões</span>
                </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                    <span className="text-slate-400 text-xs uppercase tracking-wider">Árbitro</span>
                    <div className="text-white font-medium">{data.cards.refereeName}</div>
                </div>
                <div className="text-center md:text-right">
                    <span className="text-slate-400 text-xs uppercase tracking-wider">Média do Árbitro</span>
                    <div className="text-yellow-400 font-bold">{data.cards.refereeAvg > 0 ? data.cards.refereeAvg.toFixed(1) : 'N/A'} cartões/jogo</div>
                </div>
            </div>

             <div className="bg-yellow-900/10 border border-yellow-500/20 p-5 rounded-xl">
                <div className="flex items-start gap-3">
                    <Copy className="w-5 h-5 text-yellow-500 mt-1 transform rotate-90" />
                    <div>
                        <h4 className="font-semibold text-yellow-300 mb-1">Tendência & Previsão</h4>
                        <p className="text-slate-300 text-sm mb-2">{data.cards.trend}</p>
                         <div className="inline-block bg-yellow-500/20 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/30">
                            {data.cards.prediction}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'bets' && (
          <div className="animate-fade-in space-y-8">
            
            {/* Calculated Probabilities Grid */}
            <div>
               <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                Probabilidades Estimadas
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  {/* Over 1.0 (Moved Up) */}
                   <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col items-center text-center">
                      <span className="text-slate-400 text-xs font-bold uppercase mb-1">Over 1.0 Gol</span>
                      <span className="text-2xl font-bold text-emerald-400">{data.calculatedProbabilities.over10}</span>
                  </div>

                  {/* Over 1.5 */}
                  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col items-center text-center">
                      <span className="text-slate-400 text-xs font-bold uppercase mb-1">Over 1.5 Gols</span>
                      <span className="text-2xl font-bold text-emerald-400">{data.calculatedProbabilities.over15}</span>
                  </div>
                  
                  {/* Dynamic Double Chance (Best Option) */}
                  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col items-center text-center">
                      <span className="text-slate-400 text-xs font-bold uppercase mb-1">Melhor Dupla Chance</span>
                      <span className="text-slate-500 text-[10px] mb-1">
                          ({data.calculatedProbabilities.doubleChanceTeam || 'Casa/Fora'} ou Empate)
                      </span>
                      <span className="text-xl font-bold text-blue-400">{data.calculatedProbabilities.doubleChanceProbability}</span>
                  </div>
              </div>

               <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  
                  {/* Win Either Half */}
                  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col items-center text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-1">
                        <Clock className="w-3 h-3 text-purple-500" />
                      </div>
                      <span className="text-slate-400 text-xs font-bold uppercase mb-1">Vence 1 dos Tempos</span>
                      <span className="text-slate-500 text-[10px] mb-1">
                          ({data.calculatedProbabilities.winEitherHalfTeam || 'Favorito'})
                      </span>
                      <span className="text-xl font-bold text-purple-400">{data.calculatedProbabilities.winEitherHalf}</span>
                  </div>

                   <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col items-center text-center">
                      <span className="text-slate-400 text-xs font-bold uppercase mb-1">Dupla Chance 12</span>
                      <span className="text-slate-500 text-[10px] mb-1">(Sem Empate)</span>
                      <span className="text-xl font-bold text-blue-400">{data.calculatedProbabilities.doubleChance12}</span>
                  </div>

                  {/* Corners Prediction */}
                   <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col items-center text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-1">
                        <Flag className="w-3 h-3 text-yellow-500" />
                      </div>
                      <span className="text-slate-400 text-xs font-bold uppercase mb-1">Prob. Escanteios</span>
                      <span className="text-slate-500 text-[10px] mb-1">(Previsão)</span>
                      <span className="text-lg font-bold text-yellow-400">{data.calculatedProbabilities.totalCornersPrediction}</span>
                  </div>
               </div>
            </div>

            {/* Smart Suggestions */}
            <div>
               <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                3 Melhores Sugestões
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {data.bettingSuggestions?.map((suggestion, idx) => (
                  <div key={idx} className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-800 transition-colors">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                         <span className="bg-slate-700 text-slate-200 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                          {suggestion.market}
                         </span>
                         <span className={`text-xs font-bold px-2 py-1 rounded border ${getRiskColor(suggestion.riskLevel)}`}>
                          Risco {suggestion.riskLevel}
                         </span>
                      </div>
                      <div className="text-xl font-bold text-white mb-1">{suggestion.selection}</div>
                      <p className="text-slate-400 text-sm">{suggestion.reasoning}</p>
                    </div>
                    <div className="flex flex-col items-end min-w-[80px]">
                      <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">Confiança</span>
                      <span className="text-2xl font-bold text-emerald-400">{suggestion.probability}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Responsible Gambling Warning */}
            <div className="bg-gradient-to-r from-red-900/20 to-red-950/20 border border-red-500/20 p-6 rounded-xl flex gap-4">
              <AlertOctagon className="w-8 h-8 text-red-500 flex-shrink-0" />
              <div>
                <h4 className="text-red-400 font-bold text-lg mb-2">Aviso de Jogo Responsável</h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  Estas são apenas sugestões baseadas em estatísticas e <strong className="text-white">não garantem lucro</strong>. 
                  Futebol é imprevisível. 
                </p>
                <div className="flex items-center gap-2 text-red-300 text-sm font-medium bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/10 inline-block">
                  <Info className="w-4 h-4" />
                  "Aposte apenas o troco do pão. Nunca arrisque dinheiro que fará falta."
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisTabs;