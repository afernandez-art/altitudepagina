import { motion } from "framer-motion";
import { User, MapPin, DollarSign, ArrowRight, FileSearch } from "lucide-react";

const benefits = [
  {
    icon: User,
    title: "Un solo contacto",
    description: "No coordinás entre múltiples proveedores. Ya sea una importación, un envío nacional o tu almacén, tenés un solo equipo."
  },
  {
    icon: MapPin,
    title: "Visibilidad total",
    description: "Sabés dónde está tu mercadería en cada momento. Tracking en tiempo real para todas tus operaciones."
  },
  {
    icon: DollarSign,
    title: "Precio cerrado",
    description: "Cotización integral sin sorpresas. Sabés el costo total de tu operación antes de arrancar."
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
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase">
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
              className="group p-8 bg-background/50 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4 tracking-tight uppercase">{benefit.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed tracking-wide">{benefit.description}</p>
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
            className="inline-flex items-center gap-2 font-heading bg-primary text-primary-foreground px-8 py-4 text-sm font-bold tracking-[2px] uppercase hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <FileSearch className="w-5 h-5" />
            Cotizar mi operación
          </a>
          <a
            href="#proceso"
            className="inline-flex items-center gap-2 font-heading text-muted-foreground hover:text-foreground text-sm font-semibold tracking-[2px] uppercase transition-all"
          >
            Ver cómo funciona <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
