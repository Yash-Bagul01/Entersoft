"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function WordStackTransition() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const isTouch = window.innerWidth < 768;
    if (isTouch) return;

    const ctx = gsap.context(() => {
      // Pin sequence
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinRef.current,
          start: "top top",
          end: "+=90%",
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Animate Marquee speed
      if (marqueeRef.current) {
        timeline.to(
          marqueeRef.current,
          {
            xPercent: -40,
            ease: "none",
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isReduced]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#060606] overflow-hidden select-none z-10"
    >
      <div
        ref={pinRef}
        className="w-full h-screen flex flex-col items-center justify-center relative px-6 py-12"
      >
        {/* Pinned Stacked Headline */}
        <div className="flex flex-col items-center justify-center font-serif text-[clamp(4.5rem,11vw,10rem)] font-bold leading-[0.9] text-[#F6F5F0] tracking-tight uppercase">
          <span>SCAN</span>
          <span className="text-[#F6F5F0]/60">VALIDATE</span>
          <span className="text-[#00A3FF]">SECURE</span>
        </div>

        {/* Marquee beneath */}
        <div className="w-full overflow-hidden mt-12 py-3 border-y border-[rgba(245,241,232,0.08)] bg-[var(--bg-elevated)]/40 backdrop-blur-sm">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap gap-8 font-mono text-xs md:text-sm text-[var(--text-tertiary)] tracking-[0.2em] uppercase font-bold"
          >
            <span>
              MODELS · AGENTS · PROMPTS · PIPELINES · TOOLS · APIS · DATA FLOWS · MODELS · AGENTS · PROMPTS · PIPELINES · TOOLS · APIS · DATA FLOWS ·
            </span>
            <span>
              MODELS · AGENTS · PROMPTS · PIPELINES · TOOLS · APIS · DATA FLOWS · MODELS · AGENTS · PROMPTS · PIPELINES · TOOLS · APIS · DATA FLOWS ·
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
