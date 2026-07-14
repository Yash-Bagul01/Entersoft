"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { scenes } from "@/data/cloudV2";
import ForceGraph from "../canvas/ForceGraph";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  stickyRef: React.RefObject<HTMLDivElement | null>;
}

export default function S3_ForceGraph({ sectionRef, stickyRef }: SectionProps) {
  const data = scenes[2];
  const isReduced = useReducedMotion();
  
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: false, margin: "-100px" });
  
  const [pruned, setPruned] = useState(false);

  useEffect(() => {
    if (isReduced) {
      setPruned(true);
      return;
    }

    if (isInView) {
      const timer = setTimeout(() => {
        setPruned(true);
      }, 3700); // Trigger 500ms after pruning finishes in canvas (3.2s + 0.5s)
      return () => clearTimeout(timer);
    } else {
      setPruned(false);
    }
  }, [isInView, isReduced]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen h-[100dvh] bg-[#080808] text-[#F5F5F5] overflow-hidden select-none z-10"
    >
      <div
        ref={stickyRef}
        className="w-full h-full flex flex-col lg:flex-row items-center px-6 md:px-[8%] relative z-20"
      >
        {/* Left statement column */}
        <div 
          ref={contentRef}
          className="w-full lg:w-[40%] flex flex-col gap-6 text-left items-start z-30 pt-16 lg:pt-0"
        >
          <span className="font-mono text-xs font-bold text-[rgba(245,245,245,0.4)] tracking-[0.2em]">
            {data.label}
          </span>

          <h2
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight"
            style={{ letterSpacing: "-0.015em" }}
          >
            {data.statement}
          </h2>

          <div className="w-full flex flex-col items-start gap-2">
            <div className="w-16 h-[1px] bg-[#F5F5F5] opacity-80" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#F5F5F5]">
              {data.proof}
            </span>
          </div>

          <p className="font-sans text-[11px] sm:text-xs md:text-sm text-[rgba(245,245,245,0.5)] leading-relaxed max-w-[400px]">
            {data.detail}
          </p>
        </div>

        {/* Right visual column */}
        <div className="w-full lg:w-[60%] h-[55%] lg:h-full flex flex-col items-center justify-center relative">
          <div className="w-full flex-1 max-h-[380px]">
            <ForceGraph />
          </div>

          {/* Settling counters below canvas */}
          <div className="h-10 mt-2 flex justify-center items-center">
            <div className="flex gap-12 font-mono text-xs text-[rgba(245,245,245,0.45)] select-none">
              <div>
                <span className="text-[#F5F5F5] font-bold transition-all duration-300">
                  {pruned ? "42 → 24" : "42"}
                </span>
                <span className="ml-2 uppercase tracking-[0.16em] text-[9px]">roles</span>
              </div>
              <div className="w-[1px] h-3 bg-zinc-800 self-center" />
              <div>
                <span className="text-[#F5F5F5] font-bold transition-all duration-300">
                  {pruned ? "78 → 43" : "78"}
                </span>
                <span className="ml-2 uppercase tracking-[0.16em] text-[9px]">permissions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
