import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisData } from "../types";

// Cache Configuration
const CACHE_PREFIX = 'futanalista_cache_';
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

interface CacheEntry {
  timestamp: number;
  data: AnalysisData;
}

// Define the expected JSON Schema for the response to include in the prompt
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    nextMatch: {
      type: Type.OBJECT,
      properties: {
        homeTeam: { type: Type.STRING, description: "Name of the home team" },
        awayTeam: { type: Type.STRING, description: "Name of the away team" },
        date: { type: Type.STRING, description: "Date and time of the match" },
        competition: { type: Type.STRING, description: "League or Cup name" },
      },
      required: ["homeTeam", "awayTeam", "date", "competition"],
    },
    leagueStandings: {
      type: Type.OBJECT,
      properties: {
        isLeagueMatch: { type: Type.BOOLEAN, description: "True if it is a championship with a table/ranking. False if Friendly or pure Knockout." },
        leagueName: { type: Type.STRING, description: "Name of the competition" },
        homePosition: { type: Type.INTEGER, description: "Current position (rank) of home team. 0 if not applicable." },
        awayPosition: { type: Type.INTEGER, description: "Current position (rank) of away team. 0 if not applicable." },
        homePoints: { type: Type.STRING, description: "Current points (e.g., '45 pts')" },
        awayPoints: { type: Type.STRING, description: "Current points (e.g., '42 pts')" },
        matchContext: { type: Type.STRING, description: "Context like 'Round 25', 'Friendly', 'Final', 'Group Stage'" },
        table: {
            type: Type.ARRAY,
            description: "The FULL standings table. Must include ALL teams in the league (e.g. 20 teams for Premier League/Brasileirão).",
            items: {
                type: Type.OBJECT,
                properties: {
                    position: { type: Type.INTEGER },
                    teamName: { type: Type.STRING },
                    points: { type: Type.NUMBER },
                    gamesPlayed: { type: Type.INTEGER },
                    goalDifference: { type: Type.INTEGER }
                },
                required: ["position", "teamName", "points", "gamesPlayed"]
            }
        }
      },
      required: ["isLeagueMatch", "leagueName", "matchContext", "table"]
    },
    mainTeamAnalysis: {
      type: Type.OBJECT,
      properties: {
        teamName: { type: Type.STRING },
        recentMatches: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              opponent: { type: Type.STRING },
              score: { type: Type.STRING },
              result: { type: Type.STRING, enum: ["Vitória", "Empate", "Derrota"] },
              goalsScored: { type: Type.NUMBER },
              goalsConceded: { type: Type.NUMBER },
              homeOrAway: { type: Type.STRING, enum: ["home", "away"], description: "Whether the main team played at home or away" },
            },
            required: ["opponent", "score", "result", "goalsScored", "goalsConceded", "homeOrAway"]
          },
        },
        avgGoalsScored: { type: Type.NUMBER },
        avgGoalsConceded: { type: Type.NUMBER },
        offensiveTrend: { type: Type.STRING },
        defensiveTrend: { type: Type.STRING },
      },
      required: ["teamName", "recentMatches", "avgGoalsScored", "avgGoalsConceded", "offensiveTrend", "defensiveTrend"],
    },
    opponentTeamAnalysis: {
      type: Type.OBJECT,
      properties: {
        teamName: { type: Type.STRING },
        recentMatches: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              opponent: { type: Type.STRING },
              score: { type: Type.STRING },
              result: { type: Type.STRING, enum: ["Vitória", "Empate", "Derrota"] },
              goalsScored: { type: Type.NUMBER },
              goalsConceded: { type: Type.NUMBER },
              homeOrAway: { type: Type.STRING, enum: ["home", "away"], description: "Whether the analyzed team played at home or away" },
            },
            required: ["opponent", "score", "result", "goalsScored", "goalsConceded", "homeOrAway"]
          },
        },
        avgGoalsScored: { type: Type.NUMBER },
        avgGoalsConceded: { type: Type.NUMBER },
        offensiveTrend: { type: Type.STRING },
        defensiveTrend: { type: Type.STRING },
      },
      required: ["teamName", "recentMatches", "avgGoalsScored", "avgGoalsConceded", "offensiveTrend", "defensiveTrend"],
    },
    headToHead: {
      type: Type.OBJECT,
      properties: {
        matches: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              date: { type: Type.STRING },
              competition: { type: Type.STRING },
              score: { type: Type.STRING },
              opponent: { type: Type.STRING, description: "Just for schema validity, can be ignored" },
              result: { type: Type.STRING, enum: ["Vitória", "Empate", "Derrota"] },
              goalsScored: { type: Type.NUMBER },
              goalsConceded: { type: Type.NUMBER },
              homeOrAway: { type: Type.STRING, enum: ["home", "away"] },
            },
          },
        },
        historicalAdvantage: { type: Type.STRING },
        avgGoals: { type: Type.NUMBER },
      },
      required: ["matches", "historicalAdvantage", "avgGoals"],
    },
    scenarios: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          probability: { type: Type.STRING },
          justification: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["high", "moderate", "conservative"] },
        },
      },
    },
    corners: {
      type: Type.OBJECT,
      properties: {
        homeAvg: { type: Type.NUMBER, description: "Average corners per match for home team" },
        awayAvg: { type: Type.NUMBER, description: "Average corners per match for away team" },
        totalAvg: { type: Type.NUMBER, description: "Combined average or match expectation" },
        trend: { type: Type.STRING, description: "Short description of corner trend (e.g. 'High frequency')" },
        prediction: { type: Type.STRING, description: "Prediction line (e.g. 'Over 9.5 Corners')" },
      },
      required: ["homeAvg", "awayAvg", "totalAvg", "trend", "prediction"],
    },
    cards: {
      type: Type.OBJECT,
      properties: {
        homeYellowAvg: { type: Type.NUMBER, description: "Avg yellow cards for home team" },
        awayYellowAvg: { type: Type.NUMBER, description: "Avg yellow cards for away team" },
        refereeName: { type: Type.STRING, description: "Name of referee if known, or 'A definir'" },
        refereeAvg: { type: Type.NUMBER, description: "Average cards per game for this referee or league average" },
        trend: { type: Type.STRING, description: "Trend description (e.g. 'Aggressive match')" },
        prediction: { type: Type.STRING, description: "Prediction line (e.g. 'Over 4.5 Cards')" },
      },
      required: ["homeYellowAvg", "awayYellowAvg", "refereeName", "refereeAvg", "trend", "prediction"],
    },
    calculatedProbabilities: {
      type: Type.OBJECT,
      properties: {
        over10: { type: Type.STRING, description: "Probability percentage for Over 1.0 Goals" },
        over15: { type: Type.STRING, description: "Probability percentage for Over 1.5 Goals" },
        
        doubleChanceProbability: { type: Type.STRING, description: "Probability for the BEST Double Chance option (1X or X2)" },
        doubleChanceTeam: { type: Type.STRING, description: "Name of the team favored in Double Chance (e.g. 'Arsenal' for Arsenal or Draw)" },
        
        doubleChance12: { type: Type.STRING, description: "Probability percentage for Home Win or Away Win (No Draw)" },
        winEitherHalf: { type: Type.STRING, description: "Probability percentage for the Favorite to win at least one half" },
        winEitherHalfTeam: { type: Type.STRING, description: "The Name of the Team that is favored to win either half" },
        totalCornersPrediction: { type: Type.STRING, description: "Probability percentage for a specific corner line (e.g. 'Over 9.5: 65%')" }
      },
      required: ["over10", "over15", "doubleChanceProbability", "doubleChanceTeam", "doubleChance12", "winEitherHalf", "winEitherHalfTeam", "totalCornersPrediction"]
    },
    bettingSuggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          market: { type: Type.STRING, description: "Market type (e.g., 'Goals', 'Winner', 'Both Score')" },
          selection: { type: Type.STRING, description: "Specific selection (e.g., 'Over 2.5', 'Home Team')" },
          probability: { type: Type.STRING, description: "Estimated probability percentage" },
          reasoning: { type: Type.STRING, description: "Short reason for the suggestion" },
          riskLevel: { type: Type.STRING, enum: ["Baixo", "Médio", "Alto"] },
        },
        required: ["market", "selection", "probability", "reasoning", "riskLevel"]
      },
    },
    conclusion: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        offensiveTeam: { type: Type.STRING },
        expectation: { type: Type.STRING },
      },
      required: ["summary", "offensiveTeam", "expectation"],
    },
  },
  required: ["nextMatch", "leagueStandings", "mainTeamAnalysis", "opponentTeamAnalysis", "headToHead", "scenarios", "corners", "cards", "calculatedProbabilities", "bettingSuggestions", "conclusion"],
};

