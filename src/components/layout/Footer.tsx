"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Shield, ArrowUp, Zap, ZapOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const pathname = usePathname();
  const [currentTheme, setCurrentTheme] = useState<string>("dark");
  const [motionActive, setMotionActive] = useState(true);

  // Dynamic MutationObserver to track data-theme attribute on <html> element
  useEffect(() => {
    const updateTheme = () => {
      if (typeof document !== "undefined") {
        const themeAttr = document.documentElement.getAttribute("data-theme") || "dark";
        setCurrentTheme(themeAttr);
      }
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedQuery.matches) {
      setMotionActive(false);
    }
  }, []);

  const isSast = pathname === "/platform/sast";
  const isSbom = pathname === "/platform/sbom-license-risk";
  const isSecrets = pathname === "/platform/secrets";
  const isSolutions = pathname === "/solutions";
  const isExoCase = pathname === "/platform/dast" || pathname === "/platform/iac" || pathname === "/platform/agentic-pentesting";

  if (isSast || isSbom || isSecrets || isSolutions) {
    return null;
  }

  const isLight = currentTheme === "light" || pathname === "/platform/cyber-ontology";

  const handleToggleMotion = () => {
    const current = motionActive;
    setMotionActive(!current);
    
    if (typeof window !== "undefined") {
      const event = new CustomEvent("motionChange", { detail: !current });
      window.dispatchEvent(event);
      
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
        { name: "Application Security Testing", href: "/services/application-security-testing" },
        { name: "Penetration Testing & Red Teaming", href: "/services/penetration-testing" },
        { name: "Cloud & Identity Security", href: "/services/cloud-security" },
        { name: "GRC, Privacy & Compliance", href: "/services/grc-compliance-privacy" },
        { name: "Managed Detection & Response", href: "/services/managed-detection-response" },
        { name: "Smart Contract Security", href: "/services/smart-contract-security" },
        { name: "AI Security Testing", href: "/services/ai-security-testing" }
      ]
    },
    {
      title: "Platform",
      links: [
        { name: "EnProbe Overview", href: "/platform/enprobe" },
        { name: "Static Security (SAST)", href: "/platform/sast" },
        { name: "Open Source Risk (SCA)", href: "/platform/sca" },
        { name: "SBOM & License Risk", href: "/platform/sbom-license-risk" },
        { name: "Secrets Detection", href: "/platform/secrets" },
        { name: "Infrastructure as Code", href: "/platform/iac" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Research & Insights", href: "/#insights" },
        { name: "Security Advisories", href: "/#insights" },
        { name: "Sample Deliverables", href: "/contact" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "Accreditations", href: "/company/accreditations" },
        { name: "Book a Security Briefing", href: "/contact" }
      ]
    }
  ];

  if (isExoCase) {
    const INK = "#0d0e13";
    const MUTED = "#6f7076";
    const CREAM = "#f2f0eb";

    return (
      <footer
        className="w-full select-none relative overflow-hidden"
        style={{
          backgroundColor: CREAM,
          color: INK,
          fontFamily: "var(--font-inter-tight), var(--font-inter), system-ui, sans-serif",
        }}
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 pt-[12vh] pb-0">
          <div className="grid grid-cols-12 gap-y-12 mb-[10vh]">
            <div className="col-span-12 md:col-span-4 md:col-start-1 flex flex-col gap-6">
              <Image
                src="https://d2ghx8biuioax8.cloudfront.net/main-website-images/entersoftLogo.svg"
                alt="Entersoft Security Logo"
                width={120}
                height={24}
                className="h-6 w-auto object-contain self-start [filter:brightness(0)]"
              />
              <p className="text-[14px] leading-[21px] max-w-[34ch] font-light" style={{ color: MUTED }}>
                EnProbe provides continuous security visibility and evidence. Entersoft experts validate complex risk and guide remediation.
              </p>
              <div className="flex items-center gap-5 text-[13px]">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                  LinkedIn
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                  X
                </a>
              </div>
            </div>

            {footerLinks.map((column, i) => (
              <div
                key={column.title}
                className={`col-span-6 md:col-span-2 ${i === 0 ? "md:col-start-6" : ""}`}
              >
                <div className="flex items-center gap-2 text-[13px] leading-none mb-5">
                  <span aria-hidden="true">+</span>
                  <span>{column.title}</span>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[13px] leading-[20px] font-light transition-opacity hover:opacity-50"
                        style={{ color: MUTED }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="h-px w-full" style={{ backgroundColor: "rgba(13,14,19,0.12)" }} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-light" style={{ color: MUTED }}>
              <span>© Entersoft Security</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2013</span>
              <span aria-hidden="true">·</span>
              <Link href="/#privacy" className="hover:opacity-50 transition-opacity">Privacy</Link>
              <span aria-hidden="true">·</span>
              <Link href="/#terms" className="hover:opacity-50 transition-opacity">Terms</Link>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleMotion}
                className="flex items-center gap-2 text-[12px] tracking-[0.02em] transition-opacity hover:opacity-50"
                style={{ color: MUTED }}
                title={motionActive ? "Disable scroll smooth & parallax animations" : "Enable scroll smooth & parallax animations"}
              >
                {motionActive ? <Zap className="w-3.5 h-3.5" /> : <ZapOff className="w-3.5 h-3.5" />}
                <span>{motionActive ? "Motion on" : "Motion off"}</span>
              </button>
              <button
                onClick={handleScrollTop}
                className="p-2 border transition-colors hover:bg-[#0d0e13] hover:text-[#f2f0eb]"
                style={{ borderColor: "rgba(13,14,19,0.18)", color: INK }}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative w-full flex justify-center overflow-hidden h-[11vw] min-h-[80px] max-h-[160px]">
            <div className="relative w-full flex justify-center overflow-visible top-[1.5vw]">
              <motion.h1
                initial={{ y: "45%", color: "rgba(13, 14, 19, 0.10)" }}
                whileHover={{ y: "0%", color: INK }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="font-light uppercase tracking-[-0.05em] cursor-pointer text-[13.5vw] leading-none select-none origin-bottom text-center"
                style={{ fontFamily: "var(--font-inter-tight), var(--font-inter), system-ui, sans-serif", lineHeight: "0.8" }}
              >
                ENTERSOFT
              </motion.h1>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`w-full border-t select-none relative overflow-hidden transition-colors duration-500 ${
      isLight 
        ? "bg-[#FAFCFF] border-slate-200/90 text-slate-800" 
        : "bg-[#030712] border-white/10 text-slate-300"
    }`}>
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
                className={`h-6 w-auto object-contain self-start ${isLight ? "[filter:brightness(0)]" : ""}`}
              />
              <p className={`text-[12px] leading-relaxed max-w-[340px] ${isLight ? "text-slate-700 font-normal" : "text-slate-300"}`}>
                <strong className={`font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>EnProbe</strong> provides continuous security visibility and evidence. <strong className={`font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>Entersoft experts</strong> validate complex risk and guide remediation. <strong className={`font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>Enterprise programmes</strong> combine platform and expertise into measurable security outcomes.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`transition-colors p-2.5 rounded-lg inline-flex items-center justify-center ${isLight ? "bg-slate-100 border border-slate-300 text-slate-800 hover:bg-slate-900 hover:text-white" : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"}`} aria-label="GitHub">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`transition-colors p-2.5 rounded-lg inline-flex items-center justify-center ${isLight ? "bg-slate-100 border border-slate-300 text-slate-800 hover:bg-slate-900 hover:text-white" : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"}`} aria-label="LinkedIn">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`transition-colors p-2.5 rounded-lg inline-flex items-center justify-center ${isLight ? "bg-slate-100 border border-slate-300 text-slate-800 hover:bg-slate-900 hover:text-white" : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"}`} aria-label="Twitter">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Directory Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <span className={`font-mono text-[11px] font-bold uppercase tracking-wider ${
                isLight ? "text-slate-900" : "text-cyan-400"
              }`}>
                // {column.title}
              </span>
              <ul className="flex flex-col gap-1.5">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-[12px] transition-colors leading-normal py-1 flex items-center ${
                        isLight
                          ? "text-slate-700 hover:text-slate-900 font-medium"
                          : "text-slate-300 hover:text-cyan-300 font-normal"
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider Line */}
        <div className={`w-full h-px mb-8 ${isLight ? "bg-slate-200" : "bg-slate-800"}`} />

        {/* Footer Sub-bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 mb-4">
          <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono tracking-wider ${
            isLight ? "text-slate-700 font-medium" : "text-slate-400"
          }`}>
            <span>© ENTERSOFT SECURITY</span>
            <span className="opacity-40">•</span>
            <span>EST. 2013</span>
            <span className="opacity-40">•</span>
            <Link href="/#privacy" className={`transition-colors ${isLight ? "hover:text-slate-900" : "hover:text-cyan-300"}`}>Privacy Policy</Link>
            <span className="opacity-40">•</span>
            <Link href="/#terms" className={`transition-colors ${isLight ? "hover:text-slate-900" : "hover:text-cyan-300"}`}>Terms of Service</Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Motion Settings Toggle */}
            <button
              onClick={handleToggleMotion}
              className={`flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase transition-colors border px-3 py-1.5 rounded-full ${
                isLight 
                  ? "border-slate-300 text-slate-800 hover:bg-slate-100 bg-white shadow-sm" 
                  : "border-slate-800 text-slate-300 hover:text-white bg-slate-900/60"
              }`}
              title={motionActive ? "Disable scroll smooth & parallax animations" : "Enable scroll smooth & parallax animations"}
            >
              {motionActive ? (
                <>
                  <Zap className={`w-3.5 h-3.5 ${isLight ? "text-blue-600" : "text-cyan-400"}`} />
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
              className={`p-2 border rounded-full transition-all ${
                isLight
                  ? "border-slate-300 text-slate-800 hover:bg-slate-900 hover:text-white bg-white shadow-sm"
                  : "border-slate-800 text-slate-200 hover:border-white hover:text-white"
              }`}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Giant ENTERSOFT Interactive Graphic directly in footer */}
        <div className="relative w-full flex justify-center overflow-hidden h-[12vw] min-h-[90px] max-h-[180px] pointer-events-auto">
          <div className="relative w-full flex justify-center overflow-visible top-[2vw]">
            <motion.h1 
              initial={{ y: "45%", color: isLight ? "rgba(15, 23, 42, 0.18)" : "rgba(255, 255, 255, 0.25)" }}
              whileHover={{ y: "0%", color: isLight ? "#0f172a" : "#ffffff" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-semibold uppercase tracking-[-0.035em] cursor-pointer text-[14.2vw] leading-none select-none origin-bottom text-center"
              style={{
                fontFamily: "var(--font-heading)",
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
