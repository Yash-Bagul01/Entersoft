"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const methodologyData = [
  {
    name: "BLACK BOX",
    description: "Zero prior knowledge of target architecture. Simulates a standard external threat actor probing endpoints and mapping vulnerabilities.",
  },
  {
    name: "GREY BOX",
    description: "Partial access provided (e.g. user credentials, API tokens). Simulates a compromised client account or internal insider threat audit.",
  },
  {
    name: "WHITE BOX",
    description: "Full access to target source code, configurations, architecture, and developer teams. Complete logic check with zero blind spots.",
  },
];

export default function VAPTVisual() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);  const glitchVariants = {
    hidden: { opacity: 0, x: 5 },
    visible: (custom: number) => ({
      opacity: [0, 0.4, 0.2, 0.8, 0.6, 1],
      x: [10, -5, 3, -2, 0],
      transition: {
        duration: 0.5,
        delay: custom * 0.15,
        ease: "linear" as const,
      },
    }),
  };
  return (
    <div 
      className="w-full max-w-[450px] aspect-[4/3] bg-[var(--bg-elevated)]/40 border border-[var(--border-subtle)] rounded-[4px] p-6 flex flex-col justify-center items-center relative overflow-hidden backdrop-blur-md"
      role="img"
      aria-label="VAPT audit methodology selector: Black box, Grey box, and White box pentesting"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />

      <div className="flex flex-col gap-6 w-full items-center">
        <span className="font-mono text-[9px] font-bold text-[var(--text-tertiary)] tracking-widest uppercase select-none">
          CHOOSE AUDIT DEPTH
        </span>

        {/* Methodology cards row */}
        <div className="grid grid-cols-3 gap-3 w-full relative z-10">
          {methodologyData.map((item, index) => (
            <motion.div
              key={index}
              variants={glitchVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="flex flex-col items-center justify-center p-4 border border-[var(--border-subtle)] bg-[var(--bg-primary)]/45 rounded-[2px] cursor-default transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent-dim)]/5 min-h-[90px] text-center"
            >
              <span className="font-mono text-[10px] font-bold text-[var(--text-primary)] select-none">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Tooltip Description Panel */}
        <div className="w-full min-h-[95px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 rounded-[2px] relative z-10 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {hoveredIndex !== null ? (
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-1.5"
              >
                <span className="font-mono text-[9px] font-bold text-[var(--accent)] tracking-wider">
                  {methodologyData[hoveredIndex].name} AUDITING
                </span>
                <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
                  {methodologyData[hoveredIndex].description}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center font-sans text-xs text-[var(--text-tertiary)] italic"
              >
                Hover over a card to audit details.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
