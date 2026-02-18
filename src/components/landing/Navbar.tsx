import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass-nav"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center cursor-pointer"
        >
          <span className="text-xl font-black tracking-tight">
            ADUA<span className="text-primary">NEX</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#servicios" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Servicios
          </a>
          <a href="#por-que" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Por qué Aduanex
          </a>
          <a href="#proceso" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Proceso
          </a>
          <a
            href="#quiz-section"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold tracking-tight transition-all flex items-center gap-2"
          >
            Cotizar operación
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
};
