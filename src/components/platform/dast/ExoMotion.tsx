"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** ScrollTrigger start, or `"load"` for the hero entrance. */
  start?: string;
}

/** Masked slide-up — the parent clips, the inner line rides up. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 1.15,
  start = "top 88%",
}: RevealProps) {
  const inner = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    if (reduce) {
      gsap.set(el, { yPercent: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(el, { yPercent: 110 });
      const vars: gsap.TweenVars = {
        yPercent: 0,
        duration,
        delay,
        ease: "power4.out",
      };
      if (start !== "load") {
        vars.scrollTrigger = {
          trigger: el.parentElement ?? el,
          start,
          once: true,
        };
      }
      gsap.to(el, vars);
    });
    return () => ctx.revert();
  }, [reduce, delay, duration, start]);

  return (
    <span className={`dast-reveal ${className}`}>
      <span ref={inner} className="dast-reveal-inner">
        {children}
      </span>
    </span>
  );
}

interface FadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
  as?: "div" | "p" | "li" | "span";
}

export function Fade({
  children,
  className = "",
  delay = 0,
  y = 22,
  start = "top 90%",
  as: Tag = "div",
}: FadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y });
      const vars: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        duration: 1.05,
        delay,
        ease: "power3.out",
      };
      if (start !== "load") {
        vars.scrollTrigger = {
          trigger: el,
          start,
          once: true,
        };
      }
      gsap.to(el, vars);
    });
    return () => ctx.revert();
  }, [reduce, delay, y, start]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

export function Marker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <Fade className={`flex items-center gap-2 text-[13px] leading-none ${className}`}>
      <span aria-hidden="true">+</span>
      <span>{children}</span>
    </Fade>
  );
}
