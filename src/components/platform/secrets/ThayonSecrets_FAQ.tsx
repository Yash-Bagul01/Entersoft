"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function ThayonSecrets_FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does EnProbe active sandbox validity verification work without triggering rate limits?",
      answer:
        "Entersoft EnProbe uses non-intrusive, read-only provider API probes (such as AWS STS GetCallerIdentity, Stripe Accounts retrieve, or GitHub User queries). Probes execute through distributed, isolated sandbox proxies with intelligent exponential backoff to prevent tenant rate limiting or triggering account lockouts."
    },
    {
      question: "Can Entersoft scan historical git repositories without cloning gigabytes to the cloud?",
      answer:
        "Yes. Our git graph traversal engine runs either as an on-premise CLI / Docker container or via shallow commit streaming. It analyzes commit objects and diff trees directly in memory at 10,000+ commits/second without saving entire clone archives to external servers."
    },
    {
      question: "How are custom corporate tokens and internal proprietary patterns supported?",
      answer:
        "Entersoft includes a flexible Custom Rule Engine supporting Shannon entropy thresholds, regex pattern templates, and custom HMAC/checksum validators tailored for your proprietary API tokens and internal key formats."
    },
    {
      question: "Does Entersoft integrate with HashiCorp Vault, AWS Secrets Manager, and Azure Key Vault?",
      answer:
        "Yes. When an exposed hardcoded key is detected, Entersoft can automatically inject the appropriate secret manager variable (e.g. `process.env.AWS_SECRET_KEY`) into the code branch and trigger automated credential rotation in your vault of choice with zero service downtime."
    },
    {
      question: "What is the impact on developer workstation and CI/CD pipeline build times?",
      answer:
        "Pre-commit checks execute in under 240 milliseconds via our native binary. CI/CD pipeline scans process 10,000 files in under 2 seconds, preventing any measurable pipeline delay."
    }
  ];

  return (
    <section className="relative w-full bg-[#FAFCFF] text-slate-900 py-24 md:py-32 border-b border-slate-200/80 overflow-hidden">
      {/* Top 5-Point Crosshair Guide Bar */}
      <div className="relative max-w-[1320px] mx-auto px-6 mb-12">
        <div className="flex items-center justify-between text-slate-400 text-sm font-mono select-none">
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
        </div>
      </div>

      <div className="relative max-w-[960px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500 mb-3">
            <span>[ 05 // FREQUENTLY ASKED QUESTIONS ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-6">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className="text-base sm:text-lg font-sans font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 group-hover:border-slate-300 transition-all ${
                      isOpen ? "rotate-180 bg-slate-100" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
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

      {/* Bottom 5-Point Crosshair Guide Bar */}
      <div className="relative max-w-[1320px] mx-auto px-6 mt-16">
        <div className="flex items-center justify-between text-slate-400 text-sm font-mono select-none">
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
        </div>
      </div>
    </section>
  );
}
