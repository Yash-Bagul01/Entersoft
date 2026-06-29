"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SmartContractVisual() {
  return (
    <div 
      className="w-full max-w-[450px] aspect-[4/3] bg-[var(--bg-elevated)]/40 border border-[var(--border-subtle)] rounded-[4px] p-6 flex flex-col justify-center items-center relative overflow-hidden backdrop-blur-md"
      role="img"
      aria-label="Smart contract call graph showing deposit, withdraw, borrow, and liquidate functions, with reentrancy alert highlighted"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        {/* deposit() connection */}
        <line x1="225" y1="150" x2="80" y2="70" stroke="var(--border-subtle)" strokeWidth="1.5" />
        {/* withdraw() connection - HIGHLIGHTED */}
        <line x1="225" y1="150" x2="80" y2="230" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 2" className="animate-[pulse_1.5s_infinite]" />
        {/* borrow() connection */}
        <line x1="225" y1="150" x2="370" y2="70" stroke="var(--border-subtle)" strokeWidth="1.5" />
        {/* liquidate() connection */}
        <line x1="225" y1="150" x2="370" y2="230" stroke="var(--border-subtle)" strokeWidth="1.5" />

        {/* Dynamic pulse traveling along withdraw line */}
        <motion.circle
          r="4"
          fill="var(--accent)"
          animate={{
            cx: [225, 80],
            cy: [150, 230],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Nodes */}
      {/* 1. deposit() (top-left) */}
      <div className="absolute top-[50px] left-[40px] z-10 px-3 py-1.5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] font-mono text-[9px] font-bold rounded-[2px] tracking-wider">
        deposit()
      </div>

      {/* 2. borrow() (top-right) */}
      <div className="absolute top-[50px] right-[40px] z-10 px-3 py-1.5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] font-mono text-[9px] font-bold rounded-[2px] tracking-wider">
        borrow()
      </div>

      {/* 3. Central: Contract Node */}
      <div className="absolute top-[120px] left-[175px] w-24 h-14 border border-[var(--border-subtle)] bg-[var(--bg-primary)] z-10 flex flex-col justify-center items-center rounded-[2px] shadow-md select-none">
        <span className="font-mono text-[10px] font-bold text-[var(--text-primary)] tracking-wide">DeFiBridge</span>
        <span className="font-sans text-[7px] text-[var(--text-tertiary)] uppercase tracking-widest mt-0.5">Contract</span>
      </div>

      {/* 4. withdraw() (bottom-left) - HIGHLIGHTED */}
      <motion.div 
        animate={{
          boxShadow: ["0 0 10px rgba(0,163,255,0.1)", "0 0 20px rgba(0,163,255,0.35)", "0 0 10px rgba(0,163,255,0.1)"]
        }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-[50px] left-[30px] z-10 px-3.5 py-2 border border-[var(--accent)] bg-[var(--bg-elevated)] flex flex-col items-start gap-1 rounded-[2px] tracking-wider select-none"
      >
        <span className="font-mono text-[9px] font-bold text-[var(--accent)]">withdraw()</span>
        <span className="font-mono text-[7px] font-bold text-red-400 bg-red-950/30 px-1 border border-red-500/20 rounded-[1px] tracking-widest uppercase">
          [REENTRANCY]
        </span>
      </motion.div>

      {/* 5. liquidate() (bottom-right) */}
      <div className="absolute bottom-[50px] right-[40px] z-10 px-3 py-1.5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] font-mono text-[9px] font-bold rounded-[2px] tracking-wider">
        liquidate()
      </div>
    </div>
  );
}
