import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
  MessageCircle,
  Mail,
} from "lucide-react";
import {
  PerfilType,
  LeadFormData,
  getPerfilLabel,
  getInversionLabel,
  generateWhatsAppLink,
  submitLead,
} from "@/contexts/LeadMagnetContext";
import { analytics, setupScrollTracking } from "@/lib/analytics";

// Contenido personalizado por perfil
const contenidoPorPerfil: Record<
  string,
  { titulo: string; videoPlaceholder: string; subtitulo: string }
> = {
  A: {
    titulo: "Podemos mejorar tu operación. Mirá cómo.",
    videoPlaceholder: "Video: Cómo mejoramos tu operación actual",
    subtitulo:
      "Te mostramos cómo optimizamos costos y tiempos para importadores que ya están operando.",
  },
  B: {
    titulo: "Tu primera importación es más fácil de lo que pensás.",
    videoPlaceholder: "Video: Tu primera importación paso a paso",
    subtitulo:
      "Te explicamos cómo funciona importar desde USD 1.000 con B2BOX.",
  },
  C: {
    titulo: "Tu producto, tu marca, desde China.",
    videoPlaceholder: "Video: De la idea al producto terminado",
    subtitulo:
      "Te mostramos cómo desarrollamos tu línea de productos desde China.",
  },
  default: {
    titulo: "Mirá cómo trabajamos.",
    videoPlaceholder: "Video: Conocé ADUANEX",
    subtitulo: "Te explicamos cómo funciona nuestro servicio de importación.",
  },
};

