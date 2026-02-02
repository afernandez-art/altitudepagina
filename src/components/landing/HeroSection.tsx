import { motion } from "framer-motion";
import { Play, Calendar, CheckCircle } from "lucide-react";
export const HeroSection = () => {
  return <section className="relative py-16 md:py-24 px-6 overflow-hidden pt-32">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        
        
        <motion.h1 initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }} className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1]">
          <span className="italic text-zinc-500">Tu carga, nuestra responsabilidad.</span>
          <br />
          <span>De origen a destino, sin intermediarios.</span>
        </motion.h1>
        
        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Importaciones, transporte nacional y almacenamiento con un solo operador. 
          Simplificá tu logística y enfocate en tu negocio.
        </motion.p>
        
        {/* VSL Video Placeholder */}
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: 0.5
      }} className="relative max-w-4xl mx-auto mt-12 rounded-2xl overflow-hidden border border-zinc-800 bg-secondary aspect-video vsl-shadow group cursor-pointer">
          <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div whileHover={{
              scale: 1.1
            }} className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 animate-pulse-glow">
                <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* CTAs */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.6
      }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <a href="#lead-magnet-form" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-3">
            <Play className="w-5 h-5" />
            Ver Video Personalizado
          </a>
          <a href="#servicios" className="w-full sm:w-auto bg-foreground/5 hover:bg-foreground/10 border border-zinc-800 px-10 py-5 rounded-xl text-lg font-bold transition-all">
            Conocer Servicios
          </a>
        </motion.div>
        
        {/* Trust badges */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.7
      }} className="pt-8 flex flex-wrap justify-center items-center gap-4 text-zinc-500 text-sm font-medium">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" /> Sin compromiso
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" /> 15 Minutos
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" /> Solo Directores
          </span>
        </motion.div>
      </div>
    </section>;
};