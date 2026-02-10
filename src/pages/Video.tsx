import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play,
  CheckCircle,
  Building,
  Target,
  ArrowRight,
  ArrowLeft,
  Clock,
} from "lucide-react";
import {
  LeadMagnetProvider,
  useLeadMagnet,
  nichoOptions,
  getSituacionTitulo,
} from "@/contexts/LeadMagnetContext";
import { analytics, setupScrollTracking } from "@/lib/analytics";

const VideoContent = () => {
  const navigate = useNavigate();
  const { formData, loadFromStorage } = useLeadMagnet();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    loadFromStorage();
    analytics.pageView("video");
    const cleanup = setupScrollTracking("video");
    return cleanup;
  }, []);

  const handleContinueToForm = () => {
    navigate("/cotizar");
  };

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  // If no data from Form 1, redirect to home
  if (!formData.nicho && !formData.situacion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Play className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Video no disponible</h1>
          <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
            Para ver el video, primero completá el cuestionario en nuestra página principal.
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

  // Get friendly labels
  const nichoLabel = formData.nicho === "otro" && formData.nichoOtro
    ? formData.nichoOtro
    : nichoOptions.find((n) => n.id === formData.nicho)?.label || formData.nicho;

  const situacionLabel = getSituacionTitulo(formData.situacion);

  return (
    <div className="min-h-screen bg-black text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1.5 md:gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm">Volver</span>
          </a>
          <div className="text-xs md:text-sm text-muted-foreground">
            Altitude Logistics Group
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-14 md:pt-20">
        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6 md:mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                Paso 2 de 4
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-white mb-2">
                Conocé cómo podemos ayudarte
              </h1>
              <p className="text-sm md:text-base text-zinc-400">
                Te mostramos cómo trabajamos y qué soluciones tenemos para vos
              </p>
            </motion.div>

            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 mb-8"
            >
              <div className="aspect-video relative bg-gradient-to-br from-zinc-800 to-zinc-900">
                {!isPlaying ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      onClick={handlePlayVideo}
                      className="w-20 h-20 md:w-28 md:h-28 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 cursor-pointer mb-6"
                    >
                      <Play className="w-8 h-8 md:w-12 md:h-12 text-primary-foreground ml-1 md:ml-2" fill="currentColor" />
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 text-center">
                      Mirá este video antes de continuar
                    </h3>
                    <p className="text-zinc-400 mb-6 text-sm md:text-base max-w-md mx-auto text-center">
                      Te explicamos cómo funciona nuestro servicio y cómo podemos ayudarte con tu operación.
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
                      title="Video explicativo Altitude"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Summary tags below video */}
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3 justify-center mb-8"
              >
                <span className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                  <Building className="w-4 h-4" /> {nichoLabel}
                </span>
                {situacionLabel && (
                  <span className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                    <Target className="w-4 h-4" /> {situacionLabel.length > 40 ? situacionLabel.slice(0, 40) + "..." : situacionLabel}
                  </span>
                )}
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              {isPlaying ? (
                <button
                  onClick={handleContinueToForm}
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all text-base md:text-lg inline-flex items-center gap-2 shadow-2xl shadow-primary/30"
                >
                  Continuar al siguiente paso
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleContinueToForm}
                  className="text-zinc-500 hover:text-zinc-300 text-sm underline underline-offset-4 transition-colors"
                >
                  Saltar video y continuar
                </button>
              )}
            </motion.div>
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

const Video = () => {
  return (
    <LeadMagnetProvider>
      <VideoContent />
    </LeadMagnetProvider>
  );
};

export default Video;
