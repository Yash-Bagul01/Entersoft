"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

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
  theme?: "light" | "dark";
}

export default function PlatformFAQ({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about continuous pipeline security and auditing.",
  badgeText = "// KNOWLEDGE BASE & FREQUENTLY ASKED QUESTIONS",
  faqs,
  theme = "light",
}: PlatformFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isDark = theme === "dark";

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`w-full py-24 md:py-28 border-b relative z-20 font-sans ${
      isDark ? "bg-[#030712] text-white border-white/10" : "bg-white text-[#111827] border-[#E5E7EB]"
    }`}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 flex flex-col gap-12">
        
        {/* Header Block */}
        <div className="flex flex-col gap-3 text-left max-w-[720px]">
          <span className={`font-mono text-xs font-bold uppercase tracking-wider ${
            isDark ? "text-cyan-400" : "text-[#4F46E5]"
          }`}>
            {badgeText}
          </span>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-medium uppercase tracking-tight font-sans ${
            isDark ? "text-white" : "text-[#111827]"
          }`}>
            {title}
          </h2>
          <p className={`text-sm md:text-base leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}>
            {subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className={`flex flex-col border-t w-full ${
          isDark ? "border-slate-800" : "border-slate-200"
        }`}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`border-b w-full transition-colors duration-200 ${
                  isDark ? "border-slate-800" : "border-slate-200"
                }`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 flex items-center justify-between text-left gap-4 group cursor-pointer outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`font-medium text-base md:text-lg transition-colors ${
                    isDark 
                      ? (isOpen ? "text-cyan-400" : "text-slate-100 group-hover:text-cyan-400")
                      : (isOpen ? "text-[#4F46E5]" : "text-slate-900 group-hover:text-[#4F46E5]")
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isDark
                      ? (isOpen ? "bg-cyan-950/80 text-cyan-400 border border-cyan-500/40" : "bg-slate-900 text-slate-400 border border-slate-700 group-hover:border-cyan-500/40 group-hover:text-cyan-400")
                      : (isOpen ? "bg-indigo-50 text-[#4F46E5]" : "bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-[#4F46E5]")
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
                      <p className={`pb-6 pt-1 text-sm md:text-base leading-relaxed max-w-[840px] ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}>
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
