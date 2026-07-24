"use client";

import React from "react";

interface CDStatChipProps {
  value: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function CDStatChip({ value, label, className = "", style = {} }: CDStatChipProps) {
  return (
    <div
      className={`cd-stat-chip ${className}`}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: "2px",
        padding: "8px 14px",
        background: "rgba(15, 23, 42, 0.6)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "8px",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: "1.3rem",
          fontWeight: 700,
          color: "#60A5FA",
          lineHeight: 1.1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "9px",
          color: "#64748B",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}
