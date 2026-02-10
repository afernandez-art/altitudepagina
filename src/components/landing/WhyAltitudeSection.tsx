import { motion } from "framer-motion";
import { User, MapPin, DollarSign, ArrowRight, FileSearch } from "lucide-react";

const benefits = [
  {
    icon: User,
    title: "Un solo contacto 📱",
    description: "Basta de hablar con 10 proveedores distintos. Un equipo, un WhatsApp, todo resuelto."
  },
  {
    icon: MapPin,
    title: "Sabés todo, siempre 📍",
    description: "Tracking real de tu carga. Nada de 'te aviso mañana'. Sabés dónde está en cada momento."
  },
  {
    icon: DollarSign,
    title: "Precio cerrado, sin humo 💰",
    description: "Te decimos cuánto sale y punto. Sin costos ocultos, sin sorpresas al final."
  }
];

export const WhyAltitudeSection = () => {
  return (
    <section className="py-20 sm:py-24 px-6 bg-card/50" id="por-que">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase">
            ¿Por qué elegirnos?{" "}
            <span className="text-primary">Porque no jodemos 🤘</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group p-8 rounded-2xl bg-background/50 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#quiz-section"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <FileSearch className="w-5 h-5" />
            Cotizar mi operación
          </a>
          <a
            href="#proceso"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold transition-all"
          >
            Ver cómo funciona <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
