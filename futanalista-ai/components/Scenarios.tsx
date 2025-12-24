import React from 'react';
import { Scenario } from '../types';
import { AlertTriangle, TrendingUp, Shield, Percent } from 'lucide-react';

interface ScenariosProps {
  scenarios: Scenario[];
}

const Scenarios: React.FC<ScenariosProps> = ({ scenarios }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'high': return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'moderate': return <Shield className="w-5 h-5 text-blue-400" />;
      case 'conservative': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      default: return <Percent className="w-5 h-5" />;
    }
  };

  const getStyle = (type: string) => {
      switch (type) {
        case 'high': return 'border-emerald-500/30 bg-emerald-900/10 hover:bg-emerald-900/20';
        case 'moderate': return 'border-blue-500/30 bg-blue-900/10 hover:bg-blue-900/20';
        case 'conservative': return 'border-amber-500/30 bg-amber-900/10 hover:bg-amber-900/20';
        default: return 'border-slate-700';
      }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Percent className="w-5 h-5 text-purple-400" />
        Cenários Estatísticos
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map((scenario, idx) => (
          <div key={idx} className={`p-5 rounded-xl border transition-all duration-300 ${getStyle(scenario.type)}`}>
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-slate-900/50 rounded-lg">
                {getIcon(scenario.type)}
              </div>
              <span className="text-sm font-bold px-2 py-1 rounded bg-slate-900 text-slate-300">
                ~{scenario.probability}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">{scenario.title}</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {scenario.justification}
            </p>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 text-center mt-2 italic">
        * Probabilidades são baseadas em modelos estatísticos de desempenho histórico e não garantem resultados futuros.
      </p>
    </div>
  );
};

export default Scenarios;