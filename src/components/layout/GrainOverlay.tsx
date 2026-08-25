import React from "react";

// Lightweight, hardware-accelerated noise texture data URI (64x64 seamless noise tile)
const NOISE_BG = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")";

export default function GrainOverlay() {
  return (
    <div
      className="grain-overlay fixed inset-0 z-[9999] pointer-events-none opacity-[0.025] transform-gpu"
      style={{
        backgroundImage: NOISE_BG,
        backgroundRepeat: "repeat",
        transform: "translateZ(0)",
      }}
      aria-hidden="true"
    />
  );
}

