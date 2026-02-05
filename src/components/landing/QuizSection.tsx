import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  FileSearch,
  CheckCircle,
  Lock,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import {
  useLeadMagnet,
  nichoOptions,
  situacionOptions,
  problematicasPorSituacion,
  facturacionOptions,
  SituacionType,
} from "@/contexts/LeadMagnetContext";
import { Progress } from "@/components/ui/progress";

export const QuizSection = () => {
  const { formData, updateFormData, saveToStorage } = useLeadMagnet();
  const [quizStep, setQuizStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showNichoOtro, setShowNichoOtro] = useState(false);

  const totalSteps = 4;
  const progress = ((quizStep + 1) / totalSteps) * 100;

  // Get dynamic problematicas based on selected situacion
  const currentProblematicas = formData.situacion
    ? problematicasPorSituacion[formData.situacion]
    : [];

  const handleNichoSelect = (id: string) => {
    updateFormData({ nicho: id });
    if (id === "otro") {
      setShowNichoOtro(true);
    } else {
      setShowNichoOtro(false);
      setTimeout(() => setQuizStep(1), 300);
    }
  };

  const handleNichoOtroSubmit = () => {
    if (formData.nichoOtro.trim()) {
      setTimeout(() => setQuizStep(1), 300);
    }
  };

  const handleSituacionSelect = (id: SituacionType) => {
    updateFormData({ situacion: id, problematica: "" }); // Reset problematica when changing situacion
    setTimeout(() => setQuizStep(2), 300);
  };

  const handleProblematicaSelect = (id: string) => {
    updateFormData({ problematica: id });
    setTimeout(() => setQuizStep(3), 300);
  };

  const handleFacturacionSelect = (id: string) => {
    updateFormData({ facturacion: id });
    // Save data to localStorage for the new tab
    setTimeout(() => {
      saveToStorage();
      setIsCompleted(true);
      // Open video in new tab
      window.open("/video-personalizado", "_blank");
    }, 300);
  };

  const canProceedStep1 = formData.nicho && (formData.nicho !== "otro" || formData.nichoOtro.trim());

  if (isCompleted) {
    return (
      <section id="quiz-section" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-secondary/30 to-background">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card p-8 sm:p-12 rounded-2xl border border-zinc-800"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black mb-4">¡Tu diagnóstico está listo!</h2>
            <p className="text-muted-foreground mb-8 text-sm sm:text-base">
              Abrimos una nueva pestaña con tu diagnóstico personalizado.
              <br />
              <span className="text-xs sm:text-sm">¿No se abrió? Hacé click abajo.</span>
            </p>
            <a
              href="/video-personalizado"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-primary/90 transition-all text-sm sm:text-base"
            >
              <FileSearch className="w-5 h-5" />
              Ver mi Diagnóstico
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz-section" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Diagnóstico gratis en 2 minutos
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-3 sm:mb-4">
            Obtené tu diagnóstico personalizado
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Respondé 4 preguntas rápidas y te preparamos un diagnóstico con soluciones para tu negocio
          </p>
        </motion.div>

        {/* Quiz Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-zinc-800 overflow-hidden"
        >
          {/* Progress bar */}
          <div className="p-4 sm:p-6 border-b border-zinc-800">
            <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
              <span className="text-muted-foreground">Paso {quizStep + 1} de {totalSteps}</span>
              <span className="text-primary font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Quiz Steps */}
          <div className="p-4 sm:p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Nicho */}
              {quizStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <h3 className="text-lg sm:text-xl font-bold">¿Qué tipo de productos importas/vendes?</h3>

                  <div className="relative">
                    <select
                      value={formData.nicho}
                      onChange={(e) => handleNichoSelect(e.target.value)}
                      className="w-full bg-secondary border border-zinc-700 rounded-xl px-4 py-4 outline-none transition-colors focus:border-primary appearance-none cursor-pointer text-sm sm:text-base"
                    >
                      <option value="">Selecciona una opción...</option>
                      {nichoOptions.map((nicho) => (
                        <option key={nicho.id} value={nicho.id}>
                          {nicho.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  </div>

                  {/* Campo para "Otro" */}
                  {showNichoOtro && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-3"
                    >
                      <input
                        type="text"
                        placeholder="Especifica qué tipo de productos..."
                        value={formData.nichoOtro}
                        onChange={(e) => updateFormData({ nichoOtro: e.target.value })}
                        className="w-full bg-secondary border border-zinc-700 rounded-xl px-4 py-3 outline-none transition-colors focus:border-primary text-sm sm:text-base"
                        autoFocus
                      />
                      <button
                        onClick={handleNichoOtroSubmit}
                        disabled={!formData.nichoOtro.trim()}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all text-sm"
                      >
                        Continuar <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Situación actual */}
              {quizStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <h3 className="text-lg sm:text-xl font-bold">Selecciona la opción que mejor describe tu situación:</h3>

                  <div className="space-y-3">
                    {situacionOptions.map((situacion) => {
                      const isSelected = formData.situacion === situacion.id;
                      return (
                        <motion.button
                          key={situacion.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleSituacionSelect(situacion.id)}
                          className={`w-full p-4 sm:p-5 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          <p className="font-bold text-sm sm:text-base mb-1">{situacion.titulo}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{situacion.descripcion}</p>
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="flex justify-start pt-4">
                    <button
                      onClick={() => setQuizStep(0)}
                      className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Anterior</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Problemáticas específicas */}
              {quizStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <h3 className="text-lg sm:text-xl font-bold">¿Cuál es tu principal desafío?</h3>

                  <div className="relative">
                    <select
                      value={formData.problematica}
                      onChange={(e) => handleProblematicaSelect(e.target.value)}
                      className="w-full bg-secondary border border-zinc-700 rounded-xl px-4 py-4 outline-none transition-colors focus:border-primary appearance-none cursor-pointer text-sm sm:text-base"
                    >
                      <option value="">Selecciona una opción...</option>
                      {currentProblematicas.map((prob) => (
                        <option key={prob.id} value={prob.id}>
                          {prob.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  </div>

                  <div className="flex justify-start pt-4">
                    <button
                      onClick={() => setQuizStep(1)}
                      className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Anterior</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Facturación */}
              {quizStep === 3 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <h3 className="text-lg sm:text-xl font-bold">¿Cuál es tu facturación mensual aproximada?</h3>

                  <div className="relative">
                    <select
                      value={formData.facturacion}
                      onChange={(e) => handleFacturacionSelect(e.target.value)}
                      className="w-full bg-secondary border border-zinc-700 rounded-xl px-4 py-4 outline-none transition-colors focus:border-primary appearance-none cursor-pointer text-sm sm:text-base"
                    >
                      <option value="">Selecciona una opción...</option>
                      {facturacionOptions.map((fact) => (
                        <option key={fact.id} value={fact.id}>
                          {fact.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  </div>

                  <div className="flex justify-start pt-4">
                    <button
                      onClick={() => setQuizStep(2)}
                      className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Anterior</span>
                    </button>
                  </div>

                  <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2 pt-2">
                    <Lock className="w-3 h-3" />
                    Tus datos están seguros y no serán compartidos.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs sm:text-sm text-muted-foreground mt-6"
        >
          <span className="text-primary font-semibold">+847 empresas</span> ya recibieron su diagnóstico gratis
        </motion.p>
      </div>
    </section>
  );
};
