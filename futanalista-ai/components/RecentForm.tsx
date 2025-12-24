import React from 'react';
import { TeamStats } from '../types';
import { CheckCircle, XCircle, MinusCircle, TrendingUp, TrendingDown, Activity, Shield } from 'lucide-react';

interface RecentFormProps {
  stats: TeamStats;
  isOpponent?: boolean;
}

const RecentForm: React.FC<RecentFormProps> = ({ stats, isOpponent = false }) => {
  const getResultIcon = (result: string) => {
    switch (result) {
      case 'Vitória': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'Derrota': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <MinusCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
        case 'Vitória': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
        case 'Derrota': return 'bg-red-500/10 border-red-500/20 text-red-400';
        default: return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
    }
  }

  return (
    <div className={`bg-slate-800/50 border border-slate-700 rounded-xl p-6 h-full flex flex-col ${isOpponent ? 'md:order-2' : 'md:order-1'}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
            {isOpponent ? <TrendingDown className="text-rose-400" /> : <TrendingUp className="text-emerald-400" />}
            {stats.teamName}
        </h3>
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Últimos 5 Jogos</span>
      </div>

      <div className="space-y-3 mb-6 flex-grow">
        {stats.recentMatches.map((match, idx) => {
          // Logic to format "Home x Away"
          const isHome = match.homeOrAway === 'home';
          const matchLabel = isHome 
            ? `${stats.teamName} x ${match.opponent}` 
            : `${match.opponent} x ${stats.teamName}`;

          return (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3 overflow-hidden">
                {getResultIcon(match.result)}
                <div className="flex items-center gap-2 min-w-0">
                  <Shield className="w-3 h-3 text-slate-500 flex-shrink-0" />
                  <span className="text-slate-300 font-medium text-sm truncate" title={matchLabel}>
                    {matchLabel}
                  </span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-sm font-bold font-mono whitespace-nowrap ml-2 ${getResultColor(match.result)}`}>
                {match.score}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-center">
            <span className="block text-slate-400 text-xs mb-1">Média Gols Pró</span>
            <span className="text-2xl font-bold text-emerald-400">{stats.avgGoalsScored.toFixed(1)}</span>
        </div>
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-center">
            <span className="block text-slate-400 text-xs mb-1">Média Gols Sofridos</span>
            <span className="text-2xl font-bold text-red-400">{stats.avgGoalsConceded.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex gap-2 items-start">
            <Activity className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
            <p className="text-sm text-slate-300 leading-relaxed">
                <span className="text-blue-400 font-semibold">Análise:</span> {stats.offensiveTrend} {stats.defensiveTrend}
            </p>
        </div>
      </div>
    </div>
  );
};

export default RecentForm;