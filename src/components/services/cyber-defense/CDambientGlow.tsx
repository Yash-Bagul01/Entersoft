"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CDambientGlow() {
  const isReduced = useReducedMotion();

  if (isReduced) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "20%",
            width: "90vw",
            height: "90vh",
            background: "radial-gradient(ellipse, rgba(77,169,255,0.14) 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "-5%",
            width: "55vw",
            height: "65vh",
            background: "radial-gradient(ellipse, rgba(56,189,248,0.12) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* PRIMARY: blue glow — top center, large, dominant */}
      <motion.div
        style={{
          position: "absolute",
          top: "-15%",
          left: "20%",
          width: "90vw",
          height: "90vh",
          background: "radial-gradient(ellipse, rgba(77,169,255,0.14) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
        animate={{ x: [0, 50, -30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      />

      {/* SECONDARY: neon glow — bottom right, smaller, subordinate */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-5%",
          width: "55vw",
          height: "65vh",
          background: "radial-gradient(ellipse, rgba(56,189,248,0.12) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
        animate={{ x: [0, -40, 15, 0], y: [0, -25, 35, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* TERTIARY: blue glow — left mid */}
      <motion.div
        style={{
          position: "absolute",
          top: "45%",
          left: "-10%",
          width: "45vw",
          height: "55vh",
          background: "radial-gradient(ellipse, rgba(77,169,255,0.08) 0%, transparent 55%)",
          filter: "blur(80px)",
        }}
        animate={{ x: [0, 25, -10, 0], y: [0, -35, 20, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
