"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { threatGridV3 } from "@/data/aiSystemsV3";

export default function AIV3_ThreatScopeGrid() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 py-28 border-b border-white/10 overflow-hidden select-none">
      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto flex flex-col gap-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="flex flex-col gap-3 max-w-[700px]">
            <div className="font-mono text-xs font-semibold text-[#00A3FF] tracking-[0.25em] uppercase">
              [ 03 — THREAT SCOPE MATRIX ]
            </div>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-bold text-[#F6F5F0] leading-[1.12] tracking-tight">
              Eight vulnerability classes{" "}
              <em className="italic text-[#00A3FF] font-serif font-normal">
                evaluated.
              </em>
            </h2>
            <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed mt-1">
              Full-spectrum testing across prompt boundaries, memory integrity, agent permissions, and model API interfaces.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 font-mono text-xs text-white/60 px-4 py-2 rounded-lg border border-white/10 bg-black/40">
            <span>OWASP & NIST ALIGNED</span>
          </div>
        </div>

        {/* 8 Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {threatGridV3.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => toggleExpand(item.id)}
                className={`relative flex flex-col justify-between p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isExpanded
                    ? "bg-[#0E131F] border-[#00A3FF] shadow-[0_0_30px_rgba(0,163,255,0.15)]"
                    : "bg-[#0A0D14] border-white/10 hover:border-white/20 hover:bg-[#0E121B]"
                }`}
              >
                {/* Corner Crosshair */}
                <span className="absolute top-2 left-2 text-white/20 font-mono text-[9px]">+</span>
                <span className="absolute top-2 right-2 text-white/20 font-mono text-[9px]">+</span>

                <div className="flex flex-col gap-3">
                  {/* Top Tags */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#00A3FF] uppercase tracking-wider font-semibold">
                      {item.category}
                    </span>
                    <span
                      className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                        item.severity === "CRITICAL"
                          ? "bg-red-500/15 text-red-400 border border-red-500/30"
                          : item.severity === "HIGH"
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-[#F6F5F0]">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="font-sans text-xs text-white/70 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Expandable Technical Detail */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 pt-3 border-t border-white/10 overflow-hidden"
                    >
                      <p className="font-sans text-xs text-[#00A3FF] leading-relaxed">
                        {item.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Expand Action Cue */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-white/50">
                  <span>{isExpanded ? "LESS INFO" : "MORE INFO"}</span>
                  <span className="text-[#00A3FF] font-bold">
                    {isExpanded ? "−" : "+"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
