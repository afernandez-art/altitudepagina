import { Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-black text-xs">A</span>
            </div>
            <span className="text-lg font-black tracking-tighter uppercase">Altitude</span>
          </div>
          
          <nav className="flex gap-6">
            <a href="#" className="text-zinc-500 text-xs uppercase tracking-widest hover:text-foreground transition-colors">
              Términos
            </a>
            <a href="#" className="text-zinc-500 text-xs uppercase tracking-widest hover:text-foreground transition-colors">
              Privacidad
            </a>
          </nav>
        </div>
        
        <div className="text-zinc-500 text-xs font-mono">
          © 2024 ALTITUDE LOGÍSTICA PREMIUM S.A. | NACIONAL & FORWARDER.
        </div>
        
        <div className="flex gap-4">
          <a 
            href="#" 
            className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-foreground hover:border-foreground transition-all"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
