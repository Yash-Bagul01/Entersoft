"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, AlertTriangle } from "lucide-react";

export default function AIASTVisual() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <div 
      className="w-full max-w-[450px] aspect-[4/3] bg-[var(--bg-elevated)]/40 border border-[var(--border-subtle)] rounded-[4px] p-5 flex flex-col justify-center items-center relative overflow-hidden backdrop-blur-md"
      role="img"
      aria-label="AI AST visual showing candidates filtering down to validated findings"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />

      <div className="w-full flex flex-col gap-4 relative z-10">
        <span className="font-mono text-[9px] font-bold text-[var(--text-tertiary)] tracking-widest uppercase block text-center mb-1 select-none">
          AI Triage Filtering
        </span>

        <div className="grid grid-cols-[1fr_30px_1fr] gap-2 items-center w-full">
          {/* Left Panel: Raw Candidates */}
          <div className="flex flex-col gap-3 p-3 border border-red-500/20 bg-red-950/5 rounded-[2px]">
            <span className="font-mono text-[8px] font-bold text-red-400 tracking-wider">RAW CANDIDATES</span>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-1.5"
            >
              {[
                "AST-910: SQL injection suspect",
                "AST-911: XSS payload in /user",
                "AST-912: RAG prompt escape candidate",
                "AST-913: Insecure direct object ref",
                "AST-914: Missing headers (Info)",
              ].map((text, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex items-center gap-1.5 font-mono text-[8px] text-red-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span className="truncate">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Centered Arrow */}
          <div className="flex flex-col items-center justify-center text-[var(--accent)]">
            <motion.div
              animate={{ x: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" as const }}
            >
              <ArrowRight className="w-5 h-5 text-[var(--accent)]" />
            </motion.div>
          </div>

          {/* Right Panel: Validated Findings */}
          <div className="flex flex-col gap-3 p-3 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-[2px]">
            <span className="font-mono text-[8px] font-bold text-[var(--text-primary)] tracking-wider">VALIDATED FINDINGS</span>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-1.5"
            >
              {[
                "AST-910: Confirmed SQLi (High)",
                "AST-912: Confirmed RAG Injection",
                "Filtered: False Positive",
                "Filtered: Log noise",
                "Filtered: Low severity config",
              ].map((text, idx) => {
                const isConfirmed = text.includes("Confirmed");
                return (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants} 
                    className={`flex items-center gap-1.5 font-mono text-[8px] ${
                      isConfirmed ? "text-[var(--accent)] font-bold" : "text-[var(--text-tertiary)] line-through opacity-50"
                    }`}
                  >
                    {isConfirmed ? (
                      <ShieldCheck className="w-2.5 h-2.5 text-[var(--accent)] shrink-0" />
                    ) : (
                      <AlertTriangle className="w-2.5 h-2.5 text-[var(--text-tertiary)] shrink-0" />
                    )}
                    <span className="truncate">{text}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Counter Summary */}
        <div className="w-full flex justify-between items-center bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-4 py-2.5 rounded-[2px] font-mono text-[10px] font-bold text-[var(--text-secondary)]">
          <div className="flex flex-col items-start leading-none">
            <span className="text-[11px] text-red-400">847</span>
            <span className="text-[7px] text-[var(--text-tertiary)] uppercase tracking-wider mt-1">Raw Candidates</span>
          </div>
          <span className="text-[var(--text-tertiary)] font-normal">→</span>
          <div className="flex flex-col items-end leading-none">
            <span className="text-[11px] text-[var(--accent)]">12</span>
            <span className="text-[7px] text-[var(--text-tertiary)] uppercase tracking-wider mt-1">Validated Issues</span>
          </div>
        </div>
        
        <span className="font-mono text-[8px] text-[var(--text-tertiary)] text-center select-none block">
          Illustrative metrics showing noise filtering.
        </span>
      </div>
    </div>
  );
}
