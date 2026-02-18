import { motion } from "framer-motion";
import { Eye, Zap, MessageCircle, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: Eye,
    title: "Transparencia total",
    description: "Visibilidad completa de tu operación. Sabés dónde está tu carga, cuánto cuesta y cuándo llega. Sin costos ocultos.",
    accent: "primary",
  },
  {
    icon: Zap,
    title: "Agilidad en procesos",
    description: "Despacho aduanero simplificado. Reducimos tiempos y eliminamos la burocracia innecesaria de tu cadena logística.",
    accent: "accent",
  },
  {
    icon: MessageCircle,
    title: "Comunicación directa",
    description: "Sin intermediarios innecesarios. Un ejecutivo dedicado que conoce tu operación y responde cuando lo necesitás.",
    accent: "primary",
  },
];

export const WhyAltitudeSection = () => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-card/30" id="por-que">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-semibold text-primary tracking-[0.15em] uppercase mb-3 block">
            Por qué Aduanex
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Logística <span className="text-gradient">inteligente</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="group p-6 sm:p-8 rounded-2xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                benefit.accent === "accent"
                  ? "bg-accent/10 group-hover:bg-accent/20"
                  : "bg-primary/10 group-hover:bg-primary/20"
              }`}>
                <benefit.icon className={`w-6 h-6 ${
                  benefit.accent === "accent" ? "text-accent" : "text-primary"
                }`} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 tracking-tight">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#quiz-section"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Cotizar operación
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#proceso"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-all"
          >
            Ver cómo trabajamos <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
