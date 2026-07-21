"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SmoothScrollContext = createContext<Lenis | null>(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: shouldReduceMotion ? 0 : 1.15,                 // higher = heavier, more "weighted" glide
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: shouldReduceMotion ? 1.0 : 0.9,           // slightly damped, not 1:1 with the wheel
      touchMultiplier: 2.0,           // increase for more responsive touch
      syncTouch: false,               // CRITICAL: false = native touch scroll on mobile
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync GSAP ScrollTrigger with Lenis scroll updates
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${e.progress ?? 0})`;
      }
    });

    const refreshHandler = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", refreshHandler);



    // Run Lenis tick within GSAP's ticker to prevent desync rubber-banding
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Disable lag smoothing to keep ScrollTrigger animations synced in real-time
    gsap.ticker.lagSmoothing(0);

    // Intercept in-page anchor links for buttery-smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: -80,
              duration: shouldReduceMotion ? 0 : 1.4,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Force GSAP ScrollTrigger to recalculate layout dimensions now that Lenis is fully configured
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      document.removeEventListener("click", handleAnchorClick);
      lenisRef.current = null;
    };
  }, [shouldReduceMotion]);

  return (
    <SmoothScrollContext.Provider value={lenisRef.current}>
      {/* 2px fixed scroll progress bar at the very top of the viewport */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent)] z-[99999] origin-left scale-x-0 pointer-events-none"
        style={{ transformOrigin: "left" }}
      />
      {children}
    </SmoothScrollContext.Provider>
  );
}
