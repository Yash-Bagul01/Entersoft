"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, CheckCircle2, Lock, Cpu, Clock } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    value: "1,280+",
    label: "SECRET PATTERNS RECOGNIZED",
    description: "Covers AWS, Stripe, OpenAI, GitHub, GCP, Azure, Slack, Vault, and 1,200+ third-party service tokens."
  },
  {
    value: "<250ms",
    label: "INTERCEPTION SPEED",
    description: "Lightweight pre-commit hooks and pre-receive filters evaluate code with zero developer workflow latency."
  },
  {
    value: "100%",
    label: "ACTIVE VALIDITY PROOF",
    description: "Safely verifies live token validity against issuer endpoints to eliminate mock string false positives."
  },
  {
    value: "0",
    label: "PRODUCTION LEAKS",
    description: "Guaranteed enterprise credential posture with automated Git branch push rejection and instant rotation."
  },
  {
    value: "24/7",
    label: "CONTINUOUS GIT MONITORING",
    description: "Real-time auditing across all repositories, branches, tags, forks, and pull requests 24 hours a day."
  },
  {
    value: "99.8%",
    label: "MTTR REDUCTION",
    description: "Automated rotation playbooks trigger IAM key revocation within seconds of detection."
  }
];

export default function Secrets_Stats() {
  return (
    <section className="w-full bg-[#FAFCFF] text-slate-900 pb-24 md:pb-32 border-b border-slate-200/80 relative z-20">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-14 text-xs font-mono">
          <span className="text-[#2563EB] font-bold uppercase tracking-wider">
            // TELEMETRY & SCALE METRICS
          </span>
          <span className="text-slate-500 hidden sm:inline-block">
            VERIFIED ENTERPRISE BENCHMARKS
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex flex-col gap-3 group"
            >
              {/* Massive Bold Number */}
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-950 font-sans group-hover:text-[#2563EB] transition-colors duration-300">
                {stat.value}
              </div>

              {/* Label */}
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                {stat.label}
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 font-sans leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
