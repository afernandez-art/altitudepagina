import { motion } from "framer-motion";
import { Ship, FileCheck, Globe, Shield, Clock, Zap, ArrowRight } from "lucide-react";

const forwardingFeatures = [
  { icon: Ship, label: "Flete marítimo y aéreo" },
  { icon: Globe, label: "Coordinación global puerta a puerta" },
  { icon: Clock, label: "Tracking en tiempo real" },
];

const aduaneroFeatures = [
  { icon: FileCheck, label: "Clasificación arancelaria" },
  { icon: Shield, label: "Normativa y compliance" },
  { icon: Zap, label: "Despacho ágil y seguro" },
];

export const ServicesSection = () => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6" id="servicios">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-semibold text-primary tracking-[0.15em] uppercase mb-3 block">
            Nuestros servicios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Dos pilares, <span className="text-gradient">una solución</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {/* Forwarding Internacional */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bento-item group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/40 rounded-t-2xl" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Ship className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Forwarding Internacional
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Coordinamos tu carga marítima, aérea y terrestre desde cualquier origen.
                China, USA, Europa y Latinoamérica con seguimiento en tiempo real.
              </p>

              <div className="space-y-3">
                {forwardingFeatures.map((feat) => (
                  <div key={feat.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <feat.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/80">{feat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Estudio Aduanero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bento-item group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/40 via-accent to-accent/80 rounded-t-2xl" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <FileCheck className="w-6 h-6 text-accent" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Estudio Aduanero
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Gestión integral de despachos, clasificación arancelaria y normativa.
                Despachantes propios, sin intermediarios innecesarios.
              </p>

              <div className="space-y-3">
                {aduaneroFeatures.map((feat) => (
                  <div key={feat.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/5 flex items-center justify-center flex-shrink-0">
                      <feat.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm text-foreground/80">{feat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#quiz-section"
            className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Cotizar operación
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
