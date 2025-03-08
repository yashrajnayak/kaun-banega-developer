import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  HelpCircle, 
  Users, 
  Code, 
  Divide,
  Github
} from 'lucide-react';
import { formatNumber } from '../utils/gameUtils';
import { LifelineState, LifelineType } from '../utils/gameUtils';
import { GitHubUser } from '../utils/githubApi';

interface GameHeaderProps {
  questionNumber: number;
  stickers: number;
  lifelines: LifelineState[];
  onUseLifeline: (type: LifelineType) => void;
  githubUser: GitHubUser | null;
}

const GameHeader = ({ 
  questionNumber, 
  stickers, 
  lifelines, 
  onUseLifeline, 
  githubUser 
}: GameHeaderProps) => {
  // Helper function to get icon by lifeline type
  const getLifelineIcon = (type: LifelineType) => {
    switch (type) {
      case '50:50':
        return <span className="text-sm font-bold px-2">50:50</span>;
      case 'documentation':
        return <HelpCircle size={22} />;
      case 'poll':
        return <Users size={22} />;
      case 'debug':
        return <Code size={22} />;
    }
  };
  
  // Helper function to get lifeline label
  const getLifelineLabel = (type: LifelineType) => {
    switch (type) {
      case '50:50':
        return '50:50';
      case 'documentation':
        return 'Docs';
      case 'poll':
        return 'Poll';
      case 'debug':
        return 'Debug';
    }
  };

  // Helper function to get lifeline description
  const getLifelineDescription = (type: LifelineType) => {
    switch (type) {
      case '50:50':
        return 'Removes two incorrect answer options';
      case 'documentation':
        return 'Provides documentation help for this question';
      case 'poll':
        return 'Shows how the developer community voted';
      case 'debug':
        return 'Shows a code snippet for additional context';
    }
  };

  return (
    <div className="w-full glass-card p-4 rounded-lg mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xl">
            {questionNumber}
          </div>
          <h2 className="text-xl font-bold text-foreground">Question</h2>
        </div>
        
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          {/* GitHub User Avatar (if available) */}
          {githubUser && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border border-white/20">
                <AvatarImage src={githubUser.avatar_url} alt={githubUser.login} />
                <AvatarFallback><Github size={16} /></AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline-block">{githubUser.login}</span>
            </div>
          )}
          
          {/* Stickers counter */}
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">Stickers:</div>
            <div className="text-xl font-bold text-accent animate-pulse-light">
              {formatNumber(stickers)}
            </div>
          </div>
          
          {/* Lifelines */}
          <div className="flex items-center gap-2">
            <TooltipProvider>
              {lifelines.map((lifeline) => (
                <Tooltip key={lifeline.type}>
                  <TooltipTrigger asChild>
                    <div 
                      className={`lifeline-button ${lifeline.used ? 'lifeline-used' : ''}`}
                      onClick={() => !lifeline.used && onUseLifeline(lifeline.type)}
                    >
                      {getLifelineIcon(lifeline.type)}
                      <span className="sr-only">{lifeline.type}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-card/95 backdrop-blur border-white/10">
                    <div className="flex flex-col">
                      <span className="font-bold">{getLifelineLabel(lifeline.type)}</span>
                      <span className="text-xs text-muted-foreground">
                        {getLifelineDescription(lifeline.type)}
                        {lifeline.used ? ' (Used)' : ''}
                      </span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
