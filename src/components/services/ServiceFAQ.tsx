"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQItem } from "@/data/services";
import SectionLabel from "../ui/SectionLabel";
import { Plus, Minus } from "lucide-react";

interface ServiceFAQProps {
  faqs: FAQItem[];
  isAccordion?: boolean;
}

export default function ServiceFAQ({
  faqs,
  isAccordion = false,
}: ServiceFAQProps) {
  const [openIndices, setOpenIndices] = useState<Record<number, boolean>>({});
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    if (isAccordion) {
      setActiveIndex(activeIndex === index ? null : index);
    } else {
      setOpenIndices((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    }
  };

  const isOpen = (index: number) => {
    return isAccordion ? activeIndex === index : !!openIndices[index];
  };

  return (
    <section className="relative w-full bg-[var(--bg-primary)] px-6 md:px-12 py-20 md:py-28 overflow-hidden border-b border-[var(--border-subtle)]">
      <div className="max-w-[850px] w-full mx-auto flex flex-col gap-12 md:gap-16">
        <div className="text-center flex flex-col items-center">
          <SectionLabel color="secondary">COMMON QUESTIONS</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-display font-medium text-[var(--text-primary)] uppercase tracking-tight mt-2">
            Frequently Asked
          </h2>
        </div>

        <div className="flex flex-col border-t border-[var(--border-subtle)] w-full">
          {faqs.map((faq, index) => {
            const open = isOpen(index);
            const panelId = `faq-panel-${index}`;
            const headerId = `faq-header-${index}`;
            
            return (
              <div
                key={index}
                className="border-b border-[var(--border-subtle)] w-full"
              >
                <button
                  id={headerId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 flex items-center justify-between text-left gap-4 font-sans font-medium text-base text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-200 outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="flex items-center justify-center shrink-0">
                    {open ? (
                      <Minus className="w-4 h-4 text-[var(--accent)]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[var(--text-tertiary)]" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-4 font-sans text-sm text-[var(--text-secondary)] leading-relaxed">
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
