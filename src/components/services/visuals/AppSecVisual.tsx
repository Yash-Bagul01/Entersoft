"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function AppSecVisual() {
  const [pipelineState, setPipelineState] = useState<"build" | "to-scan" | "scanning" | "to-deploy" | "deployed">("build");
  const [showFinding, setShowFinding] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const runPipeline = () => {
      setPipelineState("build");
      setShowFinding(false);
      
      timer = setTimeout(() => {
        setPipelineState("to-scan");
      }, 1000);
    };

    runPipeline();

    const interval = setInterval(() => {
      runPipeline();
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (pipelineState === "to-scan") {
      const timer = setTimeout(() => {
        setPipelineState("scanning");
        setShowFinding(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (pipelineState === "scanning") {
      const timer = setTimeout(() => {
        setShowFinding(false);
        setPipelineState("to-deploy");
      }, 2500);
      return () => clearTimeout(timer);
    } else if (pipelineState === "to-deploy") {
      const timer = setTimeout(() => {
        setPipelineState("deployed");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [pipelineState]);

  const getDotX = () => {
    switch (pipelineState) {
      case "build": return "15%";
      case "to-scan": return "50%";
      case "scanning": return "50%";
      case "to-deploy": return "85%";
      case "deployed": return "85%";
      default: return "15%";
    }
  };

  return (
    <div 
      className="w-full max-w-[450px] aspect-[4/3] bg-[var(--bg-elevated)]/40 border border-[var(--border-subtle)] rounded-[4px] p-6 md:p-8 flex flex-col justify-center items-center relative overflow-hidden backdrop-blur-md"
      role="img"
      aria-label="AppSec pipeline animated visualization showing Build, Scan, and Deploy steps"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />

      {/* Pipeline Container */}
      <div className="w-full flex items-center justify-between relative mt-4">
        {/* Connecting lane rail */}
        <div className="absolute top-[28px] left-[15%] right-[15%] h-[2px] bg-[var(--border-subtle)] z-0" />

        {/* Animated Traveling Dot */}
        <motion.div
          animate={{ left: getDotX() }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute w-3.5 h-3.5 rounded-full bg-[var(--accent)] z-10 -translate-x-1/2 -translate-y-1/2 top-[28px] shadow-[0_0_15px_var(--accent)]"
        />

        {/* BUILD Node */}
        <div className="flex flex-col items-center gap-2 relative z-10 w-16">
          <div className="w-14 h-14 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-secondary)] font-mono text-xs font-bold transition-all duration-300">
            <Terminal className="w-5 h-5 text-[var(--text-tertiary)]" />
          </div>
          <span className="font-mono text-[9px] font-bold text-[var(--text-secondary)] tracking-wider">BUILD</span>
        </div>

        {/* SCAN Node */}
        <div className="flex flex-col items-center gap-2 relative z-10 w-16">
          <motion.div
            animate={{
              borderColor: pipelineState === "scanning" ? "var(--accent)" : "rgba(255,255,255,0.08)",
              scale: pipelineState === "scanning" ? 1.05 : 1,
              backgroundColor: pipelineState === "scanning" ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "var(--bg-elevated)",
              boxShadow: pipelineState === "scanning" ? "0 0 25px rgba(0,163,255,0.3)" : "none",
            }}
            className="w-14 h-14 rounded-full border bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-secondary)] font-mono text-xs font-bold transition-all duration-300"
          >
            <ShieldAlert className={`w-5 h-5 transition-colors duration-300 ${pipelineState === "scanning" ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"}`} />
          </motion.div>
          <span className="font-mono text-[9px] font-bold text-[var(--text-secondary)] tracking-wider">SCAN</span>
        </div>

        {/* DEPLOY Node */}
        <div className="flex flex-col items-center gap-2 relative z-10 w-16">
          <motion.div
            animate={{
              borderColor: pipelineState === "deployed" ? "var(--accent)" : "rgba(255,255,255,0.08)",
              backgroundColor: pipelineState === "deployed" ? "color-mix(in srgb, var(--accent) 5%, transparent)" : "var(--bg-elevated)",
            }}
            className="w-14 h-14 rounded-full border bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-secondary)] font-mono text-xs font-bold transition-all duration-300"
          >
            <CheckCircle2 className={`w-5 h-5 transition-colors duration-300 ${pipelineState === "deployed" ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"}`} />
          </motion.div>
          <span className="font-mono text-[9px] font-bold text-[var(--text-secondary)] tracking-wider">DEPLOY</span>
        </div>
      </div>

      {/* Finding Pop-up */}
      <div className="h-16 w-full mt-8 flex justify-center items-center">
        <AnimatePresence>
          {showFinding && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              className="bg-red-950/40 border border-red-500/30 px-4 py-2.5 rounded-[3px] flex items-center gap-3 max-w-[280px]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <div className="flex flex-col text-left">
                <span className="font-mono text-[9px] font-bold text-red-400 tracking-wider">ALERT: SQL_INJECTION</span>
                <span className="font-mono text-[8px] text-[var(--text-tertiary)] leading-tight mt-0.5">LINE 42: REMEDIATION SENT</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
