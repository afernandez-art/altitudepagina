import { motion } from "framer-motion";
import { Play, ChevronDown, CheckCircle, Truck, FileCheck, Package, Warehouse } from "lucide-react";

export const HeroSection = () => {
  const scrollToQuiz = () => {
    document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center px-6 overflow-hidden pt-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                Logística integral para importadores
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]"
            >
              <span className="text-zinc-400">Tu carga,</span>
              <br />
              <span>nuestra responsabilidad.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-zinc-400 max-w-lg"
            >
              De origen a destino, sin intermediarios. Forwarding, aduana, transporte y fulfillment con un solo operador.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={scrollToQuiz}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/20"
              >
                <Play className="w-5 h-5" />
                Quiero mi video personalizado
              </button>
              <button
                onClick={scrollToServices}
                className="bg-foreground/5 hover:bg-foreground/10 border border-zinc-800 px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2"
              >
                Conocer más
                <ChevronDown className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-x-6 gap-y-2 text-zinc-500 text-sm"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                +12 años de experiencia
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Flota propia
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Despacho en 48hs
              </span>
            </motion.div>
          </div>

          {/* Right - Visual Services Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 rounded-2xl border border-zinc-800 hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-1">Forwarding</h3>
              <p className="text-sm text-zinc-500">Importación desde cualquier origen</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 rounded-2xl border border-zinc-800 hover:border-primary/50 transition-all mt-8"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-1">Aduana</h3>
              <p className="text-sm text-zinc-500">Despacho express en 48hs</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 rounded-2xl border border-zinc-800 hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-1">Transporte</h3>
              <p className="text-sm text-zinc-500">Cobertura nacional con flota propia</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 rounded-2xl border border-zinc-800 hover:border-primary/50 transition-all mt-8"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <Warehouse className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-1">Fulfillment</h3>
              <p className="text-sm text-zinc-500">Almacenamiento y distribución B2B</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-1/4 -z-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
    </section>
  );
};
