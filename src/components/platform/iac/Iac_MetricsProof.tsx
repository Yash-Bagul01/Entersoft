"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Layers, Award } from "lucide-react";

interface Metric {
  value: string;
  label: string;
  subtext: string;
  icon: React.ReactNode;
}

const METRICS: Metric[] = [
  {
    value: "0",
    label: "Production Leaks Allowed",
    subtext: "100% deterministic gatekeeping against critical misconfigurations.",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
  },
  {
    value: "100%",
    label: "Multi-Cloud IaC Coverage",
    subtext: "Terraform, OpenTofu, K8s, Helm, CloudFormation, & ARM/Bicep.",
    icon: <Layers className="w-6 h-6 text-[#93C5FD]" />,
  },
  {
    value: "< 1.8s",
    label: "Scan Evaluation Latency",
    subtext: "Sub-second AST parsing that never slows developer PR velocity.",
    icon: <Zap className="w-6 h-6 text-[#FDE68A]" />,
  },
  {
    value: "350+",
    label: "Pre-Built OPA Guardrails",
    subtext: "Pre-mapped to CIS Benchmarks, NIST 800-53, SOC 2, & PCI-DSS.",
    icon: <Award className="w-6 h-6 text-[#C4B5FD]" />,
  },
];

export default function Iac_MetricsProof() {
  return (
    <section
      id="metrics"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#040407] text-[#FFFFFF] border-t border-white/[0.08] overflow-hidden isolate"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-[#3B82F6]/10 via-[#8B5CF6]/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-[#93C5FD] block mb-3 font-semibold">
            // EMPIRICAL BENCHMARKS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal tracking-tight leading-[1.1] text-[#FFFFFF]">
            Engineered for Enterprise Scale & Speed
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] font-normal leading-relaxed mt-4">
            Security that runs inline with high-velocity deployment pipelines without false alarms.
          </p>
        </div>

        {/* 4 Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="p-8 rounded-2xl border border-white/[0.14] bg-[#0C0C12]/90 backdrop-blur-xl hover:border-white/35 hover:bg-[#12121B] transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl border border-white/20 bg-white/[0.05] flex items-center justify-center">
                  {m.icon}
                </div>
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest font-semibold">
                  VERIFIED
                </span>
              </div>

              <div>
                <span className="text-4xl sm:text-5xl font-sans font-bold text-[#FFFFFF] tracking-tight block mb-2">
                  {m.value}
                </span>
                <h3 className="font-sans font-medium text-base text-[#FFFFFF] mb-2">
                  {m.label}
                </h3>
                <p className="text-xs text-[#D4D4D8] font-normal leading-relaxed">
                  {m.subtext}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
