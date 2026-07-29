"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, Cpu, Filter, Zap, RefreshCw } from "lucide-react";

interface TelemetryLog {
  id: string;
  source: "AppSec AST" | "CrowdStrike EDR" | "AWS CloudTrail" | "Splunk SIEM" | "CISA KEV Intel";
  rawSignal: string;
  normalizedCategory: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  status: "NORMALIZED" | "DEDUPLICATED" | "ENRICHED";
}

export default function DataFusionStream() {
  const sampleLogs: TelemetryLog[] = [
    {
      id: "LOG-9021",
      source: "AppSec AST",
      rawSignal: "SQLi Vulnerability in /api/v2/auth (CWE-89)",
      normalizedCategory: "Application Vulnerability",
      severity: "CRITICAL",
      status: "ENRICHED"
    },
    {
      id: "LOG-9022",
      source: "CrowdStrike EDR",
      rawSignal: "Unusual powershell execution on ip-10-0-4-12.internal",
      normalizedCategory: "Host Anomaly",
      severity: "HIGH",
      status: "NORMALIZED"
    },
    {
      id: "LOG-9023",
      source: "AWS CloudTrail",
      rawSignal: "IAM Policy update: AttachUserPolicy (AdministratorAccess)",
      normalizedCategory: "Identity Privilege Escalation",
      severity: "CRITICAL",
      status: "ENRICHED"
    },
    {
      id: "LOG-9024",
      source: "CISA KEV Intel",
      rawSignal: "CVE-2024-21626 active exploit in wild for runc container escape",
      normalizedCategory: "Threat Intelligence Feed",
      severity: "HIGH",
      status: "DEDUPLICATED"
    }
  ];

  const [logs, setLogs] = useState<TelemetryLog[]>(sampleLogs);
  const [filterSource, setFilterSource] = useState<string>("ALL");

  const filteredLogs = filterSource === "ALL" 
    ? logs 
    : logs.filter(l => l.source === filterSource);

  return (
    <div className="w-full bg-[#060606] border border-[#08428C]/40 rounded-[12px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-[#08428C]" />
          <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#08428C]">
            LIVE SIGNAL FUSION TERMINAL
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#08428C] bg-[#08428C]/10 border border-[#08428C]/30 px-3 py-1 rounded-full">
            78% NOISE REDUCTION ACTIVE
          </span>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 font-mono text-[10px]">
        <span className="text-white/40 uppercase tracking-wider mr-2">Filter Stream Source:</span>
        {["ALL", "AppSec AST", "CrowdStrike EDR", "AWS CloudTrail", "CISA KEV Intel"].map((source) => (
          <button
            key={source}
            onClick={() => setFilterSource(source)}
            className={`px-3 py-1.5 rounded transition-colors ${
              filterSource === source
                ? "bg-[#08428C] text-white font-bold"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {source}
          </button>
        ))}
      </div>

      {/* Terminal Telemetry Feed Container */}
      <div className="bg-[#070b14] border border-white/10 rounded-[8px] p-4 h-[320px] overflow-y-auto font-mono text-[11px] flex flex-col gap-3">
        <AnimatePresence>
          {filteredLogs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="bg-[#0a0f1d] border border-[#08428C]/30 hover:border-[#08428C] p-3.5 rounded flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-start gap-3">
                <ShieldAlert className={`w-4 h-4 shrink-0 mt-0.5 ${log.severity === "CRITICAL" ? "text-red-400" : "text-[#08428C]"}`} />
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{log.id}</span>
                    <span className="text-white/40">•</span>
                    <span className="text-[#08428C]">{log.source}</span>
                  </div>
                  <span className="text-white/80">{log.rawSignal}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] text-white/50 bg-white/5 px-2 py-1 rounded">
                  {log.normalizedCategory}
                </span>
                <span className="text-[10px] font-bold text-[#08428C] border border-[#08428C]/50 px-2 py-1 rounded bg-[#08428C]/10">
                  {log.status}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
