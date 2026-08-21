"use client";

import React from "react";
import { Button } from "../ui/Button";
import MagneticButton from "../ui/MagneticButton";

interface ServiceCTAProps {
  headline?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function ServiceCTA({
  headline = "Ready to discuss your security posture?",
  buttonText = "BOOK A SECURITY BRIEFING",
  buttonHref = "/#contact"
}: ServiceCTAProps) {
  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 py-20 md:py-28 overflow-hidden text-center flex flex-col items-center justify-center border-b border-[var(--border-subtle)]">
      {/* Abstract radial highlight background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.025)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[800px] w-full mx-auto flex flex-col items-center gap-6 md:gap-8 relative z-10">
        <h2 className="text-3xl md:text-5xl font-display font-medium text-[#F6F5F0] uppercase tracking-tight max-w-[680px] leading-tight">
          {headline}
        </h2>
        
        <div className="mt-2">
          <MagneticButton>
            <Button variant="primary" size="lg" asLink href={buttonHref}>
              {buttonText}
            </Button>
          </MagneticButton>
        </div>

        <div className="font-mono text-[9px] md:text-[10px] font-bold text-[#9c9c97] tracking-[0.25em] uppercase mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 select-none">
          <span>EXPERT-LED CONSULTATION</span>
          <span className="opacity-45">•</span>
          <span>RESPONSE WITHIN 2 HOURS</span>
          <span className="opacity-45">•</span>
          <span>SENIOR ANALYST REVIEWED</span>
        </div>
      </div>
    </section>
  );
}
