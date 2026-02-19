import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const chaosNodes = [
  "Proveedor", "Agente en China", "Freight forwarder", "Naviera",
  "Terminal", "Despachante", "Transporte interno", "Tu depósito"
];

const simpleNodes = ["Proveedor", "ADUANEX", "Tu depósito"];

const ChaosFlow = () => (
  <div className="w-full">
    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      {chaosNodes.map((node, i) => (
        <div key={node} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="px-3 py-1.5 border border-red-500/25 bg-red-500/5 rounded-md text-[10px] sm:text-xs text-red-300/80 font-medium whitespace-nowrap text-center w-full"
          >
            {node}
          </motion.div>
        </div>
      ))}
    </div>
  </div>
);

const SimpleFlow = () => (
  <div className="relative flex items-center justify-center gap-2 sm:gap-3">
    {simpleNodes.map((node, i) => (
      <div key={node} className="flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className={`px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap ${
            node === "ADUANEX"
              ? "border-2 border-primary bg-primary/10 text-primary font-bold text-sm sm:text-base shadow-[0_0_20px_hsl(var(--primary)/0.25)]"
              : "border border-primary/30 bg-primary/5 text-green-300/90"
          }`}
        >
          {node}
        </motion.div>
        {i < simpleNodes.length - 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 + 0.08 }}
            className="flex items-center flex-shrink-0 mx-1 sm:mx-2"
          >
            <div className="h-px w-4 sm:w-8 bg-primary/40" />
            <span className="text-primary/50 text-xs sm:text-sm">▶</span>
          </motion.div>
        )}
      </div>
    ))}
  </div>
);

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden" id="mundo1">
      <div className="hero-grid absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="inline-block px-4 py-1 border border-primary text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6">
          Comercio Internacional
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
          IMPORTAR ES UN <br />
          <span className="text-primary italic">DOLOR DE CABEZA</span>,<br />
          NOSOTROS LO HACEMOS <span className="text-primary">FÁCIL.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
          Somos Emanuel y Agustín. Te acompañamos en cada paso para que traer tus productos sea simple, rápido y sin vueltas. Olvidate de la burocracia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#quiz-section"
            className="bg-primary text-primary-foreground px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition-transform inline-flex items-center justify-center gap-2">
            Empezá ahora
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#historia"
            className="bg-card border border-border px-10 py-5 rounded-full text-lg font-bold hover:bg-muted transition-colors inline-flex items-center justify-center">
            Conocenos
          </a>
        </motion.div>
      </div>

      {/* Comparison illustration */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-0 items-stretch">
          {/* Chaos column */}
          <div className="rounded-2xl border border-red-500/15 bg-red-500/[0.03] p-6 sm:p-8 flex flex-col items-center justify-between relative overflow-hidden">
            <h3 className="text-sm font-bold uppercase tracking-widest text-red-400/80 mb-6">Cómo importás hoy</h3>
            <ChaosFlow />
            <p className="text-xs sm:text-sm text-red-400/60 mt-6 text-center font-medium">
              8 intermediarios. 8 contactos. 8 facturas.
            </p>
          </div>

          {/* VS badge */}
          <div className="flex items-center justify-center md:-mx-5 z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.3 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-card border-2 border-border flex items-center justify-center"
            >
              <span className="text-sm sm:text-base font-black text-muted-foreground">VS</span>
            </motion.div>
          </div>

          {/* Simple column */}
          <div className="rounded-2xl border border-primary/15 bg-primary/[0.03] p-6 sm:p-8 flex flex-col items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80 mb-6">Con ADUANEX</h3>
            <SimpleFlow />
            <p className="text-xs sm:text-sm text-primary/60 mt-6 text-center font-medium">
              Un solo contacto. Nosotros nos encargamos de todo.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
