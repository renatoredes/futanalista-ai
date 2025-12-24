import React, { useEffect, useState } from 'react';
import { Loader2, Search, BrainCircuit, Calculator, FileText } from 'lucide-react';

const steps = [
  { icon: Search, text: "Buscando dados recentes e notícias..." },
  { icon: BrainCircuit, text: "Analisando forma e estatísticas..." },
  { icon: Calculator, text: "Calculando probabilidades e cenários..." },
  { icon: FileText, text: "Gerando relatório final..." }
];

const LoadingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500); // Change step every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = steps[currentStep].icon;

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse"></div>
        <div className="relative bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-2xl">
          <ActiveIcon className="w-12 h-12 text-emerald-400 animate-bounce" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-slate-900 rounded-full p-2 border border-slate-700">
             <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-2 text-center">
        Analisando a Partida
      </h3>
      
      <div className="h-8 mb-6 overflow-hidden relative w-full max-w-md text-center">
          <p className="text-slate-400 animate-fade-in-up key={currentStep}">
            {steps[currentStep].text}
          </p>
      </div>

      {/* Progress Indicators */}
      <div className="flex gap-2">
        {steps.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx <= currentStep ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;