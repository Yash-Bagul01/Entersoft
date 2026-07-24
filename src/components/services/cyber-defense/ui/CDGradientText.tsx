"use client";

import React from "react";

interface CDGradientTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function CDGradientText({ children, className = "", style = {} }: CDGradientTextProps) {
  return (
    <span
      className={`inline-block ${className}`}
      style={{
        background: "var(--cd-gradient, linear-gradient(135deg, #FFFFFF 0%, #60A5FA 60%, #3B82F6 100%))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
