import { motion } from "framer-motion";
import { ArrowRight, FileText, Target, Clock, MessageSquare } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLeadMagnet } from "@/contexts/LeadMagnetContext";

const tiempoOptions = [
  { id: "inmediato", label: "Inmediato (próximos 15 días)" },
  { id: "1-mes", label: "En el próximo mes" },
  { id: "2-3-meses", label: "En 2-3 meses" },
  { id: "evaluando", label: "Solo estoy evaluando opciones" },
];

export const QualificationForm2 = () => {
  const { formData, updateFormData, currentStep, setCurrentStep } = useLeadMagnet();

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

  return (
    <section id="form2-section" className="py-20 px-6 bg-gradient-to-b from-black to-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FileText className="w-4 h-4" />
            Paso 2 de 3
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Contanos un poco más
          </h2>
          <p className="text-muted-foreground text-lg">
            Con esta información generamos tu plan de acción personalizado
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card p-8 rounded-2xl border border-zinc-800 space-y-8"
        >
          {/* Descripción de la operación */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Describí brevemente tu operación actual
            </Label>
            <textarea
              placeholder="Ej: Importamos productos electrónicos desde China, vendemos en Mercado Libre y distribuimos a minoristas en AMBA..."
              value={formData.descripcionOperacion}
              onChange={(e) => updateFormData({ descripcionOperacion: e.target.value })}
              rows={4}
              className="w-full border border-zinc-700 focus:border-primary rounded-xl p-4 text-sm placeholder:text-muted-foreground/50 transition-all outline-none bg-transparent resize-none"
            />
          </div>

          {/* Desafíos principales */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              ¿Cuál es el mayor desafío que enfrentás hoy?
            </Label>
            <textarea
              placeholder="Ej: Los tiempos de aduana son muy largos y me generan roturas de stock..."
              value={formData.desafiosPrincipales}
              onChange={(e) => updateFormData({ desafiosPrincipales: e.target.value })}
              rows={3}
              className="w-full border border-zinc-700 focus:border-primary rounded-xl p-4 text-sm placeholder:text-muted-foreground/50 transition-all outline-none bg-transparent resize-none"
            />
          </div>

          {/* Objetivos */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              ¿Qué resultado te gustaría lograr con nosotros?
            </Label>
            <textarea
              placeholder="Ej: Reducir los tiempos de entrega, tener visibilidad en tiempo real, bajar costos operativos..."
              value={formData.objetivos}
              onChange={(e) => updateFormData({ objetivos: e.target.value })}
              rows={3}
              className="w-full border border-zinc-700 focus:border-primary rounded-xl p-4 text-sm placeholder:text-muted-foreground/50 transition-all outline-none bg-transparent resize-none"
            />
          </div>

          {/* Tiempo de implementación */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              ¿Para cuándo necesitás implementar una solución?
            </Label>
            <RadioGroup
              value={formData.tiempoImplementacion}
              onValueChange={(value) => updateFormData({ tiempoImplementacion: value })}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {tiempoOptions.map((option) => (
                <div key={option.id} className="flex items-center">
                  <RadioGroupItem value={option.id} id={`tiempo-${option.id}`} className="peer sr-only" />
                  <Label
                    htmlFor={`tiempo-${option.id}`}
                    className="flex-1 px-4 py-3 text-sm border border-zinc-700 rounded-xl cursor-pointer transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary text-center"
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
            className="w-full bg-primary text-primary-foreground px-8 py-5 rounded-xl text-lg font-bold hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 group"
          >
            Ver mi Plan de Acción
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.form>
      </div>
    </section>
  );
};
