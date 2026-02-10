import { motion } from "framer-motion";
import { FileSearch, ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-12 md:p-16 bg-primary text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl -ml-24 -mb-24" />

          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-6xl text-primary-foreground tracking-tight uppercase mb-4">
              ¿Listo para optimizar tu logística?
            </h2>
            <p className="font-body text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto tracking-wide">
              Obtené una cotización personalizada para tu operación logística
            </p>

            <a
              href="#quiz-section"
              className="inline-flex items-center gap-3 font-heading bg-primary-foreground text-primary px-10 py-5 font-bold hover:bg-primary-foreground/90 transition-all shadow-lg text-sm tracking-[2px] uppercase"
            >
              <FileSearch className="w-6 h-6" />
              Cotizar mi operación
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
