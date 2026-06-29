"use client";

import React from "react";

const logs = [
  { time: "16:45:21", level: "INFO", desc: "Auth request accepted for developer_session" },
  { time: "16:45:24", level: "CRITICAL", desc: "API key leaked: public GitHub repository push L20" },
  { time: "16:45:32", level: "HIGH", desc: "Brute-force logic: 47 login attempts in 120s" },
  { time: "16:45:40", level: "INFO", desc: "S3 bucket properties synchronized: default state" },
  { time: "16:45:48", level: "CRITICAL", desc: "DDoS gateway alert: rate limit exceeded on /api/v2" },
  { time: "16:45:55", level: "INFO", desc: "IAM session token rotated for automated deployer" },
  { time: "16:46:02", level: "HIGH", desc: "Unauthorized admin access attempt: IP 192.168.1.105" },
];

export default function SIEMVisual() {
  const doubleLogs = [...logs, ...logs];

  return (
    <div 
      className="w-full max-w-[450px] aspect-[4/3] bg-[var(--bg-elevated)]/40 border border-[var(--border-subtle)] rounded-[4px] p-6 flex flex-col justify-center items-center relative overflow-hidden backdrop-blur-md"
      role="img"
      aria-label="SIEM security telemetry event stream widget showing scrolling alerts"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />

      {/* CRT Scanline Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]" 
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,1) 50%, rgba(255,255,255,0.1) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      <div className="flex flex-col gap-4 w-full h-full justify-between relative z-10">
        <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-3 select-none">
          <span className="font-mono text-[9px] font-bold text-[var(--accent)] tracking-widest uppercase">
            LIVE MONITORING TELEMETRY
          </span>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        </div>

        {/* Scroll Container */}
        <div className="flex-1 w-full overflow-hidden relative min-h-[140px] group">
          <div 
            className="absolute left-0 right-0 flex flex-col gap-2.5 animate-[siem-scroll_20s_linear_infinite] group-hover:[animation-play-state:paused]"
            style={{
              transform: "translateY(0)"
            }}
          >
            {doubleLogs.map((log, index) => (
              <div 
                key={index}
                className="grid grid-cols-[60px_70px_1fr] gap-4 font-mono text-[10px] items-center py-1.5 border-b border-[var(--border-subtle)]/40 hover:bg-white/[0.02] px-2 rounded-[2px] transition-colors"
              >
                <span className="text-[var(--text-tertiary)]">{log.time}</span>
                
                <span className={`text-center font-bold px-1.5 py-0.5 rounded-[1px] text-[8px] tracking-wider leading-none ${
                  log.level === "CRITICAL" 
                    ? "bg-red-950/40 text-red-400 border border-red-500/20" 
                    : log.level === "HIGH" 
                      ? "bg-amber-950/40 text-amber-400 border border-amber-500/20" 
                      : "bg-white/[0.03] text-[var(--text-secondary)] border border-white/[0.05]"
                }`}>
                  {log.level}
                </span>

                <span className="text-[var(--text-secondary)] truncate hover:text-[var(--text-primary)] transition-colors">
                  {log.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes siem-scroll {
              0% { transform: translateY(0); }
              100% { transform: translateY(-50%); }
            }
          `
        }} />
      </div>
    </div>
  );
}
