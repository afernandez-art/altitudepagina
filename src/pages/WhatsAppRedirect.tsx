import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  MessageCircle,
  ArrowRight,
  Smartphone,
  ArrowLeft,
} from "lucide-react";
import {
  LeadMagnetProvider,
  useLeadMagnet,
} from "@/contexts/LeadMagnetContext";
import { analytics, setupScrollTracking } from "@/lib/analytics";

const WhatsAppContent = () => {
  const { formData, loadFromStorage, generateWhatsAppLink } = useLeadMagnet();

  useEffect(() => {
    loadFromStorage();
    analytics.pageView("whatsapp");
    const cleanup = setupScrollTracking("whatsapp");
    return cleanup;
  }, []);

  // If no data, redirect to home
  if (!formData.nombre) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Página no disponible</h1>
          <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
            Para continuar, primero completá el formulario en nuestra página principal.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 md:px-6 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-bold hover:bg-primary/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            Ir a la página principal
          </a>
        </motion.div>
      </div>
    );
  }

  const whatsappLink = generateWhatsAppLink();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1.5 md:gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm">Volver al inicio</span>
          </a>
          <div className="text-xs md:text-sm text-muted-foreground">
            Altitude Logistics Group
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-14 md:pt-20">
        <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/30">
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4"
              >
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                Paso 4 de 4 - Último paso
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-4xl font-black tracking-tight mb-4"
              >
                ¡Listo, {formData.nombre?.split(' ')[0]}!
              </motion.h1>

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
                onClick={() => analytics.conversion.whatsappClick()}
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
      </main>

      {/* Simple footer */}
      <footer className="py-6 md:py-8 px-4 md:px-6 border-t border-zinc-800 text-center text-xs md:text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Altitude Logistics Group. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

const WhatsAppRedirect = () => {
  return (
    <LeadMagnetProvider>
      <WhatsAppContent />
    </LeadMagnetProvider>
  );
};

export default WhatsAppRedirect;
