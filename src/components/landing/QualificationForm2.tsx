import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  FileText,
  Lock,
} from "lucide-react";
import {
  useLeadMagnet,
  experienciaOptions,
  origenOptions,
  mejorarOptions,
  volumenOptions,
  etapaOptions,
  espacioOptions,
  serviciosAdicionalesOptions,
  frecuenciaOptions,
  tercerizarOptions,
  urgenciaOptions,
  SituacionType,
} from "@/contexts/LeadMagnetContext";
import { Progress } from "@/components/ui/progress";

// Get questions config based on situacion
const getQuestionsConfig = (situacion: SituacionType | "") => {
  switch (situacion) {
    case "mejorar-costos":
      return {
        questions: [
          {
            id: "experiencia",
            title: "Experiencia importando",
            type: "single" as const,
            options: experienciaOptions,
            field: "experiencia" as const,
          },
          {
            id: "origen",
            title: "¿Desde dónde importas principalmente?",
            type: "single" as const,
            options: origenOptions,
            field: "origen" as const,
          },
          {
            id: "mejoras",
            title: "¿Qué te gustaría mejorar principalmente?",
            subtitle: "Seleccioná todo lo que aplique",
            type: "checkbox" as const,
            options: mejorarOptions,
            field: "mejoras" as const,
          },
        ],
        totalSteps: 6,
      };
    case "contenedor-compartido":
      return {
        questions: [
          {
            id: "origen",
            title: "¿Desde dónde importas principalmente?",
            type: "single" as const,
            options: origenOptions,
            field: "origen" as const,
          },
          {
            id: "volumen",
            title: "¿Cuánto volumen aproximado necesitas importar?",
            type: "single" as const,
            options: volumenOptions,
            field: "volumen" as const,
          },
          {
            id: "etapa",
            title: "¿En qué etapa está tu importación?",
            type: "single" as const,
            options: etapaOptions,
            field: "etapa" as const,
          },
        ],
        totalSteps: 6,
      };
    case "deposito-fulfillment":
      return {
        questions: [
          {
            id: "espacio",
            title: "¿Cuánto espacio aproximado necesitas?",
            type: "single" as const,
            options: espacioOptions,
            field: "espacio" as const,
          },
          {
            id: "serviciosAdicionales",
            title: "¿Necesitas servicios adicionales de valor agregado?",
            subtitle: "Seleccioná todo lo que aplique",
            type: "checkbox" as const,
            options: serviciosAdicionalesOptions,
            field: "serviciosAdicionales" as const,
          },
          {
            id: "frecuencia",
            title: "¿Con qué frecuencia realizas despachos?",
            type: "single" as const,
            options: frecuenciaOptions,
            field: "frecuencia" as const,
          },
        ],
        totalSteps: 6,
      };
    case "escalar-negocio":
      return {
        questions: [
          {
            id: "experiencia",
            title: "Experiencia importando",
            type: "single" as const,
            options: experienciaOptions,
            field: "experiencia" as const,
          },
          {
            id: "origen",
            title: "¿Desde dónde importas principalmente?",
            type: "single" as const,
            options: origenOptions,
            field: "origen" as const,
          },
          {
            id: "tercerizar",
            title: "¿Qué servicios te gustaría tercerizar?",
            subtitle: "Seleccioná todo lo que aplique",
            type: "checkbox" as const,
            options: tercerizarOptions,
            field: "tercerizar" as const,
          },
        ],
        totalSteps: 6,
      };
    default:
      return { questions: [], totalSteps: 3 };
  }
};

