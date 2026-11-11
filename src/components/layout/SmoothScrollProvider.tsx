"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TOUCH_FIRST_QUERY } from "@/lib/viewport";

const SmoothScrollContext = createContext<Lenis | null>(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisState, setLenisState] = useState<Lenis | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [touchFirst, setTouchFirst] = useState(
    () => typeof window !== "undefined" && window.matchMedia(TOUCH_FIRST_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(TOUCH_FIRST_QUERY);
    const sync = () => setTouchFirst(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Wheel and trackpad input is smoothed at every window size; finger scrolling stays native.
    const smooth = !shouldReduceMotion && !touchFirst;
    const lenis = new Lenis({
      duration: smooth ? 1.2 : 0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: smooth,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
      infinite: false,
    });

    if (!smooth) {
      // Lenis rewrites <html>'s classes at the start and end of every native gesture, which restyles
      // the whole page on phones. Without smoothing only lenis-stopped is used by the stylesheet.
      const root = document.documentElement;
      (lenis as unknown as { updateClassName: () => void }).updateClassName = () => {
        root.classList.toggle("lenis-stopped", lenis.isStopped);
      };
    }

    lenisRef.current = lenis;
    setLenisState(lenis);

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

    // Enable lag smoothing to gracefully compensate for any main-thread frame hitches (500ms max lag, 33ms target)
    gsap.ticker.lagSmoothing(500, 33);

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
            const appsecTarget = (targetElement as HTMLElement).closest(".as-stage");
            const scrollMargin = Number.parseFloat(getComputedStyle(targetElement).scrollMarginTop);
            // Sections inside the stage already clear the pinned bar with scroll-margin.
            // Adding the same offset again stops short, on the previous section.
            const offset = appsecTarget ? (scrollMargin > 0 ? 0 : -148) : -80;
            lenis.scrollTo(targetElement as HTMLElement, {
              offset,
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
      ScrollTrigger.removeEventListener("refresh", refreshHandler);
      document.removeEventListener("click", handleAnchorClick);
      lenisRef.current = null;
      setLenisState(null);
    };
  }, [shouldReduceMotion, touchFirst]);

  return (
    <SmoothScrollContext.Provider value={lenisState}>
      {/* 2px fixed scroll progress bar at the very top of the viewport */}
      <div
        ref={progressBarRef}
        data-scroll-progress
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent)] z-[99999] origin-left scale-x-0 pointer-events-none"
        style={{ transformOrigin: "left" }}
      />
      {children}
    </SmoothScrollContext.Provider>
  );
}
