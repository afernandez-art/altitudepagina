import { motion } from "framer-motion";
import { FileSearch, ChevronDown, CheckCircle, Truck, FileCheck, Package, Warehouse } from "lucide-react";
export const HeroSection = () => {
  const scrollToQuiz = () => {
    document.getElementById("quiz-section")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  const scrollToServices = () => {
    document.getElementById("servicios")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-[100svh] flex items-center px-4 sm:px-6 overflow-hidden pt-6 pb-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center space-y-6 sm:space-y-8">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }}>
            
          </motion.div>

          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
            <span className="text-zinc-400">Tu carga,</span>
            <br />
            <span>nuestra responsabilidad.</span>
          </motion.h1>

          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto">
            De origen a destino, sin intermediarios. Un solo operador para toda tu cadena logística.
          </motion.p>

          {/* Services inline */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.35
        }} className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 gap-y-2 text-sm sm:text-base text-zinc-300">
            <span className="flex items-center gap-1.5">
              <Package className="w-4 h-4 text-primary" />
              Forwarder
            </span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-primary" />
              Aduana
            </span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-primary" />
              Transporte
            </span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1.5">
              <Warehouse className="w-4 h-4 text-primary" />
              Fulfillment
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <button onClick={scrollToQuiz} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-4 rounded-xl text-base sm:text-lg font-bold transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-2xl shadow-primary/20">
              <FileSearch className="w-5 h-5" />
              Quiero mi diagnóstico gratis
            </button>
            <button onClick={scrollToServices} className="w-full sm:w-auto bg-foreground/5 hover:bg-foreground/10 border border-zinc-800 px-6 sm:px-8 py-4 rounded-xl text-base sm:text-lg font-bold transition-all flex items-center justify-center gap-2">
              Conocer más
              <ChevronDown className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.5
        }} className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-zinc-500 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              +12 años
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Flota propia
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              48hs aduana
            </span>
          </motion.div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-1/4 -z-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
    </section>;
};