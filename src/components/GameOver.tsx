
import { Button } from '@/components/ui/button';
import { GameStatus } from '../utils/gameUtils';
import { formatNumber } from '../utils/gameUtils';
import { GitHubUser } from '../utils/githubApi';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { HomeIcon, Share2 } from 'lucide-react';

interface GameOverProps {
  gameStatus: GameStatus;
  winnings: number;
  onPlayAgain: () => void;
  githubUser: GitHubUser | null;
  answeredQuestions?: {
    question: string;
    questionNumber: number;
    correct: boolean;
  }[];
}

const GameOver = ({ gameStatus, winnings, onPlayAgain, githubUser, answeredQuestions = [] }: GameOverProps) => {
  // Determine title and message based on game status
  const getTitle = () => {
    switch (gameStatus) {
      case 'won':
        return 'Congratulations!';
      case 'walkAway':
        return 'You Walked Away';
      case 'lost':
        return 'Game Over';
      default:
        return '';
    }
  };
  
  const getMessage = () => {
    const userName = githubUser?.name ? `, ${githubUser.name.split(' ')[0]}!` : '!';
    
    switch (gameStatus) {
      case 'won':
        return `You've reached the top and won ${formatNumber(winnings)} GitHub Stickers${userName}`;
      case 'walkAway':
        return `You decided to walk away with ${formatNumber(winnings)} GitHub Stickers${userName}`;
      case 'lost':
        return winnings > 0 
          ? `You're going home with ${formatNumber(winnings)} GitHub Stickers${userName}` 
          : `Unfortunately, you didn't win any GitHub Stickers${userName}`;
      default:
        return '';
    }
  };
  
  // Determine the appropriate Octodex image based on game status and winnings
  const getOctodexImage = () => {
    if (winnings === 0) {
      return "https://octodex.github.com/images/spectrocat.png";
    }
    
    switch (gameStatus) {
      case 'won':
        return "https://octodex.github.com/images/jetpacktocat.png";
      case 'walkAway':
        return "https://octodex.github.com/images/nyantocat.gif";
      case 'lost':
        return "https://octodex.github.com/images/hubot.jpg";
      default:
        return "https://octodex.github.com/images/octocat-de-los-muertos.jpg";
    }
  };

  // Create share URL for GitHub issues
  const createShareUrl = () => {
    if (!githubUser || !githubUser.login) return '';
    
    // Create title
    const title = `${githubUser.login} | ${formatNumber(winnings)} Stickers`;
    
    // Create body content
    let body = `# My Score: ${formatNumber(winnings)} GitHub Stickers\n\n`;
    
    // Add correctly answered questions
    const correctQuestions = answeredQuestions.filter(q => q.correct);
    if (correctQuestions.length > 0) {
      body += "## Questions I Answered Correctly:\n";
      correctQuestions.forEach(q => {
        body += `- Question ${q.questionNumber}: ${q.question}\n`;
      });
      body += "\n";
    }
    
    // Add incorrectly answered questions
    const incorrectQuestions = answeredQuestions.filter(q => !q.correct);
    if (incorrectQuestions.length > 0) {
      body += "## Questions I Missed:\n";
      incorrectQuestions.forEach(q => {
        body += `- Question ${q.questionNumber}: ${q.question}\n`;
      });
      body += "\n";
    }
    
    body += "## Game Status\n";
    body += `- Final Status: ${gameStatus}\n`;
    
    // Encode parameters for URL
    const encodedTitle = encodeURIComponent(title);
    const encodedBody = encodeURIComponent(body);
    
    return `https://github.com/yashrajnayak/kaun-banega-developer-scores/issues/new?title=${encodedTitle}&body=${encodedBody}`;
  };

  return (
    <div className="glass-card p-8 rounded-lg text-center max-w-md mx-auto animate-scale-in">
      <div className="flex justify-center mb-6">
        <div className="h-28 w-28 rounded-full bg-white flex items-center justify-center p-1 shadow-lg">
          <img 
            src={getOctodexImage()} 
            alt="Octocat" 
            className="h-full w-full object-contain rounded-full"
          />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold mb-4 text-glow">{getTitle()}</h2>
      <p className="text-xl mb-8">{getMessage()}</p>
      
      <Button 
        className="w-full bg-accent hover:bg-accent/80 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 mb-4"
        onClick={onPlayAgain}
      >
        <HomeIcon className="mr-2" />
        Play Again
      </Button>
      
      {/* Share Score button - only shown if user provided GitHub username */}
      {githubUser && githubUser.login && (
        <a
          href={createShareUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button 
            className="w-full bg-game-purple hover:bg-game-purple/80 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300"
          >
            <Share2 className="mr-2" />
            Share Your Score!
          </Button>
        </a>
      )}
    </div>
  );
};

export default GameOver;
