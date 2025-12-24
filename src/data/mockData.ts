import { Match, TeamStats, HeadToHead, BetRecommendation, AnalysisResult } from '@/types/football';

const arsenalMatches: Match[] = [
  {
    id: '1',
    date: '2024-12-21',
    homeTeam: 'Arsenal',
    awayTeam: 'Crystal Palace',
    homeScore: 3,
    awayScore: 1,
    homeCorners: 7,
    awayCorners: 4,
    homeYellowCards: 2,
    awayYellowCards: 3,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: true,
  },
  {
    id: '2',
    date: '2024-12-14',
    homeTeam: 'Everton',
    awayTeam: 'Arsenal',
    homeScore: 0,
    awayScore: 2,
    homeCorners: 3,
    awayCorners: 8,
    homeYellowCards: 4,
    awayYellowCards: 1,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: false,
  },
  {
    id: '3',
    date: '2024-12-07',
    homeTeam: 'Arsenal',
    awayTeam: 'Monaco',
    homeScore: 3,
    awayScore: 0,
    homeCorners: 9,
    awayCorners: 2,
    homeYellowCards: 1,
    awayYellowCards: 2,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: true,
  },
  {
    id: '4',
    date: '2024-12-01',
    homeTeam: 'Arsenal',
    awayTeam: 'Man United',
    homeScore: 2,
    awayScore: 0,
    homeCorners: 6,
    awayCorners: 3,
    homeYellowCards: 2,
    awayYellowCards: 4,
    homeRedCards: 0,
    awayRedCards: 1,
    isHome: true,
  },
  {
    id: '5',
    date: '2024-11-23',
    homeTeam: 'West Ham',
    awayTeam: 'Arsenal',
    homeScore: 2,
    awayScore: 5,
    homeCorners: 4,
    awayCorners: 7,
    homeYellowCards: 3,
    awayYellowCards: 2,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: false,
  },
];

const crystalPalaceMatches: Match[] = [
  {
    id: '6',
    date: '2024-12-21',
    homeTeam: 'Arsenal',
    awayTeam: 'Crystal Palace',
    homeScore: 3,
    awayScore: 1,
    homeCorners: 7,
    awayCorners: 4,
    homeYellowCards: 2,
    awayYellowCards: 3,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: false,
  },
  {
    id: '7',
    date: '2024-12-15',
    homeTeam: 'Crystal Palace',
    awayTeam: 'Brighton',
    homeScore: 1,
    awayScore: 1,
    homeCorners: 5,
    awayCorners: 6,
    homeYellowCards: 2,
    awayYellowCards: 2,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: true,
  },
  {
    id: '8',
    date: '2024-12-08',
    homeTeam: 'Man City',
    awayTeam: 'Crystal Palace',
    homeScore: 2,
    awayScore: 2,
    homeCorners: 8,
    awayCorners: 3,
    homeYellowCards: 1,
    awayYellowCards: 3,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: false,
  },
  {
    id: '9',
    date: '2024-12-01',
    homeTeam: 'Crystal Palace',
    awayTeam: 'Newcastle',
    homeScore: 0,
    awayScore: 1,
    homeCorners: 4,
    awayCorners: 5,
    homeYellowCards: 3,
    awayYellowCards: 2,
    homeRedCards: 1,
    awayRedCards: 0,
    isHome: true,
  },
  {
    id: '10',
    date: '2024-11-24',
    homeTeam: 'Aston Villa',
    awayTeam: 'Crystal Palace',
    homeScore: 2,
    awayScore: 1,
    homeCorners: 6,
    awayCorners: 4,
    homeYellowCards: 2,
    awayYellowCards: 4,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: false,
  },
];

