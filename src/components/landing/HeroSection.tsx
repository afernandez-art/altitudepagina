import { motion } from "framer-motion";
import { memo } from "react";
import { ArrowRight, ChevronDown, Ship, FileCheck } from "lucide-react";
import heroImage from "@/assets/hero-canton-fair.jpeg";
import heroImageMobile from "@/assets/hero-canton-fair-mobile.jpeg";

const HeroBackground = memo(() => (
  <>
    {/* Mobile */}
    <div className="absolute inset-0 z-0 block sm:hidden">
      <img
        src={heroImageMobile}
        alt=""
        className="w-full h-full object-cover"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-background/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
    </div>
    {/* Desktop */}
    <div className="absolute inset-0 z-0 hidden sm:block">
      <img
        src={heroImage}
        alt=""
        className="w-full h-full object-cover"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-background/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/10" />
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
    <section className="relative min-h-[90svh] flex items-center px-4 sm:px-6 overflow-hidden pt-20 pb-12">
      <HeroBackground />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex justify-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs sm:text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Forwarder Internacional & Estudio Aduanero
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
          >
            Logística internacional
            <br />
            <span className="text-gradient">para el comercio moderno</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Simplificamos la importación y exportación de tu negocio
            con tecnología y experiencia. Sin burocracia.
          </motion.p>


          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2"
          >
            <button
              onClick={scrollToQuiz}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-primary/20"
            >
              Cotizar operación
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={scrollToServices}
              className="w-full sm:w-auto bg-foreground/5 hover:bg-foreground/10 border border-border px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              Conocer más
              <ChevronDown className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute bottom-0 left-1/4 z-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-0 z-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
};
