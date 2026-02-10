import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
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
import { analytics } from "@/lib/analytics";

export const QuizSection = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, saveToStorage } = useLeadMagnet();
  const [quizStep, setQuizStep] = useState(0);
  const [showNichoOtro, setShowNichoOtro] = useState(false);
  const [pendingSave, setPendingSave] = useState(false);

  const totalSteps = 4;
  const progress = ((quizStep + 1) / totalSteps) * 100;
  const hasTrackedStart = useRef(false);
  const stepNames = ['nicho', 'situacion', 'problematica', 'facturacion'];

  // Get dynamic problematicas based on selected situacion
  const currentProblematicas = formData.situacion
    ? problematicasPorSituacion[formData.situacion]
    : [];

  // Track form start (solo una vez)
  useEffect(() => {
    if (!hasTrackedStart.current) {
      analytics.form1.start();
      analytics.form1.stepView(1, 'nicho');
      hasTrackedStart.current = true;
    }
  }, []);

  // Track step views
  useEffect(() => {
    if (hasTrackedStart.current && quizStep > 0) {
      analytics.form1.stepView(quizStep + 1, stepNames[quizStep]);
    }
  }, [quizStep]);

  // Effect to save and redirect after facturacion is set
  useEffect(() => {
    if (pendingSave && formData.facturacion) {
      saveToStorage();
      setPendingSave(false);
      // Navigate to video page in the same tab
      navigate("/video");
    }
  }, [pendingSave, formData.facturacion, saveToStorage, navigate]);

  const handleNichoSelect = (id: string) => {
    updateFormData({ nicho: id, nichoOtro: "" });
    if (id === "otro") {
      setShowNichoOtro(true);
    } else {
      analytics.form1.stepComplete(1, 'nicho', id);
      setShowNichoOtro(false);
      setTimeout(() => setQuizStep(1), 300);
    }
  };

  const handleNichoOtroSubmit = () => {
    if (formData.nichoOtro.trim()) {
      analytics.form1.stepComplete(1, 'nicho', 'otro: ' + formData.nichoOtro);
      setShowNichoOtro(false);
      setTimeout(() => setQuizStep(1), 300);
    }
  };

  const handleSituacionSelect = (id: SituacionType) => {
    updateFormData({ situacion: id, problematica: "" });
    analytics.form1.stepComplete(2, 'situacion', id);
    setTimeout(() => setQuizStep(2), 300);
  };

  const handleProblematicaSelect = (id: string) => {
    updateFormData({ problematica: id });
    analytics.form1.stepComplete(3, 'problematica', id);
    setTimeout(() => setQuizStep(3), 300);
  };

  const handleFacturacionSelect = (id: string) => {
    updateFormData({ facturacion: id });
    analytics.form1.stepComplete(4, 'facturacion', id);
    analytics.form1.complete();
    setPendingSave(true);
  };

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
            Cotización gratis en 2 minutos
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-3 sm:mb-4">
            Obtené tu cotización personalizada
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Respondé 4 preguntas rápidas y te preparamos una propuesta con soluciones para tu negocio
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
                  <h3 className="text-lg sm:text-xl font-bold">¿En qué rubro o nicho se encuentra tu negocio?</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {nichoOptions.map((nicho) => {
                      const isSelected = formData.nicho === nicho.id;
                      return (
                        <motion.button
                          key={nicho.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleNichoSelect(nicho.id)}
                          className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-left text-sm sm:text-base ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          {nicho.label}
                        </motion.button>
                      );
                    })}
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
                        placeholder="Especifica en qué rubro estás..."
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

                  <div className="space-y-2 sm:space-y-3">
                    {currentProblematicas.map((prob) => {
                      const isSelected = formData.problematica === prob.id;
                      return (
                        <motion.button
                          key={prob.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleProblematicaSelect(prob.id)}
                          className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all text-left text-sm sm:text-base ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          {prob.label}
                        </motion.button>
                      );
                    })}
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

                  <div className="space-y-2 sm:space-y-3">
                    {facturacionOptions.map((fact) => {
                      const isSelected = formData.facturacion === fact.id;
                      return (
                        <motion.button
                          key={fact.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleFacturacionSelect(fact.id)}
                          className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all text-left font-medium text-sm sm:text-base ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          {fact.label}
                        </motion.button>
                      );
                    })}
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
          <span className="text-primary font-semibold">+1500 empresas</span> ya cotizaron con nosotros 🤙
        </motion.p>
      </div>
    </section>
  );
};