export function calculateTeamStats(teamName: string, matches: Match[]): TeamStats {
  const totalGoalsScored = matches.reduce((acc, m) => {
    return acc + (m.isHome ? m.homeScore : m.awayScore);
  }, 0);

  const totalGoalsConceded = matches.reduce((acc, m) => {
    return acc + (m.isHome ? m.awayScore : m.homeScore);
  }, 0);

  const totalCorners = matches.reduce((acc, m) => {
    return acc + (m.isHome ? m.homeCorners : m.awayCorners);
  }, 0);

  const totalYellowCards = matches.reduce((acc, m) => {
    return acc + (m.isHome ? m.homeYellowCards : m.awayYellowCards);
  }, 0);

  const totalRedCards = matches.reduce((acc, m) => {
    return acc + (m.isHome ? m.homeRedCards : m.awayRedCards);
  }, 0);

  const wins = matches.filter(m => {
    const scored = m.isHome ? m.homeScore : m.awayScore;
    const conceded = m.isHome ? m.awayScore : m.homeScore;
    return scored > conceded;
  }).length;

  const draws = matches.filter(m => m.homeScore === m.awayScore).length;
  const losses = matches.length - wins - draws;

  return {
    teamName,
    matches,
    totalGoalsScored,
    totalGoalsConceded,
    avgGoalsScored: totalGoalsScored / matches.length,
    avgGoalsConceded: totalGoalsConceded / matches.length,
    totalCorners,
    avgCorners: totalCorners / matches.length,
    totalYellowCards,
    totalRedCards,
    avgCards: (totalYellowCards + totalRedCards) / matches.length,
    wins,
    draws,
    losses,
  };
}

