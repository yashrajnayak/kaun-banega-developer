import { useEffect } from 'react';
import { GitBranch, Github, Code2, Terminal } from 'lucide-react';
import { initAudio } from '../utils/audioManager';
import HeaderSection from '../components/IndexPage/HeaderSection';
import FeaturesSection from '../components/IndexPage/FeaturesSection';
import FooterSection from '../components/IndexPage/FooterSection';

const Index = () => {
  // Initialize audio when component mounts
  useEffect(() => {
    initAudio();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-darkBg to-game-blue/20 text-white p-4 sm:p-8 relative pb-24 flex flex-col">
      <div className="max-w-5xl mx-auto flex-grow mb-8">
        <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-entrance">
          <HeaderSection />
          <FeaturesSection />
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default Index;
