import { motion } from "framer-motion";

const services = [
  {
    icon: "🚢",
    title: "Logística y Despacho",
    subtitle: null,
    desc: "Ya tenés proveedor y sabés lo que querés traer. Nosotros nos encargamos del flete, aduana y entrega.",
    cta: "Cotizá tu operación →",
  },
  {
    icon: "🔍",
    title: "Sourcing Personalizado",
    subtitle: "powered by B2BOX Pro",
    desc: "Necesitás un producto de China pero no tenés proveedor. Lo buscamos, negociamos y te lo traemos con precio cerrado.",
    cta: "Pedí tu cotización →",
  },
  {
    icon: "🏷️",
    title: "Desarrollo de Marca",
    subtitle: "powered by B2BOX Brands",
    desc: "Tenés una marca o negocio y querés tu propia línea de productos. Diseño, packaging, producción y entrega.",
    cta: "Agendá una reunión →",
  },
];

const cases = [
  {
    tag: "Electrónica",
    desc: "5.000 auriculares bluetooth desde Shenzhen. Tiempo total: 45 días puerta a puerta. Ahorro vs precio local: 40%.",
  },
  {
    tag: "Indumentaria",
    desc: "3.000 camperas para marca argentina. Diseño propio, packaging personalizado, producción en fábrica verificada. 60 días de fábrica a depósito.",
  },
  {
    tag: "Insumos industriales",
    desc: "Repuestos de maquinaria desde Guangzhou. Operación urgente resuelta en 20 días por vía aérea. Cliente operativo sin frenar producción.",
  },
];

export const ProcessSection = () => {
  return (
    <>
      {/* SECCIÓN 1 — ¿Qué necesitás? */}
      <section className="py-24 sm:py-32" id="servicios">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              ¿QUÉ NECESITÁS?
            </h2>
            <p className="text-muted-foreground text-lg">
              Cada negocio es distinto. Elegí tu camino.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-xl border border-border bg-card/50 hover:border-primary transition-colors flex flex-col"
              >
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 className="text-xl font-bold mb-1">{s.title}</h3>
                {s.subtitle && (
                  <span className="text-xs text-muted-foreground italic mb-3 block">
                    {s.subtitle}
                  </span>
                )}
                <p className="text-muted-foreground text-sm mb-6 flex-1">{s.desc}</p>
                <a
                  href="#quiz-section"
                  className="text-primary font-semibold text-sm hover:underline"
                >
                  {s.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 2 — Casos reales */}
      <section className="py-24 sm:py-32" id="casos">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              OPERACIONES REALES, <br />
              <span className="text-primary italic">RESULTADOS REALES.</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Algunos ejemplos de lo que hacemos todos los días.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <motion.div
                key={c.tag}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-muted/40 border-l-4 border-l-primary border border-border"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold mb-4">
                  {c.tag}
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
