import { motion } from "framer-motion";
import { useState } from "react";
import {
  Play,
  CheckCircle,
  Building,
  User,
  ArrowRight,
  Clock,
  Target,
  Zap,
} from "lucide-react";
import { useLeadMagnet, industriasOptions, facturacionOptions, desafiosOptions } from "@/contexts/LeadMagnetContext";

export const DynamicVSLSection = () => {
  const { formData, currentStep, setCurrentStep } = useLeadMagnet();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

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
  const nichoLabel = industriasOptions.find((n) => n.id === formData.nicho)?.label || formData.nicho;
  const factLabel = facturacionOptions.find((f) => f.id === formData.facturacion)?.label || formData.facturacion;
  const problemasLabels = formData.problematicas.map(p =>
    desafiosOptions.find(d => d.id === p)?.label || p
  );

  if (currentStep !== "vsl" && currentStep !== "form2" && currentStep !== "action_plan" && currentStep !== "calendar") {
    return null;
  }

  return (
    <section id="vsl-section" className="py-12 md:py-20 px-4 md:px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Personalization header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
            Diagnóstico generado para {formData.nombre || "vos"}
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-2">
            Tu Diagnóstico Personalizado
          </h2>
          <p className="text-sm md:text-base text-zinc-400">
            Basado en tu industria y necesidades específicas
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
                  ¡Hola {formData.nombre}!
                </h3>
                <p className="text-zinc-400 mb-6 text-sm md:text-base max-w-md mx-auto text-center">
                  Mirá este video con tu diagnóstico personalizado basado en lo que nos contaste.
                </p>
                <div className="flex items-center gap-2 text-zinc-500 text-xs md:text-sm">
                  <Clock className="w-4 h-4" />
                  <span>3 minutos</span>
                </div>
              </div>
            ) : (
              /* Video playing state - placeholder for actual video */
              <div className="absolute inset-0">
                {/*
                  AQUÍ VA EL VIDEO REAL
                  Podés reemplazar este div con:
                  - Un iframe de YouTube/Vimeo
                  - Un video tag con tu URL
                  - Un embed de cualquier plataforma
                */}
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-black p-8">
                  {/* Simulated video content - personalizado */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-2xl"
                  >
                    <div className="mb-8">
                      <motion.div
                        className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Target className="w-12 h-12 text-primary" />
                      </motion.div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Diagnóstico para {formData.empresa || formData.nombre}
                      </h3>
                      <p className="text-zinc-400 text-lg">
                        Industria: <span className="text-white font-semibold">{nichoLabel}</span>
                      </p>
                    </div>

                    {/* Problemas identificados */}
                    <div className="bg-zinc-800/50 rounded-xl p-6 mb-8">
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5 text-primary" />
                        Desafíos que identificamos
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {problemasLabels.map((label, i) => (
                          <span key={i} className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA to continue */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <p className="text-zinc-400 mb-4">
                        Completá algunas preguntas más para recibir tu Plan de Acción personalizado
                      </p>
                      <button
                        onClick={handleContinueToForm}
                        className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all text-base md:text-lg inline-flex items-center gap-2 shadow-2xl shadow-primary/30"
                      >
                        Continuar al siguiente paso
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Si tenés un video real, descomentá esto y comentá el div de arriba:
                <iframe
                  src="TU_URL_DE_VIDEO"
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
                */}
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
            <span className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <User className="w-4 h-4" /> {factLabel}
            </span>
          </motion.div>
        )}

        {/* Skip link - only show before playing */}
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <button
              onClick={handleContinueToForm}
              className="text-zinc-500 hover:text-zinc-300 text-sm underline underline-offset-4 transition-colors"
            >
              Saltar video y continuar
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
