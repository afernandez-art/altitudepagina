import { useEffect } from "react";
import { DynamicVSLSection } from "@/components/landing/DynamicVSLSection";
import { QualificationForm2 } from "@/components/landing/QualificationForm2";
import { ActionPlanSection } from "@/components/landing/ActionPlanSection";
import { CalendarSection } from "@/components/landing/CalendarSection";
import { LeadMagnetProvider, useLeadMagnet } from "@/contexts/LeadMagnetContext";
import { motion } from "framer-motion";
import { ArrowLeft, FileSearch } from "lucide-react";

const VideoContent = () => {
  const { formData, currentStep, setCurrentStep, loadFromStorage } = useLeadMagnet();

  useEffect(() => {
    // Load data from localStorage on mount
    loadFromStorage();
    // Set step to VSL
    setCurrentStep("vsl");
  }, []);

  // If no data, show error
  if (!formData.nombre && !formData.email) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <FileSearch className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Diagnóstico no disponible</h1>
          <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
            Para ver tu diagnóstico personalizado, primero completá el cuestionario en nuestra página principal.
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1.5 md:gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm">Volver</span>
          </a>
          <div className="text-xs md:text-sm text-muted-foreground">
            Diagnóstico para <span className="text-primary font-semibold">{formData.nombre}</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-14 md:pt-20">
        <DynamicVSLSection />
        <QualificationForm2 />
        <ActionPlanSection />
        <CalendarSection />
      </main>

      {/* Simple footer */}
      <footer className="py-6 md:py-8 px-4 md:px-6 border-t border-zinc-800 text-center text-xs md:text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Altitude Logistics Group. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

const VideoPersonalizado = () => {
  return (
    <LeadMagnetProvider>
      <VideoContent />
    </LeadMagnetProvider>
  );
};

export default VideoPersonalizado;
