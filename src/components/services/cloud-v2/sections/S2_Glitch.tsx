"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { gsap } from "gsap";
import { scenes } from "@/data/cloudV2";
import GlitchGrid from "../canvas/GlitchGrid";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  stickyRef: React.RefObject<HTMLDivElement | null>;
}

export default function S2_Glitch({ sectionRef, stickyRef }: SectionProps) {
  const data = scenes[1];
  const isReduced = useReducedMotion();
  
  // Ref to trigger count animation on screen view
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: false, margin: "-100px" });
  
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isReduced) {
      setCount(23);
      return;
    }

    if (isInView) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 23,
        duration: 2.5, // Matches the laser sweep ending (Beat 2)
        ease: "power3.out",
        onUpdate: () => {
          setCount(Math.floor(obj.val));
        },
      });
    } else {
      setCount(0);
    }
  }, [isInView, isReduced]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen lg:h-[100dvh] bg-[#080808] text-[#F5F5F5] overflow-hidden select-none z-10"
    >
      <div
        ref={stickyRef}
        className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden py-20 lg:py-0"
      >
        {/* Full-bleed scanned grid background */}
        <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
          <GlitchGrid />
        </div>

        {/* Floating text content centered */}
        <div 
          ref={contentRef}
          className="flex flex-col gap-5 text-center items-center px-6 max-w-[800px] z-20 relative"
        >
          <span className="font-mono text-xs font-bold text-[rgba(245,245,245,0.4)] tracking-[0.2em]">
            {data.label}
          </span>

          <h2
            className="font-serif text-3xl sm:text-5xl md:text-[3.25rem] font-bold uppercase tracking-tight leading-tight max-w-[700px]"
            style={{ 
              letterSpacing: "-0.015em",
              textShadow: "0 0 60px rgba(245,245,245,0.3)"
            }}
          >
            {data.statement}
          </h2>

          <span className="font-mono text-xs text-[rgba(245,245,245,0.6)] uppercase tracking-wider">
            {data.proof}
          </span>

          {/* Large Typographic Counter */}
          <div className="flex flex-col items-center mt-6">
            <span 
              className="font-serif text-6xl sm:text-7xl lg:text-[7.5rem] font-bold leading-none tracking-tight"
              style={{ textShadow: "0 0 45px rgba(245,245,245,0.25)" }}
            >
              {count}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[rgba(245,245,245,0.45)] mt-2">
              misconfigurations found in this session
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
