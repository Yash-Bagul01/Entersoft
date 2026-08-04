"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/sast";
import { ChevronDown } from "lucide-react";

export default function SH7_FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section className="bg-[var(--lt-gray)] py-24 px-6 md:px-12 text-[var(--lt-text)]">
      <div className="max-w-[800px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.span {...fadeUp} className="lt-badge mb-4">
            {faqs.badge}
          </motion.span>
          <motion.h2 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="lt-section-h2 mb-4"
          >
            {faqs.heading}
          </motion.h2>
          <motion.p 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="lt-body max-w-[540px] mx-auto"
          >
            {faqs.body}
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-[var(--lt-white)] border border-[var(--lt-border)] rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-sans font-bold text-base text-[var(--lt-text)] hover:bg-[var(--lt-gray)]/30 transition-colors duration-200"
                >
                  <span>{item.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[var(--lt-text-hint)] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                      <div className="p-6 pt-0 border-t border-[var(--lt-border)] font-sans text-sm text-[var(--lt-text-body)] leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
