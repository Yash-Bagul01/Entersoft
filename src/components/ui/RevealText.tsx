"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export default function RevealText({
  text,
  className,
  tag = "p",
}: RevealTextProps) {
  const Tag = tag as any;
  const shouldReduceMotion = useReducedMotion();

  // Split by sentence (e.g. tracking periods/questions followed by space)
  const lines = text.split(/(?<=\.|\?)\s+/);

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08, // STAGGER.base
      }
    }
  };

  const lineVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.9, // DURATION.slow
        ease: [0.16, 1, 0.3, 1] as const, // EASE.weighted
      }
    }
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="block"
      >
        {lines.map((line, index) => (
          <span key={index} className="block overflow-hidden pb-[0.05em] last:mb-0">
            <motion.span
              variants={lineVariants}
              className="block"
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
