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
  const [fwText, setFwText] = React.useState("ISO 27001");

  React.useEffect(() => {
    if (heroLayoutType !== "compliance") return;
    const list = ["ISO 27001", "SOC 2 TYPE II", "GDPR CONTROLS", "PCI-DSS 4.0", "HIPAA RULES"];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % list.length;
      setFwText(list[idx]);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroLayoutType]);

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
    <section className="relative w-full min-h-[70vh] min-h-[70dvh] md:min-h-[80vh] md:min-h-[80dvh] flex flex-col justify-center items-center px-6 md:px-12 bg-[var(--bg-primary)] overflow-hidden border-b border-[var(--border-subtle)] py-16 md:py-24">
      {/* Background drifting element for Cloud */}
      {heroLayoutType === "cloud" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.015)_0%,transparent_70%)] pointer-events-none animate-pulse duration-[8000ms]" />
      )}

      {/* Compliance background typographic element with floating drift and cross-fade */}
      {heroLayoutType === "compliance" && (
        <div className="absolute inset-0 z-0 select-none pointer-events-none flex justify-center items-center overflow-hidden w-full h-full">
          <motion.div
            key={fwText}
            initial={{ opacity: 0, scale: 0.96, rotate: -0.5 }}
            animate={{ 
              opacity: 0.1, 
              scale: 1, 
              rotate: 0,
              y: [0, -12, 8, 0],
              x: [0, 8, -8, 0],
            }}
            exit={{ opacity: 0, scale: 1.04, rotate: 0.5 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 1.5, ease: "easeInOut" },
              y: { duration: 24, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            }}
            className="font-mono text-[65px] sm:text-[90px] md:text-[180px] font-bold text-[var(--text-primary)] text-center leading-none"
          >
            {fwText}
          </motion.div>
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
              {heroLayoutType === "compliance" ? (
                title.split("\n").map((line, idx) => (
                  <span key={idx} className="block overflow-hidden pb-[0.05em]">
                    <motion.span
                      variants={{
                        hidden: { opacity: 0, y: 15, scale: 1.02 },
                        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="block"
                    >
                      {line}
                    </motion.span>
                  </span>
                ))
              ) : (
                title.split("\n").map((line, idx) => (
                  <span key={idx} className="block overflow-hidden pb-[0.05em]">
                    <motion.span variants={textRevealVariants} className="block">
                      {line}
                    </motion.span>
                  </span>
                ))
              )}
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
        
        {heroLayoutType === "compliance" && (
          <div className="w-full border-t border-[var(--border-subtle)] mt-16 pt-8 flex flex-wrap justify-between items-center gap-x-8 gap-y-4 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--text-secondary)] select-none relative z-20">
            <div className="flex items-center gap-2">
              <span>600+ AUDITS COMPLETED</span>
            </div>
            <span className="hidden md:inline text-zinc-800">|</span>
            <div className="flex items-center gap-2">
              <span>13 YEARS SECURITY OPERATIONS</span>
            </div>
            <span className="hidden md:inline text-zinc-800">|</span>
            <div className="flex items-center gap-2">
              <span>0 BREACHES RECORDED</span>
            </div>
            <span className="hidden md:inline text-zinc-800">|</span>
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent)]">100% REGISTRAR PASS RATE</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
