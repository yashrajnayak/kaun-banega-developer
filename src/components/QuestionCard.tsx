import React, { useState, useEffect } from 'react';
import { Question } from '../data/questions';
import { BarChart2 } from 'lucide-react';
import { formatNumber } from '../utils/gameUtils';
import GameTimer from './GameTimer';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  revealAnswer: boolean;
  eliminatedOptions: number[];
  onSelectAnswer: (index: number) => void;
  showPoll: boolean;
  showDebugCode: boolean;
  hintText: string | null;
}

const QuestionCard = ({
  question,
  selectedAnswer,
  revealAnswer,
  eliminatedOptions,
  onSelectAnswer,
  showPoll,
  showDebugCode,
  hintText,
}: QuestionCardProps) => {
  const [animateOptions, setAnimateOptions] = useState(false);
  
  useEffect(() => {
    // Reset animation state first
    setAnimateOptions(false);
    
    // Then set a small timeout to trigger animation after render
    const animationTimer = setTimeout(() => {
      setAnimateOptions(true);
    }, 50);
    
    // Clean up timer
    return () => clearTimeout(animationTimer);
  }, [question]);
  
  // Helper function to determine option class
  const getOptionClass = (index: number) => {
    let className = 'answer-option';
    
    if (eliminatedOptions.includes(index)) {
      className += ' opacity-30 pointer-events-none';
    }
    
    if (selectedAnswer === index) {
      className += ' answer-selected';
    }
    
    if (revealAnswer) {
      if (index === question.correctAnswer) {
        className += ' answer-correct';
      } else if (selectedAnswer === index) {
        className += ' answer-incorrect';
      } else {
        className += ' answer-disabled';
      }
    }
    
    return className;
  };

  return (
    <div className="w-full flex flex-col">
      <div className="glass-card p-6 rounded-lg mb-4 shadow-lg animate-entrance">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">{question.text}</h2>
        
        {/* Hint text from documentation lifeline */}
        {hintText && (
          <div className="bg-secondary/70 p-4 rounded-lg mb-6 border-l-4 border-accent animate-fade-in">
            <h3 className="text-sm font-semibold mb-1">Documentation Says:</h3>
            <p className="text-sm text-muted-foreground">{hintText}</p>
          </div>
        )}
        
        {/* Poll results */}
        {showPoll && (
          <div className="bg-secondary/70 p-4 rounded-lg mb-6 animate-fade-in">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BarChart2 size={16} />
              Community Poll:
            </h3>
            <div className="space-y-2">
              {question.pollPercentages?.map((percentage, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="text-xs text-muted-foreground w-8">{String.fromCharCode(65 + idx)}</div>
                  <div className="flex-1 bg-muted/30 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-accent h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground w-8">{percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Debug code */}
        {showDebugCode && question.debugCode && (
          <div className="bg-muted/30 p-4 rounded-lg mb-6 border border-game-border font-mono text-sm overflow-x-auto animate-fade-in">
            <pre className="text-muted-foreground">
              {question.debugCode}
            </pre>
          </div>
        )}
        
        {/* Answer options */}
        <div className={`grid grid-cols-1 gap-2 ${animateOptions ? 'animate-slide-in' : 'opacity-0'}`}>
          {question.options.map((option, index) => (
            <button
              key={index}
              className={getOptionClass(index)}
              onClick={() => onSelectAnswer(index)}
              disabled={revealAnswer || eliminatedOptions.includes(index)}
            >
              <span className="text-lg font-bold opacity-70">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
            </button>
          ))}
        </div>
        
        {/* Timer - moved below answer options */}
        <div className="mt-4">
          <GameTimer 
            questionNumber={question.id} 
            onTimeUp={() => onSelectAnswer(-1)} 
            paused={selectedAnswer !== null || revealAnswer}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
