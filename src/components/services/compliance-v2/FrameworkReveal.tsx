"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FrameworkItem {
  id: string;
  name: string;
  subTitle: string;
  details: string;
  differentiator: string;
}

const frameworks: FrameworkItem[] = [
  {
    id: "iso",
    name: "ISO 27001",
    subTitle: "ISMS STRUCTURAL GOVERNANCE",
    details: "Establishes a comprehensive Information Security Management System. Our architecture maps control clauses to your live asset inventory.",
    differentiator: "Continuous asset boundaries replace point-in-time spreadsheets."
  },
  {
    id: "soc2",
    name: "SOC 2 Type II",
    subTitle: "OPERATIONAL SECURITY EVIDENCE",
    details: "Validates security, availability, and confidentiality trust principles. We implement auto-collecting audit pipelines across your systems.",
    differentiator: "6-month operational proof replaces manual audit checklists."
  },
  {
    id: "gdpr",
    name: "GDPR Guidelines",
    subTitle: "DATA PRIVACY CONTROLS",
    details: "Ensures compliance with European privacy laws. We audit encryption-in-transit, localized hosting zones, and personal data boundaries.",
    differentiator: "Automated residency controls replace static policies."
  },
  {
    id: "pci",
    name: "PCI-DSS 4.0",
    subTitle: "CARD DATA ENVIRONMENT",
    details: "Protects transactional and cardholder data. We design network isolation zones and vault-tokenized payload pipelines.",
    differentiator: "Hardened microsegmentation replaces open network zones."
  },
  {
    id: "hipaa",
    name: "HIPAA Security",
    subTitle: "HEALTH RECORDS SAFEGUARDS",
    details: "Protects ePHI storage and transmissions. We map access-control telemetry and cryptographically lock data channels.",
    differentiator: "Continuous HSM custody replaces unverified cloud storage."
  },
  {
    id: "rbi",
    name: "RBI / CERT-In",
    subTitle: "SECTOR-SPECIFIC COMPLIANCE",
    details: "Adheres to central banking regulations and national cyber incident guidelines. Includes mandatory event logging and audit reporting.",
    differentiator: "Real-time incident streams replace delayed reporting."
  }
];

export default function FrameworkReveal() {
  const pinRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || !pinRef.current || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    if (isReduced || isTouch) {
      return;
    }

    const pin = pinRef.current;
    const itemsCount = frameworks.length;

    // Pin the section for 5x scroll height to step through 6 frameworks
    const trigger = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: `+=${itemsCount * 60}%`,
      pin: true,
      scrub: 0.5,
      refreshPriority: 10,
      onUpdate: (self) => {
        const progress = self.progress;
        // Map progress (0 to 1) to active framework index (0 to 5)
        const rawIndex = Math.floor(progress * itemsCount);
        const nextIdx = Math.min(rawIndex, itemsCount - 1);
        setActiveIndex(nextIdx);
      }
    });

    return () => {
      trigger.kill();
    };
  }, [isReduced]);

  return (
    <section 
      ref={pinRef} 
      className="relative w-full lg:h-screen lg:h-[100dvh] min-h-auto bg-transparent text-[#F5F5F5] select-none z-10 border-b border-[var(--border-subtle)] overflow-hidden framework-reveal-section py-12 lg:py-0"
    >
      <div 
        ref={containerRef}
        className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-12 lg:py-20 relative z-20 gap-8 lg:gap-0"
      >
        {/* Left Column: Typographic scale of framework titles */}
        <div className="w-full md:w-[45%] flex flex-col justify-center items-start text-left gap-10">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] font-bold text-[var(--accent)] tracking-[0.25em] uppercase">
              STRUCTURED CODES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white uppercase tracking-tighter leading-none">
              Framework Targets
            </h2>
          </div>

          <div className="flex flex-col gap-5 w-full">
            {frameworks.map((fw, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div 
                  key={fw.id}
                  onClick={() => {
                    // Smooth scroll to the corresponding scroll position
                    const rect = pinRef.current?.getBoundingClientRect();
                    if (!rect) return;
                    const sectionTop = rect.top + window.scrollY;
                    const scrollPos = sectionTop + (idx / frameworks.length) * (frameworks.length * window.innerHeight);
                    window.scrollTo({ top: scrollPos, behavior: "smooth" });
                  }}
                  className={`cursor-pointer transition-all duration-500 flex items-center gap-4 ${
                    isActive ? "opacity-100 translate-x-2" : "opacity-25 hover:opacity-50"
                  }`}
                >
                  <span className={`font-mono text-[9px] tracking-wider ${isActive ? "text-[var(--accent)]" : "text-zinc-500"}`}>
                    [0{idx + 1}]
                  </span>
                  <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight">
                    {fw.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Copy card detailing target controls */}
        <div className="w-full md:w-[45%] h-[350px] md:h-[450px] flex items-center justify-center relative mt-8 md:mt-0">
          {/* Frosted details box */}
          <div 
            ref={textContainerRef}
            className="w-full bg-[#0d0d0f]/80 border border-zinc-800/80 rounded-[4px] p-8 md:p-10 flex flex-col justify-between h-[300px] md:h-[350px] relative backdrop-blur-md"
          >
            {/* Top info */}
            <div className="flex flex-col items-start gap-4 text-left">
              <span className="font-mono text-[9px] font-bold text-zinc-500 tracking-[0.18em] uppercase">
                {frameworks[activeIndex].subTitle}
              </span>
              <p className="font-sans text-sm md:text-base text-zinc-300 leading-relaxed transition-all duration-300">
                {frameworks[activeIndex].details}
              </p>
            </div>

            {/* Bottom differentiator */}
            <div className="w-full flex flex-col items-start gap-2 border-t border-zinc-800/60 pt-4 text-left">
              <span className="font-mono text-[8px] font-bold text-[var(--accent)] tracking-wider uppercase">
                // ENTERSOFT DIFFERENCE
              </span>
              <span className="font-serif text-xs md:text-sm italic font-medium text-white transition-all duration-300">
                {frameworks[activeIndex].differentiator}
              </span>
            </div>
            
            {/* Grid overlay lines */}
            <div className="absolute top-0 right-10 w-[1px] h-full bg-white/[0.02]" />
            <div className="absolute left-0 bottom-12 w-full h-[1px] bg-white/[0.02]" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator overlay */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 font-mono text-[7px] text-zinc-600 tracking-[0.2em] uppercase pointer-events-none">
        [ Scroll to attach framework nodes ]
      </div>
    </section>
  );
}
