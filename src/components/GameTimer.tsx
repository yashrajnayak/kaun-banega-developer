import { useEffect, useState, useRef } from 'react';
import { Timer } from 'lucide-react';
import { playSound } from '../utils/audioManager';

interface GameTimerProps {
  questionNumber: number;
  onTimeUp: () => void;
  paused?: boolean;
}

const GameTimer = ({ questionNumber, onTimeUp, paused = false }: GameTimerProps) => {
  // Questions after 2nd safe level (Q10) get 40 seconds
  const totalTime = questionNumber > 10 ? 40 : 20;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  
  // Use a ref to prevent onTimeUp from causing an effect dependency
  const onTimeUpRef = useRef(onTimeUp);
  
  // Update ref when onTimeUp changes
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);
  
  // Reset timer when question changes or totalTime changes
  useEffect(() => {
    setTimeLeft(totalTime);
  }, [questionNumber, totalTime]);
  
  // Timer effect with proper cleanup
  useEffect(() => {
    if (paused) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        // Play tick sound in last 5 seconds
        if (prev <= 6 && prev > 1) {
          playSound('timerTick', 0.3);
        }
        
        // Time's up
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUpRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Proper cleanup to prevent memory leaks
    return () => clearInterval(timer);
  }, [paused, totalTime]); // Add totalTime to dependencies
  
  // Calculate progress percentage
  const progress = (timeLeft / totalTime) * 100;
  
  // Determine color based on time left
  const getColor = () => {
    if (timeLeft > 10) return 'bg-accent';
    if (timeLeft > 5) return 'bg-game-yellow';
    return 'bg-game-red';
  };
  
  return (
    <div className="w-full glass-card p-2 rounded-lg flex items-center gap-2">
      <Timer size={18} className={timeLeft <= 5 ? 'animate-pulse text-game-red' : ''} />
      <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${getColor()}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className={`text-sm font-mono ${timeLeft <= 5 ? 'text-game-red font-bold' : ''}`}>
        {timeLeft}s
      </span>
    </div>
  );
};

export default GameTimer;