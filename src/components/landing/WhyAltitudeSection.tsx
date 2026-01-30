import { motion } from "framer-motion";
import { User, MapPin, DollarSign, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: User,
    title: "Un solo contacto",
    description: "No coordinás entre forwarder, despachante, transportista y depósito. Un equipo, una comunicación."
  },
  {
    icon: MapPin,
    title: "Visibilidad total",
    description: "Sabés dónde está tu carga en cada momento. Tracking desde origen hasta entrega final."
  },
  {
    icon: DollarSign,
    title: "Precio cerrado",
    description: "Cotización integral sin sorpresas. Sabés el costo total antes de embarcar."
  }
];

export const WhyAltitudeSection = () => {
  return (
    <section className="py-32 px-6 bg-card/50" id="por-que">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
            ¿Por qué trabajar con un{" "}
            <span className="text-primary">solo operador</span>?
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
          className="text-center mt-16"
        >
          <a
            href="#proceso"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Ver cómo funciona <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
