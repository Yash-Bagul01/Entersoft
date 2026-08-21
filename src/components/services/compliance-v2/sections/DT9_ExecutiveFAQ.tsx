"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { digitalTrustData } from "@/data/digitalTrust";
import SectionLabel from "@/components/ui/SectionLabel";
import { Plus, Minus } from "lucide-react";

export default function DT9_ExecutiveFAQ() {
  const { faqs } = digitalTrustData;
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default for immediate discoverability

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="scroll-mt-24 relative w-full bg-[#080808] px-6 md:px-12 lg:px-16 py-24 md:py-32 overflow-hidden border-b border-white/[0.08] text-[#F5F5F5]"
    >
      <div className="max-w-[900px] w-full mx-auto flex flex-col gap-12 md:gap-16">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <SectionLabel color="secondary">CISO & GENERAL COUNSEL FAQ</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
            Frequently Addressed Governance Questions
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-[600px] mt-1">
            Key details on how Entersoft structures regulatory advisory, continuous evidence collection, and registrar liaison support.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col border-t border-white/[0.08] w-full">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `dt-faq-panel-${index}`;
            const headerId = `dt-faq-header-${index}`;

            return (
              <div
                key={index}
                className="border-b border-white/[0.08] w-full"
              >
                <button
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 flex items-center justify-between text-left gap-4 font-serif font-bold text-base sm:text-lg text-white hover:text-[var(--accent)] transition-colors duration-200 outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] cursor-pointer"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <span className="p-1 rounded bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[var(--accent)]" />
                    ) : (
                      <Plus className="w-4 h-4 text-zinc-400" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pr-4 font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed text-left border-t border-white/[0.03] pt-3">
                        {faq.answer}
                      </div>
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