export function generateRecommendations(
  team1Stats: TeamStats,
  team2Stats: TeamStats
): BetRecommendation[] {
  const recommendations: BetRecommendation[] = [];

  // Expected goals calculation
  const expectedGoals = (team1Stats.avgGoalsScored + team2Stats.avgGoalsScored + 
    team1Stats.avgGoalsConceded + team2Stats.avgGoalsConceded) / 2;

  // Over 1 Goal Analysis
  const over1Prob = expectedGoals >= 1.5;
  recommendations.push({
    type: 'Over 1 Gol',
    recommendation: over1Prob ? 'Over 0.5 Gols ✓' : 'Under 0.5 Gols',
    confidence: expectedGoals >= 2 ? 'high' : expectedGoals >= 1.2 ? 'medium' : 'low',
    reasoning: `Média de ${expectedGoals.toFixed(1)} gols/jogo. ${team1Stats.teamName}: ${team1Stats.avgGoalsScored.toFixed(1)} marcados, ${team2Stats.teamName}: ${team2Stats.avgGoalsScored.toFixed(1)} marcados.`,
    value: expectedGoals,
  });

  // Over 1.5 Goals Analysis
  const over15Prob = expectedGoals >= 2;
  recommendations.push({
    type: 'Over 1.5 Gols',
    recommendation: over15Prob ? 'Over 1.5 Gols ✓' : 'Under 1.5 Gols',
    confidence: expectedGoals >= 2.5 ? 'high' : expectedGoals >= 1.8 ? 'medium' : 'low',
    reasoning: `Expectativa de ${expectedGoals.toFixed(1)} gols. Jogos com mais de 1.5 gols são ${over15Prob ? 'prováveis' : 'menos prováveis'}.`,
    value: expectedGoals,
  });

  // Over 2.5 Goals Analysis
  const over25Prob = expectedGoals >= 2.5;
  recommendations.push({
    type: 'Over 2.5 Gols',
    recommendation: over25Prob ? 'Over 2.5 Gols ✓' : 'Under 2.5 Gols',
    confidence: expectedGoals >= 3 ? 'high' : expectedGoals >= 2.3 ? 'medium' : 'low',
    reasoning: `${team1Stats.teamName} marca ${team1Stats.avgGoalsScored.toFixed(1)} e sofre ${team1Stats.avgGoalsConceded.toFixed(1)}. ${team2Stats.teamName} marca ${team2Stats.avgGoalsScored.toFixed(1)} e sofre ${team2Stats.avgGoalsConceded.toFixed(1)}.`,
    value: expectedGoals,
  });

  // Cards Statistics
  const avgTotalCards = team1Stats.avgCards + team2Stats.avgCards;
  const team1TotalCards = team1Stats.totalYellowCards + team1Stats.totalRedCards;
  const team2TotalCards = team2Stats.totalYellowCards + team2Stats.totalRedCards;
  
  // Calculate min and max cards from matches
  const team1CardsByMatch = team1Stats.matches.map(m => 
    (m.isHome ? m.homeYellowCards + m.homeRedCards : m.awayYellowCards + m.awayRedCards)
  );
  const team2CardsByMatch = team2Stats.matches.map(m => 
    (m.isHome ? m.homeYellowCards + m.homeRedCards : m.awayYellowCards + m.awayRedCards)
  );
  
  const allCardsPerMatch = team1Stats.matches.map((m, i) => {
    const t1Cards = m.isHome ? m.homeYellowCards + m.homeRedCards : m.awayYellowCards + m.awayRedCards;
    const t2Cards = team2Stats.matches[i] ? 
      (team2Stats.matches[i].isHome ? team2Stats.matches[i].homeYellowCards + team2Stats.matches[i].homeRedCards : 
       team2Stats.matches[i].awayYellowCards + team2Stats.matches[i].awayRedCards) : 0;
    return t1Cards + t2Cards;
  });

  const minCards = Math.min(...team1CardsByMatch) + Math.min(...team2CardsByMatch);
  const maxCards = Math.max(...team1CardsByMatch) + Math.max(...team2CardsByMatch);

  // Both Teams Receive Cards Analysis
  const team1AlwaysGetCards = team1CardsByMatch.every(c => c >= 1);
  const team2AlwaysGetCards = team2CardsByMatch.every(c => c >= 1);
  const team1CardPercentage = (team1CardsByMatch.filter(c => c >= 1).length / team1CardsByMatch.length) * 100;
  const team2CardPercentage = (team2CardsByMatch.filter(c => c >= 1).length / team2CardsByMatch.length) * 100;
  const bothTeamsCardProb = (team1CardPercentage + team2CardPercentage) / 2;

  recommendations.push({
    type: 'Ambas Recebem Cartão',
    recommendation: bothTeamsCardProb >= 80 ? 'Sim - Ambas Recebem ✓' : bothTeamsCardProb >= 60 ? 'Provável' : 'Improvável',
    confidence: bothTeamsCardProb >= 90 ? 'high' : bothTeamsCardProb >= 70 ? 'medium' : 'low',
    reasoning: `${team1Stats.teamName} recebe cartão em ${team1CardPercentage.toFixed(0)}% dos jogos. ${team2Stats.teamName} recebe em ${team2CardPercentage.toFixed(0)}% dos jogos.`,
    value: bothTeamsCardProb,
  });

  // Min/Max Cards Analysis
  recommendations.push({
    type: 'Cartões - Mínimo/Máximo',
    recommendation: `Min: ${minCards} | Max: ${maxCards}`,
    confidence: 'medium',
    reasoning: `Média combinada: ${avgTotalCards.toFixed(1)} cartões/jogo. ${team1Stats.teamName}: ${team1Stats.avgCards.toFixed(1)} | ${team2Stats.teamName}: ${team2Stats.avgCards.toFixed(1)}`,
    value: avgTotalCards,
  });

  // Total Cards Over/Under
  recommendations.push({
    type: 'Total de Cartões',
    recommendation: avgTotalCards >= 5 ? 'Over 4.5 Cartões ✓' : 'Under 4.5 Cartões',
    confidence: avgTotalCards >= 6 ? 'high' : avgTotalCards >= 4.5 ? 'medium' : 'low',
    reasoning: `Média de ${avgTotalCards.toFixed(1)} cartões por jogo. Faixa esperada: ${minCards}-${maxCards} cartões.`,
    value: avgTotalCards,
  });

  // Corners analysis
  const avgTotalCorners = team1Stats.avgCorners + team2Stats.avgCorners;
  recommendations.push({
    type: 'Escanteios',
    recommendation: avgTotalCorners >= 9 ? 'Over 9.5 Escanteios ✓' : 'Under 9.5 Escanteios',
    confidence: avgTotalCorners >= 11 ? 'high' : avgTotalCorners >= 8 ? 'medium' : 'low',
    reasoning: `Média combinada de ${avgTotalCorners.toFixed(1)} escanteios. ${team1Stats.teamName}: ${team1Stats.avgCorners.toFixed(1)} | ${team2Stats.teamName}: ${team2Stats.avgCorners.toFixed(1)}`,
    value: avgTotalCorners,
  });

  // BTTS (Both Teams To Score)
  const team1ScoresOften = team1Stats.avgGoalsScored >= 1;
  const team2ScoresOften = team2Stats.avgGoalsScored >= 0.8;
  const team1ConcedesOften = team1Stats.avgGoalsConceded >= 0.6;
  const team2ConcedesOften = team2Stats.avgGoalsConceded >= 0.8;
  const bttsLikely = team1ScoresOften && team2ScoresOften && team1ConcedesOften && team2ConcedesOften;

  recommendations.push({
    type: 'Ambas Marcam (BTTS)',
    recommendation: bttsLikely ? 'Sim - Ambas Marcam ✓' : 'Não - Ambas Marcam',
    confidence: bttsLikely && (team1Stats.avgGoalsScored >= 1.5 || team2Stats.avgGoalsScored >= 1.2) ? 'high' : bttsLikely ? 'medium' : 'low',
    reasoning: `${team1Stats.teamName}: marca ${team1Stats.avgGoalsScored.toFixed(1)}, sofre ${team1Stats.avgGoalsConceded.toFixed(1)}. ${team2Stats.teamName}: marca ${team2Stats.avgGoalsScored.toFixed(1)}, sofre ${team2Stats.avgGoalsConceded.toFixed(1)}.`,
    value: (team1Stats.avgGoalsScored + team2Stats.avgGoalsScored) / 2,
  });

  return recommendations;
}

