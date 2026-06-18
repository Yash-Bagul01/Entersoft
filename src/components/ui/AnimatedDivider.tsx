"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AnimatedDivider() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className="w-full h-[1px] bg-[var(--border-subtle)]" />;
  }

  return (
    <div className="w-full h-[1px] bg-white/5 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} // EASE.weighted / cubic-bezier(0.16, 1, 0.3, 1)
        className="w-full h-full bg-[var(--border-subtle)] origin-left"
      />
    </div>
  );
}
