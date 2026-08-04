"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

export interface FAQItemData {
  question: string;
  answer: string;
}

interface PlatformFAQProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  faqs: FAQItemData[];
  accentColor?: string;
}

export default function PlatformFAQ({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about continuous pipeline security and auditing.",
  badgeText = "// KNOWLEDGE BASE & FREQUENTLY ASKED QUESTIONS",
  faqs,
  accentColor = "#4F46E5",
}: PlatformFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-24 md:py-28 border-b border-[#E5E7EB] relative z-20 font-sans">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 flex flex-col gap-12">
        
        {/* Header Block */}
        <div className="flex flex-col gap-3 text-left max-w-[720px]">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
            {badgeText}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium uppercase tracking-tight text-[#111827] font-sans">
            {title}
          </h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col border-t border-slate-200 w-full">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border-b border-slate-200 w-full transition-colors duration-200"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 flex items-center justify-between text-left gap-4 group cursor-pointer outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-base md:text-lg text-slate-900 group-hover:text-[#4F46E5] transition-colors">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? "bg-indigo-50 text-[#4F46E5]" : "bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-[#4F46E5]"
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pt-1 text-sm md:text-base text-slate-600 leading-relaxed max-w-[840px]">
                        {faq.answer}
                      </p>
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