// Map of teams and their upcoming/recent opponents
const teamOpponents: Record<string, string> = {
  'Arsenal': 'Crystal Palace',
  'Crystal Palace': 'Arsenal',
  'Manchester United': 'Liverpool',
  'Liverpool': 'Manchester United',
  'Chelsea': 'Tottenham',
  'Tottenham': 'Chelsea',
  'Manchester City': 'Aston Villa',
  'Aston Villa': 'Manchester City',
  'Newcastle': 'Brighton',
  'Brighton': 'Newcastle',
  'West Ham': 'Everton',
  'Everton': 'West Ham',
  'Fulham': 'Brentford',
  'Brentford': 'Fulham',
  'Wolves': 'Bournemouth',
  'Bournemouth': 'Wolves',
  'Nottingham Forest': 'Leicester',
  'Leicester': 'Nottingham Forest',
  'Southampton': 'Ipswich',
  'Ipswich': 'Southampton',
};

export function getOpponent(teamName: string): string | null {
  const normalizedName = Object.keys(teamOpponents).find(
    key => key.toLowerCase() === teamName.toLowerCase()
  );
  return normalizedName ? teamOpponents[normalizedName] : null;
}

export function getMockAnalysis(team1: string, team2: string): AnalysisResult {
  // Use mock data for demo
  const team1Stats = calculateTeamStats(team1 || 'Arsenal', arsenalMatches);
  const team2Stats = calculateTeamStats(team2 || 'Crystal Palace', crystalPalaceMatches);

  const headToHead: HeadToHead = {
    matches: [arsenalMatches[0]], // The direct match
    team1Wins: 1,
    team2Wins: 0,
    draws: 0,
    avgGoals: 4,
    avgCorners: 11,
  };

  const recommendations = generateRecommendations(team1Stats, team2Stats);

  return {
    team1Stats: { ...team1Stats, teamName: team1 || 'Arsenal' },
    team2Stats: { ...team2Stats, teamName: team2 || 'Crystal Palace' },
    headToHead,
    recommendations,
  };
}
