import { useEffect, lazy, Suspense } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { WhyAltitudeSection } from "@/components/landing/WhyAltitudeSection";
import { QuizSection } from "@/components/landing/QuizSection";
import { FloatingCTA } from "@/components/landing/FloatingCTA";
import { LeadMagnetProvider } from "@/contexts/LeadMagnetContext";
import { analytics, setupScrollTracking } from "@/lib/analytics";

// Lazy load below-the-fold sections for better initial load
const ProcessSection = lazy(() => import("@/components/landing/ProcessSection").then(m => ({ default: m.ProcessSection })));
const ClientsSection = lazy(() => import("@/components/landing/ClientsSection").then(m => ({ default: m.ClientsSection })));
const AboutSection = lazy(() => import("@/components/landing/AboutSection").then(m => ({ default: m.AboutSection })));

const CTASection = lazy(() => import("@/components/landing/CTASection").then(m => ({ default: m.CTASection })));
const Footer = lazy(() => import("@/components/landing/Footer").then(m => ({ default: m.Footer })));

// Minimal loading placeholder
const SectionLoader = () => (
  <div className="min-h-[300px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

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
          {/* 1. Hero - Qué hacemos + CTAs (critical - no lazy) */}
          <HeroSection />

          {/* 2. Servicios - Conocen el alcance (critical - no lazy) */}
          <ServicesSection />

          {/* 3. Por qué ADUANEX - Confían (critical - no lazy) */}
          <WhyAltitudeSection />

          {/* 4. Quiz - Lead Magnet Dinámico (critical - no lazy) */}
          <QuizSection />

          {/* Below the fold - lazy loaded */}
          <Suspense fallback={<SectionLoader />}>
            <ProcessSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ClientsSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <CTASection />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>

        {/* CTA Flotante */}
        <FloatingCTA />
      </div>
    </LeadMagnetProvider>
  );
};

export default Index;
