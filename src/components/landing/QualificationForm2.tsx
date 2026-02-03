import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, FileText, Target, Clock, MessageSquare, Mic, Keyboard } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLeadMagnet } from "@/contexts/LeadMagnetContext";
import { AudioRecorder } from "@/components/ui/AudioRecorder";

const tiempoOptions = [
  { id: "inmediato", label: "Inmediato (próximos 15 días)" },
  { id: "1-mes", label: "En el próximo mes" },
  { id: "2-3-meses", label: "En 2-3 meses" },
  { id: "evaluando", label: "Solo estoy evaluando opciones" },
];

type InputMode = "text" | "audio";

export const QualificationForm2 = () => {
  const { formData, updateFormData, currentStep, setCurrentStep } = useLeadMagnet();
  const [inputModes, setInputModes] = useState<Record<string, InputMode>>({
    descripcionOperacion: "text",
    desafiosPrincipales: "text",
    objetivos: "text",
  });

  const toggleInputMode = (field: string) => {
    setInputModes(prev => ({
      ...prev,
      [field]: prev[field] === "text" ? "audio" : "text",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("action_plan");
    setTimeout(() => {
      document.getElementById("action-plan-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (currentStep !== "form2" && currentStep !== "action_plan" && currentStep !== "calendar") {
    return null;
  }

  const renderInputField = (
    field: "descripcionOperacion" | "desafiosPrincipales" | "objetivos",
    label: string,
    icon: React.ReactNode,
    placeholder: string,
    audioPlaceholder: string
  ) => {
    const mode = inputModes[field];
    const value = formData[field];

    return (
      <div className="space-y-2 md:space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Label className="text-xs md:text-sm font-semibold flex items-center gap-2">
            {icon}
            {label}
          </Label>
          <button
            type="button"
            onClick={() => toggleInputMode(field)}
            className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs text-muted-foreground hover:text-primary transition-colors bg-secondary/50 px-2 md:px-3 py-1 md:py-1.5 rounded-lg w-fit"
          >
            {mode === "text" ? (
              <>
                <Mic className="w-2.5 h-2.5 md:w-3 md:h-3" />
                Cambiar a audio
              </>
            ) : (
              <>
                <Keyboard className="w-2.5 h-2.5 md:w-3 md:h-3" />
                Cambiar a texto
              </>
            )}
          </button>
        </div>

        {mode === "text" ? (
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={(e) => updateFormData({ [field]: e.target.value })}
            rows={3}
            className="w-full border border-zinc-700 focus:border-primary rounded-xl p-4 text-sm placeholder:text-muted-foreground/50 transition-all outline-none bg-transparent resize-none"
          />
        ) : (
          <div className="space-y-3">
            <AudioRecorder
              placeholder={audioPlaceholder}
              onTranscript={(text) => {
                // Append to existing text or replace
                const currentValue = formData[field];
                const newValue = currentValue ? `${currentValue} ${text}` : text;
                updateFormData({ [field]: newValue });
              }}
            />
            {value && (
              <div className="bg-secondary/30 border border-zinc-700 rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-2">Texto transcrito (podés editarlo):</p>
                <textarea
                  value={value}
                  onChange={(e) => updateFormData({ [field]: e.target.value })}
                  rows={3}
                  className="w-full bg-transparent text-sm outline-none resize-none"
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

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
            Contanos un poco más
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Con esta información generamos tu plan de acción personalizado
          </p>
          <p className="text-xs md:text-sm text-primary mt-2 flex items-center justify-center gap-2">
            <Mic className="w-3 h-3 md:w-4 md:h-4" />
            Podés escribir o grabar tu respuesta con audio
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card p-5 md:p-8 rounded-xl md:rounded-2xl border border-zinc-800 space-y-6 md:space-y-8"
        >
          {/* Descripción de la operación */}
          {renderInputField(
            "descripcionOperacion",
            "Describí brevemente tu operación actual",
            <MessageSquare className="w-4 h-4 text-primary" />,
            "Ej: Importamos productos electrónicos desde China, vendemos en Mercado Libre y distribuimos a minoristas en AMBA...",
            "Contanos sobre tu operación actual..."
          )}

          {/* Desafíos principales */}
          {renderInputField(
            "desafiosPrincipales",
            "¿Cuál es el mayor desafío que enfrentás hoy?",
            <Target className="w-4 h-4 text-primary" />,
            "Ej: Los tiempos de aduana son muy largos y me generan roturas de stock...",
            "Contanos cuál es tu mayor desafío..."
          )}

          {/* Objetivos */}
          {renderInputField(
            "objetivos",
            "¿Qué resultado te gustaría lograr con nosotros?",
            <Target className="w-4 h-4 text-primary" />,
            "Ej: Reducir los tiempos de entrega, tener visibilidad en tiempo real, bajar costos operativos...",
            "Contanos qué te gustaría lograr..."
          )}

          {/* Tiempo de implementación */}
          <div className="space-y-3 md:space-y-4">
            <Label className="text-xs md:text-sm font-semibold flex items-center gap-2">
              <Clock className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              ¿Para cuándo necesitás implementar una solución?
            </Label>
            <RadioGroup
              value={formData.tiempoImplementacion}
              onValueChange={(value) => updateFormData({ tiempoImplementacion: value })}
              className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3"
            >
              {tiempoOptions.map((option) => (
                <div key={option.id} className="flex items-center">
                  <RadioGroupItem value={option.id} id={`tiempo-${option.id}`} className="peer sr-only" />
                  <Label
                    htmlFor={`tiempo-${option.id}`}
                    className="flex-1 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm border border-zinc-700 rounded-lg md:rounded-xl cursor-pointer transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary text-center"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-6 md:px-8 py-4 md:py-5 rounded-xl text-base md:text-lg font-bold hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-2 md:gap-3 group"
          >
            Ver mi Plan de Acción
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.form>
      </div>
    </section>
  );
};
