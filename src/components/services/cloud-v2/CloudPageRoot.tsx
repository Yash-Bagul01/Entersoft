"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createStackTransition } from "@/lib/stackTransition";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Import sections
import S0_Hero from "./sections/S0_Hero";
import S1_Particle from "./sections/S1_Particle";
import S2_Glitch from "./sections/S2_Glitch";
import S3_ForceGraph from "./sections/S3_ForceGraph";
import S4_Waveform from "./sections/S4_Waveform";
import S5_Typographic from "./sections/S5_Typographic";
import S6_DeepDive from "./sections/S6_DeepDive";
import S7_Close from "./sections/S7_Close";

export default function CloudPageRoot() {
  const isReduced = useReducedMotion();

  // Section references for GSAP takeover pins
  const s0Ref = useRef<HTMLDivElement>(null);
  const s0StickyRef = useRef<HTMLDivElement>(null);

  const s1Ref = useRef<HTMLDivElement>(null);
  const s1StickyRef = useRef<HTMLDivElement>(null);

  const s2Ref = useRef<HTMLDivElement>(null);
  const s2StickyRef = useRef<HTMLDivElement>(null);

  const s3Ref = useRef<HTMLDivElement>(null);
  const s3StickyRef = useRef<HTMLDivElement>(null);

  const s4Ref = useRef<HTMLDivElement>(null);
  const s4StickyRef = useRef<HTMLDivElement>(null);

  const s5Ref = useRef<HTMLDivElement>(null);
  const s5StickyRef = useRef<HTMLDivElement>(null);

  // Set global theme overrides on mount and clean up on unmount
  useEffect(() => {
    const prevTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.setAttribute("data-page", "cloud-security");
    document.documentElement.setAttribute("data-grain-heavy", "true");

    return () => {
      if (prevTheme) {
        document.documentElement.setAttribute("data-theme", prevTheme);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      document.documentElement.removeAttribute("data-page");
      document.documentElement.removeAttribute("data-grain-heavy");
    };
  }, []);

  // Stacking Takeover Transition binds
  useEffect(() => {
    if (isReduced || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // S0 (Hero) -> S1 (Particle), scale: true
      if (s1Ref.current && s0Ref.current) {
        createStackTransition(s1Ref.current, s0Ref.current, { scale: true });
      }

      // S1 (Particle) -> S2 (Glitch), scale: true
      if (s2Ref.current && s1Ref.current) {
        createStackTransition(s2Ref.current, s1Ref.current, { scale: true });
      }

      // S2 (Glitch) -> S3 (ForceGraph), scale: true (most dramatic boundary)
      if (s3Ref.current && s2Ref.current) {
        createStackTransition(s3Ref.current, s2Ref.current, { scale: true });
      }

      // S3 (ForceGraph) -> S4 (Waveform), scale: false (calmer boundary)
      if (s4Ref.current && s3Ref.current) {
        createStackTransition(s4Ref.current, s3Ref.current, { scale: false });
      }

      // S4 (Waveform) -> S5 (Typographic), scale: false
      if (s5Ref.current && s4Ref.current) {
        createStackTransition(s5Ref.current, s4Ref.current, { scale: false });
      }
    });

    return () => {
      mm.revert();
    };
  }, [isReduced]);

  return (
    <div 
      id="cloud-v2-container" 
      className="w-full bg-[#080808] flex flex-col relative"
      style={{ overflowAnchor: "none" }} // Prevents browser layout jitter on pin release
    >
      <S0_Hero sectionRef={s0Ref} stickyRef={s0StickyRef} />
      <S1_Particle sectionRef={s1Ref} stickyRef={s1StickyRef} />
      <S2_Glitch sectionRef={s2Ref} stickyRef={s2StickyRef} />
      <S3_ForceGraph sectionRef={s3Ref} stickyRef={s3StickyRef} />
      <S4_Waveform sectionRef={s4Ref} stickyRef={s4StickyRef} />
      <S5_Typographic sectionRef={s5Ref} stickyRef={s5StickyRef} />
      <S6_DeepDive />
      <S7_Close />
    </div>
  );
}
