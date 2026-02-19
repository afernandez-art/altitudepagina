import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import agustinImg from "@/assets/agustin.jpeg";
import emanuelImg from "@/assets/emanuel.jpg";

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const { count, elementRef } = useCountUp({ end: value, duration: 2000 });
  return (
    <div ref={elementRef}>
      <span className="text-4xl sm:text-5xl font-black text-primary">
        +{count}{suffix}
      </span>
    </div>
  );
};

export const StorySection = () => {
  return (
    <section className="py-24 sm:py-32 bg-card/30" id="historia">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Nuestra Historia</h2>
            <p className="text-muted-foreground mt-4 max-w-lg">
              Dos amigos apasionados por el Comex que decidieron que traer cosas de afuera no tenía por qué ser un dolor de cabeza.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-lg flex items-center gap-2"
          >
            📈 10+ Años de experiencia
          </motion.div>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {/* Agustín */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-xl bg-card border border-border card-glow-lime transition-all"
          >
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img src={agustinImg} alt="Agustín" className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <h4 className="text-3xl font-black mb-1 tracking-tighter">AGUSTÍN</h4>
              <p className="text-primary font-bold mb-6">Especialista en Aduana</p>
              <p className="text-muted-foreground mb-8">
                Fanático de la eficiencia. Agustín se encarga de que cada documento sea perfecto para que Aduana no sea un problema sino un trámite.
              </p>
              <span className="inline-flex items-center gap-2 bg-muted px-6 py-3 rounded-full text-sm">
                @agusimportador
              </span>
            </div>
          </motion.div>

          {/* Emanuel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="group relative overflow-hidden rounded-xl bg-card border border-border card-glow-lime transition-all"
          >
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img src={emanuelImg} alt="Emanuel" className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <h4 className="text-3xl font-black mb-1 tracking-tighter">EMANUEL</h4>
              <p className="text-primary font-bold mb-6">Experto en Logística</p>
              <p className="text-muted-foreground mb-8">
                El que mueve los hilos. Emanuel tiene el mapa del mundo en la cabeza y sabe exactamente qué ruta tomar para que pagues menos.
              </p>
              <span className="inline-flex items-center gap-2 bg-muted px-6 py-3 rounded-full text-sm">
                @despachantedeaduanas
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
