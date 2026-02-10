import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const credentials = [
  "Flota de transporte propia con cobertura nacional",
  "Centro de fulfillment en Pilar, Buenos Aires",
  "Despachantes de aduana propios",
  "Servicio integral de importación (De China a tu depósito)",
  "Contenedores consolidados propios"
];

export const AboutSection = () => {
  return (
    <section className="py-20 sm:py-24 px-6" id="nosotros">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-xs font-bold text-primary tracking-[4px] uppercase mb-4">
              Sobre nosotros
            </h2>
            <p className="font-display text-5xl md:text-6xl tracking-tight uppercase mb-8">
              Logística con <span className="text-primary">respaldo real</span>
            </p>
            <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed tracking-wide">
              <p>
                Somos un equipo de profesionales en logística con más de 12 años de
                experiencia. Manejamos importaciones, distribución nacional y almacenamiento
                con la misma dedicación y eficiencia.
              </p>
              <p>
                Operamos desde Buenos Aires con flota propia, depósito habilitado y
                cobertura en todo el país. Tenemos socios en los principales puertos del mundo.
              </p>
            </div>

            <motion.a
              href="#quiz-section"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 font-heading text-primary text-sm font-semibold mt-8 hover:gap-3 transition-all tracking-[2px] uppercase"
            >
              Cotizá tu operación <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 bg-card border border-border"
          >
            <h3 className="font-heading text-2xl font-bold mb-8 uppercase tracking-wider">Nuestras credenciales</h3>
            <ul className="space-y-5">
              {credentials.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-body text-foreground tracking-wide">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
