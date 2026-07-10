"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { evidence } from "@/data/cloudV2";
import ServiceCTA from "../../ServiceCTA";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function ScrambleStat({ value, delay = 0, enabled = true }: { value: string; delay?: number; enabled?: boolean }) {
  const [resolved, setResolved] = useState("");
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !enabled) {
      setResolved(value);
      return;
    }

    let active = true;
    const chars = "0123456789X<>+";
    const duration = 650; // Combination safe cracking speed (0.6s total)
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
        const resolvedLen = Math.floor(progress * value.length);

        if (resolvedLen >= value.length) {
          setResolved(value);
          clearInterval(interval);
          return;
        }

        let temp = value.slice(0, resolvedLen);
        for (let i = resolvedLen; i < value.length; i++) {
          if (value[i] === " ") {
            temp += " ";
          } else {
            temp += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setResolved(temp);
        step++;
      }, intervalTime);
    }, delay);

    return () => {
      active = false;
      clearTimeout(startTimeout);
    };
  }, [isInView, value, delay, enabled]);

  return <span ref={containerRef}>{resolved}</span>;
}

export default function S7_Close() {
  const isReduced = useReducedMotion();
  const bandRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full bg-[#080808]">
      
      {/* Evidence Band Row */}
      <section 
        ref={bandRef}
        className="max-w-[1100px] mx-auto px-6 py-24 md:py-32 select-none relative z-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-start text-left relative">
          {evidence.map((item, idx) => {
            const isLast = idx === evidence.length - 1;
            return (
              <React.Fragment key={item.label}>
                
                {/* Stats entry */}
                <div className="flex flex-col gap-2 relative">
                  <span
                    className="font-serif text-4xl sm:text-5xl lg:text-[4.5rem] font-bold text-[#F5F5F5] tracking-tight leading-none"
                    style={{ 
                      letterSpacing: "-0.015em",
                      textShadow: "0 0 35px rgba(245,245,245,0.18)" 
                    }}
                  >
                    <ScrambleStat value={item.value} delay={idx * 120} enabled={!isReduced} />
                  </span>
                  
                  <span className="font-mono text-[9px] sm:text-[10px] text-[rgba(245,245,245,0.4)] uppercase tracking-wider max-w-[130px] mt-1 leading-relaxed">
                    {item.label}
                  </span>
                </div>

                {/* Hairline grid divider lines (Desktop only) */}
                {!isLast && (
                  <div className="hidden md:block w-[1px] h-20 bg-[rgba(245,245,245,0.1)] self-center justify-self-center" />
                )}

              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* Shared site-wide Service CTA wrapper */}
      <ServiceCTA />

    </div>
  );
}
