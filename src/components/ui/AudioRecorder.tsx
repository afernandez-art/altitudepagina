import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Square, Loader2, AlertCircle } from "lucide-react";

interface AudioRecorderProps {
  onTranscript: (text: string) => void;
  placeholder?: string;
}

// Check if Web Speech API is available
const isSpeechRecognitionSupported = () => {
  return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
};

export const AudioRecorder = ({ onTranscript, placeholder = "Hacé click para grabar..." }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef("");

  useEffect(() => {
    setIsSupported(isSpeechRecognitionSupported());
  }, []);

  const startRecording = async () => {
    setError(null);
    finalTranscriptRef.current = "";
    setTranscript("");

    if (!isSpeechRecognitionSupported()) {
      setError("Tu navegador no soporta grabación de voz. Probá con Chrome o Edge.");
      return;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = "es-AR"; // Spanish Argentina
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        setIsProcessing(false);
      };

      recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = finalTranscriptRef.current;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript + " ";
            finalTranscriptRef.current = finalTranscript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          setError("Permiso de micrófono denegado. Habilitalo en la configuración del navegador.");
        } else if (event.error === "no-speech") {
          setError("No se detectó audio. Intentá de nuevo.");
        } else {
          setError(`Error: ${event.error}`);
        }
        setIsRecording(false);
        setIsProcessing(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
        setIsProcessing(false);
        // Send final transcript
        if (finalTranscriptRef.current.trim()) {
          onTranscript(finalTranscriptRef.current.trim());
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Error starting recording:", err);
      setError("No se pudo acceder al micrófono. Verificá los permisos.");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      setIsProcessing(true);
      recognitionRef.current.stop();
    }
  };

  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 text-sm text-amber-500 bg-amber-500/10 px-4 py-3 rounded-xl">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>Grabación de voz no disponible en este navegador. Usá Chrome o Edge.</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Recording button */}
      <div className="flex items-center gap-3">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
            isRecording
              ? "bg-red-500 text-white"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Procesando...
            </>
          ) : isRecording ? (
            <>
              <Square className="w-5 h-5" />
              Detener
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Grabar audio
            </>
          )}
        </motion.button>

        {/* Recording indicator */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 text-red-500"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-3 h-3 bg-red-500 rounded-full"
              />
              <span className="text-sm font-medium">Grabando...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Transcript preview */}
      <AnimatePresence>
        {(transcript || isRecording) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-secondary/50 border border-zinc-700 rounded-xl p-4"
          >
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <MicOff className="w-3 h-3" />
              Transcripción en tiempo real:
            </p>
            <p className="text-sm min-h-[60px]">
              {transcript || (
                <span className="text-muted-foreground italic">{placeholder}</span>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 px-4 py-3 rounded-xl"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
