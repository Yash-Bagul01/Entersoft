"use client";

import React from "react";

interface StatChipProps {
  value: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function StatChip({ value, label, className = "", style }: StatChipProps) {
  return (
    <div
      className={`stat-chip inline-flex flex-col gap-0.5 px-3.5 py-2 bg-[rgba(204,255,51,0.06)] border border-[rgba(204,255,51,0.18)] rounded-lg backdrop-blur-md z-20 shadow-[0_0_15px_rgba(204,255,51,0.08)] pointer-events-none select-none ${className}`}
      style={style}
    >
      <span className="stat-value font-serif text-lg font-bold text-[#CCFF33] leading-none">
        {value}
      </span>
      <span className="stat-label font-mono text-[9px] text-white/40 tracking-[0.1em] uppercase leading-none mt-1">
        {label}
      </span>
    </div>
  );
}
