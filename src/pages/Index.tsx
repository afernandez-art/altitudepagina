import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { LeadMagnetFormSection } from "@/components/landing/LeadMagnetFormSection";
import { DynamicVSLSection } from "@/components/landing/DynamicVSLSection";
import { QualificationForm2 } from "@/components/landing/QualificationForm2";
import { ActionPlanSection } from "@/components/landing/ActionPlanSection";
import { CalendarSection } from "@/components/landing/CalendarSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { WhyAltitudeSection } from "@/components/landing/WhyAltitudeSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { ClientsSection } from "@/components/landing/ClientsSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { TeamSection } from "@/components/landing/TeamSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { LeadMagnetProvider } from "@/contexts/LeadMagnetContext";

const Index = () => {
  return (
    <LeadMagnetProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <Navbar />
        <main>
          {/* Hero con video intro */}
          <HeroSection />

          {/* Lead Magnet Dinámico - Flujo principal */}
          <LeadMagnetFormSection />
          <DynamicVSLSection />
          <QualificationForm2 />
          <ActionPlanSection />
          <CalendarSection />

          {/* Resto del contenido de la landing */}
          <ServicesSection />
          <WhyAltitudeSection />
          <ProcessSection />
          <ClientsSection />
          <AboutSection />
          <TeamSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </LeadMagnetProvider>
  );
};

export default Index;
