import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="glass-nav fixed top-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-xl font-bold tracking-tighter">
            ADUA<span className="text-primary">NEX</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#historia" className="hover:text-primary transition-colors uppercase tracking-widest">
            Personal
          </a>
          <a href="#b2box" className="hover:text-secondary transition-colors uppercase tracking-widest">
            B2BOX
          </a>
          <a href="#pasos" className="hover:text-primary transition-colors uppercase tracking-widest">
            Cómo trabajamos
          </a>
          <a
            href="#quiz-section"
            className="bg-foreground text-background px-6 py-2 rounded-full font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            COTIZAR
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 pb-4 flex flex-col gap-4 text-sm font-medium"
        >
          <a href="#historia" onClick={() => setMobileOpen(false)} className="hover:text-primary transition-colors uppercase tracking-widest">Personal</a>
          <a href="#b2box" onClick={() => setMobileOpen(false)} className="hover:text-secondary transition-colors uppercase tracking-widest">B2BOX</a>
          <a href="#pasos" onClick={() => setMobileOpen(false)} className="hover:text-primary transition-colors uppercase tracking-widest">Cómo trabajamos</a>
          <a href="#quiz-section" onClick={() => setMobileOpen(false)} className="bg-foreground text-background px-6 py-2 rounded-full font-bold text-center hover:bg-primary hover:text-primary-foreground transition-colors">COTIZAR</a>
        </motion.div>
      )}
    </nav>
  );
};
