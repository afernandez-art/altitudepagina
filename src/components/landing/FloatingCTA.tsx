import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FileSearch, X } from "lucide-react";
import { useLeadMagnet } from "@/contexts/LeadMagnetContext";

export const FloatingCTA = () => {
  const { currentStep } = useLeadMagnet();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 500px
      const scrolled = window.scrollY > 500;
      // Hide if user is in the quiz section or beyond
      const quizSection = document.getElementById("quiz-section");
      const quizTop = quizSection?.offsetTop || 0;
      const isNearQuiz = window.scrollY > quizTop - 200;

      setIsVisible(scrolled && !isNearQuiz && !isDismissed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  // Don't show if user has started the flow
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
            className="bg-primary text-primary-foreground px-6 py-4 rounded-full font-bold shadow-2xl shadow-primary/40 flex items-center gap-2"
          >
            <FileSearch className="w-5 h-5" />
            <span className="hidden sm:inline">Mi diagnóstico gratis</span>
            <span className="sm:hidden">Diagnóstico</span>
          </motion.button>
          <button
            onClick={() => setIsDismissed(true)}
            className="w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
