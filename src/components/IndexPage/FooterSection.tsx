
import { Github, Bug } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="bg-card/90 backdrop-blur-md border-t border-white/10 py-3 px-4 text-sm text-muted-foreground mt-auto">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>
            Project by <a href="https://github.com/yashrajnayak" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Yashraj Nayak</a>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/yashrajnayak/kaun-banega-developer" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
              <Github size={16} />
              <span>GitHub Repo</span>
            </a>
            
            <a href="https://github.com/yashrajnayak/kaun-banega-developer/issues/new" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
              <Bug size={16} />
              <span>Report Bug/Feature</span>
            </a>
          </div>
        </div>
        
        <div className="text-xs text-center sm:text-right text-muted-foreground/70 mt-2">
          This is a fun community project not affiliated with GitHub.
          All prizes shown are for representation purposes only; no real prizes are involved.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
