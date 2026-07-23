"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
}

export default function WordReveal({
  text,
  className = "",
  delay = 0,
  wordDelay = 0.06,
}: WordRevealProps) {
  const isReduced = useReducedMotion();
  const words = text.split(" ");

  if (isReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.28em" }}
          initial={{ opacity: 0, y: 12, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            delay: delay + i * wordDelay,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
