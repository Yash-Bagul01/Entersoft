"use client";

import React from "react";
import { certifications } from "@/data/certifications";
import SectionLabel from "../ui/SectionLabel";
import { ShieldAlert, Award, FileCheck, CheckCircle } from "lucide-react";

export default function CertificationsMarquee() {
  // Map icons to certifications with custom cybersecurity neon colors
  const getIcon = (id: string) => {
    switch (id) {
      case "cert-in":
        return <ShieldAlert className="w-5 h-5 text-[#FF5C00] drop-shadow-[0_0_8px_rgba(255,92,0,0.3)]" />;
      case "crest":
        return <Award className="w-5 h-5 text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]" />;
      case "iso27001":
        return <FileCheck className="w-5 h-5 text-[#00FF85] drop-shadow-[0_0_8px_rgba(0,255,133,0.3)]" />;
      case "gdpr":
        return <CheckCircle className="w-5 h-5 text-[#BD00FF] drop-shadow-[0_0_8px_rgba(189,0,255,0.3)]" />;
      default:
        return <Award className="w-5 h-5 text-[var(--accent)]" />;
    }
  };

  // Duplicate items array to make the infinite loop seamless
  const duplicatedList = [...certifications, ...certifications, ...certifications];

  return (
    <section id="certifications" className="relative w-full bg-[#060606] border-t border-[var(--border-subtle)] py-20 overflow-hidden">
      {/* Dynamic Background Mesh Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />

      {/* Header Block */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4 relative z-10">
        <div>
          <SectionLabel color="secondary">REGULATORY CREDENTIALS</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-display font-medium text-[#F6F5F0] uppercase tracking-tight mt-2">
            Accredited Security Compliance
          </h2>
        </div>
        <div className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-widest pb-1">
          // ACCREDITED SEC AUDIT MATRICES
        </div>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="w-full flex overflow-hidden relative py-6 border-y border-[var(--border-subtle)] bg-[#0F0F0F]/30 backdrop-blur-sm relative">
        {/* Soft blue track glow overlay */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(0,163,255,0.02)_0%,transparent_80%] pointer-events-none" />
        
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#060606] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#060606] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee animate-marquee-hover-pause whitespace-nowrap min-w-max gap-8 relative z-20">
          {duplicatedList.map((cert, index) => (
            <div
              key={`${cert.id}-${index}`}
              className="inline-flex items-center gap-4 border border-white/[0.04] bg-[#0F0F0F]/60 backdrop-blur-sm rounded-[4px] py-4 px-6 opacity-75 hover:opacity-100 hover:border-white/20 hover:bg-[#0F0F0F]/90 hover:shadow-[0_0_15px_rgba(0,163,255,0.12)] hover:scale-105 transition-all duration-300 group select-none mr-2 cursor-default"
            >
              {/* Badge Icon */}
              <div className="text-[var(--text-secondary)] transition-colors duration-300">
                {getIcon(cert.id)}
              </div>

              {/* Badge Text */}
              <div className="flex flex-col">
                <span className="font-mono text-[11px] font-bold text-[#F6F5F0] uppercase tracking-wider group-hover:text-[var(--accent)] transition-colors duration-300">
                  {cert.name}
                </span>
                <span className="font-mono text-[9px] text-[var(--text-tertiary)] uppercase tracking-widest mt-0.5">
                  {cert.authority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
