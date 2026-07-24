"use client";

import React from "react";
import { motion } from "framer-motion";
import { proof } from "@/data/cyberDefense";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CD7_ProofNumbers() {
  const isReduced = useReducedMotion();

  return (
    <section className="w-full bg-[#080C14] py-16 px-6 md:px-12 relative z-10 border-b border-[var(--cd-border)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
          {proof.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={isReduced ? {} : { opacity: 0, scale: 0.95, y: 15 }}
              whileInView={isReduced ? {} : { opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-[#0F172A] border border-[var(--cd-border)] backdrop-blur-md"
            >
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-[#FFFFFF] shadow-[0_0_24px_rgba(96,165,250,0.25)]">
                  {item.value}
                </span>
                {item.suffix && (
                  <span className="font-mono text-lg font-bold text-[#60A5FA]">
                    {item.suffix}
                  </span>
                )}
              </div>

              <span className="font-sans text-sm font-medium text-[#94A3B8]">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
