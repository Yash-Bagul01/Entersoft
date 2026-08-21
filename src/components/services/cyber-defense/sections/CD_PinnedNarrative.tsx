"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CDGlowCard from "../ui/CDGlowCard";
import CDGradientText from "../ui/CDGradientText";
import Narrative3DVisual from "../webgl/Narrative3DVisual";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NARRATIVE_STAGES = [
  {
    id: "01",
    tag: "THE PROBLEM",
    title: "Fragmented tools & alert fatigue.",
    body: "Traditional MSSPs flood security teams with thousands of uncontextualised alerts every week. Disconnected EDR, SIEM, and Cloud logs lead to blind spots, high false positive rates, and slow threat containment.",
    visualTitle: "FRAGMENTED SILOS",
    visualSub: "Uncorrelated logs • High MTTR",
    diagramType: "problem",
    sideBadges: [
      { name: "EDR SILO", status: "UNFILTERED ALERTS", color: "text-red-400 border-red-500/30 bg-red-500/10" },
      { name: "CLOUD LOGS", status: "NO CORRELATION", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
    ],
  },
  {
    id: "02",
    tag: "THE OPERATING MODEL",
    title: "Unified continuous operations.",
    body: "Entersoft delivers MDR and Detection Engineering through your existing security stack or an Entersoft-managed architecture, providing continuous telemetry correlation and analyst-led triage.",
    visualTitle: "UNIFIED OPERATING MODEL",
    visualSub: "Continuous telemetry correlation • Flexible delivery",
    diagramType: "model",
    sideBadges: [
      { name: "DELIVERY MODEL", status: "YOUR STACK OR MANAGED", color: "text-[#60A5FA] border-[#60A5FA]/30 bg-[#3B82F6]/10" },
      { name: "CORRELATION", status: "HIGH-FIDELITY SIGNALS", color: "text-[#60A5FA] border-[#60A5FA]/30 bg-[#3B82F6]/10" },
    ],
  },
  {
    id: "03",
    tag: "DETECTION ENGINEERING",
    title: "Multi-surface signal correlation.",
    body: "Our engine ingests and correlates telemetry across AWS/Azure/GCP, EDR feeds, network traffic, IAM identity, and application logs to surface actionable threats before damage occurs.",
    visualTitle: "CROSS-STACK CORRELATION",
    visualSub: "Multi-source Telemetry → Detection Engine",
    diagramType: "engine",
    sideBadges: [
      { name: "CLOUD & ENDPOINT", status: "TELEMETRY INGESTION", color: "text-[#60A5FA] border-[#60A5FA]/30 bg-[#3B82F6]/10" },
      { name: "IDENTITY & WAF", status: "BEHAVIORAL MAPPING", color: "text-[#60A5FA] border-[#60A5FA]/30 bg-[#3B82F6]/10" },
    ],
  },
  {
    id: "04",
    tag: "SENIOR EXPERTISE",
    title: "Senior analyst triage & investigation.",
    body: "Critical alerts are investigated and verified by senior security analysts. We continuously reduce recurring noise through rule tuning, contain active threats, and provide clear remediation guidance.",
    visualTitle: "EXPERT TRIAGE",
    visualSub: "Senior-led Triage • Verified Incident Scoping",
    diagramType: "sla",
    sideBadges: [
      { name: "TRIAGE & ANALYSIS", status: "SENIOR-LED INVESTIGATION", color: "text-[#60A5FA] border-[#60A5FA]/40 bg-[#3B82F6]/15 font-bold" },
      { name: "CONTAINMENT", status: "ACTIONABLE GUIDANCE", color: "text-[#60A5FA] border-[#60A5FA]/30 bg-[#3B82F6]/10" },
    ],
  },
];

export default function CD_PinnedNarrative() {
  const [activeStage, setActiveStage] = useState(0);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced || typeof window === "undefined") return;

    const handleScroll = () => {
      stageRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2) {
          setActiveStage(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReduced]);

  const current = NARRATIVE_STAGES[activeStage];

  return (
    <section className="w-full bg-[#080C14] py-16 px-6 md:px-12 relative z-10 border-b border-[var(--cd-border)]">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#60A5FA] mb-3">
            // OPERATIONAL NARRATIVE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FFFFFF] leading-tight">
            How we solve the <CDGradientText>cyber defense crisis</CDGradientText>.
          </h2>
        </div>

        {/* Pinned Layout: Sticky Left 3D Stack + Scrolling Right Copy & Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative">
          {/* STICKY VISUAL PANEL STACK (Desktop: Sticky, Full Vertical Fit) */}
          <div className="hidden md:flex md:col-span-6 sticky top-24 flex-col gap-4 z-20">
            {/* CARD 1: PRIMARY 3D WEBGL HOLOGRAM SCENE */}
            <CDGlowCard className="h-[380px] flex flex-col justify-between p-6 relative overflow-hidden bg-[#0F172A] border border-[var(--cd-border)] group">
              {/* Background 3D Canvas Visual */}
              <div className="absolute inset-0 z-0 opacity-85">
                <Narrative3DVisual stageIndex={activeStage} />
              </div>

              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-2 relative z-10 bg-[#0F172A]/70 backdrop-blur-md px-3 py-1.5 rounded-lg">
                <span className="font-mono text-xs font-bold text-[#60A5FA] tracking-wider">
                  STAGE {current.id} / 04
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#60A5FA] bg-[rgba(59,130,246,0.15)] border border-[rgba(96,165,250,0.3)] px-3 py-0.5 rounded-full">
                  {current.tag}
                </span>
              </div>

              {/* Center Glass Graphic Badge merged over 3D WebGL */}
              <div className="flex-1 flex flex-col items-center justify-center relative z-10 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex flex-col items-center text-center px-4"
                  >
                    {current.diagramType === "problem" && (
                      <div className="w-full max-w-[320px] space-y-2 p-3.5 rounded-xl bg-[#080C14]/85 backdrop-blur-md border border-red-500/30 shadow-2xl">
                        <div className="flex items-center justify-between font-mono text-xs text-red-400 font-bold">
                          <span>UNSORTED LOG NOISE</span>
                          <span className="text-[10px] bg-red-500/20 px-2 py-0.5 rounded">CRITICAL</span>
                        </div>
                        <div className="flex items-center justify-between font-mono text-xs text-amber-400">
                          <span>DISCONNECTED EDR ALERTS</span>
                          <span className="text-[10px] text-amber-300">DELAYED</span>
                        </div>
                      </div>
                    )}

                    {current.diagramType === "model" && (
                      <div className="p-4 rounded-xl bg-[#080C14]/85 backdrop-blur-md border border-[#60A5FA]/40 shadow-2xl flex flex-col items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#FFFFFF] tracking-wider">
                          UNIFIED CONTINUOUS ENGINE
                        </span>
                        <div className="flex items-center gap-2 font-mono text-[10px] text-[#60A5FA]">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">MONITOR</span>
                          <span>•</span>
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">HUNT</span>
                          <span>•</span>
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">RESPOND</span>
                        </div>
                      </div>
                    )}

                    {current.diagramType === "engine" && (
                      <div className="p-4 rounded-xl bg-[#080C14]/85 backdrop-blur-md border border-[#60A5FA]/40 shadow-2xl flex flex-col items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-[#FFFFFF]">
                          CROSS-STACK TELEMETRY CORRELATION
                        </span>
                        <span className="font-mono text-[10px] text-[#60A5FA]">
                          Multi-Surface Correlation • Telemetry Ingestion
                        </span>
                      </div>
                    )}

                    {current.diagramType === "sla" && (
                      <div className="p-5 rounded-xl bg-[#080C14]/85 backdrop-blur-md border border-[#60A5FA]/40 shadow-2xl flex flex-col items-center gap-1.5">
                        <span className="font-serif text-3xl font-bold text-[#FFFFFF] drop-shadow-[0_0_20px_#3B82F6]">
                          EXPERT
                        </span>
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA]">
                          SENIOR-LED TRIAGE
                        </span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Glass Label */}
              <div className="border-t border-white/10 pt-2.5 relative z-10 bg-[#0F172A]/70 backdrop-blur-md px-3 py-1.5 rounded-lg">
                <span className="font-mono text-xs font-bold text-[#FFFFFF] block">
                  {current.visualTitle}
                </span>
                <span className="font-mono text-[11px] text-[#64748B] block">
                  {current.visualSub}
                </span>
              </div>
            </CDGlowCard>

            {/* CARD 2: AUXILIARY LIVE TELEMETRY MATRIX CARD */}
            <CDGlowCard className="p-4 bg-[#0F172A] border border-[var(--cd-border)] flex items-center justify-between gap-4 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-bold text-[#FFFFFF]">
                    MDR & DETECTION PIPELINE
                  </span>
                  <span className="font-mono text-[10px] text-[#64748B]">
                    AWS • EDR • OKTA • WAF • NDR
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-[#60A5FA] bg-[#3B82F6]/10 border border-[#60A5FA]/30 px-2.5 py-1 rounded">
                  MONITORED
                </span>
              </div>
            </CDGlowCard>
          </div>

          {/* RIGHT SCROLLING NARRATIVE STEPS + INTEGRATED GRAPHIC IMAGE CARDS */}
          <div className="md:col-span-6 flex flex-col gap-14 py-2">
            {NARRATIVE_STAGES.map((stage, idx) => (
              <div
                key={stage.id}
                ref={(el) => {
                  stageRefs.current[idx] = el;
                }}
                className={`flex flex-col items-start transition-opacity duration-500 ${
                  activeStage === idx ? "opacity-100" : "opacity-45"
                }`}
              >
                {/* Stage Tag */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs font-bold text-[#60A5FA] bg-[rgba(59,130,246,0.12)] px-3 py-1 rounded-full border border-[rgba(96,165,250,0.25)]">
                    {stage.id} / 04
                  </span>
                  <span className="font-mono text-xs font-bold text-[#64748B] tracking-wider">
                    {stage.tag}
                  </span>
                </div>

                {/* Stage Title */}
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#FFFFFF] mb-3 leading-tight">
                  {stage.title}
                </h3>

                {/* Stage Description */}
                <p className="font-sans text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-4">
                  {stage.body}
                </p>

                {/* INTEGRATED MERGED IMAGE / DIAGRAM CARDS ON BOTH SIDES */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {stage.sideBadges.map((badge, bIdx) => (
                    <div
                      key={bIdx}
                      className={`p-3.5 rounded-lg border flex flex-col gap-1 transition-all ${badge.color}`}
                    >
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FFFFFF]/80">
                        {badge.name}
                      </span>
                      <span className="font-mono text-xs font-bold">
                        {badge.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
