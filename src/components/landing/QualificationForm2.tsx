import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ArrowLeft, FileText, Building2, ChevronDown, ChevronUp } from "lucide-react";
import { useLeadMagnet, operacionOptions, frustracionOptions, objetivoOptions, urgenciaOptions } from "@/contexts/LeadMagnetContext";
import { Progress } from "@/components/ui/progress";

export const QualificationForm2 = () => {
  const { formData, updateFormData, currentStep, setCurrentStep, submitToWebhook, saveToStorage } = useLeadMagnet();
  const [formStep, setFormStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOperacionDetalle, setShowOperacionDetalle] = useState(false);
  const [showFrustracionDetalle, setShowFrustracionDetalle] = useState(false);

  const totalSteps = 5;
  const progress = ((formStep + 1) / totalSteps) * 100;

  // Toggle handlers for multi-select chips
  const handleOperacionToggle = (id: string) => {
    const current = formData.operacionTags || [];
    if (current.includes(id)) {
      updateFormData({ operacionTags: current.filter((t) => t !== id) });
    } else {
      updateFormData({ operacionTags: [...current, id] });
    }
  };

  const handleFrustracionToggle = (id: string) => {
    const current = formData.frustracionTags || [];
    if (current.includes(id)) {
      updateFormData({ frustracionTags: current.filter((t) => t !== id) });
    } else {
      updateFormData({ frustracionTags: [...current, id] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.urgencia) return;

    setIsSubmitting(true);

    // Save to storage before submitting
    saveToStorage();

    // Submit to webhook
    await submitToWebhook();

    setIsSubmitting(false);
    setCurrentStep("action_plan");

    setTimeout(() => {
      document.getElementById("action-plan-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Validation helpers
  const canProceedStep0 = formData.empresa && formData.empresa.trim().length > 0;
  const canProceedStep1 = formData.operacionTags && formData.operacionTags.length > 0;
  const canProceedStep2 = formData.frustracionTags && formData.frustracionTags.length > 0;
  const canProceedStep3 = formData.objetivoPrincipal;
  const canSubmit = formData.urgencia;

  if (currentStep !== "form2" && currentStep !== "action_plan" && currentStep !== "calendar") {
    return null;
  }

  return (
    <section id="form2-section" className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-black to-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
            <FileText className="w-3 h-3 md:w-4 md:h-4" />
            Paso 2 de 3
          </div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-3 md:mb-4">
            Contanos un poco más para personalizar tu Plan de Acción
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Con esta información generamos recomendaciones específicas para tu negocio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl md:rounded-2xl border border-zinc-800 overflow-hidden"
        >
          {/* Progress bar */}
          <div className="p-4 sm:p-6 border-b border-zinc-800">
            <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
              <span className="text-muted-foreground">Pregunta {formStep + 1} de {totalSteps}</span>
              <span className="text-primary font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="p-5 md:p-8">
            <AnimatePresence mode="wait">
              {/* Pregunta 1: Empresa */}
              {formStep === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <h3 className="text-lg md:text-xl font-bold flex items-center gap-2 mb-1">
                      <Building2 className="w-5 h-5 text-primary" />
                      ¿Cuál es el nombre de tu empresa?
                    </h3>
                  </div>
                  <input
                    type="text"
                    placeholder="TechCorp SRL"
                    value={formData.empresa}
                    onChange={(e) => updateFormData({ empresa: e.target.value })}
                    className="w-full bg-secondary border border-zinc-700 focus:border-primary rounded-xl px-4 py-3 md:py-4 outline-none transition-colors text-sm md:text-base"
                    autoFocus
                  />
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setFormStep(1)}
                      disabled={!canProceedStep0}
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all text-sm"
                    >
                      Siguiente <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Pregunta 2: Operación actual */}
              {formStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1">¿Cómo es tu operación logística hoy?</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Seleccioná todo lo que aplique</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {operacionOptions.map((option) => {
                      const isSelected = formData.operacionTags?.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleOperacionToggle(option.id)}
                          className={`px-3 md:px-4 py-2 rounded-full border-2 transition-all text-xs md:text-sm font-medium ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Textarea opcional colapsable */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowOperacionDetalle(!showOperacionDetalle)}
                      className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showOperacionDetalle ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Agregar detalles (opcional)
                    </button>
                    {showOperacionDetalle && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3"
                      >
                        <textarea
                          placeholder="Ej: Traemos 2 containers por mes de Shenzhen, principalmente electrónica..."
                          value={formData.operacionDetalle}
                          onChange={(e) => updateFormData({ operacionDetalle: e.target.value })}
                          rows={3}
                          maxLength={500}
                          className="w-full bg-secondary border border-zinc-700 focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors text-sm resize-none"
                        />
                      </motion.div>
                    )}
                  </div>

                  <div className="flex justify-between pt-4 gap-4">
                    <button
                      onClick={() => setFormStep(0)}
                      className="flex items-center gap-1 md:gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Anterior</span>
                    </button>
                    <button
                      onClick={() => setFormStep(2)}
                      disabled={!canProceedStep1}
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all text-sm"
                    >
                      Siguiente <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Pregunta 3: Mayor frustración */}
              {formStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1">¿Qué es lo que más te frustra o genera problemas hoy?</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Seleccioná los principales</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {frustracionOptions.map((option) => {
                      const isSelected = formData.frustracionTags?.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleFrustracionToggle(option.id)}
                          className={`px-3 md:px-4 py-2 rounded-full border-2 transition-all text-xs md:text-sm font-medium ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Textarea opcional colapsable */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowFrustracionDetalle(!showFrustracionDetalle)}
                      className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showFrustracionDetalle ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Contanos más (opcional)
                    </button>
                    {showFrustracionDetalle && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3"
                      >
                        <textarea
                          placeholder="Ej: El mes pasado tardaron 3 semanas en liberar un container..."
                          value={formData.frustracionDetalle}
                          onChange={(e) => updateFormData({ frustracionDetalle: e.target.value })}
                          rows={3}
                          maxLength={500}
                          className="w-full bg-secondary border border-zinc-700 focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors text-sm resize-none"
                        />
                      </motion.div>
                    )}
                  </div>

                  <div className="flex justify-between pt-4 gap-4">
                    <button
                      onClick={() => setFormStep(1)}
                      className="flex items-center gap-1 md:gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Anterior</span>
                    </button>
                    <button
                      onClick={() => setFormStep(3)}
                      disabled={!canProceedStep2}
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all text-sm"
                    >
                      Siguiente <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Pregunta 4: Objetivo principal */}
              {formStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1">¿Qué te gustaría lograr en los próximos 6 meses?</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Elegí tu prioridad principal</p>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {objetivoOptions.map((option) => {
                      const isSelected = formData.objetivoPrincipal === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => {
                            updateFormData({ objetivoPrincipal: option.id });
                            setTimeout(() => setFormStep(4), 300);
                          }}
                          className={`w-full p-3 md:p-4 rounded-xl border-2 transition-all text-left font-medium text-sm md:text-base ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setFormStep(2)}
                      className="flex items-center gap-1 md:gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Anterior</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Pregunta 5: Urgencia */}
              {formStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1">¿Para cuándo necesitás implementar mejoras?</h3>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {urgenciaOptions.map((option) => {
                      const isSelected = formData.urgencia === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => updateFormData({ urgencia: option.id })}
                          className={`w-full p-3 md:p-4 rounded-xl border-2 transition-all text-left font-medium text-sm md:text-base ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex flex-col-reverse sm:flex-row justify-between pt-4 gap-3 sm:gap-4">
                    <button
                      onClick={() => setFormStep(3)}
                      className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm py-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Anterior
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!canSubmit || isSubmitting}
                      className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Generando...
                        </>
                      ) : (
                        <>
                          Generar mi Plan de Acción
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
