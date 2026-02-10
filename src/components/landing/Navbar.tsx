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
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center cursor-pointer"
        >
          <img src={altitudeLogo} alt="Altitude Logistics Group" className="h-8 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#servicios" className="font-heading text-xs font-medium text-muted-foreground hover:text-primary transition-colors tracking-[3px] uppercase">
            Servicios
          </a>
          <a href="#proceso" className="font-heading text-xs font-medium text-muted-foreground hover:text-primary transition-colors tracking-[3px] uppercase">
            Cómo funciona
          </a>
          <a
            href="#quiz-section"
            className="font-heading bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 text-xs font-bold tracking-[2px] uppercase transition-all flex items-center gap-2"
          >
            <FileSearch className="w-4 h-4" />
            Cotizar operación
          </a>
        </div>
      </div>
    </motion.nav>
  );
};
