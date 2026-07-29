"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, UserCheck, Check, Lock, Cpu } from "lucide-react";

export default function AIGovernanceVisual() {
  const [approved, setApproved] = useState(false);

  return (
    <div className="w-full bg-[#060606] border border-[#08428C]/40 rounded-[12px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Zap className="w-4 h-4 text-[#08428C]" />
          <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#08428C]">
            HUMAN-IN-THE-LOOP AI GOVERNANCE SANDBOX
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="text-white/60">14 Years Human Judgment Model Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Left: AI Machine Learning Proposal */}
        <div className="bg-[#070b14] border border-white/10 p-6 rounded-[8px] flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#08428C] uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                STAGE 1: AI MODEL PROPOSAL
              </span>
              <span className="font-mono text-[9px] bg-[#08428C]/20 border border-[#08428C] text-[#08428C] px-2 py-0.5 rounded">
                99.2% Confidence
              </span>
            </div>
            <h4 className="text-[17px] font-bold font-display text-white">
              AI Proposed Action: Patch Code Injection in API Middleware
            </h4>
            <div className="bg-[#060606] p-3 rounded font-mono text-[11px] text-white/80 border border-white/5 leading-relaxed">
              <code>{`// Auto-generated Fix Suggestion (PR #408)\n- req.query.user_id\n+ sanitizeInput(req.query.user_id)`}</code>
            </div>
          </div>

          <div className="text-[11px] font-mono text-white/50 border-t border-white/10 pt-3">
            AI handles correlation in &lt;200ms • Awaits human governance
          </div>
        </div>

        {/* Right: Human Expert Gate */}
        <div className={`p-6 rounded-[8px] border flex flex-col justify-between gap-6 transition-all ${
          approved
            ? "bg-[#08428C]/10 border-[#08428C]"
            : "bg-[#0a0f1d] border-white/10"
        }`}>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                STAGE 2: SENIOR EXPERT GOVERNANCE
              </span>
              <span className="font-mono text-[9px] bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-2 py-0.5 rounded">
                Human Accountable
              </span>
            </div>

            <h4 className="text-[17px] font-bold font-display text-white">
              Senior AppSec Lead Review
            </h4>

            <p className="text-[13px] text-[#A1A1AA] font-sans leading-relaxed">
              Senior security experts inspect business logic impact, verifying zero side effects before approving deployment.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
            {approved ? (
              <div className="flex items-center gap-2 font-mono text-[12px] font-bold text-emerald-400 bg-emerald-500/10 p-3 rounded border border-emerald-500/30">
                <Check className="w-4 h-4" />
                <span>ACTION GOVERNED & DISPATCHED TO DEPLOYMENT PIPELINE</span>
              </div>
            ) : (
              <button
                onClick={() => setApproved(true)}
                className="w-full py-3 rounded font-mono text-[11px] font-bold uppercase tracking-wider bg-[#08428C] hover:bg-[#0D518C] text-white transition-colors cursor-pointer"
              >
                Approve & Govern Action →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
