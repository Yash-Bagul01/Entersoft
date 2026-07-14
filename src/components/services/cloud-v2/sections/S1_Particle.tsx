"use client";

import React from "react";
import { motion } from "framer-motion";
import { scenes } from "@/data/cloudV2";
import ParticleCloud from "../canvas/ParticleCloud";

interface SectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  stickyRef: React.RefObject<HTMLDivElement | null>;
}

export default function S1_Particle({ sectionRef, stickyRef }: SectionProps) {
  const data = scenes[0];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen lg:h-[100dvh] bg-[#080808] text-[#F5F5F5] overflow-hidden select-none z-10"
    >
      <div
        ref={stickyRef}
        className="w-full h-full flex flex-col lg:flex-row items-center px-6 md:px-[8%] py-20 lg:py-0 gap-8 lg:gap-0 relative z-20"
      >
        {/* Left statement column */}
        <div className="w-full lg:w-[35%] flex flex-col gap-6 text-left items-start z-30 pt-4 lg:pt-0">
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
            {/* White hairline border for emphasis */}
            <div className="w-16 h-[1px] bg-[#F5F5F5] opacity-80" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#F5F5F5]">
              {data.proof}
            </span>
          </div>

          <p className="font-sans text-[11px] sm:text-xs md:text-sm text-[rgba(245,245,245,0.5)] leading-relaxed max-w-[400px]">
            {data.detail}
          </p>
        </div>

        {/* Right canvas column */}
        <div className="w-full lg:w-[65%] h-[320px] sm:h-[400px] lg:h-full flex items-center justify-center relative">
          <ParticleCloud />
        </div>
      </div>
    </section>
  );
}
