"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Cloud, ShieldAlert, FileCheck, CheckCircle2 } from "lucide-react";

interface RoleCard {
  title: string;
  role: string;
  description: string;
  capabilities: string[];
  href: string;
  icon: React.ReactNode;
}

const roleCards: RoleCard[] = [
  {
    title: "AppSec & DevSecOps",
    role: "DEVELOPER WORKFLOWS",
    description: "Eliminate false alarm fatigue in CI/CD pipelines, embed sub-second pre-commit hooks, and provide developers with automated remediation code snippets.",
    capabilities: [
      "Sub-250ms pre-commit git hooks",
      "Inline pull request review bot",
      "Developer IDE real-time warnings",
      "Zero-noise AST semantic parsing"
    ],
    href: "/services/appsec",
    icon: <Code2 className="w-5 h-5 text-[#2563EB]" />
  },
  {
    title: "Cloud & Infrastructure",
    role: "IAM & MULTI-CLOUD",
    description: "Protect AWS IAM access keys, GCP service accounts, Azure client secrets, and Kubernetes secrets from leaking into public or internal repositories.",
    capabilities: [
      "Automated cloud IAM key rotation",
      "Terraform & IaC secret linting",
      "K8s secrets & env drift detection",
      "Cloud provider API sync"
    ],
    href: "/services/managed-cloud-security",
    icon: <Cloud className="w-5 h-5 text-[#2563EB]" />
  },
  {
    title: "SOC & Forensics",
    role: "INCIDENT RESPONSE",
    description: "Real-time compromise telemetry, deep git commit graph forensics, blast-radius modeling, and immediate key revocation dispatch across enterprise fleets.",
    capabilities: [
      "24/7 Git repo leak surveillance",
      "Historical reflog timeline audit",
      "Automated SIEM / SOAR alert feeds",
      "Blast radius privilege scoring"
    ],
    href: "/services/soc-siem",
    icon: <ShieldAlert className="w-5 h-5 text-[#2563EB]" />
  },
  {
    title: "Compliance & CISO",
    role: "EXECUTIVE AUDIT",
    description: "Satisfy SOC 2 Type II, ISO 27001, PCI-DSS 4.0, and regulatory mandates with cryptographically signed credential hygiene evidence.",
    capabilities: [
      "Tamper-proof audit trails",
      "Executive risk dashboards",
      "Continuous policy enforcement",
      "Instant compliance export"
    ],
    href: "/services/compliance-management",
    icon: <FileCheck className="w-5 h-5 text-[#2563EB]" />
  }
];

export default function Secrets_GetInvolvedCards() {
  return (
    <section className="w-full bg-[#FAFCFF] text-slate-900 py-24 md:py-32 border-b border-slate-200/80 relative z-20">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 mb-14 text-xs font-mono">
          <span className="text-[#2563EB] font-bold uppercase tracking-wider">
            // ROLE-BASED DEFENSE ARCHITECTURE
          </span>
          <span className="text-slate-500">
            ENTERPRISE PRACTICE ALIGNMENT • 2026
          </span>
        </div>

        {/* Big Editorial Title */}
        <div className="max-w-[800px] mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 font-sans uppercase leading-[1.04]">
            CREDENTIAL HYGIENE FOR <br />
            <span className="text-slate-500 font-serif italic lowercase font-normal">every</span> SECURITY STAKEHOLDER
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white border border-slate-200/90 hover:border-[#2563EB]/60 rounded-xl p-7 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">
                {/* Icon & Role Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {card.role}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-xl font-bold font-sans text-slate-950 group-hover:text-[#2563EB] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  {card.description}
                </p>

                {/* Capabilities List */}
                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  {card.capabilities.map((cap) => (
                    <div key={cap} className="flex items-center gap-2 text-xs font-sans text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-slate-100">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB] hover:text-[#1D4ED8] transition-colors group/link"
                  data-cursor="link"
                >
                  <span>Explore Practice</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
