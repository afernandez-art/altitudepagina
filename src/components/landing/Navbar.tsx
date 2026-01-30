import { motion } from "framer-motion";
import altitudeLogo from "@/assets/altitude-logo.png";

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass-nav"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <img src={altitudeLogo} alt="Altitude Logistics Group" className="h-8 w-auto" />
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
