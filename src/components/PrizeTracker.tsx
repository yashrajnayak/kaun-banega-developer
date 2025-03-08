
import { prizeLevels, PrizeLevel } from '../data/questions';
import { formatNumber } from '../utils/gameUtils';

interface PrizeTrackerProps {
  currentQuestionNumber: number;
}

const PrizeTracker = ({ currentQuestionNumber }: PrizeTrackerProps) => {
  // Reverse the levels to display highest values at the top
  const reversedLevels = [...prizeLevels].reverse();

  // Helper function to determine row class
  const getRowClass = (level: PrizeLevel) => {
    let className = 'prize-row';
    
    if (level.questionNumber === currentQuestionNumber) {
      className += ' prize-row-active';
    } else if (level.questionNumber < currentQuestionNumber) {
      className += ' prize-row-completed';
    }
    
    if (level.isSafe) {
      className += ' prize-row-safe';
    }
    
    return className;
  };

  return (
    <div className="glass-card rounded-lg p-3 w-full sticky top-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">Prize Levels</h3>
      
      <div className="space-y-1">
        {reversedLevels.map((level) => (
          <div 
            key={level.questionNumber}
            className={getRowClass(level)}
          >
            <div className="text-sm">Q{level.questionNumber}</div>
            <div className="text-sm font-bold">{formatNumber(level.amount)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrizeTracker;
