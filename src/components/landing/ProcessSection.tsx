import { motion } from "framer-motion";

const services = [
  {
    icon: "🚢",
    title: "Logística y Despacho",
    subtitle: null,
    desc: "Ya tenés proveedor y sabés lo que querés traer. Nosotros nos encargamos de la clasificación, asesoramiento, flete, aduana y entrega.",
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
    </>
  );
};
