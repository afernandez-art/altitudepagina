import { useEffect } from "react";
import { DynamicVSLSection } from "@/components/landing/DynamicVSLSection";
import { QualificationForm2 } from "@/components/landing/QualificationForm2";
import { ActionPlanSection } from "@/components/landing/ActionPlanSection";
import { CalendarSection } from "@/components/landing/CalendarSection";
import { LeadMagnetProvider, useLeadMagnet } from "@/contexts/LeadMagnetContext";
import { motion } from "framer-motion";
import { ArrowLeft, Play } from "lucide-react";

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
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Play className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Video no disponible</h1>
          <p className="text-muted-foreground mb-8">
            Para ver tu video personalizado, primero completá el cuestionario en nuestra página principal.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver a Altitude</span>
          </a>
          <div className="text-sm text-muted-foreground">
            Video preparado para <span className="text-primary font-semibold">{formData.nombre}</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-20">
        <DynamicVSLSection />
        <QualificationForm2 />
        <ActionPlanSection />
        <CalendarSection />
      </main>

      {/* Simple footer */}
      <footer className="py-8 px-6 border-t border-zinc-800 text-center text-sm text-muted-foreground">
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
