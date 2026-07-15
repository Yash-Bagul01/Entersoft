"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import { servicePagesData } from "@/data/services";



function AuditPipelineFlow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const stages = ["COMPILE", "MUTATE", "VERIFY", "RELEASE"];

  return (
    <div className="w-full max-w-[500px] flex items-center justify-between font-mono text-[9px] tracking-[0.25em] font-bold text-[#6e6e6e] mt-10 select-none relative z-10 px-4">
      {stages.map((stage, idx) => {
        const isActive = idx === activeStep;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <div className="flex-1 h-[1px] bg-[#565656]/20 mx-3 relative min-w-[20px]">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: activeStep >= idx ? "100%" : "0%" 
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-0 bottom-0 left-0 bg-[#e5ff5d]/60 shadow-[0_0_6px_#e5ff5d]"
                />
              </div>
            )}
            <div className="flex items-center gap-1.5 transition-colors duration-500 shrink-0">
              {isActive && (
                <motion.span 
                  layoutId="activeDot"
                  className="w-1.5 h-1.5 rounded-full bg-[#e5ff5d] shadow-[0_0_8px_#e5ff5d]"
                  transition={{ type: "spring", stiffness: 220, damping: 25 }}
                />
              )}
              <span className={isActive ? "text-[#e5ff5d]" : "text-[#6e6e6e]"}>
                {stage}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function SmartContractHero() {
  const data = servicePagesData["smart-contract-audits"];

  return (
    <section className="relative w-full min-h-[95vh] bg-[#111111] text-[#f9f9f9] flex flex-col justify-center items-center overflow-hidden border-b border-[#565656]/30 px-6 md:px-12 pt-28">
      {/* Viewport Server Room Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-[#2b2b2b]" />
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-[#2b2b2b]" />
      </div>

      <div className="max-w-[850px] w-full mx-auto flex flex-col items-center justify-center text-center z-10 py-12 relative">
        <div className="w-full h-40 pointer-events-none mb-6 relative" />
        
        <SectionLabel color="secondary">DEFI & BLOCKCHAIN AUDITS</SectionLabel>

        {/* Humanist display headline */}
        <h1 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[4.6rem] uppercase tracking-tight leading-[0.95] text-[#f9f9f9] mt-6 max-w-[800px] select-text">
          Mathematical<br/>
          <span className="text-[#e5ff5d] font-serif lowercase italic font-normal">code</span> verification.
        </h1>

        <p className="font-sans text-sm sm:text-base text-[#9c9c9c] leading-relaxed max-w-[550px] mt-6 select-text">
          {data.overview}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
          <button 
            onClick={() => {
              const el = document.getElementById("fuzzing-simulator-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-pointer bg-[#e5ff5d] text-[#111111] border border-[#e5ff5d] font-mono text-[10px] font-bold uppercase tracking-wider rounded-[4px] px-6 py-3 hover:bg-transparent hover:text-[#e5ff5d] transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(229,255,93,0.15)]"
          >
            <span>Run Simulator</span>
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById("faq-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-pointer bg-transparent text-[#f9f9f9] border border-[#565656] font-mono text-[10px] font-bold uppercase tracking-wider rounded-[4px] px-6 py-3 hover:border-[#f9f9f9] hover:bg-white/5 transition-all"
          >
            <span>Documentation</span>
          </button>
        </div>

        {/* Scanner HUD */}
        <div className="w-full flex justify-center">
          <AuditPipelineFlow />
        </div>
      </div>

      <div className="h-6 w-full" />
    </section>
  );
}
