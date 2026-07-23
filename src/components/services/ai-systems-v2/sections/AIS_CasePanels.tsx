"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { casePanels } from "@/data/aiSystemsV2";
import CasePanel from "../ui/CasePanel";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AIS_CasePanels() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isReduced = useReducedMotion();

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative w-full bg-[var(--bg)] px-6 py-24 md:py-32 border-t border-[var(--line)] overflow-hidden">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-12 md:gap-16">
        {/* Section Header */}
        <div className="flex flex-col gap-3 text-left">
          <div className="font-mono text-xs font-medium text-[var(--fg-dim)] tracking-[0.2em] uppercase">
            // CASE FILES
          </div>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold text-[var(--fg)] leading-[1.1] tracking-tight">
            Eight classes.
            <br />
            Every AI stack
            <br />
            exposes all of them.
          </h2>
        </div>

        {/* Stacked Case Panels List */}
        <div className="w-full border-t border-[var(--line)] flex flex-col">
          {casePanels.map((panel, idx) => (
            <motion.div
              key={panel.index}
              initial={isReduced ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <CasePanel
                data={panel}
                isOpen={openIndex === idx}
                onToggle={() => handleToggle(idx)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
