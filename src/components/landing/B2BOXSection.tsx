import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "B2BOX.APP",
    description: "La solución ideal para quienes estan comenzando en importación. Sabés cuánto pagás de principio a fin, sin vueltas.",
    features: [
      "Factura nacional en pesos argentinos",
      "Sin trámites aduaneros",
      "Todo incluido: producto, flete, impuestos y entrega",
    ],
    cta: "Elegir B2BOX",
    highlight: true,
  },
  {
    name: "B2BOX PRO",
    tag: "Personalizado",
    description: "¿Buscás algo que no está en la App? Traemos productos específicos o personalizados a tu medida. Directo y al pie.",
    features: [
      "Productos a pedido",
      "Gestión de muestras",
      "Precio cerrado garantizado",
    ],
    cta: "Consultar PRO",
    highlight: false,
  },
  {
    name: "BRANDS",
    description: "Desarrollamos tu propia línea de productos en China. Desde el concepto hasta el packaging con tu logo.",
    features: [
      "Branding y Packaging personalizado",
      "Auditoría de fábricas",
      "Control de calidad en origen",
    ],
    cta: "Crear mi Marca",
    highlight: false,
  },
];

export const B2BOXSection = () => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6" id="b2box">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-semibold text-primary tracking-[0.15em] uppercase mb-3 block">
            Soluciones Premium
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Ecosistema <span className="text-gradient">B2BOX.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Tres formas de escalar tu negocio con la tranquilidad de un precio cerrado y sin sorpresas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bento-item relative overflow-hidden flex flex-col ${
                plan.highlight ? "border-primary/40" : ""
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/40 rounded-t-2xl" />
              )}
              {plan.tag && (
                <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3 w-fit">
                  {plan.tag}
                </span>
              )}

              <h3 className="text-2xl font-bold tracking-tight mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{plan.description}</p>

              <div className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{feat}</span>
                  </div>
                ))}
              </div>

              <a
                href="#quiz-section"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                    : "bg-foreground/5 hover:bg-foreground/10 border border-border"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Comparison bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-destructive/10 border border-destructive/20">
            <span className="text-sm text-destructive font-medium">Costos Variables e Inciertos ↗</span>
          </div>
          <span className="text-muted-foreground text-sm font-bold">VS</span>
          <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-primary/10 border border-primary/20">
            <span className="text-sm text-primary font-medium">Precio Fijo y Sin Vueltas →</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
