"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { threats } from "@/data/aiSystems";

export default function AI5_ThreatAccordion() {
  const [openId, setOpenId] = useState<string | null>(threats[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 py-24 md:py-32 border-b border-[var(--border-subtle)] overflow-hidden z-10">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col gap-3 text-left">
          <div className="font-mono text-xs font-bold text-[#00A3FF] tracking-[0.2em] uppercase">
            04 — THREAT SCOPE
          </div>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-bold text-[#F6F5F0] leading-[1.1] tracking-tight">
            Eight classes. Every AI stack exposes all of them.
          </h2>
        </div>

        {/* Accordion List */}
        <div className="w-full flex flex-col border-t border-[var(--border-subtle)]">
          {threats.map((item, index) => {
            const isOpen = openId === item.id;
            const indexFormatted = String(index + 1).padStart(2, "0");

            return (
              <div
                key={item.id}
                className={`w-full border-b border-[var(--border-subtle)] transition-colors duration-300 relative ${
                  isOpen ? "bg-[var(--bg-elevated)]/40" : "hover:bg-white/[0.01]"
                }`}
              >
                {/* Active Neon Left Indicator Line */}
                {isOpen && (
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#00A3FF]" />
                )}

                {/* Header Row */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between py-5 md:py-6 px-4 md:px-6 text-left focus:outline-none min-h-[44px] cursor-pointer"
                  data-cursor="button"
                >
                  <div className="flex items-center gap-4 md:gap-8">
                    <span className="font-mono text-xs text-[var(--text-tertiary)]">
                      {indexFormatted}
                    </span>
                    <span
                      className={`font-serif text-[clamp(1.1rem,2.5vw,2rem)] font-bold transition-colors duration-200 ${
                        isOpen ? "text-[#F6F5F0]" : "text-[var(--text-primary)]/80"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* Toggle Plus/Minus Icon */}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-lg text-[var(--text-tertiary)] ml-4"
                  >
                    +
                  </motion.span>
                </button>

                {/* Expanded Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden px-4 md:px-6 pb-6 pl-12 md:pl-20"
                    >
                      {/* One-liner */}
                      <p className="font-sans text-sm md:text-base text-[var(--text-secondary)] max-w-[560px] leading-relaxed">
                        {item.oneliner}
                      </p>

                      {/* Technical details ('what') */}
                      <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08, duration: 0.2 }}
                        className="font-mono text-xs text-[var(--text-tertiary)] max-w-[560px] leading-relaxed mt-2"
                      >
                        {item.what}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
