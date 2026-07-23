"use client";

import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <span
      className={`inline-block ${className}`}
      style={{
        background: "var(--zk-gradient-text, linear-gradient(90deg, #CCFF33 0%, #F0F4FF 60%))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}
