"use client";

import React, { useRef, useState } from "react";

interface CDGlowCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  spotlight?: boolean;
}

export default function CDGlowCard({ children, className = "", style = {}, spotlight = true }: CDGlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`cd-glow-card relative overflow-hidden transition-all duration-300 rounded-[10px] ${className}`}
      style={{
        background: "var(--cd-surface, #080F1C)",
        border: "1px solid var(--cd-border, rgba(77,169,255,0.14))",
        padding: "clamp(20px, 3vw, 32px)",
        ...style,
      }}
    >
      {/* Spotlight Glow Follow */}
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
          style={{
            opacity: mousePos.opacity,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(77, 169, 255, 0.12), transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
