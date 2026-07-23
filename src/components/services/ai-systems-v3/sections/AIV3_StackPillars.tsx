"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Database,
  Bot,
  Lock,
  CheckCircle2,
  FileCheck,
  Zap,
  ArrowRight,
} from "lucide-react";
import { stackPillars } from "@/data/aiSystemsV3";

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldAlert,
  Database,
  Bot,
  Lock,
};

export default function AIV3_StackPillars() {
  const [activeTab, setActiveTab] = useState(stackPillars[0].id);

  const currentPillar =
    stackPillars.find((p) => p.id === activeTab) || stackPillars[0];

  const CurrentIcon = ICON_MAP[currentPillar.iconName] || ShieldAlert;

  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 py-28 border-b border-white/10 overflow-hidden select-none">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto flex flex-col gap-14 relative z-10">
        {/* Section Header with zkPass typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="flex flex-col gap-3 max-w-[700px]">
            <div className="font-mono text-xs font-semibold text-[#00A3FF] tracking-[0.25em] uppercase">
              [ 01 — ASSURANCE LAYERS ]
            </div>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-bold text-[#F6F5F0] leading-[1.12] tracking-tight">
              Four layers of{" "}
              <em className="italic text-[#00A3FF] font-serif font-normal">
                AI Stack Security.
              </em>
            </h2>
            <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed mt-1">
              Complete security verification for your prompt inputs, knowledge bases, agent privileges, and model inference boundaries.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 font-mono text-xs text-white/60 px-4 py-2 rounded-lg border border-white/10 bg-black/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FULL COVERAGE SCOPE</span>
          </div>
        </div>

        {/* 2-Column Bento Grid Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr] gap-8 items-start">
          {/* Left Column Layer Cards */}
          <div className="flex flex-col gap-4">
            {stackPillars.map((pillar) => {
              const isActive = pillar.id === activeTab;
              const CardIcon = ICON_MAP[pillar.iconName] || ShieldAlert;

              return (
                <motion.button
                  key={pillar.id}
                  onClick={() => setActiveTab(pillar.id)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className={`w-full group relative p-6 rounded-xl border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? "bg-[#0E131F] border-[#00A3FF] shadow-[0_0_35px_rgba(0,163,255,0.15)]"
                      : "bg-black/40 border-white/10 hover:border-white/20 hover:bg-[#0B0E17]"
                  }`}
                >
                  {/* Corner Crosshair */}
                  <span className="absolute top-2 left-2 text-white/20 font-mono text-[9px]">
                    +
                  </span>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 pl-2">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors ${
                          isActive
                            ? "bg-[#00A3FF]/20 border-[#00A3FF]/50 text-[#00A3FF]"
                            : "bg-white/[0.04] border-white/10 text-white/50 group-hover:text-white"
                        }`}
                      >
                        <CardIcon className="w-5 h-5" />
                      </div>

                      <div className="flex flex-col text-left">
                        <span className="font-mono text-[10px] text-[#00A3FF] font-semibold tracking-widest uppercase">
                          LAYER {pillar.layerNumber}
                        </span>
                        <h3
                          className={`font-serif text-lg font-bold transition-colors ${
                            isActive ? "text-[#F6F5F0]" : "text-white/80 group-hover:text-white"
                          }`}
                        >
                          {pillar.title}
                        </h3>
                      </div>
                    </div>

                    <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-amber-300">
                      {pillar.owaspId}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-white/60 mt-3 pl-16 leading-relaxed">
                    {pillar.subtitle}
                  </p>
                </motion.button>
              );
            })}
          </div>

          {/* Right Column Bento Detail Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPillar.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="bg-[#0A0D14] rounded-2xl border border-white/10 p-8 flex flex-col gap-6 relative shadow-2xl"
            >
              {/* Corner Crosshair Marks */}
              <span className="absolute top-3 left-3 text-white/20 font-mono text-[10px]">+</span>
              <span className="absolute top-3 right-3 text-white/20 font-mono text-[10px]">+</span>
              <span className="absolute bottom-3 left-3 text-white/20 font-mono text-[10px]">+</span>
              <span className="absolute bottom-3 right-3 text-white/20 font-mono text-[10px]">+</span>

              {/* Header */}
              <div className="flex items-center gap-4 border-b border-white/10 pb-6 pt-2">
                <div className="w-12 h-12 rounded-xl bg-[#00A3FF]/15 border border-[#00A3FF]/40 flex items-center justify-center text-[#00A3FF] shrink-0">
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-[#00A3FF] font-semibold tracking-wider uppercase">
                    SPECIFICATION — LAYER {currentPillar.layerNumber}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#F6F5F0]">
                    {currentPillar.title}
                  </h3>
                </div>
              </div>

              <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed">
                {currentPillar.description}
              </p>

              {/* Approach & Impact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-black/50 border border-white/10 flex flex-col gap-2">
                  <span className="font-mono text-[11px] font-bold text-[#00A3FF] uppercase tracking-wider">
                    SERVICE APPROACH
                  </span>
                  <p className="font-sans text-xs text-white/70 leading-relaxed">
                    {currentPillar.serviceOverview}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-black/50 border border-white/10 flex flex-col gap-2">
                  <span className="font-mono text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    BUSINESS VALUE
                  </span>
                  <p className="font-sans text-xs text-white/70 leading-relaxed">
                    {currentPillar.businessImpact}
                  </p>
                </div>
              </div>

              {/* Key Assurance Capabilities */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs font-bold text-white/50 uppercase tracking-wider">
                  PROTECTION CAPABILITIES
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentPillar.keyDefenses.map((defense, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-sans text-xs font-semibold text-white/90">
                        {defense}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <span className="font-mono text-[11px] font-bold text-[#00A3FF] uppercase tracking-wider">
                  AUDIT ARTIFACTS DELIVERED
                </span>

                <div className="flex flex-wrap gap-2">
                  {currentPillar.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-[#F6F5F0] font-sans text-xs font-medium"
                    >
                      <FileCheck className="w-3.5 h-3.5 text-[#00A3FF]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
