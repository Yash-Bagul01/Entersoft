"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GitPullRequest, Search, ShieldCheck, RefreshCw, Terminal, CheckCircle2 } from "lucide-react";

interface ProcessStep {
  step: string;
  title: string;
  badge: string;
  description: string;
  detail: string;
}

const steps: ProcessStep[] = [
  {
    step: "01",
    title: "Ingest & Connect",
    badge: "2-MIN ONBOARDING",
    description: "Connect GitHub, GitLab, Bitbucket, Azure DevOps, or install the EnProbe CLI git hook directly onto developer machines.",
    detail: "Zero configuration required. Auto-discovers all repositories, branches, and commits."
  },
  {
    step: "02",
    title: "Deep Entropy Scan",
    badge: "AST + SHANNON",
    description: "Scan every string literal, commit delta, and pull request using 1,280+ pattern signatures and mathematical entropy calculation.",
    detail: "Differentiates true randomized cryptokeys from standard variable names."
  },
  {
    step: "03",
    title: "Active Key Validation",
    badge: "100% ACCURACY",
    description: "Safely verify detected secrets in an isolated sandbox against upstream issuers (AWS, OpenAI, Slack, Stripe) without exposing tokens.",
    detail: "Instantly separates harmless test mocks from critical production credentials."
  },
  {
    step: "04",
    title: "Block & Auto-Rotate",
    badge: "ZERO DOWNTIME",
    description: "Block Git pushes at the pre-receive boundary and dispatch automated IAM rotation playbooks to revoke compromised keys within seconds.",
    detail: "Posts inline PR fixes with secure secret management recommendations."
  }
];

export default function Secrets_ProcessTimeline() {
  return (
    <section className="w-full bg-[#FAFCFF] text-slate-900 py-24 md:py-32 border-b border-slate-200/80 relative z-20">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-[760px] mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            // 04-STEP CREDENTIAL ASSURANCE WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 font-sans uppercase">
            How EnProbe Eliminates Secret Leaks
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            A seamless 4-stage pipeline that secures credentials from the developer workstation through pull request reviews to cloud deployment.
          </p>
        </div>

        {/* 4-Column Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white border border-slate-200/90 rounded-xl p-6 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md hover:border-[#2563EB]/40 transition-all duration-300 group hover:-translate-y-1"
            >
              {/* Step Header Strip */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-mono text-2xl font-bold text-[#2563EB]">
                  {item.step}
                </span>
                <span className="text-[10px] font-mono font-bold bg-blue-50 text-[#2563EB] border border-blue-100 px-2 py-0.5 rounded">
                  {item.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold uppercase tracking-tight text-slate-950 font-sans group-hover:text-[#2563EB] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Detail Note */}
              <div className="pt-3 border-t border-slate-100 font-mono text-[11px] text-slate-500">
                {item.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Action Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3 font-mono text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Ready to integrate in your existing GitHub, GitLab, or CI/CD pipelines.</span>
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer self-start sm:self-auto"
            data-cursor="button"
          >
            <span>Deploy Free Pre-Commit Hook</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
