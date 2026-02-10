import { motion } from "framer-motion";
import { FileSearch, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Consulta",
    description: "Entendemos tu operación",
    detail: "Analizamos tu flujo logístico actual, identificamos cuellos de botella y oportunidades de mejora."
  },
  {
    number: "02",
    title: "Propuesta",
    description: "Cotización en 24hs",
    detail: "Te presentamos una solución integral con costos claros y sin sorpresas. Todo en un solo presupuesto."
  },
  {
    number: "03",
    title: "Ejecución",
    description: "Nos encargamos de todo",
    detail: "Coordinamos proveedores, documentación, transporte y aduana. Vos solo recibís tu mercadería."
  },
  {
    number: "04",
    title: "Tu Ejecutivo",
    description: "Acompañamiento 1 a 1",
    detail: "Te asignamos un ejecutivo de cuenta dedicado que conoce tu operación y está disponible cuando lo necesites."
  },
  {
    number: "05",
    title: "Entrega",
    description: "Donde lo necesites",
    detail: "Entregamos en tu depósito, local o directamente a tus clientes. Cobertura en todo el país."
  }
];

export const ProcessSection = () => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-20 px-6" id="proceso">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4">
            Cómo trabajamos
          </h2>
          <p className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
            Tu operación en <span className="text-primary">5 pasos</span>
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Connection line */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-border" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-12 left-0 right-0 h-0.5 bg-primary origin-left"
          />

          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group cursor-pointer"
                onMouseEnter={() => setExpandedStep(step.number)}
                onMouseLeave={() => setExpandedStep(null)}
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-background border-2 border-primary flex items-center justify-center mb-6 relative z-10 group-hover:bg-primary group-hover:border-primary transition-all">
                  <span className="text-2xl font-black text-primary group-hover:text-primary-foreground transition-colors">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm mb-1">{step.description}</p>
                <ChevronDown className={`w-4 h-4 mx-auto text-primary/50 transition-transform duration-200 ${expandedStep === step.number ? 'rotate-180' : ''}`} />

                {/* Expanded detail on hover */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: expandedStep === step.number ? 1 : 0,
                    height: expandedStep === step.number ? "auto" : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-primary/80 bg-primary/5 rounded-lg p-3 mt-2">
                    {step.detail}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary origin-top"
          />

          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="cursor-pointer"
                onClick={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center flex-shrink-0 relative z-10 transition-all ${expandedStep === step.number ? 'bg-primary' : ''}`}>
                    <span className={`text-lg font-black transition-colors ${expandedStep === step.number ? 'text-primary-foreground' : 'text-primary'}`}>{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold uppercase tracking-tight">{step.title}</h3>
                        <p className="text-muted-foreground text-sm">{step.description}</p>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-primary/60 transition-transform duration-200 shrink-0 ${expandedStep === step.number ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Expanded detail on tap */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: expandedStep === step.number ? 1 : 0,
                    height: expandedStep === step.number ? "auto" : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden ml-[88px]"
                >
                  <p className="text-sm text-primary/90 bg-primary/10 rounded-lg p-3 mt-3">
                    {step.detail}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA al quiz */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#quiz-section"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <FileSearch className="w-5 h-5" />
            Cotizar mi operación
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
