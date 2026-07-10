"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CloudTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    // Check if on touch device or reduced motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isReduced || isTouch || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    const words = wordsRef.current;
    const marquee = marqueeRef.current;

    if (!container || !sticky || !words || !marquee) return;

    const ctx = gsap.context(() => {
      const wordLines = words.querySelectorAll(".transition-word");
      const marqueeInner = marquee.querySelector(".marquee-inner");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: sticky,
          start: "top top",
          end: "+=120%",
          scrub: 1.2,
        }
      });

      // Scale down and fade out words
      tl.to(words, {
        scale: 0.65,
        opacity: 0,
        y: -30,
        ease: "power1.inOut",
        duration: 0.4
      }, 0)
      
      // Stagger vertical dispersion on lines
      .to(wordLines[0], { y: 40, ease: "none", duration: 0.4 }, 0)
      .to(wordLines[2], { y: -40, ease: "none", duration: 0.4 }, 0)

      // Animate Marquee
      .fromTo(marquee,
        { opacity: 0, y: 30 },
        { opacity: 1, y: -20, ease: "power1.out", duration: 0.2 },
        0.1
      )
      .fromTo(marqueeInner,
        { x: 0 },
        { x: -500, ease: "none", duration: 0.5 },
        0.05
      )
      .to(marquee, {
        opacity: 0,
        y: -40,
        ease: "power2.in",
        duration: 0.15
      }, 0.35);

    }, container);

    return () => {
      ctx.revert();
    };
  }, [isReduced]);

  return (
    <div 
      ref={containerRef} 
      id="transition-section"
      className="relative w-full h-[150vh] bg-black pointer-events-none select-none z-10"
    >
      <div 
        ref={stickyRef}
        className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black"
      >
        {/* Background grids */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_70%)]" />
        </div>

        {/* Stacked Words */}
        <div 
          ref={wordsRef}
          className="flex flex-col text-center font-serif font-bold text-[#F6F5F0] leading-none uppercase select-none relative z-10 gap-3"
          style={{ fontSize: "clamp(4.5rem, 10vw, 10rem)" }}
        >
          <span className="transition-word inline-block">See</span>
          <span className="transition-word inline-block">Every</span>
          <span className="transition-word inline-block">Corner</span>
        </div>

        {/* Dynamic Details Marquee */}
        <div 
          ref={marqueeRef}
          className="w-full overflow-hidden absolute bottom-[20%] opacity-0 flex justify-center z-20"
        >
          <div className="marquee-inner flex whitespace-nowrap gap-12 font-mono text-xs md:text-sm text-cyan-400 font-bold uppercase tracking-[0.25em]">
            {[...Array(6)].map((_, i) => (
              <span key={i}>
                CLOUD · IAM · RUNTIME · COMPLIANCE · DETECTION · REMEDIATION ·
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
