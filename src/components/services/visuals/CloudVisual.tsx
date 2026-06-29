"use client";

import React from "react";
import { motion } from "framer-motion";
import { Radio, HardDrive, Database, Server, Key } from "lucide-react";

export default function CloudVisual() {
  return (
    <div 
      className="w-full max-w-[450px] aspect-[4/3] bg-[var(--bg-elevated)]/40 border border-[var(--border-subtle)] rounded-[4px] p-6 flex flex-col justify-between items-center relative overflow-hidden backdrop-blur-md"
      role="img"
      aria-label="Cloud security telemetry connection diagram showing AWS, Azure, and GCP connecting to Entersoft Monitoring"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />

      {/* SVG Connecting Paths Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        {/* Paths from Cloud Providers (Top) to Monitoring Center (Center) */}
        <path d="M 90 60 L 225 150" stroke="var(--border-subtle)" strokeWidth="1.5" fill="none" />
        <path d="M 225 60 L 225 150" stroke="var(--border-subtle)" strokeWidth="1.5" fill="none" />
        <path d="M 360 60 L 225 150" stroke="var(--border-subtle)" strokeWidth="1.5" fill="none" />

        {/* Paths from Monitoring Center (Center) to Resources (Bottom) */}
        <path d="M 225 150 L 60 250" stroke="var(--border-subtle)" strokeWidth="1.5" fill="none" />
        <path d="M 225 150 L 170 250" stroke="var(--border-subtle)" strokeWidth="1.5" fill="none" />
        <path d="M 225 150 L 280 250" stroke="var(--border-subtle)" strokeWidth="1.5" fill="none" />
        <path d="M 225 150 L 390 250" stroke="var(--border-subtle)" strokeWidth="1.5" fill="none" />

        {/* Animated Pulses */}
        <motion.circle
          r="3"
          fill="var(--accent)"
          animate={{
            cx: [90, 225],
            cy: [60, 150]
          }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
        />
        <motion.circle
          r="3"
          fill="var(--accent)"
          animate={{
            cx: [225, 225],
            cy: [60, 150]
          }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "linear", delay: 0.5 }}
        />
        <motion.circle
          r="3"
          fill="var(--accent)"
          animate={{
            cx: [360, 225],
            cy: [60, 150]
          }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "linear", delay: 0.2 }}
        />

        {/* Outbound telemetry lines */}
        <motion.circle
          r="2.5"
          fill="var(--accent)"
          animate={{
            cx: [225, 60],
            cy: [150, 250]
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 0.8 }}
        />
        <motion.circle
          r="2.5"
          fill="var(--accent)"
          animate={{
            cx: [225, 170],
            cy: [150, 250]
          }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "linear", delay: 1.2 }}
        />
        <motion.circle
          r="2.5"
          fill="var(--accent)"
          animate={{
            cx: [225, 280],
            cy: [150, 250]
          }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "linear", delay: 0.4 }}
        />
        <motion.circle
          r="2.5"
          fill="var(--accent)"
          animate={{
            cx: [225, 390],
            cy: [150, 250]
          }}
          transition={{ repeat: Infinity, duration: 3.4, ease: "linear", delay: 1.5 }}
        />
      </svg>

      {/* Layer 1: Cloud Providers (Top) */}
      <div className="w-full flex justify-around items-center relative z-10">
        {["AWS", "AZURE", "GCP"].map((prov) => (
          <div
            key={prov}
            className="px-3 py-1.5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] font-mono text-[9px] font-bold tracking-widest rounded-[2px]"
          >
            {prov}
          </div>
        ))}
      </div>

      {/* Center Layer: Entersoft Monitoring Layer */}
      <div className="flex flex-col items-center gap-1.5 relative z-10">
        <motion.div 
          animate={{
            boxShadow: ["0 0 10px rgba(0,163,255,0.2)", "0 0 25px rgba(0,163,255,0.4)", "0 0 10px rgba(0,163,255,0.2)"]
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-14 h-14 rounded-full border border-[var(--accent)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--accent)]"
        >
          <Radio className="w-5 h-5 text-[var(--accent)] animate-pulse" />
        </motion.div>
        <span className="font-mono text-[9px] font-bold text-[var(--text-primary)] tracking-wider">ENTERSOFT CSPM</span>
      </div>

      {/* Layer 3: Resources (Bottom) */}
      <div className="w-full flex justify-between items-center gap-2 relative z-10 px-2">
        {[
          { name: "APP", icon: <Server className="w-3.5 h-3.5" /> },
          { name: "DB", icon: <Database className="w-3.5 h-3.5" /> },
          { name: "STORE", icon: <HardDrive className="w-3.5 h-3.5" /> },
          { name: "IAM", icon: <Key className="w-3.5 h-3.5" /> }
        ].map((item) => (
          <div
            key={item.name}
            className="flex-1 flex flex-col items-center gap-1 p-2 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-[2px] min-w-[55px]"
          >
            <span className="text-[var(--text-tertiary)]">{item.icon}</span>
            <span className="font-mono text-[8px] font-bold text-[var(--text-secondary)] tracking-wider">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
