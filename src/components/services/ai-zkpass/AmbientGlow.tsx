"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AmbientGlow() {
  const isReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Top-center blob — primary focal point */}
      <motion.div
        style={{
          position: "absolute",
          top: "-10%",
          left: "30%",
          width: "80vw",
          height: "80vh",
          background: `radial-gradient(ellipse, rgba(204,255,51,0.12) 0%, transparent 65%)`,
          filter: "blur(80px)",
        }}
        animate={
          isReduced
            ? undefined
            : { x: [0, 40, -20, 0], y: [0, 30, -15, 0] }
        }
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      {/* Bottom-right blob — secondary warmth */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "60vw",
          height: "70vh",
          background: `radial-gradient(ellipse, rgba(204,255,51,0.07) 0%, transparent 60%)`,
          filter: "blur(100px)",
        }}
        animate={
          isReduced
            ? undefined
            : { x: [0, -50, 20, 0], y: [0, -20, 40, 0] }
        }
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />

      {/* Left mid — accent */}
      <motion.div
        style={{
          position: "absolute",
          top: "40%",
          left: "-15%",
          width: "50vw",
          height: "60vh",
          background: `radial-gradient(ellipse, rgba(204,255,51,0.05) 0%, transparent 55%)`,
          filter: "blur(90px)",
        }}
        animate={
          isReduced
            ? undefined
            : { x: [0, 30, -10, 0], y: [0, -30, 15, 0] }
        }
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
