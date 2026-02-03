import { motion } from "framer-motion";
import {
  CheckCircle,
  MessageCircle,
  Calendar,
  ArrowRight,
  Clock,
  FileText,
  Sparkles,
} from "lucide-react";
import { useLeadMagnet } from "@/contexts/LeadMagnetContext";

export const ActionPlanSection = () => {
  const { formData, currentStep, setCurrentStep } = useLeadMagnet();

  const handleAgendarLlamada = () => {
    setCurrentStep("calendar");
    setTimeout(() => {
      document.getElementById("calendar-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (currentStep !== "action_plan" && currentStep !== "calendar") {
    return null;
  }

  return (
    <section id="action-plan-section" className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-2xl mx-auto">
        {/* Success animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 md:w-24 md:h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-black tracking-tight mb-4"
          >
            ¡Listo, {formData.nombre?.split(' ')[0]}!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-2"
          >
            Te enviamos tu Plan de Acción por WhatsApp
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 text-green-500 font-medium"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{formData.whatsapp}</span>
          </motion.div>
        </motion.div>

        {/* What they'll receive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl border border-zinc-800 p-6 md:p-8 mb-8"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            En tu WhatsApp vas a recibir:
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Diagnóstico de tu operación</p>
                <p className="text-sm text-muted-foreground">Análisis basado en tus respuestas</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Soluciones específicas</p>
                <p className="text-sm text-muted-foreground">Recomendaciones para tus desafíos</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Próximos pasos</p>
                <p className="text-sm text-muted-foreground">Acciones concretas para mejorar tu logística</p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* CTA to calendar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6 md:p-8 text-center"
        >
          <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            ¿Querés profundizar con un especialista?
          </h3>
          <p className="text-muted-foreground mb-6">
            Agendá una llamada de 15 minutos para revisar tu Plan de Acción juntos
          </p>
          <button
            onClick={handleAgendarLlamada}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all text-base md:text-lg inline-flex items-center gap-2 shadow-2xl shadow-primary/30 group"
          >
            Agendar llamada gratis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-muted-foreground mt-4">
            Sin compromiso · 100% gratis
          </p>
        </motion.div>

        {/* WhatsApp reminder */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          ¿No recibiste el mensaje? Revisá tu WhatsApp en unos minutos o{" "}
          <a
            href={`https://wa.me/5491112345678?text=Hola! Completé el diagnóstico y no recibí mi Plan de Acción. Mi email es ${formData.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            contactanos
          </a>
        </motion.p>
      </div>
    </section>
  );
};
