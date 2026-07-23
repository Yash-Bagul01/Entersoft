"use client";

import React, { useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlowCard({ children, className = "", onClick }: GlowCardProps) {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`glow-card relative rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer ${className}`}
      style={{
        backgroundColor: "var(--zk-surface, #0B0E1A)",
        borderColor: isHovered
          ? "var(--zk-border-glow, rgba(204, 255, 51, 0.45))"
          : "var(--zk-border, rgba(204, 255, 51, 0.12))",
        boxShadow: isHovered
          ? "0 0 32px rgba(204, 255, 51, 0.12), inset 0 0 20px rgba(204, 255, 51, 0.04)"
          : "none",
      }}
    >
      {/* Corner crosshairs */}
      <span className="absolute top-2 left-2 text-white/20 font-mono text-[9px] pointer-events-none">+</span>
      <span className="absolute top-2 right-2 text-white/20 font-mono text-[9px] pointer-events-none">+</span>

      {/* Cursor spotlight */}
      <div
        className="card-spotlight absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${coords.x}% ${coords.y}%, rgba(204,255,51,0.07) 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
