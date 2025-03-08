import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { playSound } from '../../utils/audioManager';
import { validateGitHubUsername, cacheGitHubUser } from '../../utils/githubApi';
import { GitBranch, Github, Code2, Terminal } from 'lucide-react';

const HeaderSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [githubUsername, setGithubUsername] = useState('');
  const [validating, setValidating] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [inputShake, setInputShake] = useState(false);
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGithubUsername(e.target.value.trim());
    if (usernameError) {
      setUsernameError('');
      // Clear and reset the input value
      e.target.value = '';
    }
  };
  
  const startGame = async () => {
    if (githubUsername) {
      setValidating(true);
      const user = await validateGitHubUsername(githubUsername);
      
      if (user) {
        // Valid username, cache user data and start game
        cacheGitHubUser(user);
        setLoading(true);
        playSound('finalAnswer', 0.5);
        setTimeout(() => {
          navigate('/game');
        }, 800);
      } else {
        // Invalid username - show error in input, shake animation
        setUsernameError('Invalid GitHub username');
        setInputShake(true);
        setValidating(false);
        
        // Reset shake animation and error after it completes
        setTimeout(() => {
          setInputShake(false);
          setUsernameError('');
          setGithubUsername('');
        }, 600);
      }
    } else {
      // No username entered, start game without GitHub user
      setLoading(true);
      playSound('finalAnswer', 0.5);
      setTimeout(() => {
        navigate('/game');
      }, 800);
    }
  };

  return (
    <div className="relative p-8 sm:p-12 text-center">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-10 -left-10 w-40 h-40">
          <Terminal size={150} />
        </div>
        <div className="absolute top-20 right-10 w-40 h-40">
          <GitBranch size={150} />
        </div>
        <div className="absolute bottom-10 left-20 w-40 h-40">
          <Code2 size={150} />
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40">
          <Github size={150} />
        </div>
      </div>
      
      {/* Logo */}
      <div className="relative z-10 flex justify-center mb-6">
        <img 
          src="./logo.png" 
          alt="Game Logo"
          className="h-24 w-auto object-contain"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight">
          <span className="relative inline-block">
            <span className="relative z-10">Kaun Banega</span>
            <span className="absolute -bottom-2 left-0 right-0 h-3 bg-game-blue/30 rounded-full z-0"></span>
          </span>
          <br />
          <span className="text-glow text-game-blue">Developer</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Test your knowledge of Git, GitHub, and GitHub Copilot in this exciting
          game show format. Answer 15 progressively difficult questions and win up to 10,000 Stickers!
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 max-w-md mx-auto">
          <div className="w-full">
            <Input
              type="text"
              placeholder={usernameError ? '' : "Enter your GitHub username (optional)"}
              value={usernameError || githubUsername}
              onChange={handleUsernameChange}
              className={`bg-card/50 border-white/10 text-white text-lg sm:text-xl placeholder:text-white/50 w-full h-12 text-center placeholder:text-center ${inputShake ? 'animate-shake' : ''} ${usernameError ? 'border-game-red text-game-red' : ''}`}
              disabled={loading || validating}
            />
            {/* Remove the error paragraph since we're showing it in the input */}
          </div>
          
          <Button 
            className="bg-game-blue hover:bg-game-blue/90 text-white px-8 py-6 rounded-lg text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full"
            onClick={startGame}
            disabled={loading || validating}
          >
            {validating ? 'Validating...' : loading ? 'Loading...' : 'Start the Challenge'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
