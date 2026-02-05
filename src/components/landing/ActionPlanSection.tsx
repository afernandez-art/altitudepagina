import { motion } from "framer-motion";
import {
  CheckCircle,
  MessageCircle,
  ArrowRight,
  Smartphone,
} from "lucide-react";
import { useLeadMagnet } from "@/contexts/LeadMagnetContext";

export const ActionPlanSection = () => {
  const { formData, currentStep, generateWhatsAppLink } = useLeadMagnet();

  if (currentStep !== "whatsapp_redirect") {
    return null;
  }

  const whatsappLink = generateWhatsAppLink();

  return (
    <section id="whatsapp-redirect-section" className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/30">
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
            Ya tenemos toda tu información.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg text-muted-foreground"
          >
            El siguiente paso es continuar la conversación por WhatsApp.
          </motion.p>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl border border-zinc-800 p-6 md:p-8 mb-8 text-center"
        >
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-8 h-8 text-green-500" />
          </div>

          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            Hacé click en el botón para enviarnos un mensaje con toda la información que completaste:
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition-all text-base md:text-lg shadow-2xl shadow-green-500/30 w-full sm:w-auto"
          >
            <MessageCircle className="w-6 h-6" />
            Continuar por WhatsApp
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-6"
        >
          <h3 className="font-bold mb-3 text-sm md:text-base">¿Qué pasa después?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Recibimos tu mensaje con todos los detalles de tu consulta</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Un especialista te contacta para resolver tus dudas</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Te armamos una propuesta personalizada según tu situación</span>
            </li>
          </ul>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          Respondemos de lunes a viernes de 9 a 18hs (hora Argentina)
        </motion.p>
      </div>
    </section>
  );
};
