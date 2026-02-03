import { motion } from "framer-motion";
import { useState } from "react";
import {
  Play,
  CheckCircle,
  Building,
  User,
  ArrowRight,
} from "lucide-react";
import { useLeadMagnet, industriasOptions, facturacionOptions } from "@/contexts/LeadMagnetContext";

export const DynamicVSLSection = () => {
  const { formData, currentStep, setCurrentStep } = useLeadMagnet();
  const [hasStarted, setHasStarted] = useState(false);

  const handleContinue = () => {
    setCurrentStep("form2");
    setTimeout(() => {
      document.getElementById("form2-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleStart = () => {
    setHasStarted(true);
    // Auto-continue after a brief moment
    setTimeout(handleContinue, 1500);
  };

  // Obtener labels amigables
  const nichoLabel = industriasOptions.find((n) => n.id === formData.nicho)?.label || formData.nicho;
  const factLabel = facturacionOptions.find((f) => f.id === formData.facturacion)?.label || formData.facturacion;

  if (currentStep !== "vsl" && currentStep !== "form2" && currentStep !== "action_plan" && currentStep !== "calendar") {
    return null;
  }

  return (
    <section id="vsl-section" className="py-12 md:py-20 px-4 md:px-6 bg-black">
      <div className="max-w-4xl mx-auto">
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

        {/* Diagnostic Summary Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900"
        >
          <div className="p-6 md:p-10">
            {!hasStarted ? (
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={handleStart}
                  className="w-20 h-20 md:w-28 md:h-28 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 cursor-pointer mx-auto mb-6"
                >
                  <Play className="w-8 h-8 md:w-12 md:h-12 text-primary-foreground ml-1 md:ml-2" fill="currentColor" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  ¡Hola {formData.nombre}!
                </h3>
                <p className="text-zinc-400 mb-6 text-sm md:text-base max-w-md mx-auto">
                  Preparamos un análisis inicial basado en tus respuestas. Hacé click para continuar con tu diagnóstico personalizado.
                </p>

                {/* Summary tags */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                  <span className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full text-xs md:text-sm flex items-center gap-1.5">
                    <Building className="w-3 h-3 md:w-4 md:h-4" /> {nichoLabel}
                  </span>
                  <span className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full text-xs md:text-sm flex items-center gap-1.5">
                    <User className="w-3 h-3 md:w-4 md:h-4" /> {factLabel}
                  </span>
                </div>

                <button
                  onClick={handleStart}
                  className="bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold hover:bg-primary/90 transition-all text-sm md:text-base inline-flex items-center gap-2"
                >
                  Ver mi diagnóstico
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-8 h-8 md:w-10 md:h-10 border-3 border-primary/30 border-t-primary rounded-full"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  Preparando tu diagnóstico...
                </h3>
                <p className="text-zinc-400 text-sm">
                  Te redirigimos en un momento
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Skip link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <button
            onClick={handleContinue}
            className="text-zinc-500 hover:text-zinc-300 text-sm underline underline-offset-4 transition-colors"
          >
            Continuar sin esperar
          </button>
        </motion.div>
      </div>
    </section>
  );
};