export const fetchMatchAnalysis = async (teamName: string): Promise<AnalysisData> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  // 1. Check Cache
  const normalizedKey = CACHE_PREFIX + teamName.toLowerCase().trim();
  const cachedData = localStorage.getItem(normalizedKey);

  if (cachedData) {
    try {
      const parsedCache: CacheEntry = JSON.parse(cachedData);
      const now = Date.now();
      
      // If cache is valid (less than 10 minutes old)
      if (now - parsedCache.timestamp < CACHE_DURATION_MS) {
        console.log("Serving from cache:", teamName);
        // We return the cached data directly without calling Gemini
        return parsedCache.data;
      } else {
        console.log("Cache expired for:", teamName);
        localStorage.removeItem(normalizedKey);
      }
    } catch (e) {
      // If parse error, clear cache and proceed
      localStorage.removeItem(normalizedKey);
    }
  }

  // 2. Prepare API Call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Você é um especialista em estatísticas de futebol.
    Analise a PRÓXIMA partida do time: ${teamName}.
    
    Use o Google Search para encontrar os dados MAIS RECENTES:
    1. O próximo jogo confirmado.
    2. CLASSIFICAÇÃO ATUAL: Se for campeonato de pontos corridos (ex: Premier League, Brasileirão, La Liga), VOCÊ DEVE RETORNAR A TABELA COMPLETA (todos os times, do 1º ao último lugar). Liste todos os times em ordem de classificação.
    3. Últimos 5 jogos de ambas as equipes (Casa ou Fora).
    4. Confrontos diretos.
    5. Estatísticas de Escanteios e Cartões.
    
    IMPORTANTE - CÁLCULO DE PROBABILIDADES ESPECÍFICAS:
    Você DEVE calcular e estimar a probabilidade percentual para:
    - Over 1.0 Gols na partida.
    - Over 1.5 Gols na partida.
    - Dupla Chance: ANALISE quem tem mais chance (Casa ou Empate vs Visitante ou Empate). Retorne a probabilidade da MELHOR opção e o nome do time beneficiado (ex: "Arsenal" para Arsenal ou Empate).
    - Dupla Chance 12: Casa ou Visitante (Sem Empate).
    - Vencer um dos Tempos: Probabilidade do time favorito vencer o 1º ou o 2º tempo. INDIQUE O NOME DO TIME FAVORITO no campo 'winEitherHalfTeam'.
    - Total de Escanteios: Estime uma linha (ex: Over 9.5) e a probabilidade.

    Gere também 3 SUGESTÕES DE APOSTA (Palpites).

    Retorne EXCLUSIVAMENTE em formato JSON puro seguindo este schema:
    ${JSON.stringify(analysisSchema, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    let text = response.text;
    if (!text) {
      throw new Error("No analysis generated.");
    }

    text = text.replace(/^```json\s*/, "").replace(/```$/, "").trim();
    text = text.replace(/^```\s*/, "").replace(/```$/, "").trim();

    const data = JSON.parse(text) as AnalysisData;

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources: { uri: string; title: string }[] = [];
    
    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
          sources.push({ uri: chunk.web.uri, title: chunk.web.title });
        }
      });
    }

    const finalData = { ...data, sources };

    // 3. Save to Cache
    const newCacheEntry: CacheEntry = {
      timestamp: Date.now(),
      data: finalData
    };
    localStorage.setItem(normalizedKey, JSON.stringify(newCacheEntry));

    return finalData;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    const errorMessage = error.message || error.toString();
    throw new Error(`Falha na análise: ${errorMessage}`);
  }
};