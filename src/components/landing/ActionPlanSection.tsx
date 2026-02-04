import { motion } from "framer-motion";
import {
  CheckCircle,
  MessageCircle,
  FileText,
  Sparkles,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { useLeadMagnet } from "@/contexts/LeadMagnetContext";

export const ActionPlanSection = () => {
  const { formData, currentStep } = useLeadMagnet();

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
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Tu Plan de Acción personalizado</p>
                <p className="text-sm text-muted-foreground">Diagnóstico + soluciones específicas para tu operación</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Link para agendar llamada</p>
                <p className="text-sm text-muted-foreground">15 minutos con un especialista para revisar tu plan</p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Reminder box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 md:p-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-green-500 font-medium mb-2">
            <MessageCircle className="w-5 h-5" />
            Revisá tu WhatsApp
          </div>
          <p className="text-sm text-muted-foreground">
            El mensaje llega en los próximos minutos. Si no lo recibís, revisá la carpeta de spam o contactanos.
          </p>
        </motion.div>

        {/* Contact link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          ¿Problemas?{" "}
          <a
            href={`https://wa.me/5491112345678?text=Hola! Completé el diagnóstico y no recibí mi Plan de Acción. Mi email es ${formData.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            Contactanos por WhatsApp
            <ArrowRight className="w-3 h-3" />
          </a>
        </motion.p>
      </div>
    </section>
  );
};
