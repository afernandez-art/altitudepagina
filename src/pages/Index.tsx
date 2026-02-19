import { useEffect, lazy, Suspense } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { QuizSection } from "@/components/landing/QuizSection";
import { FloatingCTA } from "@/components/landing/FloatingCTA";
import { analytics, setupScrollTracking } from "@/lib/analytics";

const StorySection = lazy(() => import("@/components/landing/StorySection").then(m => ({ default: m.StorySection })));
const ProcessSection = lazy(() => import("@/components/landing/ProcessSection").then(m => ({ default: m.ProcessSection })));
const B2BOXSection = lazy(() => import("@/components/landing/B2BOXSection").then(m => ({ default: m.B2BOXSection })));
const Footer = lazy(() => import("@/components/landing/Footer").then(m => ({ default: m.Footer })));

const SectionLoader = () => (
  <div className="min-h-[300px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  useEffect(() => {
    analytics.pageView("landing");
    const cleanup = setupScrollTracking("landing");
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main>
        {/* Hero + Problem Cards */}
        <HeroSection />

        {/* ¿Qué necesitás? */}
        <Suspense fallback={<SectionLoader />}>
          <ProcessSection />
        </Suspense>

        {/* Nuestra Historia */}
        <Suspense fallback={<SectionLoader />}>
          <StorySection />
        </Suspense>

        {/* B2BOX World */}
        <Suspense fallback={<SectionLoader />}>
          <B2BOXSection />
        </Suspense>

        {/* Quiz / Cotizador */}
        <QuizSection />
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <FloatingCTA />
    </div>
  );
};

export default Index;
