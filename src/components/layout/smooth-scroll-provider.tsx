"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

import { registerGsap, ScrollTrigger } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

/**
 * Lenis smooth scrolling synced with GSAP ScrollTrigger.
 * Disabled entirely when the user prefers reduced motion.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const gsap = registerGsap();

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    const syncScrollLock = () => {
      if (document.documentElement.dataset.scrollLock === "true") {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    const lockObserver = new MutationObserver(syncScrollLock);
    lockObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-scroll-lock"],
    });
    syncScrollLock();

    return () => {
      window.removeEventListener("resize", onResize);
      lockObserver.disconnect();
      gsap.ticker.remove(tickerCallback);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
