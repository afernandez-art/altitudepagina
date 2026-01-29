import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass-nav"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-black text-sm">A</span>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">Altitude</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <a href="#servicios" className="text-sm font-medium text-zinc-400 hover:text-foreground transition-colors">
            Servicios
          </a>
          <a href="#contacto" className="text-sm font-medium text-zinc-400 hover:text-foreground transition-colors">
            Agendar Llamada
          </a>
          <a 
            href="#contacto" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-bold tracking-tight transition-all"
          >
            Hablar con un Experto
          </a>
        </div>
      </div>
    </motion.nav>
  );
};
