import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play,
  ArrowLeft,
  ArrowRight,
  Clock,
  MessageCircle,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import {
  PerfilType,
  derivarServicio,
  servicioInfo,
  ServicioDerivado,
  getPerfilLabel,
  getInversionLabel,
  generateWhatsAppLink,
  LeadFormData,
} from "@/contexts/LeadMagnetContext";

const Video = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const perfil = (searchParams.get("perfil") || "") as PerfilType;
  const necesidad = searchParams.get("necesidad") || "";
  const inversion = searchParams.get("inversion") || "";

  const [isPlaying, setIsPlaying] = useState(false);

  const servicio = derivarServicio(perfil, necesidad, inversion);
  const isNotB2B = servicio === "NOT_B2B";
  const info = !isNotB2B ? servicioInfo[servicio] : null;

  const handleContinue = () => {
    const params = new URLSearchParams();
    if (perfil) params.set("perfil", perfil);
    if (necesidad) params.set("necesidad", necesidad);
    if (inversion) params.set("inversion", inversion);
    navigate(`/formulario?${params.toString()}`);
  };

  const handleWhatsApp = () => {
    const leadData: LeadFormData = {
      perfil,
      necesidad,
      inversion,
      nombre: "",
      whatsapp: "",
      email: "",
      empresa: "",
      mensaje: "",
    };
    const link = generateWhatsAppLink(leadData);
    window.open(link, "_blank");
  };

  const handleRestart = () => {
    navigate("/#quiz-section");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1.5 md:gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm">Volver</span>
          </a>
          <div className="text-sm md:text-base font-bold">ADUANEX</div>
        </div>
      </header>

      <main className="pt-14 md:pt-20">
        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {isNotB2B ? (
              /* NOT B2B Screen */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-2xl mx-auto"
              >
                <span className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Aviso
                </span>

                <h1 className="text-2xl md:text-4xl font-black mb-4">
                  Solo trabajamos B2B
                </h1>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                  No realizamos importaciones para uso personal. Nuestros servicios están pensados para empresas y emprendedores que quieren revender o incorporar productos importados a su negocio.
                </p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-10">
                  Si en algún momento arrancás un proyecto comercial, acá vamos a estar.
                </p>

                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  <RotateCcw className="w-5 h-5" />
                  Volver a empezar
                </button>
              </motion.div>
            ) : info ? (
              /* Service Result Screen */
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8 md:mb-10"
                >
                  <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
                    Tu solución ideal
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black mb-3">
                    {info.nombre}
                  </h1>
                  <p
                    className="text-lg md:text-xl font-semibold mb-3"
                    style={{ color: info.color }}
                  >
                    {info.tagline}
                  </p>
                  <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
                    {info.descripcion}
                  </p>
                </motion.div>

                {/* Video placeholder */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl overflow-hidden border border-border bg-card mb-10"
                >
                  <div className="aspect-video relative bg-gradient-to-br from-muted to-card">
                    {!isPlaying ? (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center p-6 cursor-pointer"
                        onClick={() => setIsPlaying(true)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-2xl mb-6"
                          style={{
                            backgroundColor: info.color,
                            boxShadow: `0 10px 40px ${info.color}40`,
                          }}
                        >
                          <Play className="w-8 h-8 md:w-12 md:h-12 text-background ml-1 md:ml-2" fill="currentColor" />
                        </motion.div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 text-center">
                          {info.videoLabel}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
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
                          title={`Video ${info.nombre}`}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Tags */}
                {perfil && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-2 justify-center mb-8"
                  >
                    <span className="bg-muted text-muted-foreground px-3 py-1.5 rounded-full text-xs">
                      {getPerfilLabel(perfil)}
                    </span>
                    {necesidad && (
                      <span className="bg-muted text-muted-foreground px-3 py-1.5 rounded-full text-xs">
                        {necesidad}
                      </span>
                    )}
                    {inversion && (
                      <span className="bg-muted text-muted-foreground px-3 py-1.5 rounded-full text-xs">
                        {getInversionLabel(inversion)}
                      </span>
                    )}
                  </motion.div>
                )}

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center space-y-4"
                >
                  <button
                    onClick={handleContinue}
                    className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all text-base md:text-lg inline-flex items-center gap-2 shadow-2xl shadow-primary/30"
                  >
                    Quiero que me contacten
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleWhatsApp}
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Hablar por WhatsApp
                    </button>
                    <span className="hidden sm:inline text-border">|</span>
                    <button
                      onClick={handleRestart}
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Volver a empezar
                    </button>
                  </div>
                </motion.div>
              </>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="py-6 md:py-8 px-4 md:px-6 border-t border-border text-center text-xs md:text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} ADUANEX. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Video;
