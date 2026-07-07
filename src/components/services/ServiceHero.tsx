"use client";

import React from "react";
import { motion } from "framer-motion";
import ServiceBreadcrumb from "./ServiceBreadcrumb";
import { Button } from "../ui/Button";
import MagneticButton from "../ui/MagneticButton";

interface ServiceHeroProps {
  category: string;
  title: string;
  tagline: string;
  visual?: React.ReactNode;
  heroLayoutType?: "default" | "vapt" | "cloud" | "compliance" | "siem" | "smart-contract" | "ai-ast";
  statsNode?: React.ReactNode;
  col2Description?: string;
  col3Metadata?: string;
}

export default function ServiceHero({
  category,
  title,
  tagline,
  visual,
  heroLayoutType = "default",
  statsNode,
  col2Description,
  col3Metadata,
}: ServiceHeroProps) {
  const textRevealVariants = {
    hidden: { y: "100%" },
    visible: { y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center items-center px-6 md:px-12 bg-[var(--bg-primary)] overflow-hidden border-b border-[var(--border-subtle)] py-16 md:py-24">
      {/* Background drifting element for Cloud */}
      {heroLayoutType === "cloud" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.015)_0%,transparent_70%)] pointer-events-none animate-pulse duration-[8000ms]" />
      )}

      {/* Compliance background typographic element */}
      {heroLayoutType === "compliance" && (
        <div className="absolute inset-0 z-0 opacity-[0.03] select-none pointer-events-none font-mono text-[90px] md:text-[180px] font-bold flex justify-center items-center overflow-hidden text-[var(--text-primary)]">
          ISO 27001
        </div>
      )}

      {/* Background solidity code block for Smart Contracts */}
      {heroLayoutType === "smart-contract" && (
        <div className="absolute inset-0 z-0 opacity-[0.06] select-none pointer-events-none font-mono text-[11px] overflow-hidden p-8 flex justify-center items-center">
          <pre className="max-w-[1200px] w-full text-left text-[var(--text-primary)]">
            {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DeFiBridge {
    mapping(address => uint256) public balances;
    
    // @audit-issue Reentrancy vulnerability in withdrawal logic
    function withdraw(uint256 amount) public {
        uint256 balance = balances[msg.sender];
        require(balance >= amount, "Insufficient balance");
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        balances[msg.sender] = balance - amount;
    }
}`}
          </pre>
        </div>
      )}

      {/* CRT scan lines for SIEM */}
      {heroLayoutType === "siem" && (
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,1) 50%, rgba(255,255,255,0.1) 50%)",
            backgroundSize: "100% 4px",
          }}
        />
      )}

      <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left Column content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-4 md:gap-6"
          >
            <ServiceBreadcrumb />

            {/* Category Eyebrow */}
            <div className="overflow-hidden flex flex-wrap items-center gap-x-3 gap-y-1 select-none">
              <motion.span
                variants={textRevealVariants}
                className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-[0.25em] uppercase block"
              >
                {category}
              </motion.span>
              {col2Description && (
                <>
                  <span className="text-zinc-700 text-[10px] select-none font-mono font-bold">//</span>
                  <motion.span
                    variants={textRevealVariants}
                    className="font-mono text-[9px] font-bold text-zinc-300 tracking-[0.12em] uppercase block bg-white/5 border border-white/10 px-2 py-0.5 rounded-[2px]"
                  >
                    {col2Description}
                  </motion.span>
                </>
              )}
            </div>

            {/* Display Headline */}
            <h1 className="text-[clamp(1.8rem,4vw,3.2rem)] font-display font-medium leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] uppercase text-left whitespace-pre-line">
              {title.split("\n").map((line, idx) => (
                <span key={idx} className="block overflow-hidden pb-[0.05em]">
                  <motion.span variants={textRevealVariants} className="block">
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Col 3 Metadata Tags */}
            {col3Metadata && (
              <div className="overflow-hidden">
                <motion.div
                  variants={{
                    hidden: { y: 15, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="flex flex-wrap items-center gap-2 mt-1 select-none"
                >
                  {col3Metadata.split("•").map((tagText, idx) => (
                    <span 
                      key={idx} 
                      className="font-mono text-[9px] font-bold text-[var(--accent)] tracking-wider uppercase border border-[var(--accent)]/20 bg-[var(--accent)]/[0.03] px-2.5 py-1 rounded-[2px]"
                    >
                      {tagText.trim()}
                    </span>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Tagline */}
            <div className="overflow-hidden">
              <motion.p
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 0.85, transition: { duration: 0.8, ease: "easeOut" as const } },
                }}
                className="text-[clamp(14px,1.5vw,17px)] font-sans text-[var(--text-secondary)] leading-relaxed max-w-[580px] text-left"
              >
                {tagline}
              </motion.p>
            </div>

            {/* Primary CTA */}
            <motion.div
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
              }}
              className="mt-2 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <Button variant="primary" size="lg" asLink href="/#contact" className="gap-2">
                  GET A FREE CONSULTATION <span className="font-sans">→</span>
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual / Stats */}
          <div className="w-full flex items-center justify-center relative min-h-[250px] md:min-h-[350px]">
            {heroLayoutType === "vapt" && statsNode ? (
              <div className="w-full flex flex-col justify-center items-start lg:pl-12 gap-8">
                {statsNode}
                <div className="w-full h-px bg-[var(--border-subtle)]" />
                {visual}
              </div>
            ) : (
              visual
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
