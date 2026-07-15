"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";
import { Coins, Image as ImageIcon, Cpu, Play, ShieldAlert, ShieldCheck } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

interface ProtocolCard {
  id: string;
  name: string;
  sub: string;
  icon: React.ReactNode;
  overview: string;
  exploitName: string;
  checks: string[];
}

const protocols: ProtocolCard[] = [
  {
    id: "erc20",
    name: "ERC-20 & Custom Tokens",
    sub: "TRANSACTION STANDARDS",
    icon: <Coins className="w-4 h-4 text-[#e5ff5d]" />,
    overview: "Transactional token contracts govern exchange logic. We audit customizable supply mechanics, burns, transfer restrictions, and balance validation pathways.",
    exploitName: "Arbitrary transfer injection call",
    checks: [
      "Address validation constraints on transfers",
      "Overflow boundaries verification (Solidity 0.8+ checks)",
      "Approval race condition check mechanisms",
      "Designated minting caps and supply validations"
    ]
  },
  {
    id: "erc721",
    name: "ERC-721 & ERC-1155 NFTs",
    sub: "COLLECTIBLE INTERFACES",
    icon: <ImageIcon className="w-4 h-4 text-[#e5ff5d]" />,
    overview: "Collectible logic requires strict state consistency during ownership transfer operations. We audit transfer loops, URI access structures, and callback reentrancy boundaries.",
    exploitName: "Receiver callback recursive withdrawal",
    checks: [
      "Callback reentrancy loop checkpoints",
      "Administrative authorization constraints on metadata",
      "Gas limits verification in batch mint operations",
      "Lazy minting signature validation checks"
    ]
  },
  {
    id: "erc4626",
    name: "ERC-4626 Yield Vaults",
    sub: "DEFI LIQUIDITY STANDARDS",
    icon: <Cpu className="w-4 h-4 text-[#e5ff5d]" />,
    overview: "Tokenized vaults form the building blocks of yield systems. We verify calculation steps, share pricing ratios, strategy parameters, and deposit limits.",
    exploitName: "Share pricing inflation manipulation",
    checks: [
      "Precision share calculation limits",
      "Slippage boundary checks in asset exchange routes",
      "Price oracle manipulation validation checks",
      "Privileged strategy harvest call boundaries"
    ]
  }
];

