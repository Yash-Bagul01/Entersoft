"use client";

import React, { useState, useEffect } from "react";
import { Shield, ArrowUp, Zap, ZapOff } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";
import Image from "next/image";

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
        { name: "VAPT Audit Services", href: "/#services" },
        { name: "CI/CD AppSec", href: "/#services" },
        { name: "Managed Cloud Security", href: "/#services" },
        { name: "Smart Contract Audits", href: "/#services" },
        { name: "Managed SIEM & Monitoring", href: "/#services" },
        { name: "AI AST Testing", href: "/#services" }
      ]
    },
    {
      title: "Solutions",
      links: [
        { name: "Fintech Compliance", href: "/#case-studies" },
        { name: "RBI Cybersecurity Audits", href: "/#case-studies" },
        { name: "M&A Security Due Diligence", href: "/#case-studies" },
        { name: "Supply Chain Code Protection", href: "/#case-studies" },
        { name: "DeFi Protocol Verification", href: "/#services" }
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
    <footer className="w-full bg-[#060606] border-t border-[var(--border-subtle)] text-[var(--text-secondary)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-16 md:mb-24">
          {/* Brand Info Column */}
          <div className="col-span-2 flex flex-col justify-between gap-6 md:pr-12">
            <div className="flex flex-col gap-4">
              <Image
                src="https://d2ghx8biuioax8.cloudfront.net/main-website-images/entersoftLogo.svg"
                alt="Entersoft Security Logo"
                width={120}
                height={24}
                className="h-6 w-auto object-contain self-start"
              />
              <p className="text-[12px] leading-relaxed max-w-[320px]">
                Providing expert-led, proof-backed vulnerability research and application security audits. Safeguarding assets globally since 2013.
              </p>
            </div>
            {/* Social Grid */}
            <div className="flex items-center gap-4 text-[#F6F5F0]">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors p-1.5 bg-white/[0.02] border border-[var(--border-subtle)] rounded-[2px] inline-flex items-center justify-center" aria-label="GitHub" data-cursor="link">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors p-1.5 bg-white/[0.02] border border-[var(--border-subtle)] rounded-[2px] inline-flex items-center justify-center" aria-label="LinkedIn" data-cursor="link">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors p-1.5 bg-white/[0.02] border border-[var(--border-subtle)] rounded-[2px] inline-flex items-center justify-center" aria-label="Twitter" data-cursor="link">
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
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[11px] hover:text-[#F6F5F0] transition-colors leading-normal"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
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
      </div>
    </footer>
  );
}
