"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileCheck, AlertCircle, CheckCircle2, Award } from "lucide-react";

export default function ContinuousAssuranceDial() {
  const [selectedFramework, setSelectedFramework] = useState("iso");

  const frameworks = {
    iso: {
      name: "ISO/IEC 27001:2022",
      readiness: "100%",
      controlsPassed: 93,
      controlsTotal: 93,
      evidenceSources: ["AWS IAM API", "GitHub Code Gate", "CrowdStrike Log Stream"],
      lastDrift: "0 Drift Incidents"
    },
    soc2: {
      name: "SOC 2 Type II (Trust Services)",
      readiness: "98.8%",
      controlsPassed: 64,
      controlsTotal: 65,
      evidenceSources: ["CI/CD Pipeline Audit", "KMS Encryption Proof", "Okta SSO Log"],
      lastDrift: "1 Warning (Remediated)"
    },
    rbi: {
      name: "RBI Cybersecurity Framework",
      readiness: "100%",
      controlsPassed: 42,
      controlsTotal: 42,
      evidenceSources: ["Bank API Gateway Logs", "VAPT Audit Report", "SIEM SOC Logs"],
      lastDrift: "0 Drift Incidents"
    }
  };

  const current = frameworks[selectedFramework as keyof typeof frameworks];

  return (
    <div className="w-full bg-[#060606] border border-[#08428C]/40 rounded-[12px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-[#08428C]" />
          <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#08428C]">
            CONTINUOUS COMPLIANCE AUDIT DIAL & EVIDENCE ENGINE
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="text-[#08428C] font-bold">EMPANELLED AUDITOR READY</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6 font-mono text-[10px]">
        {["iso", "soc2", "rbi"].map((key) => (
          <button
            key={key}
            onClick={() => setSelectedFramework(key)}
            className={`px-3 py-1.5 rounded font-bold uppercase transition-colors cursor-pointer ${
              selectedFramework === key
                ? "bg-[#08428C] text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {key === "iso" ? "ISO 27001" : key === "soc2" ? "SOC 2 Type II" : "RBI Framework"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Dial Score Gauge */}
        <div className="lg:col-span-5 bg-[#070b14] border border-white/10 p-6 rounded-[8px] flex flex-col items-center justify-center text-center gap-3 h-[240px]">
          <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
            AUDIT READINESS SCORE
          </span>
          <span className="text-[54px] font-display font-bold text-emerald-400 leading-none">
            {current.readiness}
          </span>
          <span className="font-mono text-[11px] text-white/80 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded">
            {current.controlsPassed} / {current.controlsTotal} Controls Verified
          </span>
        </div>

        {/* Evidence Logs & Details */}
        <div className="lg:col-span-7 bg-[#0a0f1d] border border-[#08428C]/30 p-6 rounded-[8px] flex flex-col justify-between h-[240px]">
          <div className="flex flex-col gap-3">
            <h4 className="text-[18px] font-bold font-display text-white">{current.name}</h4>
            <div className="flex flex-col gap-1.5 font-mono text-[11px]">
              <span className="text-[#08428C] font-bold uppercase text-[9px]">Live Evidence Automated Collectors:</span>
              <div className="flex flex-wrap gap-2">
                {current.evidenceSources.map((src) => (
                  <span key={src} className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-white/80">
                    {src}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px]">
            <span className="text-white/40">Drift Monitor Status:</span>
            <span className="text-emerald-400 font-bold">{current.lastDrift}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
