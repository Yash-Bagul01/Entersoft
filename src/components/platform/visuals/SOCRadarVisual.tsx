"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Radio, Play, ShieldAlert, CheckCircle2, Clock } from "lucide-react";

export default function SOCRadarVisual() {
  const [selectedScenario, setSelectedScenario] = useState("spray");

  const scenarios = {
    spray: {
      title: "Distributed Credential Spraying",
      detected: "< 45 Seconds",
      mitigation: "Automated IP Rate-Limit & Step-Up MFA Trigger",
      status: "CONTAINED",
      logs: [
        "15:42:01 — Ingress API: 1,200 failed auth requests across 45 IP proxies",
        "15:42:15 — Threat Ops: Correlated anomaly with IAM Auth Service ontology",
        "15:42:30 — Action Dispatch: Applied WAF IP blocklist & enforced step-up OTP"
      ]
    },
    edr: {
      title: "EDR Suspicious Process Execution",
      detected: "< 90 Seconds",
      mitigation: "Isolated EKS Pod & Suspended Damaged IAM Token",
      status: "ISOLATED",
      logs: [
        "15:44:10 — EDR Sensor: Malicious powershell invocation on k8s worker-node-04",
        "15:44:22 — Threat Ops: Linked process handle to compromised container image",
        "15:44:40 — Action Dispatch: Pod evicted, token revoked, incident logged to SOC"
      ]
    }
  };

  const current = scenarios[selectedScenario as keyof typeof scenarios];

  return (
    <div className="w-full bg-[#060606] border border-[#08428C]/40 rounded-[12px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Radio className="w-4 h-4 text-[#08428C] animate-pulse" />
          <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#08428C]">
            24/7 SOC THREAT RADAR TELEMETRY
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="w-2 h-2 rounded-full bg-[#08428C] animate-ping" />
          <span className="text-white/60">ACTIVE MONITORING ONLINE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Radar Visual Area */}
        <div className="lg:col-span-5 relative h-[260px] bg-[#070b14] rounded-[8px] border border-white/10 flex items-center justify-center overflow-hidden">
          {/* Radar Circles */}
          <div className="absolute w-[200px] h-[200px] rounded-full border border-[#08428C]/30" />
          <div className="absolute w-[130px] h-[130px] rounded-full border border-[#08428C]/40" />
          <div className="absolute w-[60px] h-[60px] rounded-full border border-[#08428C]" />

          {/* Sweep Line */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute w-[200px] h-[200px] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(8,66,140,0.4)_360deg)] pointer-events-none"
          />

          {/* Blip Target */}
          <div className="absolute top-1/3 left-1/3 w-3 h-3 rounded-full bg-[#08428C] animate-ping" />
          <span className="font-mono text-[10px] text-white/50 absolute bottom-3 left-4">
            RADAR: 360° STACK MONITORING
          </span>
        </div>

        {/* Scenario Controls & Playbook Output */}
        <div className="lg:col-span-7 flex flex-col gap-4 bg-[#0a0f1d] p-6 rounded-[8px] border border-[#08428C]/30">
          <div className="flex items-center gap-2">
            {["spray", "edr"].map((key) => (
              <button
                key={key}
                onClick={() => setSelectedScenario(key)}
                className={`px-3 py-1.5 rounded font-mono text-[10px] font-bold uppercase transition-colors ${
                  selectedScenario === key ? "bg-[#08428C] text-white" : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {key === "spray" ? "Credential Spray" : "EDR Anomaly"}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <h4 className="text-[18px] font-bold font-display text-white">{current.title}</h4>
            <div className="flex items-center gap-4 font-mono text-[11px] text-white/60">
              <span>Detection Velocity: <strong className="text-[#08428C]">{current.detected}</strong></span>
              <span>Status: <strong className="text-emerald-400">{current.status}</strong></span>
            </div>

            <div className="bg-[#060606] p-4 rounded border border-white/5 font-mono text-[11px] flex flex-col gap-2 mt-2">
              <span className="text-[#08428C] font-bold uppercase text-[9px]">Execution Incident Log:</span>
              {current.logs.map((log, i) => (
                <div key={i} className="text-white/80 flex items-center gap-2">
                  <Clock className="w-3 h-3 text-white/40 shrink-0" />
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