export const QualificationForm2 = () => {
  const { formData, updateFormData, currentStep, setCurrentStep, submitToWebhook, saveToStorage } = useLeadMagnet();
  const [formStep, setFormStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const config = getQuestionsConfig(formData.situacion);
  const specificQuestions = config.questions;
  const totalSteps = config.totalSteps;

  const progress = ((formStep + 1) / totalSteps) * 100;

  // Validaciones
  const validateName = (name: string): boolean => {
    const words = name.trim().split(/\s+/);
    return words.length >= 2 && words.every(w => w.length >= 1);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateWhatsApp = (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-()]{10,20}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Handle checkbox toggle
  const handleCheckboxToggle = (field: "mejoras" | "serviciosAdicionales" | "tercerizar", id: string) => {
    const current = formData[field] || [];
    if (current.includes(id)) {
      updateFormData({ [field]: current.filter((t: string) => t !== id) });
    } else {
      updateFormData({ [field]: [...current, id] });
    }
  };

  // Handle single select (button click)
  const handleSingleSelect = (field: string, value: string) => {
    updateFormData({ [field]: value });
    setTimeout(() => setFormStep(prev => prev + 1), 300);
  };

  // Validation for current step
  const canProceedCurrentStep = () => {
    if (formStep < specificQuestions.length) {
      const question = specificQuestions[formStep];
      if (question.type === "checkbox") {
        const fieldValue = formData[question.field as keyof typeof formData];
        return Array.isArray(fieldValue) && fieldValue.length > 0;
      }
      return !!formData[question.field as keyof typeof formData];
    }
    if (formStep === specificQuestions.length) {
      return !!formData.urgencia;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.nombre || !validateName(formData.nombre)) {
      newErrors.nombre = "Ingresá tu nombre completo (nombre y apellido)";
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "Ingresá un email válido";
    }

    if (!formData.whatsapp || !validateWhatsApp(formData.whatsapp)) {
      newErrors.whatsapp = "Ingresá un número válido con código de país";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Save to storage before submitting
    saveToStorage();

    // Submit to webhook
    await submitToWebhook();

    setIsSubmitting(false);
    setCurrentStep("whatsapp_redirect");

    setTimeout(() => {
      document.getElementById("whatsapp-redirect-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (currentStep !== "form2" && currentStep !== "whatsapp_redirect") {
    return null;
  }

  const urgenciaStepIndex = specificQuestions.length;
  const contactStepIndex = specificQuestions.length + 1;

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
            Formulario de profundización
          </div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-3 md:mb-4">
            Contanos un poco más sobre tu situación
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Esta información nos ayuda a entender mejor cómo podemos ayudarte
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
              {/* Specific Questions (0, 1, 2) */}
              {formStep < specificQuestions.length && (
                <motion.div
                  key={`step-${formStep}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 md:space-y-6"
                >
                  {(() => {
                    const question = specificQuestions[formStep];
                    return (
                      <>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold mb-1">{question.title}</h3>
                          {question.subtitle && (
                            <p className="text-xs md:text-sm text-muted-foreground">{question.subtitle}</p>
                          )}
                        </div>

                        {question.type === "single" && (
                          <>
                            <div className="space-y-2 sm:space-y-3">
                              {question.options.map((opt) => {
                                const isSelected = formData[question.field as keyof typeof formData] === opt.id;
                                return (
                                  <motion.button
                                    key={opt.id}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => handleSingleSelect(question.field, opt.id)}
                                    className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all text-left text-sm sm:text-base ${
                                      isSelected
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-zinc-700 hover:border-zinc-500"
                                    }`}
                                  >
                                    {opt.label}
                                  </motion.button>
                                );
                              })}
                            </div>
                            <div className="flex justify-start pt-4">
                              <button
                                onClick={() => setFormStep(prev => prev - 1)}
                                disabled={formStep === 0}
                                className="flex items-center gap-1 md:gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm disabled:opacity-50"
                              >
                                <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Anterior</span>
                              </button>
                            </div>
                          </>
                        )}

                        {question.type === "checkbox" && (
                          <>
                            <div className="space-y-2 sm:space-y-3">
                              {question.options.map((opt) => {
                                const fieldValue = formData[question.field as keyof typeof formData];
                                const isSelected = Array.isArray(fieldValue) && fieldValue.includes(opt.id);
                                return (
                                  <motion.button
                                    key={opt.id}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => handleCheckboxToggle(question.field as "mejoras" | "serviciosAdicionales" | "tercerizar", opt.id)}
                                    className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all text-left text-sm sm:text-base ${
                                      isSelected
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-zinc-700 hover:border-zinc-500"
                                    }`}
                                  >
                                    {opt.label}
                                  </motion.button>
                                );
                              })}
                            </div>
                            <div className="flex justify-between pt-4 gap-4">
                              <button
                                onClick={() => setFormStep(prev => prev - 1)}
                                disabled={formStep === 0}
                                className="flex items-center gap-1 md:gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm disabled:opacity-50"
                              >
                                <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Anterior</span>
                              </button>
                              <button
                                onClick={() => setFormStep(prev => prev + 1)}
                                disabled={!canProceedCurrentStep()}
                                className="flex items-center gap-2 bg-primary text-primary-foreground px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all text-sm"
                              >
                                Siguiente <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    );
                  })()}
                </motion.div>
              )}

              {/* Urgencia Step */}
              {formStep === urgenciaStepIndex && (
                <motion.div
                  key="step-urgencia"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1">¿Cuándo necesitas comenzar?</h3>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    {urgenciaOptions.map((opt) => {
                      const isSelected = formData.urgencia === opt.id;
                      return (
                        <motion.button
                          key={opt.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleSingleSelect("urgencia", opt.id)}
                          className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all text-left text-sm sm:text-base ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          {opt.label}
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="flex justify-start pt-4">
                    <button
                      onClick={() => setFormStep(prev => prev - 1)}
                      className="flex items-center gap-1 md:gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Anterior</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Contact Step */}
              {formStep === contactStepIndex && (
                <motion.div
                  key="step-contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1">Datos de contacto</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Para continuar por WhatsApp</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 block">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        placeholder="Juan Pérez"
                        value={formData.nombre}
                        onChange={(e) => {
                          updateFormData({ nombre: e.target.value });
                          if (errors.nombre) setErrors(prev => ({ ...prev, nombre: '' }));
                        }}
                        className={`w-full bg-secondary border rounded-xl px-4 py-3 outline-none transition-colors text-sm sm:text-base ${
                          errors.nombre ? 'border-red-500' : 'border-zinc-700 focus:border-primary'
                        }`}
                        required
                      />
                      {errors.nombre && (
                        <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 block">
                        Email *
                      </label>
                      <input
                        type="email"
                        placeholder="juan@empresa.com"
                        value={formData.email}
                        onChange={(e) => {
                          updateFormData({ email: e.target.value });
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        className={`w-full bg-secondary border rounded-xl px-4 py-3 outline-none transition-colors text-sm sm:text-base ${
                          errors.email ? 'border-red-500' : 'border-zinc-700 focus:border-primary'
                        }`}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 block">
                        WhatsApp *
                      </label>
                      <input
                        type="tel"
                        placeholder="+54 9 11 1234-5678"
                        value={formData.whatsapp}
                        onChange={(e) => {
                          updateFormData({ whatsapp: e.target.value });
                          if (errors.whatsapp) setErrors(prev => ({ ...prev, whatsapp: '' }));
                        }}
                        className={`w-full bg-secondary border rounded-xl px-4 py-3 outline-none transition-colors text-sm sm:text-base ${
                          errors.whatsapp ? 'border-red-500' : 'border-zinc-700 focus:border-primary'
                        }`}
                        required
                      />
                      {errors.whatsapp && (
                        <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 block">
                        Empresa (opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="Tu empresa SRL"
                        value={formData.empresa}
                        onChange={(e) => updateFormData({ empresa: e.target.value })}
                        className="w-full bg-secondary border border-zinc-700 focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors text-sm sm:text-base"
                      />
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row justify-between pt-4 gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={() => setFormStep(prev => prev - 1)}
                        className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm py-2"
                      >
                        <ArrowLeft className="w-4 h-4" /> Anterior
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Procesando...
                          </>
                        ) : (
                          <>
                            Continuar por WhatsApp
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2 pt-2">
                      <Lock className="w-3 h-3" />
                      Tus datos están seguros.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
