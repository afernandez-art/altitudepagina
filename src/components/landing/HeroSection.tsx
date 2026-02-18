import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden" id="mundo1">
      {/* Dot grid background */}
      <div className="hero-grid absolute inset-0 z-0" />

      {/* Main hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="inline-block px-4 py-1 border border-primary text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
        >
          Comercio Internacional
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter"
        >
          IMPORTAR ES UN <br />
          <span className="text-primary italic">QUILOMBO</span>,<br />
          NOSOTROS LO HACEMOS FÁCIL.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed"
        >
          Somos Agustín y Emanuel. Te acompañamos en cada paso para que traer tus productos sea simple, rápido y sin vueltas. Olvidate de la burocracia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#quiz-section"
            className="bg-primary text-primary-foreground px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition-transform inline-flex items-center justify-center gap-2"
          >
            Empezá ahora
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#historia"
            className="bg-card border border-border px-10 py-5 rounded-full text-lg font-bold hover:bg-muted transition-colors inline-flex items-center justify-center"
          >
            Conocenos
          </a>
        </motion.div>
      </div>

      {/* Problem cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🌏", title: "Solución integral, de China a Argentina", desc: "Nos encargamos de todo el proceso: sourcing, logística, aduana y entrega. Vos solo recibís la mercadería." },
            { icon: "🏷️", title: "Desarrollamos tu línea de productos", desc: "Diseño, packaging, branding y producción con fábricas en China. Tu producto listo para vender con tu marca." },
            { icon: "📋", title: "Cotización desglosada al detalle", desc: "Sabés exactamente qué estás pagando. Cada costo discriminado, sin sorpresas ni letra chica." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-card/50 rounded-xl border border-border"
            >
              <span className="text-2xl mb-3 block">{item.icon}</span>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
