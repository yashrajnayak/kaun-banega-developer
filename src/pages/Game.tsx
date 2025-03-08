import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import QuestionCard from '../components/QuestionCard';
import GameHeader from '../components/GameHeader';
import PrizeTracker from '../components/PrizeTracker';
import GameOver from '../components/GameOver';
import { useGameState } from '../hooks/useGameState';
import { getPrizeAmount } from '../utils/gameUtils';
import { getCachedGitHubUser } from '../utils/githubApi';
import { playSound, stopAllSounds, AUDIO_FILES } from '../utils/audioManager';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// URLs of Octodex images to preload
const octodexImages = [
  "https://octodex.github.com/images/spectrocat.png",
  "https://octodex.github.com/images/jetpacktocat.png",
  "https://octodex.github.com/images/nyantocat.gif",
  "https://octodex.github.com/images/hubot.jpg",
  "https://octodex.github.com/images/octocat-de-los-muertos.jpg"
];

const Game = () => {
  const navigate = useNavigate();
  const [showWalkAwayDialog, setShowWalkAwayDialog] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Array<{
    question: string;
    questionNumber: number;
    correct: boolean;
  }>>([]);
  
  const {
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
  } = useGameState();

  // Get cached GitHub user
  const githubUser = getCachedGitHubUser();

  // Preload Octodex images
  useEffect(() => {
    octodexImages.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  useEffect(() => {
    // Start game if page loads directly
    if (gameStatus === 'notStarted') {
      startGame();
    }
    
    // Play background music when game starts
    if (gameStatus === 'inProgress') {
      playSound('backgroundMusic', 0.3, true);
    }
    
    // Clean up sounds when component unmounts
    return () => {
      stopAllSounds();
    };
  }, [gameStatus, startGame]);
  
  // Handle sound effects when game status changes
  useEffect(() => {
    if (gameStatus === 'won') {
      stopAllSounds();
      playSound('applause', 0.7);
    } else if (gameStatus === 'lost') {
      stopAllSounds();
      playSound('gameOver', 0.7);
    } else if (gameStatus === 'walkAway') {
      stopAllSounds();
      playSound('applause', 0.5);
    }
  }, [gameStatus]);
  
  // Track answered questions
  useEffect(() => {
    if (revealAnswer && currentQuestion && selectedAnswer !== null) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      setAnsweredQuestions(prev => [
        ...prev, 
        {
          question: currentQuestion.text,
          questionNumber: currentQuestionNumber,
          correct: isCorrect
        }
      ]);
    }
  }, [revealAnswer, currentQuestion, selectedAnswer, currentQuestionNumber]);

  // Get current sticker amount
  const currentStickers = gameStatus === 'inProgress' 
    ? getPrizeAmount(currentQuestionNumber - 1) 
    : winnings;
    
  // Handle back to home
  const handleBackToHome = () => {
    navigate('/');
  };
  
  // Handle walk away dialog
  const handleConfirmWalkAway = () => {
    setShowWalkAwayDialog(false);
    walkAway();
  };

  return (
    <div className="game-container">
      {/* Game board - only shown when game is in progress */}
      {gameStatus === 'inProgress' && currentQuestion && (
        <div className="container max-w-5xl mx-auto">
          <GameHeader 
            questionNumber={currentQuestionNumber} 
            stickers={currentStickers} 
            lifelines={lifelines}
            onUseLifeline={useLifeline}
            githubUser={githubUser}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3 flex flex-col h-full">
              {/* Question */}
              <div className="flex-grow">
                <QuestionCard 
                  question={currentQuestion}
                  selectedAnswer={selectedAnswer}
                  revealAnswer={revealAnswer}
                  eliminatedOptions={eliminatedOptions}
                  onSelectAnswer={selectAnswer}
                  showPoll={showPoll}
                  showDebugCode={showDebugCode}
                  hintText={hintText}
                />
              </div>
              
              {/* Walk away button */}
              {!selectedAnswer && !revealAnswer && (
                <div className="w-full mt-4">
                  <Button 
                    variant="outline"
                    className="w-full border-game-border hover:bg-destructive/20 transition-all"
                    onClick={() => setShowWalkAwayDialog(true)}
                  >
                    Walk Away with {currentStickers} Stickers
                  </Button>
                </div>
              )}
            </div>
            
            {/* Prize tracker */}
            <div className="lg:col-span-1">
              <PrizeTracker currentQuestionNumber={currentQuestionNumber} />
            </div>
          </div>
        </div>
      )}
      
      {/* Game over screen */}
      {(gameStatus === 'won' || gameStatus === 'walkAway' || gameStatus === 'lost') && (
        <GameOver 
          gameStatus={gameStatus} 
          winnings={winnings} 
          onPlayAgain={handleBackToHome}
          githubUser={githubUser}
          currentQuestionNumber={currentQuestionNumber}
          answeredQuestions={answeredQuestions}
        />
      )}
      
      {/* Walk Away Confirmation Dialog */}
      <AlertDialog open={showWalkAwayDialog} onOpenChange={setShowWalkAwayDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Walk Away Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to walk away with {currentStickers} Stickers? You won't be able to continue the game.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmWalkAway}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Game;
