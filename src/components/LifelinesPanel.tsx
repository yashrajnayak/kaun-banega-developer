
import { 
  HelpCircle, 
  Users, 
  Code, 
  Divide 
} from 'lucide-react';
import { LifelineState, LifelineType } from '../utils/gameUtils';

interface LifelinesPanelProps {
  lifelines: LifelineState[];
  onUseLifeline: (type: LifelineType) => void;
}

// Note: This component is kept for backwards compatibility but no longer used.
// Lifelines have been moved to the GameHeader component.
const LifelinesPanel = ({ lifelines, onUseLifeline }: LifelinesPanelProps) => {
  // Helper function to get icon by lifeline type
  const getLifelineIcon = (type: LifelineType) => {
    switch (type) {
      case '50:50':
        return <Divide size={24} />;
      case 'documentation':
        return <HelpCircle size={24} />;
      case 'poll':
        return <Users size={24} />;
      case 'debug':
        return <Code size={24} />;
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

  return (
    <div className="w-full glass-card p-4 rounded-lg mb-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">Lifelines</h3>
      <div className="flex items-center justify-center gap-4">
        {lifelines.map((lifeline) => (
          <div 
            key={lifeline.type}
            className={`lifeline-button ${lifeline.used ? 'lifeline-used' : ''}`}
            onClick={() => !lifeline.used && onUseLifeline(lifeline.type)}
            title={`${getLifelineLabel(lifeline.type)} ${lifeline.used ? '(Used)' : ''}`}
          >
            {getLifelineIcon(lifeline.type)}
            <span className="sr-only">{lifeline.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifelinesPanel;
