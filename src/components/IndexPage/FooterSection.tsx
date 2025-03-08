import { Github, Bug } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="mt-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <a href="https://twitter.com/yashrajnayak" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
              Project by <span className="text-accent">@yashrajnayak</span>
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/yashrajnayak/kaun-banega-developer" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
              GitHub Repo
            </a>
            <a href="https://github.com/yashrajnayak/kaun-banega-developer/issues/new" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
              Report Bug/Feature
            </a>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground/70 mt-4">
          This is a fun community project not affiliated with GitHub.
          All prizes shown are for representation purposes only; no real prizes are involved.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
