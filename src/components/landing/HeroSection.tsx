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
          className="inline-block px-4 py-1 border border-primary text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6">

          Comercio Internacional
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">

          IMPORTAR ES UN <br />
          <span className="text-primary italic">DOLOR DE CABEZA</span>,<br />
          NOSOTROS LO HACEMOS <span className="text-primary">FÁCIL.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">Somos Emanuel y Agustín. Te acompañamos en cada paso para que traer tus productos sea simple, rápido y sin vueltas. Olvidate de la burocracia.


        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">

          <a
            href="#quiz-section"
            className="bg-primary text-primary-foreground px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition-transform inline-flex items-center justify-center gap-2">

            Empezá ahora
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#historia"
            className="bg-card border border-border px-10 py-5 rounded-full text-lg font-bold hover:bg-muted transition-colors inline-flex items-center justify-center">

            Conocenos
          </a>
        </motion.div>
      </div>

      {/* Value proposition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto px-6 pb-20">

        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed text-center">
          Sabemos que tu negocio necesita <span className="text-primary font-semibold">mejores márgenes</span>, no más intermediarios. Mientras otros despachantes te mandan un PDF y desaparecen, nosotros nos sentamos con vos, te damos <span className="text-primary font-semibold">números reales</span> y hacemos que cada operación sea <span className="text-primary font-semibold">más rentable</span>.
        </p>
      </motion.div>
    </section>);

};