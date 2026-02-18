import { motion } from "framer-motion";
import { memo } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
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
  const scrollToStory = () => {
    document.getElementById("historia")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90svh] flex items-center px-4 sm:px-6 overflow-hidden pt-20 pb-12">
      <HeroBackground />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="space-y-6 sm:space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs sm:text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Importaciones sin vueltas
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
          >
            Importaciones
            <br />
            <span className="text-gradient italic">sin vueltas</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="max-w-2xl"
          >
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Somos Agustín y Emanuel.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mt-2">
              Te ayudamos a importar mercadería a Argentina con transparencia real.
              Olvidate del bardo aduanero y los costos que aparecen a último momento.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
          >
            <button
              onClick={scrollToQuiz}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-primary/20"
            >
              Cotizá gratis
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={scrollToStory}
              className="w-full sm:w-auto bg-foreground/5 hover:bg-foreground/10 border border-border px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              Nuestra historia
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
