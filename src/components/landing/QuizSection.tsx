import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Play,
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
  DollarSign,
  AlertTriangle,
  Clock,
  TrendingDown,
  Eye,
  FileWarning,
  UserX,
  Rocket,
  HelpCircle,
  Warehouse,
} from "lucide-react";
import { useLeadMagnet } from "@/contexts/LeadMagnetContext";
import { Progress } from "@/components/ui/progress";

// Opciones de industria con iconos
const industriasOptions = [
  { id: "ecommerce", label: "E-commerce", icon: ShoppingCart },
  { id: "industrial", label: "Industrial", icon: Factory },
  { id: "alimentos", label: "Alimentos", icon: UtensilsCrossed },
  { id: "farmaceutico", label: "Farmacéutico", icon: Pill },
  { id: "textil", label: "Textil / Moda", icon: Shirt },
  { id: "tecnologia", label: "Tecnología", icon: Cpu },
  { id: "automotriz", label: "Automotriz", icon: Car },
  { id: "otro", label: "Otro", icon: Package },
];

// Opciones de desafíos con iconos
const desafiosOptions = [
  { id: "costos-altos", label: "Costos logísticos muy altos", icon: DollarSign },
  { id: "tiempos-entrega", label: "Tiempos impredecibles", icon: Clock },
  { id: "falta-visibilidad", label: "Falta de visibilidad/tracking", icon: Eye },
  { id: "problemas-aduana", label: "Problemas con aduana", icon: FileWarning },
  { id: "operador-actual", label: "Mal servicio actual", icon: UserX },
  { id: "escalar-operacion", label: "Necesito escalar", icon: Rocket },
  { id: "primera-importacion", label: "Primera importación", icon: HelpCircle },
  { id: "almacenamiento", label: "Necesito fulfillment", icon: Warehouse },
];

// Opciones de facturación
const facturacionOptions = [
  { id: "menos-50k", label: "Menos de USD 50k/mes" },
  { id: "50-200k", label: "USD 50k - 200k/mes" },
  { id: "200-500k", label: "USD 200k - 500k/mes" },
  { id: "500k-1m", label: "USD 500k - 1M/mes" },
  { id: "mas-1m", label: "Más de USD 1M/mes" },
];

export const QuizSection = () => {
  const { formData, updateFormData, saveToStorage } = useLeadMagnet();
  const [quizStep, setQuizStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email) {
      return;
    }
    // Save data to localStorage for the new tab
    saveToStorage();
    setIsCompleted(true);
    // Open video in new tab
    window.open("/video-personalizado", "_blank");
  };

  const canProceedStep1 = formData.nicho;
  const canProceedStep2 = formData.problematicas && formData.problematicas.length > 0;
  const canProceedStep3 = formData.facturacion;

  if (isCompleted) {
    return (
      <section id="quiz-section" className="py-20 px-6 bg-gradient-to-b from-secondary/30 to-background">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card p-12 rounded-2xl border border-zinc-800"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Play className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-black mb-4">¡Tu video está listo!</h2>
            <p className="text-muted-foreground mb-8">
              Abrimos una nueva pestaña con tu video personalizado.
              <br />
              <span className="text-sm">¿No se abrió? Hacé click abajo.</span>
            </p>
            <a
              href="/video-personalizado"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all"
            >
              <Play className="w-5 h-5" />
              Ver mi Video
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz-section" className="py-20 px-6 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Video personalizado en 2 minutos
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Descubrí tu solución logística ideal
          </h2>
          <p className="text-muted-foreground">
            Respondé 4 preguntas rápidas y te preparamos un video con soluciones para tu negocio
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
          <div className="p-6 border-b border-zinc-800">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Paso {quizStep + 1} de {totalSteps}</span>
              <span className="text-primary font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Quiz Steps */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Industria */}
              {quizStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold">¿En qué industria opera tu empresa?</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {industriasOptions.map((industria) => {
                      const Icon = industria.icon;
                      const isSelected = formData.nicho === industria.id;
                      return (
                        <motion.button
                          key={industria.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleIndustriaSelect(industria.id)}
                          className={`p-4 rounded-xl border-2 transition-all text-center ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          <Icon className="w-8 h-8 mx-auto mb-2" />
                          <span className="text-sm font-medium">{industria.label}</span>
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
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-1">¿Cuáles son tus mayores desafíos?</h3>
                    <p className="text-sm text-muted-foreground">Seleccioná hasta 2 opciones</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {desafiosOptions.map((desafio) => {
                      const Icon = desafio.icon;
                      const isSelected = formData.problematicas?.includes(desafio.id);
                      const isDisabled = !isSelected && formData.problematicas?.length >= 2;
                      return (
                        <motion.button
                          key={desafio.id}
                          whileHover={!isDisabled ? { scale: 1.01 } : {}}
                          whileTap={!isDisabled ? { scale: 0.99 } : {}}
                          onClick={() => !isDisabled && handleDesafioToggle(desafio.id)}
                          disabled={isDisabled}
                          className={`p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                            isSelected
                              ? "border-primary bg-primary/10"
                              : isDisabled
                              ? "border-zinc-800 opacity-50 cursor-not-allowed"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isSelected ? "bg-primary text-primary-foreground" : "bg-zinc-800"
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-sm">{desafio.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setQuizStep(0)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Anterior
                    </button>
                    <button
                      onClick={() => setQuizStep(2)}
                      disabled={!canProceedStep2}
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all"
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
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold">¿Cuánto importás o facturás por mes?</h3>
                  <div className="space-y-3">
                    {facturacionOptions.map((fact) => {
                      const isSelected = formData.facturacion === fact.id;
                      return (
                        <motion.button
                          key={fact.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleFacturacionSelect(fact.id)}
                          className={`w-full p-4 rounded-xl border-2 transition-all text-left font-medium ${
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
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Anterior
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
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-1">¿A dónde te enviamos tu video?</h3>
                    <p className="text-sm text-muted-foreground">Tu video personalizado está casi listo</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1 block">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={(e) => updateFormData({ nombre: e.target.value })}
                        className="w-full bg-secondary border border-zinc-700 focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1 block">
                        Email *
                      </label>
                      <input
                        type="email"
                        placeholder="tu@empresa.com"
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        className="w-full bg-secondary border border-zinc-700 focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1 block">
                        WhatsApp (opcional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+54 9 11 ..."
                        value={formData.whatsapp}
                        onChange={(e) => updateFormData({ whatsapp: e.target.value })}
                        className="w-full bg-secondary border border-zinc-700 focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors"
                      />
                    </div>
                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setQuizStep(2)}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" /> Anterior
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                      >
                        <Play className="w-5 h-5" />
                        Ver mi Video
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2 pt-2">
                      <Lock className="w-3 h-3" />
                      Tus datos están seguros. No compartimos tu información.
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
          className="text-center text-sm text-muted-foreground mt-6"
        >
          <span className="text-primary font-semibold">+847 empresas</span> ya vieron su video personalizado
        </motion.p>
      </div>
    </section>
  );
};
