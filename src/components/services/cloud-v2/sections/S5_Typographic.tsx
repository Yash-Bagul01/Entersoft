"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { scenes } from "@/data/cloudV2";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  stickyRef: React.RefObject<HTMLDivElement | null>;
}

// Scramble text element helper
function ScrambleWord({ text, delay = 0, enabled = true }: { text: string; delay?: number; enabled?: boolean }) {
  const [resolvedLength, setResolvedLength] = useState(0);
  const [scrambledText, setScrambledText] = useState("");
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !enabled) {
      setResolvedLength(text.length);
      return;
    }

    let active = true;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const duration = 1200; // Duration to fully resolve this word
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let step = 0;

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (!active) {
          clearInterval(interval);
          return;
        }

        const progress = step / steps;
        const resolved = Math.floor(progress * text.length);
        setResolvedLength(resolved);

        if (resolved >= text.length) {
          clearInterval(interval);
          return;
        }

        // Generate scrambled letters for remaining length
        let scrambled = "";
        for (let i = resolved; i < text.length; i++) {
          if (text[i] === " " || text[i] === "-") {
            scrambled += text[i];
          } else {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setScrambledText(scrambled);
        step++;
      }, intervalTime);
    }, delay);

    return () => {
      active = false;
      clearTimeout(startTimeout);
    };
  }, [isInView, text, delay, enabled]);

  // Render resolved characters in Fraunces (serif), unresolved in JetBrains Mono (mono)
  return (
    <span ref={containerRef} className="inline-block whitespace-nowrap">
      {text.slice(0, resolvedLength).split("").map((c, i) => (
        <span key={`r-${i}`} className="font-serif">
          {c}
        </span>
      ))}
      {text.slice(resolvedLength).split("").map((c, i) => (
        <span key={`s-${i}`} className="font-mono text-zinc-600 text-[0.92em] tracking-normal select-none">
          {scrambledText[i] || c}
        </span>
      ))}
    </span>
  );
}

export default function S5_Typographic({ sectionRef, stickyRef }: SectionProps) {
  const data = scenes[4];
  const isReduced = useReducedMotion();

  const frameworks = [
    { name: "ISO 27001", opacityClass: "text-[#F5F5F5]" },
    { name: "CIS BENCHMARKS", opacityClass: "text-[rgba(245,245,245,0.35)]" },
    { name: "GDPR", opacityClass: "text-[#F5F5F5]" },
    { name: "CERT-IN", opacityClass: "text-[rgba(245,245,245,0.35)]" },
    { name: "RBI", opacityClass: "text-[#F5F5F5]" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen lg:h-[100dvh] bg-[#080808] text-[#F5F5F5] overflow-hidden select-none z-10"
    >
      <div
        ref={stickyRef}
        className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden px-6 py-20 lg:py-0"
      >
        {/* Above Stack Tagline */}
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[rgba(245,245,245,0.4)] uppercase text-center mb-8 block max-w-full px-4 leading-loose">
          frameworks continuously mapped against your live configuration
        </span>

        {/* Core Framework Overlapping Stack */}
        <div className="flex flex-col items-center justify-center leading-[0.88] select-none text-center">
          {frameworks.map((fw, idx) => (
            <div
              key={fw.name}
              className={`font-serif font-bold text-3xl sm:text-6xl md:text-[5.5rem] lg:text-[7.8rem] tracking-tighter ${fw.opacityClass} select-none relative whitespace-nowrap`}
              style={{ 
                letterSpacing: "-0.025em",
                textShadow: fw.opacityClass === "text-[#F5F5F5]" ? "0 0 35px rgba(245,245,245,0.22)" : "none"
              }}
            >
              <ScrambleWord text={fw.name} delay={idx * 150} enabled={!isReduced} />
            </div>
          ))}
        </div>

        {/* Below Stack Body Copy */}
        <p className="font-sans text-xs sm:text-sm text-[rgba(245,245,245,0.45)] leading-relaxed max-w-[480px] text-center mt-12">
          {data.detail}
        </p>
      </div>
    </section>
  );
}
