import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { WhyAltitudeSection } from "@/components/landing/WhyAltitudeSection";
import { QuizSection } from "@/components/landing/QuizSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { ClientsSection } from "@/components/landing/ClientsSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { TeamSection } from "@/components/landing/TeamSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { FloatingCTA } from "@/components/landing/FloatingCTA";
import { LeadMagnetProvider } from "@/contexts/LeadMagnetContext";
import { analytics, setupScrollTracking } from "@/lib/analytics";

const Index = () => {
  // Track page view and scroll depth
  useEffect(() => {
    analytics.pageView("landing");
    const cleanup = setupScrollTracking("landing");
    return cleanup;
  }, []);

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
          {/* Al completar, abre /video-personalizado en nueva pestaña */}
          <QuizSection />

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
