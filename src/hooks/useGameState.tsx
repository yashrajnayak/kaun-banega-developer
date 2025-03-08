import { useState, useEffect } from 'react';
import { 
  GameStatus, 
  LifelineType, 
  LifelineState,
  getCurrentQuestion,
  getFiftyFiftyOptions,
  calculateWinnings,
  getRandomQuestion,
  resetCachedQuestions,
  resetUsedQuestions
} from '../utils/gameUtils';
import { Question } from '../data/questions';
import { playSound } from '../utils/audioManager';

export function useGameState() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('notStarted');
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [hintText, setHintText] = useState<string | null>(null);
  const [showPoll, setShowPoll] = useState(false);
  const [showDebugCode, setShowDebugCode] = useState(false);
  const [lifelines, setLifelines] = useState<LifelineState[]>([
    { type: '50:50', used: false },
    { type: 'documentation', used: false },
    { type: 'poll', used: false },
    { type: 'debug', used: false }
  ]);
  
  // Initialize game
  useEffect(() => {
    if (gameStatus === 'inProgress' && !currentQuestion) {
      setCurrentQuestion(getRandomQuestion(currentQuestionNumber));
    }
  }, [gameStatus, currentQuestion, currentQuestionNumber]);
  
  // Load new question when advancing
  useEffect(() => {
    if (gameStatus === 'inProgress') {
      setCurrentQuestion(getRandomQuestion(currentQuestionNumber));
      setSelectedAnswer(null);
      setRevealAnswer(false);
      setEliminatedOptions([]);
      setHintText(null);
      setShowPoll(false);
      setShowDebugCode(false);
    }
  }, [currentQuestionNumber, gameStatus]);
  
  // Start new game
  const startGame = () => {
    setGameStatus('inProgress');
    setCurrentQuestionNumber(1);
    setSelectedAnswer(null);
    setRevealAnswer(false);
    setEliminatedOptions([]);
    setHintText(null);
    setShowPoll(false);
    setShowDebugCode(false);
    setLifelines([
      { type: '50:50', used: false },
      { type: 'documentation', used: false },
      { type: 'poll', used: false },
      { type: 'debug', used: false }
    ]);
    resetCachedQuestions();
    resetUsedQuestions();
    playSound('backgroundMusic', 0.3, true);
  };
  
  // Handle answer selection
  const selectAnswer = (answerIndex: number) => {
    if (revealAnswer || selectedAnswer !== null) return;
    
    // Play selection sound
    playSound('finalAnswer', 0.5);
    
    setSelectedAnswer(answerIndex);
    
    // Reveal the correct answer after a delay
    setTimeout(() => {
      setRevealAnswer(true);
      
      // Play correct/wrong sound
      if (currentQuestion && answerIndex === currentQuestion.correctAnswer) {
        playSound('correctAnswer', 0.6);
      } else {
        playSound('wrongAnswer', 0.6);
      }
      
      // Determine outcome after showing the correct answer
      setTimeout(() => {
        if (currentQuestion && answerIndex === currentQuestion.correctAnswer) {
          // Correct answer
          if (currentQuestionNumber === 15) {
            // Won the game
            setGameStatus('won');
          } else {
            // Advance to next question
            setCurrentQuestionNumber(prev => prev + 1);
          }
        } else {
          // Incorrect answer
          setGameStatus('lost');
        }
      }, 2000);
    }, 3000);
  };
  
  // Handle walk away
  const walkAway = () => {
    playSound('finalAnswer', 0.5);
    setTimeout(() => {
      setGameStatus('walkAway');
    }, 1000);
  };
  
  // Use a lifeline
  const useLifeline = (type: LifelineType) => {
    // Check if lifeline is already used
    if (lifelines.find(l => l.type === type)?.used) return;
    
    // Play lifeline sound
    playSound('lifeline', 0.5);
    
    // Mark the lifeline as used
    setLifelines(prev => 
      prev.map(l => l.type === type ? { ...l, used: true } : l)
    );
    
    // Apply lifeline effect
    if (currentQuestion) {
      switch (type) {
        case '50:50':
          const optionsToEliminate = getFiftyFiftyOptions(currentQuestion.correctAnswer);
          setEliminatedOptions(optionsToEliminate);
          break;
          
        case 'documentation':
          setHintText(currentQuestion.documentation || 'No documentation available.');
          break;
          
        case 'poll':
          setShowPoll(true);
          break;
          
        case 'debug':
          setShowDebugCode(true);
          break;
      }
    }
  };
  
  // Calculate current winnings
  const winnings = calculateWinnings(currentQuestionNumber, gameStatus);
  
  return {
    gameStatus,
    currentQuestionNumber,
    currentQuestion,
    selectedAnswer,
    revealAnswer,
    eliminatedOptions,
    hintText,
    showPoll,
    showDebugCode,
    lifelines,
    winnings,
    startGame,
    selectAnswer,
    walkAway,
    useLifeline
  };
}
