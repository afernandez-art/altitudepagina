import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const credentials = [
  "Despachantes de aduana propios",
  "Red de agentes en los principales puertos del mundo",
  "Fletes marítimos, aéreos y terrestres",
  "Clasificación arancelaria y normativa",
  "Servicio integral puerta a puerta"
];

export const AboutSection = () => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6" id="nosotros">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs sm:text-sm font-semibold text-primary tracking-[0.15em] uppercase mb-3 block">
              Sobre nosotros
            </span>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-8">
              Comercio exterior <span className="text-gradient">sin complicaciones</span>
            </p>
            <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Somos un equipo de profesionales en comercio exterior con experiencia
                en operaciones de importación y exportación. Combinamos conocimiento
                aduanero con logística internacional para simplificar tu operación.
              </p>
              <p>
                Operamos desde Buenos Aires con conexiones en los principales puertos
                del mundo. Tu carga, nuestra responsabilidad.
              </p>
            </div>

            <motion.a
              href="#quiz-section"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-primary font-semibold mt-8 hover:gap-3 transition-all"
            >
              Cotizá tu operación <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 md:p-10 rounded-2xl bg-card border border-border/50"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6">Nuestras capacidades</h3>
            <ul className="space-y-4">
              {credentials.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground/90 text-sm sm:text-base">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
