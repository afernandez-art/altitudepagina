import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-10 md:p-16 rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-center overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl -ml-24 -mb-24" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-primary-foreground tracking-tight mb-4">
              Tu carga donde la necesitas
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Importación y exportación simplificada. Hablá con un experto hoy.
            </p>

            <a
              href="#quiz-section"
              className="inline-flex items-center gap-3 bg-primary-foreground text-primary px-10 py-5 rounded-xl font-bold hover:bg-primary-foreground/90 transition-all shadow-lg text-lg"
            >
              Cotizar operación
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
