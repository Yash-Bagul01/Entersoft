"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { evidence } from "@/data/aiSystems";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function ScrambleValue({
  value,
  suffix = "",
  delay = 0,
  enabled = true,
}: {
  value: string;
  suffix?: string;
  delay?: number;
  enabled?: boolean;
}) {
  const [resolved, setResolved] = useState(value);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !enabled) {
      setResolved(value);
      return;
    }

    let active = true;
    const chars = "0123456789X<>+%";
    const duration = 400; // 400ms per value reveal
    const intervalTime = 25;
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

  return (
    <span ref={containerRef}>
      {resolved}
      {suffix}
    </span>
  );
}

export default function AI6_Evidence() {
  const isReduced = useReducedMotion();

  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 py-24 md:py-32 border-b border-[var(--border-subtle)] overflow-hidden z-10 select-none">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start text-left">
        {evidence.map((item, idx) => {
          const isZero = item.value === "0";
          return (
            <div key={item.label} className="flex flex-col gap-2">
              <span
                className={`font-serif font-bold text-[#F6F5F0] tracking-tight leading-none ${
                  isZero
                    ? "text-[clamp(4.8rem,11vw,9.5rem)] text-[#00A3FF]"
                    : "text-[clamp(4rem,9vw,8rem)]"
                }`}
                style={{
                  letterSpacing: "-0.02em",
                }}
              >
                <ScrambleValue
                  value={item.value}
                  suffix={item.suffix}
                  delay={idx * 120}
                  enabled={!isReduced}
                />
              </span>

              <span className="font-mono text-[11px] text-[var(--text-tertiary)] uppercase tracking-[0.14em] mt-1">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
