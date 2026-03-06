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
          {/* Emanuel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-xl bg-card border border-border card-glow-lime transition-all"
          >
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img src={emanuelImg} alt="Emanuel Gallano" className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <h4 className="text-3xl font-black mb-1 tracking-tighter">EMANUEL GALLANO</h4>
              <p className="text-primary font-bold mb-6">Lic. en Comercio Internacional y Despachante de Aduana</p>
              <p className="text-muted-foreground mb-8">
                Con 10 años de trayectoria global, fundé Aduanex y el Club de Importadores con una misión clara: revolucionar y modernizar un sector que operaba con reglas del pasado. Estoy transformando el comercio exterior argentino, eliminando fricciones y liderando el cambio hacia una operativa digital, ágil y eficiente.
              </p>
              <span className="inline-flex items-center gap-2 bg-muted px-6 py-3 rounded-full text-sm">
                @despachantedeaduanas
              </span>
            </div>
          </motion.div>

          {/* Agustín */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="group relative overflow-hidden rounded-xl bg-card border border-border card-glow-lime transition-all"
          >
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img src={agustinImg} alt="Agustín" className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <h4 className="text-3xl font-black mb-1 tracking-tighter">AGUSTÍN FERNÁNDEZ</h4>
              <p className="text-primary font-bold mb-6">Importador & Tech Builder</p>
              <p className="text-muted-foreground mb-8">
                Llevo 8 años importando. En ese camino entendí que el problema no era la aduana, sino lo difícil que se lo hacían al que quería importar. Por eso creé un servicio modernizado con tecnología, donde el proceso es simple, transparente y sin vueltas. Tu único trabajo es hacer crecer tu negocio — traer la mercadería es el mío.
              </p>
              <span className="inline-flex items-center gap-2 bg-muted px-6 py-3 rounded-full text-sm">
                @agusimportador
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
