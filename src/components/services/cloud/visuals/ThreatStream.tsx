"use client";

import React, { useState } from "react";

interface LogEntry {
  timestamp: string;
  severity: "CRITICAL" | "HIGH" | "INFO";
  description: string;
}

export default function ThreatStream() {
  const [isPaused, setIsPaused] = useState(false);

  const logs: LogEntry[] = [
    { timestamp: "2m ago", severity: "CRITICAL", description: "S3 bucket made public — prod-customer-data" },
    { timestamp: "4m ago", severity: "HIGH", description: "Root account login — unusual geolocation" },
    { timestamp: "7m ago", severity: "HIGH", description: "Security group 0.0.0.0/0 added — port 22" },
    { timestamp: "11m ago", severity: "INFO", description: "CloudTrail logging disabled — us-east-1" },
    { timestamp: "18m ago", severity: "CRITICAL", description: "IAM key exposed in GitHub commit" },
    { timestamp: "23m ago", severity: "HIGH", description: "RDS snapshot shared publicly" },
    { timestamp: "31m ago", severity: "INFO", description: "New admin role created without MFA" },
  ];

  // Duplicate logs for seamless marquee looping
  const doubledLogs = [...logs, ...logs, ...logs];

  return (
    <div 
      className="w-full max-w-[550px] aspect-[4/3] mx-auto select-none bg-[#050505] border border-zinc-900/60 rounded p-4 flex flex-col justify-between font-mono shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex justify-between items-center border-b border-zinc-900 pb-2 mb-3 text-[9px] text-zinc-600">
        <span>RUNTIME AUDIT LOG STREAM</span>
        <span className="flex items-center gap-1.5 text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          LIVE FEED
        </span>
      </div>

      <div className="flex-1 bg-black/40 border border-zinc-950 rounded p-3 relative overflow-hidden select-text">
        {/* Scrolling logs wrapper */}
        <div 
          className="flex flex-col gap-3 absolute w-full left-0 px-3 cursor-pointer"
          style={{
            animation: `threatScroll 14s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
            willChange: "transform",
          }}
        >
          {doubledLogs.map((log, index) => {
            const isCritical = log.severity === "CRITICAL";
            const isHigh = log.severity === "HIGH";

            let sevColor = "text-zinc-500";
            let descColor = "text-zinc-400";
            let rowBg = "bg-transparent";
            let borderStroke = "border-transparent";

            if (isCritical) {
              sevColor = "text-cyan-400 font-bold";
              descColor = "text-zinc-200 font-medium";
              rowBg = "bg-cyan-950/5";
              borderStroke = "border-cyan-500/10";
            } else if (isHigh) {
              sevColor = "text-zinc-300 font-bold";
              descColor = "text-zinc-300";
            }

            return (
              <div 
                key={index} 
                className={`flex gap-4 p-2.5 border rounded-[2px] transition-colors ${rowBg} ${borderStroke} text-[10.5px] items-center`}
              >
                <span className="text-zinc-600 select-none min-w-[45px]">{log.timestamp}</span>
                <span className={`min-w-[65px] tracking-wider text-center border border-zinc-900 rounded-[2px] px-1 py-0.5 text-[8.5px] ${sevColor}`}>
                  {log.severity}
                </span>
                <span className={`flex-1 truncate tracking-wide ${descColor}`}>{log.description}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center text-[8px] text-zinc-600 select-none">
        <span>SCROLL RATIO: 28 PX/SEC</span>
        <span>HOVER TO PAUSE STREAM</span>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes threatScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.33%);
          }
        }
      `}} />
    </div>
  );
}
