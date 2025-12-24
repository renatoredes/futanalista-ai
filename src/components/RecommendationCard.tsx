import { BetRecommendation } from '@/types/football';
import { CheckCircle2, AlertCircle, HelpCircle, TrendingUp } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: BetRecommendation;
  index: number;
}

export function RecommendationCard({ recommendation, index }: RecommendationCardProps) {
  const confidenceConfig = {
    high: {
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/30',
      label: 'Alta',
      barWidth: 'w-full',
    },
    medium: {
      icon: AlertCircle,
      color: 'text-warning',
      bg: 'bg-warning/10',
      border: 'border-warning/30',
      label: 'Média',
      barWidth: 'w-2/3',
    },
    low: {
      icon: HelpCircle,
      color: 'text-muted-foreground',
      bg: 'bg-muted/30',
      border: 'border-muted',
      label: 'Baixa',
      barWidth: 'w-1/3',
    },
  };

  const config = confidenceConfig[recommendation.confidence];
  const Icon = config.icon;

  return (
    <div 
      className={`glass-card p-5 border ${config.border} hover:border-primary/50 transition-all duration-300 animate-fade-in-up opacity-0`}
      style={{ animationDelay: `${(index + 1) * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {recommendation.type}
          </span>
          <h4 className="text-lg font-bold text-foreground mt-1">
            {recommendation.recommendation}
          </h4>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bg}`}>
          <Icon className={`h-4 w-4 ${config.color}`} />
          <span className={`text-xs font-semibold ${config.color}`}>{config.label}</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {recommendation.reasoning}
      </p>

      {/* Confidence Bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Confiança</span>
        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className={`h-full ${config.barWidth} ${
              recommendation.confidence === 'high' 
                ? 'bg-gradient-to-r from-success to-emerald-400' 
                : recommendation.confidence === 'medium'
                ? 'bg-gradient-to-r from-warning to-amber-400'
                : 'bg-muted-foreground'
            } rounded-full transition-all duration-500`}
          />
        </div>
      </div>
    </div>
  );
}
