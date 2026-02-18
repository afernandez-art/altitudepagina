import { motion } from "framer-motion";
import { useState } from "react";
import {
  Play,
  CheckCircle,
  Building,
  Target,
  ArrowRight,
  Clock,
} from "lucide-react";
import {
  useLeadMagnet,
  nichoOptions,
  getSituacionTitulo,
} from "@/contexts/LeadMagnetContext";

export const DynamicVSLSection = () => {
  const { formData, currentStep, setCurrentStep } = useLeadMagnet();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleContinueToForm = () => {
    setCurrentStep("form2");
    setTimeout(() => {
      document.getElementById("form2-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  // Obtener labels amigables
  const nichoLabel = formData.nicho === "otro" && formData.nichoOtro
    ? formData.nichoOtro
    : nichoOptions.find((n) => n.id === formData.nicho)?.label || formData.nicho;

  const situacionLabel = getSituacionTitulo(formData.situacion);

  if (currentStep !== "vsl" && currentStep !== "form2" && currentStep !== "whatsapp_redirect") {
    return null;
  }

  return (
    <section id="vsl-section" className="py-12 md:py-20 px-4 md:px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
            Video informativo
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-2">
            Conocé cómo podemos ayudarte
          </h2>
          <p className="text-sm md:text-base text-zinc-400">
            Te mostramos cómo trabajamos y qué soluciones tenemos para vos
          </p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 mb-8"
        >
          <div className="aspect-video relative bg-gradient-to-br from-zinc-800 to-zinc-900">
            {!isPlaying ? (
              /* Pre-play state */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={handlePlayVideo}
                  className="w-20 h-20 md:w-28 md:h-28 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 cursor-pointer mb-6"
                >
                  <Play className="w-8 h-8 md:w-12 md:h-12 text-primary-foreground ml-1 md:ml-2" fill="currentColor" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 text-center">
                  Mirá este video antes de continuar
                </h3>
                <p className="text-zinc-400 mb-6 text-sm md:text-base max-w-md mx-auto text-center">
                  Te explicamos cómo funciona nuestro servicio y cómo podemos ayudarte con tu operación.
                </p>
                <div className="flex items-center gap-2 text-zinc-500 text-xs md:text-sm">
                  <Clock className="w-4 h-4" />
                  <span>3 minutos</span>
                </div>
              </div>
            ) : (
              /* Video playing state - YouTube embed */
              <div className="absolute inset-0">
                <iframe
                  src="https://www.youtube.com/embed/NVLgkXylEuQ?autoplay=1&rel=0"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video explicativo ADUANEX"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Summary tags below video */}
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 justify-center mb-8"
          >
            <span className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <Building className="w-4 h-4" /> {nichoLabel}
            </span>
            {situacionLabel && (
              <span className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <Target className="w-4 h-4" /> {situacionLabel.length > 40 ? situacionLabel.slice(0, 40) + "..." : situacionLabel}
              </span>
            )}
          </motion.div>
        )}

        {/* CTA - different state based on video playing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          {isPlaying ? (
            /* Show CTA when video is playing */
            <button
              onClick={handleContinueToForm}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all text-base md:text-lg inline-flex items-center gap-2 shadow-2xl shadow-primary/30"
            >
              Continuar al siguiente paso
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            /* Show skip link before playing */
            <button
              onClick={handleContinueToForm}
              className="text-zinc-500 hover:text-zinc-300 text-sm underline underline-offset-4 transition-colors"
            >
              Saltar video y continuar
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};
