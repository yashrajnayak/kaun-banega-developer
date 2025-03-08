
import { questions, prizeLevels, PrizeLevel, Question } from '../data/questions';
import { playSound } from './audioManager';

export type GameStatus = 'notStarted' | 'inProgress' | 'walkAway' | 'won' | 'lost';

export type LifelineType = '50:50' | 'documentation' | 'poll' | 'debug';

export interface LifelineState {
  type: LifelineType;
  used: boolean;
}

// Cached questions for each level to ensure no duplicates in a game
const cachedQuestions: Record<number, Question> = {};

// Get current question based on question number
export const getCurrentQuestion = (questionNumber: number): Question => {
  return questions.find(q => q.id === questionNumber) || questions[0];
};

// Get a random question for the given level
export const getRandomQuestion = (questionNumber: number): Question => {
  // Return cached question if it exists
  if (cachedQuestions[questionNumber]) {
    return cachedQuestions[questionNumber];
  }
  
  // Determine difficulty level based on question number
  let difficulty: 'easy' | 'medium' | 'hard';
  
  if (questionNumber <= 5) {
    difficulty = 'easy';
  } else if (questionNumber <= 10) {
    difficulty = 'medium';
  } else {
    difficulty = 'hard';
  }
  
  // Filter questions by difficulty
  const questionsForLevel = questions.filter(q => q.level === difficulty);
  
  // If no questions available for this level, use getCurrentQuestion as fallback
  if (questionsForLevel.length === 0) {
    return getCurrentQuestion(questionNumber);
  }
  
  // Select a random question from the filtered list
  const randomIndex = Math.floor(Math.random() * questionsForLevel.length);
  const selectedQuestion = questionsForLevel[randomIndex];
  
  // Create a copy with the correct question number
  const questionWithCorrectId = {
    ...selectedQuestion,
    id: questionNumber
  };
  
  // Cache the question for this game session
  cachedQuestions[questionNumber] = questionWithCorrectId;
  
  return questionWithCorrectId;
};

// Reset cached questions (for new game)
export const resetCachedQuestions = (): void => {
  Object.keys(cachedQuestions).forEach(key => {
    delete cachedQuestions[Number(key)];
  });
};

// Get prize amount for a specific question number
export const getPrizeAmount = (questionNumber: number): number => {
  const prizeLevel = prizeLevels.find(p => p.questionNumber === questionNumber);
  return prizeLevel ? prizeLevel.amount : 0;
};

// Get current prize level information
export const getCurrentPrizeLevel = (questionNumber: number): PrizeLevel => {
  return prizeLevels.find(p => p.questionNumber === questionNumber) || prizeLevels[0];
};

// Calculate winnings based on current question and game status
export const calculateWinnings = (currentQuestionNumber: number, gameStatus: GameStatus): number => {
  if (gameStatus === 'won') {
    return getPrizeAmount(15);
  }
  
  if (gameStatus === 'walkAway') {
    return getPrizeAmount(currentQuestionNumber - 1);
  }
  
  if (gameStatus === 'lost') {
    // Find the last safe level passed
    let safeAmount = 0;
    for (const level of prizeLevels) {
      if (level.isSafe && level.questionNumber < currentQuestionNumber) {
        safeAmount = level.amount;
      }
    }
    return safeAmount;
  }
  
  return 0;
};

// Get two wrong answer indices for 50:50 lifeline
export const getFiftyFiftyOptions = (correctAnswer: number): number[] => {
  const allOptions = [0, 1, 2, 3];
  const wrongOptions = allOptions.filter(idx => idx !== correctAnswer);
  
  // Randomly remove one wrong option
  const randomIndex = Math.floor(Math.random() * wrongOptions.length);
  wrongOptions.splice(randomIndex, 1);
  
  return wrongOptions.slice(0, 2);
};

// Format large numbers with commas
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Get background music intensity based on question number
export const getMusicIntensity = (questionNumber: number): string => {
  if (questionNumber <= 5) return 'low';
  if (questionNumber <= 10) return 'medium';
  return 'high';
};
