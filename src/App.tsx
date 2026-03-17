import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

// Lazy load secondary routes for faster initial load
const Video = lazy(() => import("./pages/Video"));
const Formulario = lazy(() => import("./pages/Formulario"));
const WhatsAppRedirect = lazy(() => import("./pages/WhatsAppRedirect"));
const TerminosYCondiciones = lazy(() => import("./pages/TerminosYCondiciones"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Route loading placeholder
const RouteLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Optimized QueryClient with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider delayDuration={300}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/video"
            element={
              <Suspense fallback={<RouteLoader />}>
                <Video />
              </Suspense>
            }
          />
          <Route
            path="/formulario"
            element={
              <Suspense fallback={<RouteLoader />}>
                <Formulario />
              </Suspense>
            }
          />
          <Route
            path="/whatsapp"
            element={
              <Suspense fallback={<RouteLoader />}>
                <WhatsAppRedirect />
              </Suspense>
            }
          />
          <Route
            path="/terminosycondiciones"
            element={
              <Suspense fallback={<RouteLoader />}>
                <TerminosYCondiciones />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteLoader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
