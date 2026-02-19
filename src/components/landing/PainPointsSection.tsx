import { motion } from "framer-motion";
import { EyeOff, MapPin, ShieldAlert, FileText } from "lucide-react";

const painPoints = [
  {
    icon: EyeOff,
    title: "Costos Ocultos",
    description: "Sorpresas desagradables al final del proceso. Lo que era negocio, termina siendo pérdida.",
  },
  {
    icon: MapPin,
    title: "Falta de Claridad",
    description: "No sabés dónde está tu mercadería ni cuánto falta para que llegue a tus manos.",
  },
  {
    icon: ShieldAlert,
    title: "Miedo a la Aduana",
    description: "El terror constante a que te traben el contenedor sin razón aparente.",
  },
  {
    icon: FileText,
    title: "Burocracia Infinita",
    description: "Papelerío interminable que te saca las ganas de crecer y expandir tu negocio.",
  },
];

export const PainPointsSection = () => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6" id="problemas">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Importar en Argentina es un
            <br />
            dolor de cabeza. <span className="text-gradient italic">Lo sabemos.</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
            Llevamos años viendo cómo emprendedores pierden plata por no tener las reglas claras.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bento-item group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 tracking-tight">{point.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-lg sm:text-xl text-muted-foreground"
        >
          Por eso creamos una forma diferente de importar.{" "}
          <span className="text-foreground font-semibold">Menos estrés, más resultados.</span>
        </motion.p>
      </div>
    </section>
  );
};
