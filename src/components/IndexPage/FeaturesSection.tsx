import { Terminal, Trophy, Code2, Github } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <div className="bg-card/80 p-8 sm:p-12 border-t border-white/10 mb-8">
      <h2 className="text-2xl font-bold mb-8 text-center">Game Features</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-game-blue/20 flex items-center justify-center mb-4">
            <Terminal size={32} className="text-game-blue" />
          </div>
          <h3 className="text-lg font-bold mb-2">15 Questions</h3>
          <p className="text-muted-foreground text-sm">
            Test your knowledge with progressively challenging questions about Git, GitHub, and GitHub Copilot.
          </p>
        </div>
        
        <div className="glass-card p-6 rounded-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-game-green/20 flex items-center justify-center mb-4">
            <Trophy size={32} className="text-game-green" />
          </div>
          <h3 className="text-lg font-bold mb-2">Win Stickers</h3>
          <p className="text-muted-foreground text-sm">
            Earn GitHub Stickers as you progress, with safe levels at questions 5 and 10.
          </p>
        </div>
        
        <div className="glass-card p-6 rounded-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-game-purple/20 flex items-center justify-center mb-4">
            <Code2 size={32} className="text-game-purple" />
          </div>
          <h3 className="text-lg font-bold mb-2">Four Lifelines</h3>
          <p className="text-muted-foreground text-sm">
            Use 50:50, Consult Documentation, Poll the Community, or Debug the Code when you're stuck.
          </p>
        </div>
        
        <div className="glass-card p-6 rounded-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-game-yellow/20 flex items-center justify-center mb-4">
            <Github size={32} className="text-game-yellow" />
          </div>
          <h3 className="text-lg font-bold mb-2">Learn While Playing</h3>
          <p className="text-muted-foreground text-sm">
            Improve your developer knowledge in an engaging, game show format.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
