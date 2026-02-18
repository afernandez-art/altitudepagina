import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Asesoramiento",
    description: "Analizamos tu producto, su viabilidad y la mejor estrategia arancelaria para Argentina.",
  },
  {
    number: "2",
    title: "Sourcing",
    description: "Buscamos proveedores confiables o auditamos a los que ya tenés. Negociamos precios y calidad.",
  },
  {
    number: "3",
    title: "Operación",
    description: "Logística internacional y despacho de aduana. Nosotros nos peleamos con los papeles.",
  },
  {
    number: "4",
    title: "Entrega Final",
    description: "Recibís la mercadería en tu depósito lista para vender. Sin vueltas, sin sorpresas.",
  },
];

export const ProcessSection = () => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6" id="proceso">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Tu mercadería, en <span className="text-primary">4 pasos.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Diseñamos un journey simple para que sepas exactamente qué está pasando en cada etapa.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bento-item text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <span className="text-xl font-black text-primary">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 tracking-tight">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="#quiz-section"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Cotizá gratis
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
