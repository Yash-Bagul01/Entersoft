"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { hero } from "@/data/cloudV2";
import NoiseField from "../canvas/NoiseField";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  stickyRef: React.RefObject<HTMLDivElement | null>;
}

export default function S0_Hero({ sectionRef, stickyRef }: SectionProps) {
  const isReduced = useReducedMotion();
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isReduced) {
      // Set instantly to settled state
      gsap.set([line1Ref.current, line2Ref.current, eyebrowRef.current, subRef.current], {
        color: "#F5F5F5",
        textShadow: "none",
        opacity: 1,
      });
      return;
    }

    const tl = gsap.timeline();

    // Eyebrow fade in
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 10 },
      { opacity: 0.5, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // Line 1: emerge from glowing noise blur
    tl.fromTo(line1Ref.current,
      { color: "transparent", textShadow: "0 0 40px rgba(245, 245, 245, 1)" },
      { color: "#F5F5F5", textShadow: "0 0 0px rgba(245, 245, 245, 0)", duration: 1.4, ease: "power2.inOut" },
      "-=0.4"
    );

    // Line 2: emerge from noise 300ms into Line 1
    tl.fromTo(line2Ref.current,
      { color: "transparent", textShadow: "0 0 40px rgba(245, 245, 245, 1)" },
      { color: "rgba(245, 245, 245, 0.45)", textShadow: "0 0 0px rgba(245, 245, 245, 0)", duration: 1.4, ease: "power2.inOut" },
      "-=1.1"
    );

    // Subline: emerge 600ms after Line 2 starts
    tl.fromTo(subRef.current,
      { opacity: 0, y: 15 },
      { opacity: 0.45, y: 0, duration: 1.0, ease: "power2.out" },
      "-=0.5"
    );

  }, [isReduced]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen h-[100dvh] bg-[#080808] text-[#F5F5F5] overflow-hidden select-none z-10"
    >
      <div
        ref={stickyRef}
        className="w-full h-full flex flex-col justify-between items-center relative overflow-hidden"
      >
        {/* Animated breathing static noise background */}
        <NoiseField />

        {/* Top spacer to keep content clear of the fixed global navbar */}
        <div className="h-32 w-full z-20 shrink-0" />

        {/* Hero Copy */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-6 z-20 relative gap-4">
          <span
            ref={eyebrowRef}
            className="font-mono text-xs uppercase tracking-[0.18em] text-[rgba(245,245,245,0.5)] opacity-0"
          >
            {hero.eyebrow}
          </span>

          <h1 className="flex flex-col items-center">
            {/* Line 1 */}
            <span
              ref={line1Ref}
              className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tight leading-none text-transparent select-none"
              style={{ letterSpacing: "-0.02em" }}
            >
              {hero.line1}
            </span>

            {/* Line 2 */}
            <span
              ref={line2Ref}
              className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tight leading-none text-transparent select-none mt-2"
              style={{ letterSpacing: "-0.02em" }}
            >
              {hero.line2}
            </span>
          </h1>

          <p
            ref={subRef}
            className="font-sans text-sm sm:text-base md:text-lg text-[rgba(245,245,245,0.45)] leading-relaxed max-w-[500px] mt-8 opacity-0"
          >
            {hero.sub}
          </p>
        </div>

        {/* Empty bottom spacing to maintain clean symmetrical margins */}
        <div className="h-20" />
      </div>
    </section>
  );
}
