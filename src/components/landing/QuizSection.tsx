import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  FileSearch,
  CheckCircle,
  ShoppingCart,
  Factory,
  UtensilsCrossed,
  Pill,
  Shirt,
  Cpu,
  Car,
  Package,
  Lock,
  Sparkles,
} from "lucide-react";
import { useLeadMagnet, industriasOptions, desafiosOptions, facturacionOptions } from "@/contexts/LeadMagnetContext";
import { Progress } from "@/components/ui/progress";

// Iconos para las industrias
const industriaIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  ecommerce: ShoppingCart,
  industrial: Factory,
  alimentos: UtensilsCrossed,
  farmaceutico: Pill,
  textil: Shirt,
  tecnologia: Cpu,
  automotriz: Car,
  otro: Package,
};

export const QuizSection = () => {
  const { formData, updateFormData, saveToStorage } = useLeadMagnet();
  const [quizStep, setQuizStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;
  const progress = ((quizStep + 1) / totalSteps) * 100;

  const handleIndustriaSelect = (id: string) => {
    updateFormData({ nicho: id });
    setTimeout(() => setQuizStep(1), 300);
  };

  const handleDesafioToggle = (id: string) => {
    const current = formData.problematicas || [];
    if (current.includes(id)) {
      updateFormData({ problematicas: current.filter((p) => p !== id) });
    } else if (current.length < 2) {
      updateFormData({ problematicas: [...current, id] });
    }
  };

  const handleFacturacionSelect = (id: string) => {
    updateFormData({ facturacion: id });
    setTimeout(() => setQuizStep(3), 300);
  };

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
    // Acepta formatos con código de país: +54 9 11 1234-5678, +541112345678, etc.
    const phoneRegex = /^\+?[\d\s\-()]{10,20}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    // Save data to localStorage for the new tab
    saveToStorage();
    setIsCompleted(true);
    // Open video in new tab
    window.open("/video-personalizado", "_blank");
  };

  const canProceedStep2 = formData.problematicas && formData.problematicas.length > 0;

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
              {/* Step 1: Industria */}
              {quizStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <h3 className="text-lg sm:text-xl font-bold">¿En qué industria opera tu empresa?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    {industriasOptions.map((industria) => {
                      const Icon = industriaIcons[industria.id] || Package;
                      const isSelected = formData.nicho === industria.id;
                      return (
                        <motion.button
                          key={industria.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleIndustriaSelect(industria.id)}
                          className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-center ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                          <span className="text-xs sm:text-sm font-medium">{industria.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Desafíos */}
              {quizStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">¿Cuáles son tus principales dolores logísticos hoy?</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Elegí hasta 2 opciones</p>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {desafiosOptions.map((desafio) => {
                      const isSelected = formData.problematicas?.includes(desafio.id);
                      const isDisabled = !isSelected && formData.problematicas?.length >= 2;
                      return (
                        <motion.button
                          key={desafio.id}
                          whileHover={!isDisabled ? { scale: 1.01 } : {}}
                          whileTap={!isDisabled ? { scale: 0.99 } : {}}
                          onClick={() => !isDisabled && handleDesafioToggle(desafio.id)}
                          disabled={isDisabled}
                          className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                            isSelected
                              ? "border-primary bg-primary/10"
                              : isDisabled
                              ? "border-zinc-800 opacity-50 cursor-not-allowed"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          <span className="font-medium text-sm sm:text-base">{desafio.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                  <div className="flex justify-between pt-4 gap-4">
                    <button
                      onClick={() => setQuizStep(0)}
                      className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Anterior</span>
                    </button>
                    <button
                      onClick={() => setQuizStep(2)}
                      disabled={!canProceedStep2}
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all text-sm"
                    >
                      Siguiente <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Facturación */}
              {quizStep === 2 && (
                <motion.div
                  key="step3"
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
                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setQuizStep(1)}
                      className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Anterior</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Datos de contacto */}
              {quizStep === 3 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">¿Dónde te enviamos tu diagnóstico personalizado?</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Tu diagnóstico personalizado está casi listo</p>
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
                    <div className="flex flex-col-reverse sm:flex-row justify-between pt-4 gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={() => setQuizStep(2)}
                        className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm py-2"
                      >
                        <ArrowLeft className="w-4 h-4" /> Anterior
                      </button>
                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-sm sm:text-base"
                      >
                        <FileSearch className="w-5 h-5" />
                        Ver mi diagnóstico
                        <ArrowRight className="w-4 h-4" />
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
