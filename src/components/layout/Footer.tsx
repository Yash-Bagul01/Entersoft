"use client";

import React, { useState, useEffect } from "react";
import { Shield, ArrowUp, Zap, ZapOff } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const [motionActive, setMotionActive] = useState(true);

  useEffect(() => {
    // Read local storage or reduced-motion query to show active status
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedQuery.matches) {
      setMotionActive(false);
    }
  }, []);

  const handleToggleMotion = () => {
    // Simulate toggling motion configurations
    const current = motionActive;
    setMotionActive(!current);
    
    // Dispatch custom event to notify hooks (useReducedMotion / customCursor)
    if (typeof window !== "undefined") {
      const event = new CustomEvent("motionChange", { detail: !current });
      window.dispatchEvent(event);
      
      // Optionally reload or apply css class to body
      if (current) {
        document.documentElement.classList.add("reduce-motion-override");
      } else {
        document.documentElement.classList.remove("reduce-motion-override");
      }
    }
  };

  const handleScrollTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "Application Assurance", href: "/services/appsec" },
        { name: "Adversarial Validation", href: "/services/vapt" },
        { name: "Cloud Resilience", href: "/services/managed-cloud-security" },
        { name: "Digital Trust", href: "/services/compliance-management" },
        { name: "Cyber Defense Operations", href: "/services/siem" },
        { name: "Protocol Assurance", href: "/services/smart-contract-audits" },
        { name: "AI Systems Assurance", href: "/services/ai-ast" }
      ]
    },
    {
      title: "Solutions",
      links: [
        { name: "Application Security Transformation Program", href: "/services/appsec" },
        { name: "Continuous Exposure Validation", href: "/services/vapt" },
        { name: "Cloud Security Transformation", href: "/services/managed-cloud-security" },
        { name: "Regulatory Readiness & Evidence Program", href: "/services/compliance-management" },
        { name: "Managed Cyber Defense", href: "/services/siem" },
        { name: "Digital Asset Launch Assurance", href: "/services/smart-contract-audits" },
        { name: "AI System Readiness & Red Teaming", href: "/services/ai-ast" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Threat Briefings", href: "/#insights" },
        { name: "CrowdStrike Workarounds", href: "/#insights" },
        { name: "Vulnerability Toolkits", href: "/#insights" },
        { name: "Whitepapers", href: "/#insights" },
        { name: "Incident Documentation", href: "/#insights" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Entersoft", href: "/#contact" },
        { name: "Staff Cohort", href: "/#contact" },
        { name: "Certifications", href: "/#certifications" },
        { name: "Careers", href: "/#contact" },
        { name: "Contact Threat Desk", href: "/#contact" }
      ]
    }
  ];

  return (
    <footer className="w-full bg-[#060606] border-t border-[var(--border-subtle)] text-[var(--text-secondary)] select-none relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
      ` }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-0 relative">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand Info Column */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col justify-between gap-6 md:pr-4">
            <div className="flex flex-col gap-4">
              <Image
                src="https://d2ghx8biuioax8.cloudfront.net/main-website-images/entersoftLogo.svg"
                alt="Entersoft Security Logo"
                width={120}
                height={24}
                className="h-6 w-auto object-contain self-start"
              />
              <p className="text-[12px] leading-relaxed max-w-[320px]">
                EnProbe — the technology platform. Expert Practices — 14 years of human security judgment. Enterprise Solutions — packaged outcomes for specific customer problems.
              </p>
            </div>
            {/* Social Grid */}
            <div className="flex items-center gap-4 text-[#F6F5F0]">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors p-2.5 min-h-[44px] min-w-[44px] bg-white/[0.02] border border-[var(--border-subtle)] rounded-[2px] inline-flex items-center justify-center" aria-label="GitHub" data-cursor="link">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors p-2.5 min-h-[44px] min-w-[44px] bg-white/[0.02] border border-[var(--border-subtle)] rounded-[2px] inline-flex items-center justify-center" aria-label="LinkedIn" data-cursor="link">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors p-2.5 min-h-[44px] min-w-[44px] bg-white/[0.02] border border-[var(--border-subtle)] rounded-[2px] inline-flex items-center justify-center" aria-label="Twitter" data-cursor="link">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Directory Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <span className="font-mono text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
                // {column.title}
              </span>
              <ul className="flex flex-col gap-1.5">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[11px] hover:text-[#F6F5F0] transition-colors leading-normal py-1 min-h-[36px] flex items-center"
                      data-cursor="link"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Hairline Border Divider */}
        <div className="section-divider mb-8" />

        {/* Footer Sub-bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 mb-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-mono tracking-widest uppercase">
            <span>© ENTERSOFT SECURITY</span>
            <span className="text-[var(--text-tertiary)]">|</span>
            <span className="text-[var(--text-tertiary)]">EST. 2013</span>
            <span className="text-[var(--text-tertiary)]">|</span>
            <Link href="/#privacy" className="hover:text-[#F6F5F0] transition-colors" data-cursor="link">Privacy Policy</Link>
            <span className="text-[var(--text-tertiary)]">|</span>
            <Link href="/#terms" className="hover:text-[#F6F5F0] transition-colors" data-cursor="link">Terms of Service</Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Motion Settings Toggle */}
            <button
              onClick={handleToggleMotion}
              className="flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase text-[var(--text-tertiary)] hover:text-[#F6F5F0] transition-colors border border-[var(--border-subtle)] px-3 py-1.5 rounded-[2px] bg-white/[0.01]"
              title={motionActive ? "Disable scroll smooth & parallax animations" : "Enable scroll smooth & parallax animations"}
              data-cursor="link"
            >
              {motionActive ? (
                <>
                  <Zap className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Cinematic Motion Active</span>
                </>
              ) : (
                <>
                  <ZapOff className="w-3.5 h-3.5" />
                  <span>Reduced Motion Enabled</span>
                </>
              )}
            </button>

            {/* Scroll Top Button */}
            <button
              onClick={handleScrollTop}
              className="p-2 border border-[var(--border-subtle)] rounded-[2px] hover:border-[#F6F5F0] text-[#F6F5F0] transition-all bg-white/[0.01]"
              aria-label="Scroll to top"
              data-cursor="link"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Giant ENTERSOFT Interactive Pop-up directly integrated into the footer */}
        <div className="relative w-full flex justify-center overflow-hidden h-[12vw] min-h-[90px] max-h-[180px] pointer-events-auto">
          <div className="relative w-full flex justify-center overflow-visible top-[2vw]">
            <motion.h1 
              initial={{ y: "45%", color: "rgba(156, 156, 151, 0.35)" }}
              whileHover={{ y: "0%", color: "var(--text-primary, #ffffff)" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold uppercase tracking-tighter cursor-pointer text-[14.2vw] leading-none select-none origin-bottom text-center"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                lineHeight: "0.8"
              }}
            >
              ENTERSOFT
            </motion.h1>
          </div>
        </div>
      </div>
    </footer>
  );
}
