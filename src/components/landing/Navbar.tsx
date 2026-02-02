import { motion } from "framer-motion";
import { FileSearch } from "lucide-react";
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

        <div className="hidden md:flex items-center gap-8">
          <a href="#servicios" className="text-sm font-medium text-zinc-400 hover:text-foreground transition-colors">
            Servicios
          </a>
          <a href="#proceso" className="text-sm font-medium text-zinc-400 hover:text-foreground transition-colors">
            Cómo funciona
          </a>
          <a
            href="#quiz-section"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-bold tracking-tight transition-all flex items-center gap-2"
          >
            <FileSearch className="w-4 h-4" />
            Mi diagnóstico gratis
          </a>
        </div>
      </div>
    </motion.nav>
  );
};
