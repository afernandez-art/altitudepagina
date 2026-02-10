import { motion } from "framer-motion";
import { memo } from "react";
import { FileSearch, ChevronDown, CheckCircle, Truck, FileCheck, Package, Warehouse } from "lucide-react";
import heroImage from "@/assets/hero-warehouse.jpg";
import heroImageMobile from "@/assets/hero-warehouse-mobile.jpg";

const HeroBackground = memo(() => (
  <>
    <div className="absolute inset-0 z-0 block sm:hidden">
      <img src={heroImageMobile} alt="" className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
      <div className="absolute inset-0 bg-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
    </div>
    <div className="absolute inset-0 z-0 hidden sm:block">
      <img src={heroImage} alt="" className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
      <div className="absolute inset-0 bg-background/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
    </div>
  </>
));

HeroBackground.displayName = "HeroBackground";

export const HeroSection = () => {
  const scrollToQuiz = () => {
    document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToServices = () => {
    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85svh] flex items-center px-4 sm:px-6 overflow-hidden pt-24 pb-12">
      <HeroBackground />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="text-center space-y-5 sm:space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight uppercase"
          >
            <span className="text-muted-foreground">Tu carga,</span>
            <br />
            <span>nuestra</span>
            <br />
            <span className="text-primary">responsabilidad.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto font-light tracking-wide"
          >
            De origen a destino, sin intermediarios. Un solo operador para toda tu cadena logística.
          </motion.p>

          {/* Services inline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 gap-y-2 font-heading text-xs sm:text-sm tracking-[2px] uppercase text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <Package className="w-4 h-4 text-primary" />
              Forwarder
            </span>
            <span className="text-primary/30">|</span>
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-primary" />
              Aduana
            </span>
            <span className="text-primary/30">|</span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-primary" />
              Transporte
            </span>
            <span className="text-primary/30">|</span>
            <span className="flex items-center gap-1.5">
              <Warehouse className="w-4 h-4 text-primary" />
              Fulfillment
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4"
          >
            <button
              onClick={scrollToQuiz}
              className="w-full sm:w-auto font-heading bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-sm sm:text-base font-bold tracking-[2px] uppercase transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/20"
            >
              <FileSearch className="w-5 h-5" />
              Cotizar mi operación
            </button>
            <button
              onClick={scrollToServices}
              className="w-full sm:w-auto font-heading bg-foreground/5 hover:bg-foreground/10 border border-zinc-700 px-8 py-4 text-sm sm:text-base font-bold tracking-[2px] uppercase transition-all flex items-center justify-center gap-2"
            >
              Conocer más
              <ChevronDown className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-2 text-muted-foreground font-heading text-xs tracking-[2px] uppercase"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              +12 años
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Flota propia
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Importamos por vos
            </span>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/4 z-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
    </section>
  );
};