export default function ProtocolSpectra() {
  const [selectedProto, setSelectedProto] = useState<ProtocolCard>(protocols[2]); // Default ERC-4626
  const [isPatched, setIsPatched] = useState(false);
  const [simState, setSimState] = useState<"idle" | "attacking" | "hit" | "deflected">("idle");
  const [packets, setPackets] = useState<number[]>([]);

  const handleSimulateAttack = () => {
    if (simState === "attacking") return;
    setSimState("attacking");
    setPackets([1, 2, 3]);
  };

  useEffect(() => {
    if (simState === "attacking") {
      const timer = setTimeout(() => {
        if (isPatched) {
          setSimState("deflected");
        } else {
          setSimState("hit");
        }
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [simState, isPatched]);

  return (
    <section className="relative w-full bg-[#111111] text-[#f9f9f9] px-6 md:px-12 py-24 md:py-32 border-b border-[#565656]/30 overflow-hidden">
      {/* Gridlines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-[#2b2b2b]" />
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-[#2b2b2b]" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start z-10 relative">
        
        {/* Left Column: Selectors & details */}
        <div className="lg:col-span-5 flex flex-col items-start gap-8 text-left w-full">
          <div className="flex flex-col gap-3">
            <SectionLabel color="secondary">04 / PROTOCOL ARCHITECTURE</SectionLabel>
            <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-none text-[#f9f9f9]">
              Audited Standards
            </h2>
            <p className="font-sans text-sm text-[#9c9c9c] leading-relaxed max-w-[450px] mt-2">
              Select standard interfaces below and launch exploit simulations to analyze code vulnerabilities.
            </p>
          </div>

          {/* Standard Tabs selector list */}
          <div className="flex flex-col gap-3 w-full">
            {protocols.map((proto) => {
              const isSelected = selectedProto.id === proto.id;
              return (
                <button
                  key={proto.id}
                  onClick={() => {
                    setSelectedProto(proto);
                    setSimState("idle");
                    setPackets([]);
                  }}
                  className={`w-full p-4 border rounded-[4px] bg-[#2b2b2b]/35 hover:bg-[#2b2b2b]/50 transition-all text-left flex justify-between items-center cursor-pointer focus:outline-none ${
                    isSelected ? "border-[#e5ff5d]" : "border-[#565656]/20"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2 border border-[#565656]/20 bg-[#111111] rounded-[2px]">
                      {proto.icon}
                    </div>
                    <div>
                      <h4 className={`font-display font-medium text-xs tracking-wide leading-none uppercase ${isSelected ? "text-[#e5ff5d]" : "text-[#f9f9f9]"}`}>
                        {proto.name}
                      </h4>
                      <span className="font-mono text-[8px] text-[#6e6e6e] uppercase tracking-widest block mt-1.5">
                        {proto.sub}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Exploit Simulator Sandbox */}
        <div className="lg:col-span-7 w-full flex flex-col items-stretch gap-6">
          
          {/* Exploit Simulator Console */}
          <div className="w-full bg-[#2b2b2b]/40 border border-[#565656]/30 rounded-[4px] p-6 text-left shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            
            {/* Top Bar controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#565656]/20 pb-4 mb-6 gap-3 text-[9px] text-[#9c9c9c] font-mono tracking-widest">
              <span>EXPLOIT SIMULATION SANDBOX</span>
              
              <div className="flex items-center gap-4 select-none">
                {/* Patch Switch */}
                <label className="flex items-center gap-2 cursor-pointer text-[#9c9c9c] hover:text-[#f9f9f9] transition-colors select-none">
                  <input 
                    type="checkbox" 
                    checked={isPatched} 
                    onChange={() => {
                      setIsPatched(!isPatched);
                      setSimState("idle");
                      setPackets([]);
                    }}
                    className="cursor-pointer accent-[#e5ff5d]"
                  />
                  <span>Patches Active</span>
                </label>

                {/* Simulate Attack Trigger Button */}
                <button
                  onClick={handleSimulateAttack}
                  disabled={simState === "attacking"}
                  className={`font-mono text-[9px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-[2px] border transition-all flex items-center gap-1.5 cursor-pointer ${
                    simState === "attacking"
                      ? "bg-[#111111] border-[#565656]/20 text-[#6e6e6e] cursor-not-allowed"
                      : "bg-[#e5ff5d] text-[#111111] border-[#e5ff5d] hover:bg-transparent hover:text-[#e5ff5d]"
                  }`}
                >
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>Test Exploit</span>
                </button>
              </div>
            </div>

            {/* Sandbox Area Grid with DeFi Router Graph */}
            <div className="flex-1 w-full flex items-center justify-between px-6 relative min-h-[180px] border border-[#565656]/20 rounded-[2px] py-6 bg-[#111111]/70 overflow-hidden">
              
              {/* Technical Backdrop Grid & Image */}
              <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <NextImage 
                  src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=500&q=80"
                  alt="Analytical backdrop charts"
                  fill
                  sizes="500px"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(229,255,93,0.01)_1px,transparent_1px)] bg-[size:100%_5px] pointer-events-none z-1" />

              {/* Node 1: Attacker Node */}
              <div className="flex flex-col items-center gap-2 z-10 relative select-none">
                <div className="w-12 h-12 rounded-full border border-dashed border-red-500/40 bg-red-950/10 flex items-center justify-center text-red-400">
                  <ShieldAlert className="w-5 h-5 animate-pulse" />
                </div>
                <span className="font-mono text-[8px] tracking-wider text-red-400 uppercase font-bold">Attacker</span>
              </div>

              {/* Connected DeFi Router Visual (Center) */}
              <div className="flex-1 flex items-center justify-center relative h-full min-w-[120px] mx-2 z-10 select-none">
                {/* Horizontal flow line backdrops */}
                <div className="absolute left-0 w-1/2 h-[1px] bg-gradient-to-r from-red-500/20 to-[#565656]/30" />
                <div className="absolute right-0 w-1/2 h-[1px] bg-gradient-to-l from-[#565656]/30 to-[#e5ff5d]/20" />

                {/* Central Router Node */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
                    className="absolute inset-0 border border-[#565656]/20 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 13, ease: "linear" }}
                    className="absolute inset-1.5 border border-dashed border-[#565656]/10 rounded-full"
                  />

                  {/* Core router box */}
                  <div className={`w-9 h-9 rounded-full border flex items-center justify-center bg-[#111111] text-[7.5px] font-mono transition-all duration-300 ${
                    isPatched ? "border-[#e5ff5d]/40 text-[#e5ff5d]" : "border-[#565656]/20 text-[#6e6e6e]"
                  }`}>
                    ROUTER
                  </div>

                  {/* Patch active shield visual */}
                  <AnimatePresence>
                    {isPatched && (
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.12, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="absolute inset-[-4px] rounded-full border border-[#e5ff5d]/50 bg-[#e5ff5d]/5 shadow-[0_0_15px_rgba(229,255,93,0.12)] z-2"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Simulated threat packets */}
                <AnimatePresence>
                  {simState === "attacking" && packets.map((p, idx) => {
                    const xEnd = isPatched ? "50%" : "100%";
                    return (
                      <motion.div
                        key={p}
                        initial={{ left: "0%", opacity: 0 }}
                        animate={{ left: xEnd, opacity: 1 }}
                        exit={{ opacity: 0, y: isPatched ? -25 : 0 }}
                        transition={{ 
                          duration: isPatched ? 0.65 : 1.3, 
                          delay: idx * 0.18, 
                          ease: "easeIn" 
                        }}
                        className="absolute w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_#f87171] z-20"
                        style={{ top: "calc(50% - 3px)" }}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Node 2: Target Pool Node */}
              <div className="flex flex-col items-center gap-2 z-10 relative select-none">
                <AnimatePresence>
                  {isPatched && (
                    <motion.div 
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1.15, opacity: 1 }}
                      exit={{ scale: 0.85, opacity: 0 }}
                      className="absolute -inset-2.5 rounded-full border border-[#e5ff5d]/20 bg-[#e5ff5d]/5 shadow-[0_0_15px_rgba(229,255,93,0.08)] z-0 pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                <div className={`w-12 h-12 rounded-[2px] border flex items-center justify-center transition-all duration-300 z-10 ${
                  simState === "hit" 
                    ? "border-red-500 bg-red-950/10 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]" 
                    : simState === "deflected" || (isPatched && simState === "idle")
                      ? "border-[#e5ff5d] bg-[#e5ff5d]/5 text-[#e5ff5d] shadow-[0_0_15px_rgba(229,255,93,0.12)]"
                      : "border-[#565656]/20 bg-[#111111] text-[#6e6e6e]"
                }`}>
                  {isPatched ? (
                    <ShieldCheck className="w-5 h-5" />
                  ) : (
                    <Cpu className={`w-5 h-5 ${simState === "hit" ? "animate-[bounce_0.8s_infinite]" : ""}`} />
                  )}
                </div>
                <span className={`font-mono text-[8px] tracking-wider uppercase font-bold ${
                  simState === "hit" ? "text-red-400" :
                  isPatched ? "text-[#e5ff5d]" : "text-[#6e6e6e]"
                }`}>
                  {selectedProto.id.toUpperCase()}_POOL
                </span>
              </div>

            </div>

            {/* Exploit logs/outcome feedback */}
            <div className="mt-6 border-t border-[#565656]/20 pt-4 text-[10px] font-mono min-h-[50px] flex flex-col justify-center select-text">
              <AnimatePresence mode="wait">
                {simState === "idle" ? (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#6e6e6e]"
                  >
                    <span>Target exploit verification: </span>
                    <span className="text-[#9c9c9c]">{selectedProto.exploitName}</span>
                  </motion.div>
                ) : simState === "attacking" ? (
                  <motion.div 
                    key="attacking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#e5ff5d] animate-pulse"
                  >
                    <span>Executing exploit payload sequence...</span>
                  </motion.div>
                ) : simState === "hit" ? (
                  <motion.div 
                    key="hit"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-450 font-bold"
                  >
                    {`Vulnerability confirmed. Exploit bypassed logic checks. ${selectedProto.id.toUpperCase()} balance drained.`}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="deflected"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#e5ff5d] font-bold"
                  >
                    <span>Exploit deflected. Boundary checks and invariants validated.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Checks validation grid summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {selectedProto.checks.map((check, idx) => (
              <div 
                key={idx} 
                className="p-4 border border-[#565656]/20 bg-[#2b2b2b]/35 rounded-[4px] text-left flex gap-3 items-start select-text"
              >
                <span className="font-mono text-[9px] text-[#e5ff5d] font-bold mt-0.5">[Check_0{idx + 1}]</span>
                <p className="font-sans text-[11px] text-[#9c9c9c] leading-relaxed">{check}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
