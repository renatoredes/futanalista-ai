export interface MatchResult {
  opponent: string;
  score: string;
  result: 'Vitória' | 'Empate' | 'Derrota';
  goalsScored: number;
  goalsConceded: number;
  date?: string;
  competition?: string;
  homeOrAway: 'home' | 'away'; // New field to identify venue
}

export interface TeamStats {
  teamName: string;
  recentMatches: MatchResult[];
  avgGoalsScored: number;
  avgGoalsConceded: number;
  offensiveTrend: string;
  defensiveTrend: string;
}

export interface Scenario {
  title: string;
  probability: string;
  justification: string;
  type: 'high' | 'moderate' | 'conservative';
}

export interface CornerAnalysis {
  homeAvg: number;
  awayAvg: number;
  totalAvg: number;
  trend: string;
  prediction: string;
}

export interface CardAnalysis {
  homeYellowAvg: number;
  awayYellowAvg: number;
  refereeName: string;
  refereeAvg: number;
  trend: string;
  prediction: string;
}

export interface BettingSuggestion {
  market: string;
  selection: string;
  probability: string;
  reasoning: string;
  riskLevel: 'Baixo' | 'Médio' | 'Alto';
}

export interface CalculatedProbabilities {
  over10: string;
  over15: string;
  // Dynamic Double Chance fields
  doubleChanceProbability: string; // The % for the most likely double chance (1X or X2)
  doubleChanceTeam: string; // The team name for the double chance (e.g. "Arsenal" in "Arsenal or Draw")
  doubleChance12: string;
  winEitherHalf: string; 
  winEitherHalfTeam: string;
  totalCornersPrediction: string;
}

export interface StandingEntry {
  position: number;
  teamName: string;
  points: number;
  gamesPlayed: number;
  goalDifference: number;
}

export interface LeagueStandings {
  isLeagueMatch: boolean; // True for leagues/groups, False for Friendlies/Cups without table
  leagueName: string;
  homePosition?: number;
  awayPosition?: number;
  homePoints?: string; // String to allow "15 pts" or similar
  awayPoints?: string;
  matchContext: string; // "Rodada 10", "Amistoso Internacional", "Final", etc.
  table: StandingEntry[]; // New field for the standings grid
}

export interface AnalysisData {
  nextMatch: {
    homeTeam: string;
    awayTeam: string;
    date: string;
    competition: string;
  };
  leagueStandings: LeagueStandings; // New field
  mainTeamAnalysis: TeamStats;
  opponentTeamAnalysis: TeamStats;
  headToHead: {
    matches: MatchResult[];
    historicalAdvantage: string;
    avgGoals: number;
  };
  scenarios: Scenario[];
  corners: CornerAnalysis;
  cards: CardAnalysis;
  calculatedProbabilities: CalculatedProbabilities;
  bettingSuggestions: BettingSuggestion[];
  conclusion: {
    summary: string;
    offensiveTeam: string;
    expectation: string;
  };
  sources?: { uri: string; title: string }[];
}