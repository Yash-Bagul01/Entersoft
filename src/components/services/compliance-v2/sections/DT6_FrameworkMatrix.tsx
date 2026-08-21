"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { digitalTrustData, DigitalTrustFramework } from "@/data/digitalTrust";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CheckCircle2, Shield, ArrowRight } from "lucide-react";

type CategoryFilter = "All" | "Global Standards" | "Privacy & Sovereignty" | "Financial & Banking" | "Healthcare & Critical";

export default function DT6_FrameworkMatrix() {
  const { frameworks } = digitalTrustData;
  const isReduced = useReducedMotion();

  const categories: CategoryFilter[] = [
    "All",
    "Global Standards",
    "Privacy & Sovereignty",
    "Financial & Banking",
    "Healthcare & Critical",
  ];

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string>(frameworks[0].id);

  const filteredFrameworks = frameworks.filter(
    (fw) => activeCategory === "All" || fw.category === activeCategory
  );

  const selectedFramework = frameworks.find((fw) => fw.id === selectedFrameworkId) || frameworks[0];

  return (
    <section 
      id="frameworks" 
      className="scroll-mt-24 relative w-full bg-[#080808] px-6 md:px-12 lg:px-16 py-24 md:py-32 overflow-hidden border-b border-white/[0.08] text-[#F5F5F5]"
    >
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-12 md:gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left max-w-[850px] gap-3">
          <SectionLabel color="secondary">REGULATORY COMPASS</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
            Supported Regulatory & Governance Frameworks
          </h2>
          <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed mt-2">
            Explore our end-to-end readiness, control harmonization, and registrar liaison support across global security, privacy, banking, and critical infrastructure standards.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-white/[0.08] pb-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  // Auto select first framework in new category if current one is filtered out
                  const newFiltered = frameworks.filter((f) => cat === "All" || f.category === cat);
                  if (!newFiltered.some((f) => f.id === selectedFrameworkId)) {
                    setSelectedFrameworkId(newFiltered[0]?.id || frameworks[0].id);
                  }
                }}
                className={`px-4 py-2 rounded-full font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/[0.03] text-zinc-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Framework Selectable List */}
          <div className="flex flex-col gap-3 w-full" role="tablist" aria-label="Regulatory Frameworks">
            {filteredFrameworks.map((fw, idx) => {
              const isSelected = fw.id === selectedFramework.id;
              return (
                <button
                  key={fw.id}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`framework-panel-${fw.id}`}
                  onClick={() => setSelectedFrameworkId(fw.id)}
                  className={`w-full p-5 rounded-lg border text-left transition-all duration-200 flex items-center justify-between group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                    isSelected
                      ? "bg-[#111624] border-[var(--accent)]/60 shadow-[0_0_25px_rgba(0,163,255,0.1)]"
                      : "bg-[#0a0d14]/60 border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.14]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-xs font-bold ${isSelected ? "text-[var(--accent)]" : "text-zinc-500"}`}>
                      [0{idx + 1}]
                    </span>
                    <div className="flex flex-col">
                      <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                        {fw.name}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                        {fw.category}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected ? "text-[var(--accent)] translate-x-1" : "text-zinc-600 group-hover:text-zinc-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Framework Detailed Blueprint */}
          <div 
            id={`framework-panel-${selectedFramework.id}`}
            role="tabpanel"
            className="w-full min-h-[440px] p-8 sm:p-10 rounded-xl bg-[#0c101a] border border-white/[0.12] flex flex-col justify-between relative text-left shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFramework.id}
                initial={{ opacity: 0, y: isReduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: isReduced ? 0 : -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col gap-7 w-full"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] font-bold text-[var(--accent)] tracking-[0.2em] uppercase">
                      FRAMEWORK BLUEPRINT
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {selectedFramework.name}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded bg-white/[0.05] border border-white/[0.1] font-mono text-[10px] font-bold uppercase text-zinc-300">
                    {selectedFramework.category}
                  </span>
                </div>

                {/* Mandate */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    REGULATORY MANDATE & SCOPE:
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {selectedFramework.mandate}
                  </p>
                </div>

                {/* Entersoft Engineering Approach */}
                <div className="flex flex-col gap-2 p-5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <span className="font-mono text-[9px] font-bold text-[var(--accent)] uppercase tracking-widest">
                    // ENTERSOFT ENGINEERING APPROACH:
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-zinc-200 leading-relaxed">
                    {selectedFramework.enterSoftApproach}
                  </p>
                </div>

                {/* Core Deliverables */}
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    KEY AUDIT DELIVERABLES:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedFramework.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-[13px] text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Bottom Status Ribbon */}
            <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between font-mono text-[9px] text-zinc-500">
              <span>UNIFIED CONTROL HARMONIZATION</span>
              <span className="text-[var(--accent)] font-semibold">ENTERPRISE AUDIT DEFENSE</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
