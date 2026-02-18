import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "ASESORAMOS", desc: "Analizamos qué querés traer y te decimos si es viable y cuánto te va a costar." },
  { number: "02", title: "BUSCAMOS", desc: "Contactamos proveedores y negociamos las mejores tarifas de flete internacional." },
  { number: "03", title: "MANEJAMOS", desc: "Hacemos todo el papeleo aduanero y legal. Vos solo esperás la notificación." },
  { number: "04", title: "ENTREGAMOS", desc: "Llevamos la mercadería hasta tu depósito o puerta. Listo para vender." },
];

export const ProcessSection = () => {
  return (
    <section className="py-24 sm:py-32" id="pasos">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-20 text-center tracking-tighter"
        >
          EL VIAJE DE TU CARGA <br />
          <span className="text-primary italic">EN 4 PASOS</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-border z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center p-6 group"
            >
              <div className="w-24 h-24 rounded-full bg-card border-4 border-border flex items-center justify-center mb-6 group-hover:border-primary transition-colors">
                <span className="text-4xl font-black text-primary">{step.number}</span>
              </div>
              <h4 className="text-xl font-bold mb-3">{step.title}</h4>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
