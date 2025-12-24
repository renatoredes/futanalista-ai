import React from 'react';
import { Calendar, Trophy, Swords } from 'lucide-react';
import { AnalysisData } from '../types';

interface MatchHeaderProps {
  match: AnalysisData['nextMatch'];
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ match }) => {
  return (
    <div className="w-full bg-gradient-to-r from-emerald-900 to-slate-900 rounded-2xl p-6 shadow-lg border border-emerald-500/30 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
      
      <div className="flex flex-col items-center justify-center text-center relative z-10">
        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium uppercase tracking-wider mb-4">
          <Calendar className="w-4 h-4" />
          <span>Próxima Partida</span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full">
          {/* Home Team */}
          <div className="flex-1 text-center md:text-right">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{match.homeTeam}</h2>
          </div>

          {/* VS Badge */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-900/50 mb-2">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <div className="text-slate-400 text-xs font-mono bg-slate-800 px-2 py-1 rounded">
              VS
            </div>
          </div>

          {/* Away Team */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{match.awayTeam}</h2>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-slate-300 font-medium">{match.competition}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300 font-medium">{match.date}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MatchHeader;