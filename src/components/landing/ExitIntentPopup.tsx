import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ArrowRight, CheckCircle } from "lucide-react";

export const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const alreadyShown = sessionStorage.getItem("exitPopupShown");
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitPopupShown", "true");
      }
    };

    // Only trigger on desktop
    if (window.innerWidth > 768) {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Here you could send to a webhook or save to Supabase
    console.log("Exit intent lead:", email);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <>
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-2">
                    ¡Esperá! Antes de irte...
                  </h3>
                  <p className="text-zinc-400 text-center text-sm md:text-base mb-6">
                    Descargá gratis nuestro <span className="text-primary font-semibold">Checklist de Importación</span> con los 10 errores más comunes que cometen los importadores.
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2 mb-6">
                    {[
                      "Los costos ocultos que nadie te cuenta",
                      "Cómo evitar retenciones en aduana",
                      "El error #1 al elegir proveedor",
                    ].map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2 text-sm text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Tu email"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                    >
                      Quiero el Checklist
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <p className="text-xs text-zinc-500 text-center mt-4">
                    Sin spam. Solo contenido de valor.
                  </p>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    ¡Listo!
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    Te enviamos el checklist a tu email.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
