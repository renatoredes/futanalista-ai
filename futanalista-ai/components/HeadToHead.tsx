import React from 'react';
import { AnalysisData } from '../types';
import { Swords, Trophy, Calendar, ShieldAlert } from 'lucide-react';

interface HeadToHeadProps {
  data: AnalysisData['headToHead'];
  homeTeamName: string;
  awayTeamName: string;
}

const HeadToHead: React.FC<HeadToHeadProps> = ({ data, homeTeamName, awayTeamName }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-slate-700/50 p-2 rounded-lg">
           <Swords className="w-6 h-6 text-white" />
        </div>
        <div>
            <h3 className="text-lg font-bold text-white">Confrontos Diretos (H2H)</h3>
            <p className="text-xs text-slate-400">Histórico recente entre as equipes</p>
        </div>
      </div>

      {/* Matches Table */}
      <div className="overflow-hidden rounded-lg border border-slate-700/50 mb-6">
        <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-900/80 text-slate-300 uppercase font-medium text-xs">
                <tr>
                    <th className="px-4 py-3 hidden sm:table-cell">Data / Competição</th>
                    <th className="px-4 py-3 text-center">Confronto</th>
                    <th className="px-4 py-3 text-center">Placar</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/30">
                {data.matches.map((match, i) => {
                    // Determine names based on context (assuming main team analyzed matches against specific opponent)
                    // If the API returns 'homeOrAway', we can map it precisely.
                    // Fallback logic: 
                    // If match.homeOrAway is 'home', then Main Team (from context) was Home.
                    // Since we don't have direct main team ref in just this match object, 
                    // we usually infer from the parent data passed to this component.
                    
                    // Display Logic: Try to parse Home x Away
                    const isMainTeamHome = match.homeOrAway === 'home';
                    
                    // Simple logic: We don't know exactly which team is "main" here without prop context 
                    // if both teams are passed.
                    // However, typically the analysis is centered on 'homeTeamName' vs 'awayTeamName' of the NEXT match.
                    
                    // Let's assume the H2H list provided by Gemini is accurate in formatting.
                    // To improve UX, we will list the specific string provided or construct it.
                    
                    // Construct visual label:
                    // If result was Home Win, bold the left. If Away Win, bold right.
                    const homeName = isMainTeamHome ? homeTeamName : match.opponent;
                    const awayName = isMainTeamHome ? match.opponent : homeTeamName;

                    return (
                        <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                            <td className="px-4 py-3 hidden sm:table-cell">
                                <div className="flex flex-col">
                                    <span className="text-white font-medium">{match.date}</span>
                                    <span className="text-xs text-slate-500">{match.competition}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center justify-center gap-2 md:gap-4">
                                    <span className={`text-right flex-1 ${match.result === 'Vitória' && isMainTeamHome ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>
                                        {homeName}
                                    </span>
                                    <span className="text-xs text-slate-600 font-mono">vs</span>
                                    <span className={`text-left flex-1 ${match.result === 'Derrota' && isMainTeamHome ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>
                                        {awayName}
                                    </span>
                                </div>
                                {/* Mobile Date fallback */}
                                <div className="sm:hidden text-center mt-1 text-[10px] text-slate-500">
                                    {match.date} • {match.competition}
                                </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                                <span className="inline-block bg-slate-800 text-white px-3 py-1 rounded-md font-mono font-bold border border-slate-700">
                                    {match.score}
                                </span>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
      </div>

      {/* Summary / Advantage Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-slate-800 p-4 rounded-lg border border-slate-700/50 flex gap-3">
            <ShieldAlert className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
            <div>
                <span className="block text-xs text-slate-500 uppercase font-bold mb-1">Análise de Vantagem</span>
                <p className="text-sm text-slate-200 leading-relaxed">
                    {data.historicalAdvantage}
                </p>
            </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700/50 text-center flex flex-col justify-center">
             <span className="block text-xs text-slate-500 uppercase font-bold mb-1">Média de Gols (Confronto)</span>
             <div className="flex items-center justify-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-2xl font-bold text-white">{data.avgGoals.toFixed(1)}</span>
             </div>
        </div>
      </div>
    </div>
  );
};

export default HeadToHead;