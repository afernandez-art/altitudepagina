import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const { count, elementRef } = useCountUp({ end: value, duration: 2000 });
  return (
    <div ref={elementRef}>
      <span className="text-4xl sm:text-5xl font-black text-primary">
        +{count}{suffix}
      </span>
    </div>
  );
};

export const StorySection = () => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-card/30" id="historia">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <span className="text-xs sm:text-sm font-semibold text-primary tracking-[0.15em] uppercase">
            Nuestra Historia
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Story text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">
              De colegas a socios con una{" "}
              <span className="italic text-gradient">misión clara.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-8">
              Nos conocimos en el fragor de la aduana, gestionando despachos imposibles.
              Descubrimos que compartíamos la misma frustración: la falta de transparencia del sistema.
              Agustín traía la visión comercial y el sourcing, Emanuel la experiencia técnica y aduanera.
              Juntos, decidimos que importar no tiene por qué ser una pesadilla.
            </p>

            <div className="flex gap-12">
              <div>
                <AnimatedCounter value={500} />
                <p className="text-muted-foreground text-sm mt-1">Contenedores gestionados</p>
              </div>
              <div>
                <span className="text-4xl sm:text-5xl font-black text-primary">100%</span>
                <p className="text-muted-foreground text-sm mt-1">Transparencia en costos</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Team cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Agustín */}
            <div className="bento-item flex gap-5 items-center">
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0 text-2xl font-black text-primary">
                A
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Agustín</h3>
                <p className="text-primary text-sm font-medium">@agusimportador</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Especialista en Sourcing Estratégico y Negociación Internacional.
                </p>
              </div>
            </div>

            {/* Emanuel */}
            <div className="bento-item flex gap-5 items-center">
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0 text-2xl font-black text-primary">
                E
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Emanuel</h3>
                <p className="text-primary text-sm font-medium">@despachantedeaduanas</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Despachante de Aduana matriculado. El cerebro detrás de la logística técnica.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
