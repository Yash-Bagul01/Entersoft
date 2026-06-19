"use client";

import React from "react";
import { certifications } from "@/data/certifications";
import SectionLabel from "../ui/SectionLabel";
import { ShieldAlert, Award, FileCheck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CertificationsMarquee() {
  // Map icons to certifications with custom cybersecurity neon colors
  const getIcon = (id: string) => {
    switch (id) {
      case "cert-in":
        return <ShieldAlert className="w-6 h-6 text-[#FF5C00] drop-shadow-[0_0_8px_rgba(255,92,0,0.3)]" />;
      case "crest":
        return <Award className="w-6 h-6 text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]" />;
      case "iso27001":
        return <FileCheck className="w-6 h-6 text-[#00FF85] drop-shadow-[0_0_8px_rgba(0,255,133,0.3)]" />;
      case "gdpr":
        return <CheckCircle className="w-6 h-6 text-[#BD00FF] drop-shadow-[0_0_8px_rgba(189,0,255,0.3)]" />;
      default:
        return <Award className="w-6 h-6 text-[var(--accent)]" />;
    }
  };

  const styleMap: Record<string, { borderClass: string; glowClass: string; spotlightColor: string }> = {
    "cert-in": {
      borderClass: "hover:border-[#FF5C00]/30",
      glowClass: "hover:shadow-[0_0_25px_rgba(255,92,0,0.15)]",
      spotlightColor: "rgba(255, 92, 0, 0.08)"
    },
    "crest": {
      borderClass: "hover:border-[#00F0FF]/30",
      glowClass: "hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]",
      spotlightColor: "rgba(0, 240, 255, 0.08)"
    },
    "iso27001": {
      borderClass: "hover:border-[#00FF85]/30",
      glowClass: "hover:shadow-[0_0_25px_rgba(0,255,133,0.15)]",
      spotlightColor: "rgba(0, 255, 133, 0.08)"
    },
    "gdpr": {
      borderClass: "hover:border-[#BD00FF]/30",
      glowClass: "hover:shadow-[0_0_25px_rgba(189,0,255,0.15)]",
      spotlightColor: "rgba(189, 0, 255, 0.08)"
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    currentTarget.style.setProperty("--mouse-x", `${clientX - left}px`);
    currentTarget.style.setProperty("--mouse-y", `${clientY - top}px`);
  };

  return (
    <section id="certifications" className="relative w-full bg-[#060606] border-t border-[var(--border-subtle)] py-24 md:py-32 overflow-hidden">
      {/* Background Grid Pattern (stunning subtle neon mesh) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 pointer-events-none" />
      
      {/* Background Ambient Spotlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.015)_0%,transparent_70%)] blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(189,0,255,0.012)_0%,transparent_70%)] blur-[80px] pointer-events-none" />

      {/* Header Block */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4 relative z-10">
        <div>
          <SectionLabel color="secondary">REGULATORY CREDENTIALS</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-[#F6F5F0] uppercase tracking-tight mt-3">
            Accredited Security Compliance
          </h2>
        </div>
        <div className="font-mono text-[11px] text-[var(--text-tertiary)] uppercase tracking-widest pb-1.5">
          // ACCREDITED SEC AUDIT MATRICES
        </div>
      </div>

      {/* Spotlight Cards Grid */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => {
            const styles = styleMap[cert.id] || styleMap["cert-in"];
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, filter: "blur(8px)", y: 25 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                onMouseMove={handleMouseMove}
                className={`relative flex flex-col justify-between h-full p-8 rounded-[8px] bg-[var(--bg-glass)] border border-[var(--border-glass)] shadow-md overflow-hidden group transition-all duration-300 ${styles.borderClass} ${styles.glowClass}`}
                style={{
                  // Define inline CSS variables for default center coordinates and spotlight color
                  ["--spotlight-color" as any]: styles.spotlightColor,
                  ["--mouse-x" as any]: "50%",
                  ["--mouse-y" as any]: "50%"
                }}
              >
                {/* Dynamic Radial Spotlight Follow Layer */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--spotlight-color), transparent 80%)`
                  }}
                />

                <div className="relative z-10 flex flex-col gap-6">
                  {/* Icon Block */}
                  <div className="w-12 h-12 rounded-[6px] bg-[var(--text-primary)]/[0.02] border border-[var(--border-glass)] flex items-center justify-center group-hover:bg-[var(--text-primary)]/[0.04] transition-colors duration-300">
                    {getIcon(cert.id)}
                  </div>

                  {/* Text Header */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-mono text-[13px] font-bold text-[#F6F5F0] uppercase tracking-wider group-hover:text-[var(--accent)] transition-colors duration-300">
                      {cert.name}
                    </h3>
                    <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider leading-relaxed">
                      {cert.authority}
                    </span>
                  </div>
                </div>

                {/* Description details body */}
                <div className="relative z-10 mt-6 pt-6 border-t border-[var(--border-subtle)] text-[12.5px] text-[var(--text-secondary)] leading-relaxed font-sans group-hover:text-[var(--text-primary)] transition-colors duration-300">
                  {cert.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
