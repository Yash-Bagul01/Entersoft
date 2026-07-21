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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (shouldReduceMotion) {
      setDisplayValue(formatNumber(value, decimals));
      return;
    }

    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const target = { val: 0 };

    const animateCounter = () => {
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
    };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%", // 85% viewport entry
      once: true,
      onEnter: animateCounter
    });

    // Check if element is already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animateCounter();
    }

    return () => {
      trigger.kill();
    };
  }, [mounted, value, decimals, duration, shouldReduceMotion]);

  return <span ref={ref} className="tabular-nums">{displayValue}</span>;
}
