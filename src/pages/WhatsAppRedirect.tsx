import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  MessageCircle,
  ArrowRight,
  Smartphone,
  Mail,
} from "lucide-react";
import {
  PerfilType,
  LeadFormData,
  generateWhatsAppLink,
} from "@/contexts/LeadMagnetContext";
import { analytics } from "@/lib/analytics";

const WhatsAppRedirect = () => {
  const [searchParams] = useSearchParams();
  const perfil = (searchParams.get("perfil") || "") as PerfilType;
  const necesidad = searchParams.get("necesidad") || "";
  const inversion = searchParams.get("inversion") || "";
  const nombre = searchParams.get("nombre") || "";
  const whatsapp = searchParams.get("whatsapp") || "";
  const email = searchParams.get("email") || "";
  const empresa = searchParams.get("empresa") || "";
  const mensaje = searchParams.get("mensaje") || "";

  const leadData: LeadFormData = {
    perfil,
    necesidad,
    inversion,
    nombre,
    whatsapp,
    email,
    empresa,
    mensaje,
  };

  const whatsappLink = generateWhatsAppLink(leadData);

  useEffect(() => {
    analytics.pageView("whatsapp_redirect");
  }, []);

  const handleWhatsAppClick = () => {
    analytics.conversion.whatsappClick();
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-foreground flex flex-col">
      <header className="bg-black/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors text-xs md:text-sm">← Volver al inicio</a>
          <div className="text-sm md:text-base font-bold text-white">ADUANEX</div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 md:px-6 py-12">
        <div className="max-w-2xl w-full">
          {/* Success animation */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="w-20 h-20 md:w-24 md:h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-500" />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-2xl md:text-4xl font-black tracking-tight mb-4 text-white">
              ¡Listo, {nombre.split(" ")[0]}!
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg md:text-xl text-zinc-400 mb-2">
              Ya tenemos toda tu información.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-base md:text-lg text-zinc-400">
              El siguiente paso es continuar la conversación por WhatsApp.
            </motion.p>
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 md:p-8 mb-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-8 h-8 text-green-500" />
            </div>

            <p className="text-zinc-400 mb-6 text-sm md:text-base">
              Hacé click en el botón para enviarnos un mensaje con toda la información que completaste:
            </p>

            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition-all text-base md:text-lg shadow-2xl shadow-green-500/30 w-full sm:w-auto"
            >
              <MessageCircle className="w-6 h-6" />
              Continuar por WhatsApp
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Info box */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-6">
            <h3 className="font-bold mb-3 text-sm md:text-base text-white">¿Qué pasa después?</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
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
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center text-xs text-zinc-500 mt-6">
            <span className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              También podés escribirnos a contacto@aduanex.com
            </span>
          </motion.p>
        </div>
      </main>

      <footer className="py-6 md:py-8 px-4 md:px-6 border-t border-zinc-800 text-center text-xs md:text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} ADUANEX. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default WhatsAppRedirect;
