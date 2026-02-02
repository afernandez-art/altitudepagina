import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { WhyAltitudeSection } from "@/components/landing/WhyAltitudeSection";
import { QuizSection } from "@/components/landing/QuizSection";
import { DynamicVSLSection } from "@/components/landing/DynamicVSLSection";
import { QualificationForm2 } from "@/components/landing/QualificationForm2";
import { ActionPlanSection } from "@/components/landing/ActionPlanSection";
import { CalendarSection } from "@/components/landing/CalendarSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { ClientsSection } from "@/components/landing/ClientsSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { TeamSection } from "@/components/landing/TeamSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { FloatingCTA } from "@/components/landing/FloatingCTA";
import { LeadMagnetProvider } from "@/contexts/LeadMagnetContext";

const Index = () => {
  return (
    <LeadMagnetProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <Navbar />
        <main>
          {/* 1. Hero - Qué hacemos + CTAs */}
          <HeroSection />

          {/* 2. Servicios - Conocen el alcance */}
          <ServicesSection />

          {/* 3. Por qué Altitude - Confían */}
          <WhyAltitudeSection />

          {/* 4. Quiz - Lead Magnet Dinámico */}
          <QuizSection />

          {/* 5. Video Personalizado (se muestra después del quiz) */}
          <DynamicVSLSection />

          {/* 6. Form 2 - Profundización */}
          <QualificationForm2 />

          {/* 7. Plan de Acción Personalizado */}
          <ActionPlanSection />

          {/* 8. Calendario - Agendar llamada */}
          <CalendarSection />

          {/* Resto del contenido */}
          <ProcessSection />
          <ClientsSection />
          <AboutSection />
          <TeamSection />
          <CTASection />
        </main>
        <Footer />

        {/* CTA Flotante */}
        <FloatingCTA />
      </div>
    </LeadMagnetProvider>
  );
};

export default Index;
