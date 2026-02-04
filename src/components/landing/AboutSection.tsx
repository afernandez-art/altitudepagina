import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const credentials = [
  "Flota de transporte propia con cobertura nacional",
  "Depósito fiscal habilitado y centro de fulfillment",
  "Despachantes de aduana propios",
  "Sistema de tracking en tiempo real",
  "Atención 24/7 para urgencias"
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
            <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4">
              Sobre nosotros
            </h2>
            <p className="text-4xl md:text-5xl font-black tracking-tighter mb-8">
              Logística con <span className="text-primary">respaldo real</span>
            </p>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Somos un equipo de profesionales en logística con más de 12 años de 
                experiencia. Manejamos importaciones, distribución nacional y almacenamiento 
                con la misma dedicación y eficiencia.
              </p>
              <p>
                Operamos desde Buenos Aires con flota propia, depósito habilitado y 
                cobertura en todo el país. Partners en los principales puertos del mundo.
              </p>
            </div>

            <motion.a
              href="#quiz-section"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-primary font-semibold mt-8 hover:gap-3 transition-all"
            >
              Obtené tu diagnóstico gratis <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-2xl bg-card border border-border"
          >
            <h3 className="text-2xl font-bold mb-8">Nuestras credenciales</h3>
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
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
