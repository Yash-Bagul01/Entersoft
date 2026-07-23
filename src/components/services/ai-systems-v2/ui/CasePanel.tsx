"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface CasePanelData {
  index: string;
  name: string;
  oneliner: string;
  scope: string;
}

interface CasePanelProps {
  data: CasePanelData;
  isOpen: boolean;
  onToggle: () => void;
}

export default function CasePanel({ data, isOpen, onToggle }: CasePanelProps) {
  const isReduced = useReducedMotion();

  return (
    <div
      className={`w-full border-b border-[var(--line)] transition-colors duration-300 relative select-none ${
        isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
      }`}
    >
      {/* Active Left Border Accent */}
      {isOpen && (
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--fg)] z-10" />
      )}

      {/* Row Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 md:py-6 px-4 md:px-8 text-left focus:outline-none cursor-pointer min-h-[44px]"
        data-cursor="button"
      >
        <div className="flex items-center gap-4 sm:gap-8">
          <span
            className={`font-mono text-xs md:text-sm fixed-width-index transition-colors duration-200 ${
              isOpen ? "text-[var(--fg)] font-bold" : "text-[var(--fg-dimmer)]"
            }`}
          >
            {data.index}
          </span>
          <span className="font-serif text-[clamp(1.3rem,3vw,2.4rem)] font-bold text-[var(--fg)] leading-tight tracking-tight">
            {data.name}
          </span>
        </div>

        {/* Rotate Plus to Cross */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: isReduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-lg md:text-xl text-[var(--fg-dimmer)] ml-4"
        >
          +
        </motion.span>
      </button>

      {/* Expanded Content Panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel-detail"
            initial={isReduced ? { opacity: 1, height: "auto" } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={isReduced ? { opacity: 0, height: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: isReduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden px-4 md:px-8 pb-7 pt-1 pl-12 md:pl-20"
          >
            {/* One-liner */}
            <p className="font-sans text-[clamp(15px,1.8vw,17px)] text-[var(--fg-dim)] max-w-[680px] leading-relaxed">
              {data.oneliner}
            </p>

            {/* Technical Scope */}
            <div className="font-mono text-xs text-[var(--fg-dimmer)] max-w-[680px] leading-relaxed mt-4 pt-3 border-t border-[var(--line)] flex flex-wrap gap-2">
              <span className="text-[var(--fg-dim)] font-bold">SCOPE:</span>
              <span>{data.scope}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
