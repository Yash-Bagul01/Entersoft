"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formatNumber } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  decimals = 0,
  duration = 1.8,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(formatNumber(value, decimals));
      return;
    }

    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const target = { val: 0 };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 60%", // 60% viewport entry
      once: true,
      onEnter: () => {
        gsap.to(target, {
          val: value,
          duration: duration,
          ease: "power3.out",
          onUpdate: () => {
            setDisplayValue(formatNumber(target.val, decimals));
          },
          onComplete: () => {
            setDisplayValue(formatNumber(value, decimals));
          }
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [value, decimals, duration, shouldReduceMotion]);

  return <span ref={ref} className="tabular-nums">{displayValue}</span>;
}
