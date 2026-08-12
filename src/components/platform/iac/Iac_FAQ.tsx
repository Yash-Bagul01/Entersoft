"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Which Infrastructure as Code frameworks and cloud providers are supported?",
    answer:
      "EnProbe IaC provides comprehensive coverage across Terraform (HCL), OpenTofu, Kubernetes manifests (YAML/JSON), Helm charts, AWS CloudFormation, AWS CDK, Azure Resource Manager (ARM), and Azure Bicep across AWS, Azure, Google Cloud, and on-premises Kubernetes clusters.",
  },
  {
    question: "How does EnProbe AST parsing differ from traditional regex linters?",
    answer:
      "Traditional linters rely on simplistic regex pattern matching, generating massive volumes of noisy false positives. EnProbe constructs full Abstract Syntax Trees (AST) and graph-based resource dependency maps, evaluating how security groups, IAM roles, and storage buckets interact in realistic runtime topologies.",
  },
  {
    question: "Can we write and enforce custom organizational security guardrails?",
    answer:
      "Yes. In addition to 350+ pre-engineered policies mapped to CIS Benchmarks, NIST 800-53, SOC 2, and PCI-DSS, you can define custom Open Policy Agent (OPA) Rego rules to enforce organization-specific naming standards, mandatory encryption keys, or VPC isolation constraints.",
  },
  {
    question: "Does EnProbe require direct access to our live cloud credentials?",
    answer:
      "Pre-deployment IaC scanning requires zero cloud credentials and zero agents—it runs entirely inside your existing CI/CD runners (GitHub Actions, GitLab CI, Jenkins) or local developer IDEs. Optional read-only CSPM connectors can be enabled if you wish to reconcile declared state against live cloud drift.",
  },
  {
    question: "How does EnProbe generate automated remediation pull requests?",
    answer:
      "When a security violation is detected, EnProbe automatically synthesizes the minimal, non-breaking HCL or YAML code patch required to bring the resource into compliance. Developers can apply fixes with a single click or merge automated remediation PRs directly.",
  },
];

export default function Iac_FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#060609] text-[#FFFFFF] border-t border-white/[0.08] overflow-hidden isolate"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-gradient-to-t from-[#8B5CF6]/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[980px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-[#C4B5FD] block mb-3 font-semibold">
            // FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal tracking-tight text-[#FFFFFF] leading-[1.1]">
            Everything You Need to Know
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] font-normal leading-relaxed mt-4">
            Answers to common questions regarding enterprise deployment, OPA policies, and CI/CD integration.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-white/[0.14] bg-[#0C0C12]/90 backdrop-blur-xl overflow-hidden transition-colors hover:border-white/30 shadow-lg"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 p-6 sm:p-7 text-left font-sans font-medium text-base sm:text-lg text-[#FFFFFF] hover:text-white transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-white/15" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-white/80" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-6 sm:px-7 pb-6 sm:pb-7 text-sm sm:text-base text-[#D4D4D8] font-normal leading-relaxed border-t border-white/[0.08] pt-4">
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
