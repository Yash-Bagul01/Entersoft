"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How does EnProbe differentiate active production secrets from dummy test mocks?",
    answer: "Unlike legacy pattern matching that flags harmless variables or test strings like 'password123', EnProbe combines Shannon entropy mathematical scoring with an AST-aware parser and active sandboxed verification. If a candidate secret is discovered, EnProbe safely queries the provider API (e.g., AWS STS GetCallerIdentity or OpenAI model listing) in an ephemeral sandbox to confirm whether the key is active."
  },
  {
    question: "Does the EnProbe pre-commit hook slow down developer commit workflows?",
    answer: "No. The EnProbe CLI git hook executes in under 240 milliseconds by only scanning staged git diff chunks locally in memory. It causes zero perceptible latency during 'git commit' or 'git push' operations."
  },
  {
    question: "What types of secrets and credentials can EnProbe detect?",
    answer: "EnProbe recognizes over 1,280 distinct credential formats including AWS IAM access keys, GCP service account JSONs, Azure SAS tokens, OpenAI/Anthropic API keys, Stripe secret keys, GitHub Fine-Grained Personal Access Tokens, Slack webhooks, Private SSH/RSA keys, and custom organizational regex patterns."
  },
  {
    question: "Can EnProbe audit historical git commit logs and legacy repository branches?",
    answer: "Yes. EnProbe performs full recursive commit graph traversal across all active and archived branches, tags, merged pull requests, and reflogs. It can scan 50,000+ historical commits in under 60 seconds and generates automated BFG scripts to purge exposed keys safely."
  },
  {
    question: "Does EnProbe retain or store our organization's private source code or keys?",
    answer: "No. EnProbe adheres to a strict zero-retention security model. Scans execute either locally on developer workstations or inside ephemeral CI/CD runners. Source code and secret values are never stored on external servers or used for model training."
  },
  {
    question: "How does automated key rotation work when an active leak is intercepted?",
    answer: "EnProbe connects directly to cloud provider IAM APIs (AWS IAM, GCP IAM, Azure Entra ID) and secret vaults (HashiCorp Vault, AWS Secrets Manager, Doppler). When an active production key is confirmed, EnProbe can trigger a webhook playbook to provision a new credential and invalidate the compromised key within seconds."
  }
];

export default function NovaSecrets_FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="w-full bg-[#030303] text-white py-28 md:py-36 border-b border-[#27272A]/80 relative z-10">
      <div className="max-w-[980px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181B] border border-white/10 text-xs font-mono text-[#60A5FA] uppercase tracking-wider mb-5">
            <span>// KNOWLEDGE BASE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans leading-[1.08] mb-4">
            Frequently Asked Questions.
          </h2>
          <p className="text-base text-[#A1A1AA] font-sans leading-relaxed">
            Everything you need to know about continuous secrets detection, Shannon entropy, and active verification.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="p-px rounded-[20px] bg-gradient-to-b from-white/10 via-white/5 to-transparent hover:from-[#60A5FA]/30 transition-all duration-300"
              >
                <div className="w-full bg-[#18181B]/90 rounded-[19px] p-6 sm:p-7 backdrop-blur-xl border border-white/5">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                    data-cursor="button"
                  >
                    <span className="text-base sm:text-lg font-semibold text-white font-sans pr-4">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? "bg-[#60A5FA] text-[#030303]" : "bg-white/5 text-slate-400"
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 text-sm sm:text-base text-[#A1A1AA] font-sans leading-relaxed border-t border-white/5 mt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
