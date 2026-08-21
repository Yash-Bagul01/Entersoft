"use client";

import React from "react";
import { digitalTrustData } from "@/data/digitalTrust";
import { Button } from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";

export default function DT10_ExecutiveCTA() {
  const { cta } = digitalTrustData;

  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 lg:px-16 py-24 md:py-32 overflow-hidden text-center flex flex-col items-center justify-center border-b border-white/[0.08] text-[#F5F5F5]">
      {/* Abstract radial highlight background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.04)_0%,transparent_65%)] pointer-events-none" />

      <div className="max-w-[850px] w-full mx-auto flex flex-col items-center gap-6 md:gap-8 relative z-10">
        <span className="font-mono text-[10px] font-bold text-sky-400 tracking-[0.25em] uppercase">
          // EXECUTIVE CONSULTATION
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight max-w-[700px] leading-tight">
          {cta.headline}
        </h2>

        <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-300 max-w-[620px] leading-relaxed">
          {cta.subline}
        </p>

        <div className="mt-4">
          <MagneticButton>
            <Button variant="primary" size="lg" asLink href={cta.buttonHref}>
              {cta.buttonText}
            </Button>
          </MagneticButton>
        </div>

        {/* Guarantee Badges Ribbon */}
        <div className="font-mono text-[9px] md:text-[10px] font-bold text-zinc-400 tracking-[0.2em] uppercase mt-6 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 select-none">
          {cta.guaranteeBadges.map((badge, idx) => (
            <React.Fragment key={badge}>
              {idx > 0 && <span className="text-zinc-700">•</span>}
              <span>{badge}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
