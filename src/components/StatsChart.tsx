import { TeamStats } from '@/types/football';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StatsChartProps {
  team1Stats: TeamStats;
  team2Stats: TeamStats;
}

export function StatsChart({ team1Stats, team2Stats }: StatsChartProps) {
  const data = [
    {
      name: 'Gols Marcados',
      [team1Stats.teamName]: team1Stats.avgGoalsScored,
      [team2Stats.teamName]: team2Stats.avgGoalsScored,
    },
    {
      name: 'Gols Sofridos',
      [team1Stats.teamName]: team1Stats.avgGoalsConceded,
      [team2Stats.teamName]: team2Stats.avgGoalsConceded,
    },
    {
      name: 'Escanteios',
      [team1Stats.teamName]: team1Stats.avgCorners,
      [team2Stats.teamName]: team2Stats.avgCorners,
    },
    {
      name: 'Cartões',
      [team1Stats.teamName]: team1Stats.avgCards,
      [team2Stats.teamName]: team2Stats.avgCards,
    },
  ];

  return (
    <div className="glass-card p-6 animate-fade-in-up opacity-0 animation-delay-200">
      <h3 className="text-lg font-bold text-foreground mb-6">Comparação de Médias</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              itemStyle={{ color: 'hsl(var(--muted-foreground))' }}
            />
            <Bar 
              dataKey={team1Stats.teamName} 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar 
              dataKey={team2Stats.teamName} 
              fill="hsl(var(--warning))" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary" />
          <span className="text-sm text-muted-foreground">{team1Stats.teamName}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-warning" />
          <span className="text-sm text-muted-foreground">{team2Stats.teamName}</span>
        </div>
      </div>
    </div>
  );
}
