"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ScanLineSweep() {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const line = lineRef.current;
    if (!line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { top: "0%", opacity: 1 },
        {
          top: "100%",
          opacity: 0,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: line.parentElement,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [isReduced]);

  if (isReduced) return null;

  return (
    <div className="absolute inset-x-0 h-0 pointer-events-none z-30 overflow-hidden">
      <div
        ref={lineRef}
        className="absolute left-0 right-0 h-[1.5px] bg-[#00A3FF] shadow-[0_0_12px_#00A3FF] pointer-events-none opacity-0"
      />
    </div>
  );
}
