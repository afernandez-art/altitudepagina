import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play,
  ArrowLeft,
  ArrowRight,
  Clock,
} from "lucide-react";
import {
  PerfilType,
  getPerfilLabel,
  getInversionLabel,
} from "@/contexts/LeadMagnetContext";
import { analytics, setupScrollTracking } from "@/lib/analytics";

const contenidoPorPerfil: Record<
  string,
  { titulo: string; videoPlaceholder: string; subtitulo: string }
> = {
  A: {
    titulo: "Podemos mejorar tu operación. Mirá cómo.",
    videoPlaceholder: "Video: Cómo mejoramos tu operación actual",
    subtitulo: "Te mostramos cómo optimizamos costos y tiempos para importadores que ya están operando.",
  },
  B: {
    titulo: "Tu primera importación es más fácil de lo que pensás.",
    videoPlaceholder: "Video: Tu primera importación paso a paso",
    subtitulo: "Te explicamos cómo funciona importar desde USD 1.000 con B2BOX.",
  },
  C: {
    titulo: "Tu producto, tu marca, desde China.",
    videoPlaceholder: "Video: De la idea al producto terminado",
    subtitulo: "Te mostramos cómo desarrollamos tu línea de productos desde China.",
  },
  default: {
    titulo: "Mirá cómo trabajamos.",
    videoPlaceholder: "Video: Conocé ADUANEX",
    subtitulo: "Te explicamos cómo funciona nuestro servicio de importación.",
  },
};

const Video = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const perfil = (searchParams.get("perfil") || "") as PerfilType;
  const necesidad = searchParams.get("necesidad") || "";
  const inversion = searchParams.get("inversion") || "";

  const [isPlaying, setIsPlaying] = useState(false);

  const contenido = contenidoPorPerfil[perfil] || contenidoPorPerfil.default;

  useEffect(() => {
    analytics.pageView("video");
    const cleanup = setupScrollTracking("video");
    return cleanup;
  }, []);

  const handleContinue = () => {
    const params = new URLSearchParams();
    if (perfil) params.set("perfil", perfil);
    if (necesidad) params.set("necesidad", necesidad);
    if (inversion) params.set("inversion", inversion);
    navigate(`/formulario?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-black text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1.5 md:gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm">Volver</span>
          </a>
          <div className="text-sm md:text-base font-bold text-white">ADUANEX</div>
        </div>
      </header>

      <main className="pt-14 md:pt-20">
        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-10">
              <h1 className="text-2xl md:text-4xl font-black text-white mb-3">{contenido.titulo}</h1>
              <p className="text-sm md:text-base text-zinc-400">Mirá este video y después dejanos tus datos</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 mb-10">
              <div className="aspect-video relative bg-gradient-to-br from-zinc-800 to-zinc-900">
                {!isPlaying ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 cursor-pointer" onClick={() => setIsPlaying(true)}>
                    <motion.div whileHover={{ scale: 1.05 }} className="w-20 h-20 md:w-28 md:h-28 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 mb-6">
                      <Play className="w-8 h-8 md:w-12 md:h-12 text-primary-foreground ml-1 md:ml-2" fill="currentColor" />
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 text-center">{contenido.videoPlaceholder}</h3>
                    <p className="text-zinc-400 mb-4 text-sm md:text-base max-w-md mx-auto text-center">{contenido.subtitulo}</p>
                    <div className="flex items-center gap-2 text-zinc-500 text-xs md:text-sm">
                      <Clock className="w-4 h-4" />
                      <span>3 minutos</span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <iframe
                      src="https://www.youtube.com/embed/s_TukTshYJ0?autoplay=1&rel=0"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Video explicativo ADUANEX"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Tags */}
            {perfil && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-2 justify-center mb-8">
                <span className="bg-zinc-800/50 text-zinc-400 px-3 py-1.5 rounded-full text-xs">{getPerfilLabel(perfil)}</span>
                {necesidad && <span className="bg-zinc-800/50 text-zinc-400 px-3 py-1.5 rounded-full text-xs">{necesidad}</span>}
                {inversion && <span className="bg-zinc-800/50 text-zinc-400 px-3 py-1.5 rounded-full text-xs">{getInversionLabel(inversion)}</span>}
              </motion.div>
            )}

            {/* CTA */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center">
              <button
                onClick={handleContinue}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all text-base md:text-lg inline-flex items-center gap-2 shadow-2xl shadow-primary/30"
              >
                Continuar al siguiente paso
                <ArrowRight className="w-5 h-5" />
              </button>
              {!isPlaying && (
                <button onClick={handleContinue} className="block mx-auto mt-4 text-zinc-500 hover:text-zinc-300 text-sm underline underline-offset-4 transition-colors">
                  Saltar video y continuar
                </button>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-6 md:py-8 px-4 md:px-6 border-t border-zinc-800 text-center text-xs md:text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} ADUANEX. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Video;
