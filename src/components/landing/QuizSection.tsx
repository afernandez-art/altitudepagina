import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import {
  perfilOptions,
  preguntasPorPerfil,
  inversionOptions,
  PerfilType,
} from "@/contexts/LeadMagnetContext";
import { analytics } from "@/lib/analytics";

export const QuizSection = () => {
  const navigate = useNavigate();
  const [quizStep, setQuizStep] = useState(0);
  const [perfil, setPerfil] = useState<PerfilType>("");
  const [necesidad, setNecesidad] = useState("");
  const [inversion, setInversion] = useState("");

  const totalSteps = 3;
  const progress = ((quizStep + 1) / totalSteps) * 100;
  const hasTrackedStart = useRef(false);
  const stepNames = ["perfil", "necesidad", "inversion"];

  // Get conditional question for selected profile
  const currentQuestion = perfil ? preguntasPorPerfil[perfil] : null;

  // Track form start
  useEffect(() => {
    if (!hasTrackedStart.current) {
      analytics.form1.start();
      analytics.form1.stepView(1, "perfil");
      hasTrackedStart.current = true;
    }
  }, []);

  // Track step views
  useEffect(() => {
    if (hasTrackedStart.current && quizStep > 0) {
      analytics.form1.stepView(quizStep + 1, stepNames[quizStep]);
    }
  }, [quizStep]);

  const handlePerfilSelect = (id: PerfilType) => {
    setPerfil(id);
    setNecesidad(""); // Reset necesidad when profile changes
    analytics.form1.stepComplete(1, "perfil", id);
    setTimeout(() => setQuizStep(1), 300);
  };

  const handleNecesidadSelect = (opcion: string) => {
    setNecesidad(opcion);
    analytics.form1.stepComplete(2, "necesidad", opcion);
    setTimeout(() => setQuizStep(2), 300);
  };

  const handleInversionSelect = (id: string) => {
    setInversion(id);
    analytics.form1.stepComplete(3, "inversion", id);
    analytics.form1.complete();
    // Navigate to /video with URL params
    setTimeout(() => {
      navigate(
        `/video?perfil=${perfil}&necesidad=${encodeURIComponent(necesidad)}&inversion=${id}`
      );
    }, 300);
  };

  return (
    <section id="quiz-section" className="py-24 sm:py-32 px-4 sm:px-6 bg-card/20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-4">
            ¿QUÉ ESTÁS BUSCANDO?
          </h2>
          <p className="text-muted-foreground">
            Contestá 3 preguntas rápidas y te mostramos cómo podemos ayudarte.
          </p>
        </motion.div>

        {/* Quiz Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card p-8 md:p-12 rounded-3xl border border-border"
        >
          {/* Progress bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-primary text-xs font-bold uppercase tracking-widest">
                Paso {quizStep + 1} de {totalSteps}
              </span>
              <span className="text-muted-foreground text-xs">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{
                  width: `${progress}%`,
                  boxShadow: "0 0 10px hsl(72 100% 50% / 0.6)",
                }}
              />
            </div>
          </div>

          {/* Quiz Steps */}
          <div>
            <AnimatePresence mode="wait">
              {/* Step 1: Perfil */}
              {quizStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <h3 className="text-lg sm:text-xl font-bold">
                    Seleccioná la opción que mejor te describe:
                  </h3>

                  <div className="space-y-3">
                    {perfilOptions.map((option) => {
                      const isSelected = perfil === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePerfilSelect(option.id)}
                          className={`w-full p-5 sm:p-6 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          <p className="font-bold text-base sm:text-lg mb-1">
                            {option.titulo}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {option.descripcion}
                          </p>
                          {option.bajada && (
                            <p className="text-xs text-primary mt-2 font-medium">
                              {option.bajada}
                            </p>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Pregunta condicional */}
              {quizStep === 1 && currentQuestion && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <h3 className="text-lg sm:text-xl font-bold">
                    {currentQuestion.pregunta}
                  </h3>

                  <div className="space-y-2 sm:space-y-3">
                    {currentQuestion.opciones.map((opcion) => {
                      const isSelected = necesidad === opcion;
                      return (
                        <motion.button
                          key={opcion}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleNecesidadSelect(opcion)}
                          className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all text-left text-sm sm:text-base ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          {opcion}
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="flex justify-start pt-4">
                    <button
                      onClick={() => setQuizStep(0)}
                      className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />{" "}
                      <span className="hidden sm:inline">Anterior</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Inversión */}
              {quizStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <h3 className="text-lg sm:text-xl font-bold">
                    ¿Cuánto pensás invertir en tu próxima compra?
                  </h3>

                  <div className="space-y-2 sm:space-y-3">
                    {inversionOptions.map((option) => {
                      const isSelected = inversion === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleInversionSelect(option.id)}
                          className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all text-left font-medium text-sm sm:text-base ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          {option.label}
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="flex justify-start pt-4">
                    <button
                      onClick={() => setQuizStep(1)}
                      className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />{" "}
                      <span className="hidden sm:inline">Anterior</span>
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
          <span className="text-primary font-semibold">+450 empresas</span> ya
          confiaron en ADUANEX
        </motion.p>
      </div>
    </section>
  );
};
