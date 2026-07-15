"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, ShieldCheck, AlertTriangle } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

type VulnKey = "none" | "unprotected-owner" | "reentrancy";

interface CodeAnnotatorProps {
  isPatched: boolean;
  setIsPatched: (v: boolean) => void;
  activeVuln: VulnKey;
  setActiveVuln: (v: VulnKey) => void;
}

export default function CodeAnnotator({ isPatched, setIsPatched, activeVuln, setActiveVuln }: CodeAnnotatorProps) {
  const [activeTab, setActiveTab] = useState<"owner" | "reentrancy" | "none">("none");
  const [isPatchedLocal, setIsPatchedLocal] = useState(false);

  const tabDetails = {
    owner: {
      title: "Unprotected ownership claim",
      severity: "CRITICAL ALERT",
      cve: "SWC-105 // UNPROTECTED WRITE",
      desc: "Administrative transfer function lacks onlyOwner access verification. Any external address can successfully overwrite ownership storage and call privileged administration functions.",
      remedy: "Map setOwner access check explicitly to Ownable validations.",
      patchDesc: "Administrative transfer logic hardened with onlyOwner assertions. Access restricted to the designated administrator account.",
      proof: "Access validator check pass. Gas overhead checked."
    },
    reentrancy: {
      title: "External recursive withdrawal",
      severity: "HIGH THREAT",
      cve: "SWC-107 // REENTRANCY VECTOR",
      desc: "Vault transfer executions take place prior to internal mapping updates. Attacker callback routines can recursively claim assets before the balance update line executes.",
      remedy: "Enforce state update boundaries before triggering transfer callbacks.",
      patchDesc: "Re-ordered state updates to deduct vault balance prior to executing transfer instructions.",
      proof: "Recursion guard pass. Check-effects state order secured."
    }
  };

  return (
    <section className="relative w-full bg-[#111111] text-[#f9f9f9] px-6 md:px-12 py-24 md:py-32 border-b border-[#565656]/30 overflow-hidden">
      {/* Editorial gridlines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-[#2b2b2b]" />
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-[#2b2b2b]" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-12 z-10 relative">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
          <div className="flex flex-col gap-3">
            <SectionLabel color="secondary">03 / CODE INVESTIGATION</SectionLabel>
            <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-none text-[#f9f9f9]">
              Vulnerability Debugger
            </h2>
          </div>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
          
          {/* Left panel: Immersive code investigation graphic with right fade */}
          <div className="lg:col-span-7 relative rounded-[4px] border border-[#565656]/20 overflow-hidden min-h-[380px] flex items-stretch select-none">
            {/* Background Image */}
            <Image 
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1000&q=80" 
              alt="High-speed code security investigation graph"
              fill
              sizes="(max-w-lg) 100vw, 700px"
              className="object-cover opacity-35"
            />
            {/* The Horizontal Fade Gradient connecting to the right side */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#111111]/30 to-[#111111] z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(229,255,93,0.015)_1px,transparent_1px)] bg-[size:100%_5px] pointer-events-none z-10" />
            
            {/* Elegant telemetry overlay */}
            <div className="absolute left-6 bottom-6 z-20 font-mono text-[9px] text-[#9c9c9c] flex flex-col gap-1.5 text-left">
              <span className="text-[#e5ff5d] font-bold tracking-wider">SYSTEM STATE: ACTIVE</span>
              <span>PARSED DEPENDENCY MATRIX: 1,490 NODES</span>
              <span>COMPILER: SOLC 0.8.24</span>
            </div>
          </div>

          {/* Right panel: Tabbed Inspection & Report Pane */}
          <div className="lg:col-span-5 flex flex-col justify-stretch items-stretch w-full z-10">
            <div className="w-full bg-[#2b2b2b]/40 backdrop-blur-md border border-[#565656]/30 rounded-[4px] p-5 font-mono text-left shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between h-full min-h-[380px]">
              
              <div>
                {/* Tabs Header */}
                <div className="flex gap-2 border-b border-[#565656]/15 pb-3 mb-4 select-none overflow-x-auto scrollbar-none">
                  <button 
                    onClick={() => { setActiveTab("owner"); setIsPatchedLocal(false); }}
                    className={`px-3 py-1.5 text-[8.5px] font-bold tracking-wider uppercase border rounded-[2px] transition-all cursor-pointer ${
                      activeTab === "owner" 
                        ? "text-[#e5ff5d] border-[#e5ff5d]/30 bg-[#e5ff5d]/5" 
                        : "text-[#6e6e6e] border-transparent hover:text-[#9c9c9c]"
                    }`}
                  >
                    01 // Owner Check
                  </button>
                  <button 
                    onClick={() => { setActiveTab("reentrancy"); setIsPatchedLocal(false); }}
                    className={`px-3 py-1.5 text-[8.5px] font-bold tracking-wider uppercase border rounded-[2px] transition-all cursor-pointer ${
                      activeTab === "reentrancy" 
                        ? "text-[#e5ff5d] border-[#e5ff5d]/30 bg-[#e5ff5d]/5" 
                        : "text-[#6e6e6e] border-transparent hover:text-[#9c9c9c]"
                    }`}
                  >
                    02 // Reentrancy
                  </button>
                  <button 
                    onClick={() => { setActiveTab("none"); setIsPatchedLocal(false); }}
                    className={`px-3 py-1.5 text-[8.5px] font-bold tracking-wider uppercase border rounded-[2px] transition-all cursor-pointer ${
                      activeTab === "none" 
                        ? "text-[#f9f9f9] border-[#565656]/30 bg-white/5" 
                        : "text-[#6e6e6e] border-transparent hover:text-[#9c9c9c]"
                    }`}
                  >
                    STANDBY
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "none" ? (
                    // Standby instruction card
                    <motion.div 
                      key="standby"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full flex flex-col justify-between items-stretch min-h-[220px] relative overflow-hidden group select-none"
                    >
                      <div className="flex flex-col items-center justify-center gap-4 py-8">
                        <div className="w-12 h-12 rounded-full border border-dashed border-[#565656] flex items-center justify-center text-[#6e6e6e] group-hover:border-[#e5ff5d] group-hover:text-[#e5ff5d] transition-colors duration-300">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col gap-1 text-center">
                          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#9c9c9c] group-hover:text-[#f9f9f9] transition-colors">
                            Telemetry Ready
                          </h4>
                          <p className="font-sans text-[11px] text-[#6e6e6e] leading-normal max-w-[240px] mx-auto">
                            Select a vulnerability check tab above to investigate code errors and patches.
                          </p>
                        </div>
                      </div>

                      {/* Footer Metrics */}
                      <div className="border-t border-[#565656]/15 pt-3 mt-auto grid grid-cols-3 gap-2 font-mono text-[8px] text-left text-[#6e6e6e] tracking-wider">
                        <div>
                          <span className="block">CODE TARGET:</span>
                          <span className="font-bold text-[#9c9c9c]">Vault.sol</span>
                        </div>
                        <div>
                          <span className="block">CHECKS:</span>
                          <span className="font-bold text-[#9c9c9c]">14 Verified</span>
                        </div>
                        <div>
                          <span className="block">STATUS:</span>
                          <span className="font-bold text-[#e5ff5d] uppercase">READY</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : !isPatchedLocal ? (
                    <motion.div 
                      key={`${activeTab}-vuln`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-4 min-h-[220px]"
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex flex-col">
                          <span className="text-[7.5px] text-[#6e6e6e] font-bold uppercase tracking-wider">THREAT VECTOR</span>
                          <span className="text-[9.5px] text-[#e5ff5d] font-bold mt-0.5">{tabDetails[activeTab].cve}</span>
                        </div>
                        <span className="px-2 py-0.5 text-[8px] font-bold tracking-wider uppercase border border-red-500/25 bg-red-950/10 text-red-400 rounded-[1px]">
                          {tabDetails[activeTab].severity}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                        <h4 className="font-display font-medium text-base text-red-405 uppercase leading-none">
                          {tabDetails[activeTab].title}
                        </h4>
                      </div>

                      <p className="font-sans text-[11px] text-[#9c9c9c] leading-relaxed border-b border-[#565656]/15 pb-4">
                        {tabDetails[activeTab].desc}
                      </p>

                      <div className="flex flex-col gap-1.5 text-left">
                        <span className="text-[8px] font-bold text-[#6e6e6e] tracking-wider uppercase">// REMEDY INSTRUCTION</span>
                        <p className="text-[9.5px] text-[#9c9c9c] leading-relaxed pl-3 border-l border-[#565656]/20">
                          {tabDetails[activeTab].remedy}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key={`${activeTab}-patched`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-4 min-h-[220px]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#e5ff5d]/10 border border-[#e5ff5d]/30 flex items-center justify-center text-[#e5ff5d]">
                          <Check className="w-4 h-4 stroke-[3px]" />
                        </div>
                        <div>
                          <span className="text-[7.5px] text-[#e5ff5d] font-bold uppercase tracking-widest leading-none">VERIFIED SECURE</span>
                          <h4 className="font-display font-medium text-sm text-[#e5ff5d] uppercase mt-0.5">VULNERABILITY PATCHED</h4>
                        </div>
                      </div>

                      <p className="font-sans text-[11px] text-[#9c9c9c] leading-relaxed border-b border-[#565656]/15 pb-4">
                        {tabDetails[activeTab].patchDesc}
                      </p>

                      <div className="flex flex-col gap-1.5 text-left">
                        <span className="text-[8px] font-bold text-[#6e6e6e] tracking-wider uppercase">// VERIFICATION PROOF</span>
                        <p className="text-[9.5px] text-[#9c9c9c] leading-relaxed pl-3 border-l border-[#565656]/20">
                          {tabDetails[activeTab].proof}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Footer: Local patch simulator action */}
              <div className="border-t border-[#565656]/20 pt-4 mt-6 flex justify-between items-center">
                <span className="text-[7.5px] text-[#6e6e6e] tracking-wider">STATUS: {activeTab === "none" ? "STANDBY" : !isPatchedLocal ? "VULNERABLE" : "VERIFIED SECURE"}</span>
                {activeTab !== "none" && (
                  <button
                    onClick={() => setIsPatchedLocal(!isPatchedLocal)}
                    className={`px-3 py-1.5 text-[8.5px] font-bold uppercase tracking-wider rounded-[2px] border transition-all cursor-pointer ${
                      isPatchedLocal
                        ? "bg-[#111111] text-[#9c9c9c] border-[#565656]/40 hover:text-white"
                        : "bg-[#e5ff5d] text-[#111111] border-[#e5ff5d] hover:bg-transparent hover:text-[#e5ff5d]"
                    }`}
                  >
                    {isPatchedLocal ? "Rollback Exploit" : "Apply Patch"}
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
