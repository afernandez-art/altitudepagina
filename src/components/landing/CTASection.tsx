import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-12 md:p-16 rounded-3xl bg-primary text-center overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl -ml-24 -mb-24" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-primary-foreground tracking-tighter mb-8">
              ¿Listo para simplificar tu logística?
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-xl font-bold hover:bg-primary-foreground/90 transition-all shadow-lg"
              >
                Solicitar cotización <ArrowRight className="w-5 h-5" />
              </a>
              
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary-foreground/10 transition-all"
              >
                <Calendar className="w-5 h-5" /> Agendar llamada
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