const Video = () => {
  const [searchParams] = useSearchParams();
  const perfil = (searchParams.get("perfil") || "") as PerfilType;
  const necesidad = searchParams.get("necesidad") || "";
  const inversion = searchParams.get("inversion") || "";

  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    whatsapp: "",
    email: "",
    empresa: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get personalized content
  const contenido = contenidoPorPerfil[perfil] || contenidoPorPerfil.default;

  useEffect(() => {
    analytics.pageView("video");
    const cleanup = setupScrollTracking("video");
    return cleanup;
  }, []);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim() || formData.nombre.trim().length < 2) {
      newErrors.nombre = "Ingresá tu nombre";
    }

    const phoneRegex = /^[\d\s\-+()]{8,}$/;
    if (!formData.whatsapp.trim() || !phoneRegex.test(formData.whatsapp)) {
      newErrors.whatsapp = "Ingresá un número válido";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const leadData: LeadFormData = {
      perfil,
      necesidad,
      inversion,
      ...formData,
    };

    await submitLead(leadData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleWhatsAppClick = () => {
    const leadData: LeadFormData = {
      perfil,
      necesidad,
      inversion,
      ...formData,
    };
    const link = generateWhatsAppLink(leadData);
    window.open(link, "_blank");
  };

  // No data state - allow access anyway with default content
  const showDefaultContent = !perfil;

  return (
    <div className="min-h-screen bg-black text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-1.5 md:gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm">Volver</span>
          </a>
          <div className="text-sm md:text-base font-bold text-white">
            ADUANEX
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-14 md:pt-20">
        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header personalizado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 md:mb-10"
            >
              <h1 className="text-2xl md:text-4xl font-black text-white mb-3">
                {contenido.titulo}
              </h1>
              <p className="text-sm md:text-base text-zinc-400">
                Mirá este video y dejanos tus datos para contactarte
              </p>
            </motion.div>

            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 mb-10"
            >
              <div className="aspect-video relative bg-gradient-to-br from-zinc-800 to-zinc-900">
                {!isPlaying ? (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 cursor-pointer"
                    onClick={handlePlayVideo}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-20 h-20 md:w-28 md:h-28 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 mb-6"
                    >
                      <Play
                        className="w-8 h-8 md:w-12 md:h-12 text-primary-foreground ml-1 md:ml-2"
                        fill="currentColor"
                      />
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 text-center">
                      {contenido.videoPlaceholder}
                    </h3>
                    <p className="text-zinc-400 mb-4 text-sm md:text-base max-w-md mx-auto text-center">
                      {contenido.subtitulo}
                    </p>
                    <div className="flex items-center gap-2 text-zinc-500 text-xs md:text-sm">
                      <Clock className="w-4 h-4" />
                      <span>3 minutos</span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <iframe
                      src="https://www.youtube.com/embed/NVLgkXylEuQ?autoplay=1&rel=0"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Video explicativo ADUANEX"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Form or Confirmation */}
            {!isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 md:p-10"
              >
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">
                  Dejanos tus datos
                </h2>
                <p className="text-zinc-400 text-sm md:text-base text-center mb-8">
                  Te contactamos para ayudarte con tu importación
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      className={`w-full bg-zinc-800 border ${
                        errors.nombre ? "border-red-500" : "border-zinc-700"
                      } rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors`}
                      placeholder="Tu nombre"
                    />
                    {errors.nombre && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.nombre}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      className={`w-full bg-zinc-800 border ${
                        errors.whatsapp ? "border-red-500" : "border-zinc-700"
                      } rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors`}
                      placeholder="+54 9 11 1234-5678"
                    />
                    {errors.whatsapp && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>

                  {/* Email (opcional) */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Email{" "}
                      <span className="text-zinc-500 font-normal">
                        (opcional)
                      </span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full bg-zinc-800 border ${
                        errors.email ? "border-red-500" : "border-zinc-700"
                      } rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Empresa (opcional) */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Empresa{" "}
                      <span className="text-zinc-500 font-normal">
                        (opcional)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={(e) =>
                        setFormData({ ...formData, empresa: e.target.value })
                      }
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      ¿Qué necesitás?
                    </label>
                    <textarea
                      value={formData.mensaje}
                      onChange={(e) =>
                        setFormData({ ...formData, mensaje: e.target.value })
                      }
                      rows={3}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Contanos brevemente qué estás buscando..."
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-base md:text-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Quiero que me contacten
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* Confirmation screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 md:p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-primary" />
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  ¡Listo, {formData.nombre.split(" ")[0]}!
                </h2>

                <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                  {perfil === "A" &&
                    "Recibimos tu consulta. En breve te contactamos para analizar cómo mejorar tu operación."}
                  {perfil === "B" &&
                    "Recibimos tu consulta. Te contactamos para explicarte cómo empezar a importar con B2BOX."}
                  {perfil === "C" &&
                    "Recibimos tu consulta. Te contactamos para ayudarte a desarrollar tu producto desde China."}
                  {!perfil &&
                    "Recibimos tu consulta. En breve un asesor se pondrá en contacto con vos."}
                </p>

                {/* WhatsApp CTA */}
                <button
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-base md:text-lg hover:bg-[#20bd5a] transition-all shadow-xl"
                >
                  <MessageCircle className="w-6 h-6" />
                  Escribinos por WhatsApp
                </button>

                <p className="text-zinc-500 text-sm mt-6 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  También podés escribirnos a contacto@aduanex.com
                </p>
              </motion.div>
            )}

            {/* Tags with quiz info (only if we have data) */}
            {perfil && !isSubmitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-2 justify-center mt-8"
              >
                <span className="bg-zinc-800/50 text-zinc-400 px-3 py-1.5 rounded-full text-xs">
                  {getPerfilLabel(perfil)}
                </span>
                {necesidad && (
                  <span className="bg-zinc-800/50 text-zinc-400 px-3 py-1.5 rounded-full text-xs">
                    {necesidad}
                  </span>
                )}
                {inversion && (
                  <span className="bg-zinc-800/50 text-zinc-400 px-3 py-1.5 rounded-full text-xs">
                    {getInversionLabel(inversion)}
                  </span>
                )}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* Simple footer */}
      <footer className="py-6 md:py-8 px-4 md:px-6 border-t border-zinc-800 text-center text-xs md:text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} ADUANEX. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Video;
