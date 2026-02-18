import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";
import { useLeadMagnet } from "@/contexts/LeadMagnetContext";

export const FloatingCTA = () => {
  const { currentStep } = useLeadMagnet();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 500;
      const quizSection = document.getElementById("quiz-section");
      const quizTop = quizSection?.offsetTop || 0;
      const isNearQuiz = window.scrollY > quizTop - 200;

      setIsVisible(scrolled && !isNearQuiz && !isDismissed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (currentStep !== "form1") {
    return null;
  }

  const scrollToQuiz = () => {
    document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToQuiz}
            className="bg-primary text-primary-foreground px-6 py-3.5 rounded-full font-semibold shadow-2xl shadow-primary/30 flex items-center gap-2"
          >
            <span className="hidden sm:inline">Cotizar operación</span>
            <span className="sm:hidden">Cotizar</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <button
            onClick={() => setIsDismissed(true)}
            className="w-10 h-10 bg-card hover:bg-card/80 border border-border/50 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
