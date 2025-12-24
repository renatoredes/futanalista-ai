import React from 'react';
import { AnalysisData } from '../types';
import { Sparkles } from 'lucide-react';

interface ConclusionProps {
  data: AnalysisData['conclusion'];
}

const ConclusionCard: React.FC<ConclusionProps> = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-xl">
      <div className="flex items-center gap-2 mb-4 text-purple-400">
        <Sparkles className="w-5 h-5" />
        <h3 className="text-lg font-bold uppercase tracking-wider">Conclusão da IA</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm text-slate-400 font-medium mb-1">Resumo Geral</h4>
          <p className="text-white text-lg leading-relaxed">{data.summary}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
            <div>
                <h4 className="text-sm text-slate-400 font-medium mb-1">Força Ofensiva</h4>
                <p className="text-emerald-300 font-semibold">{data.offensiveTeam}</p>
            </div>
            <div>
                <h4 className="text-sm text-slate-400 font-medium mb-1">Expectativa de Gols</h4>
                <p className="text-blue-300 font-semibold">{data.expectation}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ConclusionCard;