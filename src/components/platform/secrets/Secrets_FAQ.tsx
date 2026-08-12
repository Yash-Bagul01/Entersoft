"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight, HelpCircle } from "lucide-react";

interface FAQItem {
  id: string;
  num: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "faq-1",
    num: "[01]",
    question: "How does EnProbe differentiate live secrets from mock test tokens?",
    answer: "Unlike regex-only scanners that flag test strings like 'password123' or 'test_sk_12345', EnProbe combines Shannon entropy mathematical scoring with an AST-aware parser and active sandboxed verification. If a candidate token is found, EnProbe safely queries the provider API (e.g. AWS STS GetCallerIdentity or OpenAI model listing) to verify if it is an active production key."
  },
  {
    id: "faq-2",
    num: "[02]",
    question: "Does EnProbe pre-commit hook introduce delay into developer workflows?",
    answer: "No. The EnProbe CLI git hook runs in under 250 milliseconds by only scanning staged git diff chunks locally in memory. It causes zero noticeable latency during 'git commit' or 'git push' operations."
  },
  {
    id: "faq-3",
    num: "[03]",
    question: "What types of secrets and credentials can EnProbe detect?",
    answer: "EnProbe recognizes over 1,280 distinct credential formats including AWS IAM keys, GCP service account JSONs, Azure SAS tokens, OpenAI/Anthropic API keys, Stripe secret keys, GitHub Fine-Grained Personal Access Tokens, Slack webhooks, Private SSH/RSA keys, PGP certificates, Database connection URIs, and custom organizational regex patterns."
  },
  {
    id: "faq-4",
    num: "[04]",
    question: "Can EnProbe scan our historical git commit logs and archive branches?",
    answer: "Yes. EnProbe performs full commit graph traversal across all branches, tags, merged PRs, stashes, and reflogs. It can scan 50,000+ commits in under 60 seconds and generate automated BFG / git-filter-repo cleanup scripts to purge legacy secrets safely."
  },
  {
    id: "faq-5",
    num: "[05]",
    question: "Does EnProbe store or transmit my organization's private source code or secrets?",
    answer: "No. EnProbe follows a strict zero-retention security architecture. Scans execute either locally on developer workstations or inside ephemeral CI/CD runners. Source code and secret values are never stored on external servers or used for model training."
  },
  {
    id: "faq-6",
    num: "[06]",
    question: "How does automated key rotation work when a leak is intercepted?",
    answer: "EnProbe integrates directly with cloud provider IAM APIs (AWS IAM, GCP IAM, Azure Entra ID) and secret vaults (HashiCorp Vault, AWS Secrets Manager, Doppler). When a valid live credential leak is confirmed, EnProbe can trigger a webhook playbook to provision a new key and deactivate the compromised credential within seconds."
  },
  {
    id: "faq-7",
    num: "[07]",
    question: "How does EnProbe integrate with our CI/CD pipelines?",
    answer: "EnProbe provides native GitHub Actions, GitLab CI/CD, Bitbucket Pipelines, Azure DevOps, and Jenkins integrations. You can enforce blocking PR status checks that prevent PR merges if high-entropy secrets are detected in new commits."
  },
  {
    id: "faq-8",
    num: "[08]",
    question: "Can we define custom internal secret patterns and token prefixes?",
    answer: "Yes. You can define custom regular expressions, Shannon entropy threshold rules, and path exclusion filters in a simple '.enprobe-secrets.yml' config file checked into your repository."
  }
];

export default function Secrets_FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full bg-[#FAFCFF] text-slate-900 py-24 md:py-32 border-b border-slate-200/80 relative z-20">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 mb-14 text-xs font-mono">
          <span className="text-[#2563EB] font-bold uppercase tracking-wider">
            // FREQUENTLY ASKED QUESTIONS
          </span>
          <span className="text-slate-500">
            QUESTIONS, ANSWERED • 2026
          </span>
        </div>

        {/* Two-Column FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Paragraph */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 font-sans uppercase leading-[1.05]">
              GET ANSWERS TO <br />
              YOUR QUESTIONS
            </h2>

            <p className="text-base text-slate-600 font-sans leading-relaxed">
              Everything you need to know about continuous secrets scanning, Shannon entropy algorithms, active verification, and developer workstation pre-commit performance.
            </p>

            <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
              <span className="text-xs font-mono uppercase text-slate-500">Need specific answers for your architecture?</span>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                data-cursor="link"
              >
                <span>Talk to an AppSec Engineer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-slate-200">
            {visibleFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={faq.id} className="py-6 first:pt-0 last:pb-0">
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-start justify-between gap-4 text-left group cursor-pointer focus:outline-none"
                    data-cursor="button"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs font-bold text-[#2563EB] mt-1 shrink-0">
                        {faq.num}
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-950 group-hover:text-[#2563EB] transition-colors font-sans leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? "bg-[#2563EB] text-white" : "bg-slate-100 group-hover:bg-blue-50 text-slate-700 group-hover:text-[#2563EB]"
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
                        <div className="pt-4 pl-10 pr-4 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Show More Button */}
            {!showAll && faqs.length > 5 && (
              <div className="pt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-6 py-3 rounded-md border border-slate-300 hover:border-[#2563EB] text-slate-800 hover:text-[#2563EB] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
                  data-cursor="button"
                >
                  Show more questions ({faqs.length - 5} remaining)
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
