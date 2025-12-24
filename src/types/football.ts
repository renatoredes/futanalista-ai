export interface Match {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeCorners: number;
  awayCorners: number;
  homeYellowCards: number;
  awayYellowCards: number;
  homeRedCards: number;
  awayRedCards: number;
  isHome: boolean;
}

export interface TeamStats {
  teamName: string;
  matches: Match[];
  totalGoalsScored: number;
  totalGoalsConceded: number;
  avgGoalsScored: number;
  avgGoalsConceded: number;
  totalCorners: number;
  avgCorners: number;
  totalYellowCards: number;
  totalRedCards: number;
  avgCards: number;
  wins: number;
  draws: number;
  losses: number;
}

export interface HeadToHead {
  matches: Match[];
  team1Wins: number;
  team2Wins: number;
  draws: number;
  avgGoals: number;
  avgCorners: number;
}

export interface BetRecommendation {
  type: string;
  recommendation: string;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
  value: number;
}

export interface AnalysisResult {
  team1Stats: TeamStats;
  team2Stats: TeamStats;
  headToHead: HeadToHead;
  recommendations: BetRecommendation[];
}
