import { Suspense, lazy, ComponentType, useEffect, useState, useRef } from "react";

interface LazySectionProps {
  importFn: () => Promise<{ default: ComponentType<unknown> }>;
  fallback?: React.ReactNode;
  rootMargin?: string;
}

const DefaultFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export const LazySection = ({
  importFn,
  fallback = <DefaultFallback />,
  rootMargin = "200px"
}: LazySectionProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [Component, setComponent] = useState<ComponentType<unknown> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (shouldLoad && !Component) {
      const LazyComponent = lazy(importFn);
      setComponent(() => LazyComponent);
    }
  }, [shouldLoad, importFn, Component]);

  return (
    <div ref={containerRef}>
      {Component ? (
        <Suspense fallback={fallback}>
          <Component />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};
