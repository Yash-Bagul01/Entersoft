"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Workflow, GitPullRequest, CheckCircle, RefreshCw, ArrowRight } from "lucide-react";

export default function ClosedLoopPRVisual() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Flaw Detected & Ticket Dispatched",
      description: "Auto-generated Jira ticket #SEC-402 with code line & remediation snippet.",
      status: "COMPLETED"
    },
    {
      title: "2. Developer Commit & PR Opened",
      description: "Developer pushes PR #891: Fix SQL injection parameter binding.",
      status: "IN PROGRESS"
    },
    {
      title: "3. Automated Verification Re-Scan",
      description: "Targeted AST engine executes verification test on pull request branch.",
      status: "PENDING"
    },
    {
      title: "4. Cryptographic Risk Closure",
      description: "Fix verified 100% clean. Risk register automatically updated & ticket closed.",
      status: "PENDING"
    }
  ];

  return (
    <div className="w-full bg-[#060606] border border-[#08428C]/40 rounded-[12px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Workflow className="w-4 h-4 text-[#08428C]" />
          <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#08428C]">
            CLOSED-LOOP REMEDIATION WORKFLOW SIMULATOR
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="text-[#08428C] font-bold">5x FASTER MTTR</span>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {steps.map((step, idx) => (
          <button
            key={step.title}
            onClick={() => setActiveStep(idx)}
            className={`p-4 rounded border text-left font-mono text-[11px] flex flex-col justify-between gap-3 transition-all cursor-pointer ${
              activeStep === idx
                ? "bg-[#08428C]/20 border-[#08428C] text-white ring-2 ring-[#08428C]/30"
                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
            }`}
          >
            <span className="font-bold text-[10px] text-[#08428C] uppercase">STEP 0{idx + 1}</span>
            <span className="font-bold leading-tight">{step.title}</span>
          </button>
        ))}
      </div>

      {/* Selected Step Display Panel */}
      <div className="bg-[#070b14] border border-white/10 p-6 rounded-[8px] flex flex-col gap-4 font-mono text-[12px]">
        <div className="flex items-center justify-between">
          <h4 className="text-[18px] font-bold font-display text-white">
            {steps[activeStep].title}
          </h4>
          <span className="text-[10px] bg-[#08428C]/20 border border-[#08428C] text-[#08428C] px-2 py-1 rounded uppercase font-bold">
            {steps[activeStep].status}
          </span>
        </div>
        <p className="text-[#A1A1AA] font-sans text-[14px]">
          {steps[activeStep].description}
        </p>
      </div>
    </div>
  );
}
