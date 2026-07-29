"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Target, ShieldAlert, CheckCircle2, ArrowRight, Zap, AlertTriangle } from "lucide-react";

export default function AttackPathVisualizer() {
  const [isPublic, setIsPublic] = useState(true);
  const [isReachable, setIsReachable] = useState(true);
  const [hasExploit, setHasExploit] = useState(true);
  const [hasAdmin, setHasAdmin] = useState(false);

  // Compute composite score
  let score = 3.2; // Base CVSS CVSS
  if (isPublic) score += 2.8;
  if (isReachable) score += 1.8;
  if (hasExploit) score += 1.5;
  if (hasAdmin) score += 0.6;
  score = Math.min(10.0, score);

  let priority = "LOW";
  let sla = "30 Days";
  if (score >= 9.0) {
    priority = "CRITICAL SLA";
    sla = "< 4 Hours";
  } else if (score >= 7.0) {
    priority = "HIGH URGENCY";
    sla = "< 24 Hours";
  } else if (score >= 5.0) {
    priority = "MEDIUM";
    sla = "7 Days";
  }

  return (
    <div className="w-full bg-[#060606] border border-[#08428C]/40 rounded-[12px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Target className="w-4 h-4 text-[#08428C]" />
          <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#08428C]">
            INTERACTIVE ATTACK PATH & EXPOSURE DECISIONER
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-white/60">
          <span>Static CVSS vs EnProbe Exploitability Score</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Toggle Parameter Control Panel */}
        <div className="lg:col-span-6 flex flex-col gap-4 bg-[#070b14] p-6 rounded-[8px] border border-white/10">
          <span className="font-mono text-[11px] font-bold text-[#08428C] uppercase tracking-wider">
            Toggle Exposure Vectors:
          </span>

          {[
            { label: "Internet Publicly Reachable Ingress", state: isPublic, set: setIsPublic },
            { label: "Code-Level Execution Reachability", state: isReachable, set: setIsReachable },
            { label: "Active Exploit Available in Wild (CISA KEV)", state: hasExploit, set: setHasExploit },
            { label: "High Privileged IAM Role Attached", state: hasAdmin, set: setHasAdmin },
          ].map((param) => (
            <button
              key={param.label}
              onClick={() => param.set(!param.state)}
              className={`flex items-center justify-between p-3 rounded border text-left font-mono text-[11px] transition-all cursor-pointer ${
                param.state
                  ? "bg-[#08428C]/20 border-[#08428C] text-white"
                  : "bg-white/5 border-white/10 text-white/40"
              }`}
            >
              <span>{param.label}</span>
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${param.state ? "border-[#08428C] bg-[#08428C]" : "border-white/20"}`}>
                {param.state && <CheckCircle2 className="w-3 h-3 text-white" />}
              </span>
            </button>
          ))}
        </div>

        {/* Right Dynamic Score & SLA Output Card */}
        <div className="lg:col-span-6 bg-[#0a0f1d] border border-[#08428C]/50 p-8 rounded-[8px] flex flex-col justify-between h-full shadow-2xl">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
              ENPROBE CONTEXTUAL EXPOSURE SCORE
            </span>
            <div className="flex items-baseline gap-4">
              <span className="text-[52px] font-display font-bold text-white leading-none">
                {score.toFixed(1)}
              </span>
              <span className="text-[14px] font-mono text-white/40">/ 10.0</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <span className={`font-mono text-[11px] font-bold px-3 py-1 rounded uppercase tracking-wider ${
                score >= 7.0 ? "bg-red-500/20 border border-red-500 text-red-400" : "bg-[#08428C]/20 border border-[#08428C] text-[#08428C]"
              }`}>
                {priority}
              </span>
              <span className="font-mono text-[11px] text-white/60">
                Action SLA: <strong className="text-white">{sla}</strong>
              </span>
            </div>

            <p className="text-[13px] text-[#A1A1AA] leading-relaxed font-sans pt-2 border-t border-white/10">
              Unlike static vulnerability scanners that rate every CVE high, EnProbe Exposure Decisioning filters out unreachable code flaws—slashing developer fix tickets by up to 70%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
