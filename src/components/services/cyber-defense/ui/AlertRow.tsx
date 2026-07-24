"use client";

import React from "react";

export interface AlertData {
  time: string;
  severity: "CRITICAL" | "HIGH" | "MED" | string;
  event: string;
  status: "TRIAGING" | "INVESTIGATING" | "CONTAINED" | "BLOCKED" | "ESCALATED" | "REMEDIATED" | string;
}

interface AlertRowProps {
  data: AlertData;
}

export default function AlertRow({ data }: AlertRowProps) {
  const isCritical = data.severity === "CRITICAL";
  const isEscalated = data.status === "ESCALATED";

  const getSeverityStyle = () => {
    switch (data.severity) {
      case "CRITICAL":
        return { color: "#60A5FA", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(96,165,250,0.3)" };
      case "HIGH":
        return { color: "#FFFFFF", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)" };
      default:
        return { color: "#94A3B8", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };
    }
  };

  const getStatusColor = () => {
    switch (data.status) {
      case "TRIAGING":
      case "INVESTIGATING":
        return "#94A3B8";
      case "CONTAINED":
      case "BLOCKED":
        return "#60A5FA";
      case "ESCALATED":
        return "rgba(255,100,100,0.9)";
      default:
        return "#64748B";
    }
  };

  return (
    <div
      className="flex items-center justify-between gap-4 px-4 py-3 border-b border-[var(--cd-border)] transition-colors hover:bg-white/[0.02] text-xs sm:text-sm select-none"
      style={{
        borderLeft: isCritical ? "3px solid #3B82F6" : isEscalated ? "3px solid rgba(255,100,100,0.8)" : "3px solid transparent",
      }}
    >
      {/* Left: Time & Severity & Event */}
      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden min-w-0">
        <span className="font-mono text-[11px] sm:text-xs text-[#64748B] shrink-0">
          {data.time}
        </span>
        <span
          className="font-mono text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded tracking-wider shrink-0"
          style={getSeverityStyle()}
        >
          {data.severity}
        </span>
        <span className="font-sans text-[#FFFFFF] truncate text-xs sm:text-sm">
          {data.event}
        </span>
      </div>

      {/* Right: Status Tag */}
      <span
        className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider shrink-0"
        style={{ color: getStatusColor() }}
      >
        {data.status}
      </span>
    </div>
  );
}
