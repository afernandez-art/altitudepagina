import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle,
  Clock,
  User,
  Building,
} from "lucide-react";
import { useLeadMagnet, VideoClip, nichosOptions, facturacionOptions } from "@/contexts/LeadMagnetContext";
import { Progress } from "@/components/ui/progress";

export const DynamicVSLSection = () => {
  const { formData, getVideoPlaylist, getTotalVideoDuration, currentStep, setCurrentStep } = useLeadMagnet();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [clipProgress, setClipProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const playlist = getVideoPlaylist();
  const currentClip = playlist[currentClipIndex];
  const totalDuration = getTotalVideoDuration();

  // Simular progreso del video (placeholder)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentClip) {
      interval = setInterval(() => {
        setClipProgress((prev) => {
          const newProgress = prev + (100 / currentClip.duracion);
          if (newProgress >= 100) {
            // Pasar al siguiente clip
            if (currentClipIndex < playlist.length - 1) {
              setCurrentClipIndex((i) => i + 1);
              return 0;
            } else {
              // Video terminado
              setIsPlaying(false);
              setHasFinished(true);
              return 100;
            }
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentClip, currentClipIndex, playlist.length]);

  const handlePlayPause = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = () => {
    if (currentClipIndex < playlist.length - 1) {
      setCurrentClipIndex((i) => i + 1);
      setClipProgress(0);
    }
  };

  const handleContinue = () => {
    setCurrentStep("form2");
    setTimeout(() => {
      document.getElementById("form2-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Calcular progreso total
  const completedClipsDuration = playlist
    .slice(0, currentClipIndex)
    .reduce((sum, clip) => sum + clip.duracion, 0);
  const currentClipDuration = currentClip ? (clipProgress / 100) * currentClip.duracion : 0;
  const totalProgress = ((completedClipsDuration + currentClipDuration) / totalDuration) * 100;

  // Obtener labels amigables
  const nichoLabel = nichosOptions.find((n) => n.id === formData.nicho)?.label || formData.nicho;
  const factLabel = facturacionOptions.find((f) => f.id === formData.facturacion)?.label || formData.facturacion;

  if (currentStep !== "vsl" && currentStep !== "form2" && currentStep !== "action_plan" && currentStep !== "calendar") {
    return null;
  }

  return (
    <section id="vsl-section" className="py-20 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Personalization header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <CheckCircle className="w-4 h-4" />
            Video generado para {formData.nombre || "vos"}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
            Tu Video Personalizado
          </h2>
          <p className="text-zinc-400">
            Basado en tu industria y necesidades específicas
          </p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900"
        >
          {/* Video area (placeholder) */}
          <div className="aspect-video relative bg-gradient-to-br from-zinc-800 to-zinc-900">
            {/* Placeholder content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {!hasStarted ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    onClick={handlePlayPause}
                    className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 cursor-pointer mb-6"
                  >
                    <Play className="w-10 h-10 text-primary-foreground ml-2" fill="currentColor" />
                  </motion.div>
                  <p className="text-white text-xl font-semibold mb-2">
                    Video preparado para {formData.nombre}
                  </p>
                  <p className="text-zinc-400 text-sm">
                    Duración: {Math.ceil(totalDuration / 60)} minutos
                  </p>
                </>
              ) : (
                <>
                  {/* Simulated video content */}
                  <div className="absolute inset-0 p-8 flex flex-col">
                    {/* Current clip indicator */}
                    <div className="flex items-center justify-between mb-auto">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {currentClip?.categoria.replace("_", " ").toUpperCase()}
                      </span>
                      <span className="text-zinc-400 text-sm">
                        Clip {currentClipIndex + 1} de {playlist.length}
                      </span>
                    </div>

                    {/* Placeholder video visual */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <motion.div
                          animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center"
                        >
                          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                            {isPlaying ? (
                              <div className="flex gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                  <motion.div
                                    key={i}
                                    className="w-1.5 bg-primary rounded-full"
                                    animate={{ height: ["12px", "24px", "12px"] }}
                                    transition={{
                                      repeat: Infinity,
                                      duration: 0.8,
                                      delay: i * 0.1,
                                    }}
                                  />
                                ))}
                              </div>
                            ) : (
                              <Pause className="w-8 h-8 text-primary" />
                            )}
                          </div>
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {currentClip?.titulo}
                        </h3>
                        <p className="text-zinc-400">
                          {isPlaying ? "Reproduciendo..." : "En pausa"}
                        </p>
                      </div>
                    </div>

                    {/* Personalization tags */}
                    <div className="flex flex-wrap gap-2 justify-center mt-auto">
                      <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        <Building className="w-3 h-3" /> {nichoLabel}
                      </span>
                      <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        <User className="w-3 h-3" /> {formData.empresa || "Tu empresa"}
                      </span>
                    </div>
                  </div>

                  {/* Click to play/pause overlay */}
                  <div
                    className="absolute inset-0 cursor-pointer z-10"
                    onClick={handlePlayPause}
                  />
                </>
              )}

              {/* Video finished overlay */}
              {hasFinished && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Video completado
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    Ahora completá algunos datos más para tu plan personalizado
                  </p>
                  <button
                    onClick={handleContinue}
                    className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all"
                  >
                    Continuar al siguiente paso
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Video controls */}
          <div className="p-4 bg-zinc-900/90 border-t border-zinc-800">
            {/* Progress bar */}
            <div className="mb-4">
              <Progress value={totalProgress} className="h-1.5" />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlayPause}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  )}
                </button>
                <button
                  onClick={handleSkip}
                  disabled={currentClipIndex >= playlist.length - 1}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SkipForward className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
                <span className="text-zinc-400 text-sm">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {Math.floor(totalProgress * totalDuration / 100 / 60)}:
                  {String(Math.floor((totalProgress * totalDuration / 100) % 60)).padStart(2, "0")} /
                  {Math.floor(totalDuration / 60)}:
                  {String(totalDuration % 60).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                  <Maximize className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Playlist sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {playlist.map((clip, index) => (
            <div
              key={clip.id}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                index === currentClipIndex
                  ? "bg-primary/10 border-primary"
                  : index < currentClipIndex
                  ? "bg-zinc-800/50 border-zinc-700 opacity-60"
                  : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
              }`}
              onClick={() => {
                if (index <= currentClipIndex) {
                  setCurrentClipIndex(index);
                  setClipProgress(0);
                }
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    index < currentClipIndex
                      ? "bg-green-500/20 text-green-500"
                      : index === currentClipIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-zinc-700 text-zinc-400"
                  }`}
                >
                  {index < currentClipIndex ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{clip.titulo}</p>
                  <p className="text-xs text-zinc-500">{clip.duracion}s</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA after video */}
        {hasStarted && !hasFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <button
              onClick={handleContinue}
              className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
            >
              Saltar video y continuar
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
