import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Cotización",
    description: "En 24hs"
  },
  {
    number: "02",
    title: "Coordinación",
    description: "Con tu proveedor"
  },
  {
    number: "03",
    title: "Embarque",
    description: "Track real"
  },
  {
    number: "04",
    title: "Aduana",
    description: "48hs prom."
  },
  {
    number: "05",
    title: "Entrega",
    description: "Donde digas"
  }
];

export const ProcessSection = () => {
  return (
    <section className="py-32 px-6" id="proceso">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4">
            Cómo trabajamos
          </h2>
          <p className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
            Tu carga en <span className="text-primary">5 pasos</span>
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
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-background border-2 border-primary flex items-center justify-center mb-6 relative z-10">
                  <span className="text-2xl font-black text-primary">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
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

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center flex-shrink-0 relative z-10">
                  <span className="text-lg font-black text-primary">{step.number}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-tight">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
