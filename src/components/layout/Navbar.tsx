"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Shield, Code, Cloud, CheckSquare, Server, Cpu, HelpCircle, Layers, FileText, Database, Target, Zap, Activity, Eye, Compass, Workflow, Key, Terminal, Box } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import ThemeToggle from "../ui/ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/config/routes";

interface MegaItem {
  name: string;
  href: string;
  desc: string;
  icon: React.ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  megaMenu?: {
    blurb: string;
    ctaText?: string;
    sections: {
      title: string;
      items: MegaItem[];
    }[];
  };
}

export default function Navbar() {
  const pathname = usePathname();
  const isCyberOntologyPage = pathname?.startsWith("/platform/cyber-ontology");
  const isSastPage = pathname?.startsWith("/platform/sast");
  const isScaPage = pathname?.startsWith("/platform/sca");
  const isSbomPage = pathname?.startsWith("/platform/sbom-license-risk");
  const isSecretsPage = pathname?.startsWith("/platform/secrets");
  const isPlatformSubpage = isSastPage || isSbomPage;
  const isLightPage = isCyberOntologyPage || isScaPage || isSecretsPage;
  const isServicePage = (pathname?.startsWith("/services") || pathname?.startsWith("/platform")) && !isLightPage && !isPlatformSubpage;
  const isAppSecPage = pathname === ROUTES.services.appsec;
  const isVaptPage = pathname === ROUTES.services.vapt;
  const isCompliancePage = pathname === ROUTES.services.compliance;
  const isAiAstPage = pathname === ROUTES.services.aiAst;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    {
      label: "Platform",
      href: ROUTES.platform.sast,
      megaMenu: {
        blurb: "EnProbe — Zero-noise AppSec platform unifying SAST, DAST, SCA, API Security, ASPM, and Threat Intelligence.",
        ctaText: "Explore EnProbe Platform →",
        sections: [
          {
            title: "Scan Code",
            items: [
              { name: "SAST", href: ROUTES.platform.sast, desc: "Early static security analysis", icon: <Code className="w-4 h-4" /> },
              { name: "Open Source (SCA)", href: ROUTES.platform.sca, desc: "Find vulnerable dependencies", icon: <Database className="w-4 h-4" /> },
              { name: "SBOM & License Risk", href: ROUTES.platform.sbomLicenseRisk, desc: "Generate SBOMs and track licenses", icon: <CheckSquare className="w-4 h-4" /> },
              { name: "Secrets", href: ROUTES.platform.secrets, desc: "Detect exposed secrets in applications", icon: <Key className="w-4 h-4" /> },
              { name: "Infrastructure as Code", href: ROUTES.platform.iac, desc: "Ingest IaC security findings", icon: <Terminal className="w-4 h-4" /> },
              { name: "Container", href: ROUTES.platform.container, desc: "Track container image vulnerabilities", icon: <Box className="w-4 h-4" /> }
            ]
          },
          {
            title: "Test Runtime",
            items: [
              { name: "DAST & AI DAST", href: ROUTES.platform.dast, desc: "Test runtime, prove exploitability", icon: <Activity className="w-4 h-4" /> },
              { name: "Agentic Pentesting", href: ROUTES.platform.agenticPentesting, desc: "Automate real-world attack techniques", icon: <Zap className="w-4 h-4" /> },
              { name: "API Security Testing", href: ROUTES.platform.apiSecurity, desc: "Discover and test APIs", icon: <Compass className="w-4 h-4" /> },
              { name: "Attack Surface Management", href: ROUTES.platform.attackSurfaceManagement, desc: "Identify exposed apps and endpoints", icon: <Target className="w-4 h-4" /> },
              { name: "Cloud AppSec", href: ROUTES.platform.cloudAppsec, desc: "Get a single-pane view of cloud app risk", icon: <Cloud className="w-4 h-4" /> },
              { name: "AI AppSec", href: ROUTES.platform.aiAppsec, desc: "Scan smarter, accelerate remediation", icon: <Cpu className="w-4 h-4" /> }
            ]
          },
          {
            title: "Manage Vulnerabilities",
            items: [
              { name: "Vulnerability Management (ASPM)", href: ROUTES.platform.aspm, desc: "Centralize and correlate AppSec findings", icon: <Workflow className="w-4 h-4" /> },
              { name: "Compliance & Executive Reporting", href: ROUTES.platform.complianceReporting, desc: "Measure risk and impact", icon: <Shield className="w-4 h-4" /> },
              { name: "Threat Intelligence", href: ROUTES.platform.threatIntelligence, desc: "Reachability, exploitability, and business logic", icon: <Eye className="w-4 h-4" /> }
            ]
          }
        ]
      }
    },
    {
      label: "Services",
      href: "/#services",
      megaMenu: {
        blurb: "7 specialized practice areas delivering continuous security, penetration testing, compliance readiness, and AI system defense.",
        ctaText: "View All Practices →",
        sections: [
          {
            title: "Core Practices",
            items: [
              { name: "Application Assurance", href: ROUTES.services.appsec, desc: "APPSEC • DEVSECOPS • SECURE SDLC", icon: <Code className="w-4 h-4" /> },
              { name: "Adversarial Validation", href: ROUTES.services.vapt, desc: "PENETRATION TESTING • RED TEAMING", icon: <Shield className="w-4 h-4" /> },
              { name: "Cloud Resilience", href: ROUTES.services.cloud, desc: "CSPM • CWPP • CLOUD POSTURE", icon: <Cloud className="w-4 h-4" /> },
              { name: "Digital Trust", href: ROUTES.services.compliance, desc: "ISO 27001 • SOC 2 • CERT-IN", icon: <CheckSquare className="w-4 h-4" /> }
            ]
          },
          {
            title: "Specialized Security",
            items: [
              { name: "Cyber Defense Operations", href: ROUTES.services.siem, desc: "MDR • SOC • THREAT MONITORING", icon: <Server className="w-4 h-4" /> },
              { name: "Protocol Assurance", href: ROUTES.services.smartContract, desc: "WEB3 • SMART CONTRACT AUDITS", icon: <Cpu className="w-4 h-4" /> },
              { name: "AI Systems Assurance", href: ROUTES.services.aiAst, desc: "AI AST • LLM SECURITY • PROMPT GUARD", icon: <Layers className="w-4 h-4" /> }
            ]
          }
        ]
      }
    },
    {
      label: "Industries",
      href: "/#case-studies",
      megaMenu: {
        blurb: "Sector-specific deployment: custom-tailored security postures engineered for financial services, fintech, healthcare, SaaS, government, critical infrastructure, and digital assets.",
        ctaText: "View Sector Solutions →",
        sections: [
          {
            title: "Focus Areas",
            items: [
              { name: "Fintech & Banking", href: "/#case-studies", desc: "API integrations & bank-ready audits.", icon: <CheckSquare className="w-4 h-4" /> },
              { name: "NBFC compliance", href: "/#case-studies", desc: "Adhering strictly to RBI cybersecurity rules.", icon: <Shield className="w-4 h-4" /> },
              { name: "Logistics Enterprise", href: "/#case-studies", desc: "Protecting global supply chain software.", icon: <Server className="w-4 h-4" /> }
            ]
          }
        ]
      }
    },
    {
      label: "Resources",
      href: "/#insights",
      megaMenu: {
        blurb: "Technical research, vulnerability writeups, and industry responses from Entersoft threat analysts.",
        ctaText: "Read Research & Insights →",
        sections: [
          {
            title: "Documentation & Updates",
            items: [
              { name: "VAPT Security Roundup", href: "/#insights", desc: "Comparing manual and automated methods.", icon: <FileText className="w-4 h-4" /> },
              { name: "CrowdStrike Resolution", href: "/#insights", desc: "Best-practice workaround documentation.", icon: <HelpCircle className="w-4 h-4" /> },
              { name: "Cyberattacks Retrospective", href: "/#insights", desc: "Case reviews of critical web leaks.", icon: <Shield className="w-4 h-4" /> }
            ]
          }
        ]
      }
    },
    {
      label: "Company",
      href: "/#contact",
      megaMenu: {
        blurb: "14 years of uninterrupted cyber defense led by a stable, veteran engineering cohort.",
        ctaText: "About Entersoft →",
        sections: [
          {
            title: "About Us",
            items: [
              { name: "Corporate Overview", href: "/#contact", desc: "14 years breach-free engineering.", icon: <Layers className="w-4 h-4" /> },
              { name: "Certifications Strip", href: "/#certifications", desc: "Empanelled and audited credentials.", icon: <CheckSquare className="w-4 h-4" /> }
            ]
          }
        ]
      }
    }
  ];

  const [mobileActiveMega, setMobileActiveMega] = useState<number | null>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileActiveMega(null);
    document.body.style.overflow = "auto";
  }, [pathname]);

  const toggleMobileMenu = () => {
    const nextState = !mobileMenuOpen;
    setMobileMenuOpen(nextState);
    if (!nextState) {
      setMobileActiveMega(null);
    }
    document.body.style.overflow = nextState ? "hidden" : "auto";
  };

  const getDropdownStyle = (label: string) => {
    switch (label) {
      case "Platform":
        return "-left-28 w-[980px]";
      case "Services":
        return "-left-36 w-[860px]";
      case "Industries":
        return "-left-44 w-[640px]";
      case "Resources":
        return "right-0 left-auto w-[600px]";
      case "Company":
        return "right-0 left-auto w-[560px]";
      default:
        return "-left-28 w-[800px]";
    }
  };

  const isLightNavbar = isLightPage || (isPlatformSubpage && isScrolled);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none">
        <div className={cn(
          "w-full transition-all duration-500 ease-in-out pointer-events-auto",
          isScrolled ? "pt-4 px-4 md:px-8" : "pt-0 px-0"
        )}>
          <div
            className={cn(
              "w-full transition-all duration-500 ease-in-out flex items-center justify-between mx-auto",
              isLightNavbar
                ? (isScrolled
                    ? "max-w-[1320px] px-6 py-3 rounded-full border border-slate-200/90 backdrop-blur-xl bg-white/95 text-slate-900 shadow-xl nav-floating-pill nav-floating-pill-light"
                    : "max-w-full px-6 md:px-12 py-5 rounded-none border-none bg-transparent text-slate-900 nav-hero-light-header")
                : (isScrolled
                    ? "max-w-[1320px] px-6 py-3 rounded-full border backdrop-blur-xl shadow-2xl nav-floating-pill " +
                      (isServicePage
                        ? "bg-[#060606]/90 border-white/12 text-white service-nav-header shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
                        : "bg-[var(--bg-elevated)]/95 border-[var(--border-glass)] text-[var(--text-primary)] shadow-[0_12px_36px_rgba(0,0,0,0.12)]")
                    : "max-w-full px-6 md:px-12 py-5 rounded-none border-none bg-transparent text-white nav-transparent-header")
            )}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center z-50 shrink-0 cursor-pointer" data-cursor="link">
              <Image
                src="https://d2ghx8biuioax8.cloudfront.net/main-website-images/entersoftLogo.svg"
                alt="Entersoft Security Logo"
                width={135}
                height={27}
                className={cn(
                  "h-6 w-auto object-contain transition-all duration-300 logo-img",
                  isLightNavbar && "[filter:brightness(0)] opacity-100"
                )}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, idx) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveMega(idx)}
                  onMouseLeave={() => setActiveMega(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider px-4 py-2 transition-all relative group cursor-pointer",
                      isScrolled ? "rounded-full" : "rounded-md",
                      activeMega === idx
                        ? (isLightNavbar 
                            ? "bg-slate-100/90 text-[#08428C] font-extrabold" 
                            : "bg-cyan-500/20 text-cyan-400 font-extrabold")
                        : (isLightNavbar
                            ? "text-slate-800 hover:text-[#08428C] hover:bg-slate-100/80"
                            : "text-slate-100 hover:text-cyan-400 hover:bg-white/10")
                    )}
                    data-cursor="link"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-300 opacity-70 group-hover:opacity-100",
                        activeMega === idx && "transform rotate-180 opacity-100 text-cyan-400"
                      )}
                    />
                  </Link>

                  {/* Mega Dropdown */}
                  <AnimatePresence>
                    {activeMega === idx && item.megaMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                          "absolute top-full border p-8 mt-3 rounded-[20px] shadow-2xl flex gap-7 nav-dropdown-box z-50 transition-colors duration-300 max-w-[calc(100vw-3rem)]",
                          isLightPage
                            ? "bg-white/98 border-slate-200 text-slate-900 shadow-xl"
                            : "bg-[#090F1E]/95 border-white/20 text-white shadow-2xl shadow-cyan-950/80 backdrop-blur-2xl",
                          getDropdownStyle(item.label)
                        )}
                      >
                        {/* Left Info Blurb */}
                        <div className={cn(
                          "w-[230px] shrink-0 flex flex-col justify-between border-r pr-6",
                          isLightPage ? "border-slate-200" : "border-white/10"
                        )}>
                          <div>
                            <span className={cn(
                              "font-mono text-[11.5px] font-bold uppercase tracking-widest block mb-2.5",
                              isLightPage ? "text-[#08428C]" : "text-cyan-400"
                            )}>
                              Overview
                            </span>
                            <p className={cn(
                              "text-[13px] leading-relaxed font-sans",
                              isLightPage ? "text-slate-600" : "text-slate-200"
                            )}>
                              {item.megaMenu.blurb}
                            </p>
                          </div>
                          <div className="pt-4">
                            <Link
                              href={item.href}
                              className={cn(
                                "text-[12px] font-mono underline transition-colors",
                                isLightPage ? "text-slate-900 hover:text-[#08428C]" : "text-white hover:text-cyan-400"
                              )}
                              data-cursor="link"
                            >
                              {item.megaMenu.ctaText || "Explore →"}
                            </Link>
                          </div>
                        </div>

                        {/* Right Links Directory */}
                        <div className={cn(
                          "flex-1 grid gap-6",
                          item.megaMenu.sections.length === 3 ? "grid-cols-3" : item.megaMenu.sections.length === 2 ? "grid-cols-2" : "grid-cols-1"
                        )}>
                          {item.megaMenu.sections.map((section) => (
                            <div key={section.title} className="flex flex-col gap-3.5">
                              <span className={cn(
                                "font-mono text-[11px] font-bold uppercase tracking-wider",
                                isLightPage ? "text-slate-500" : "text-cyan-400"
                              )}>
                                {section.title}
                              </span>
                              <div className="flex flex-col gap-2">
                                {section.items.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className={cn(
                                      "flex items-start gap-3 group p-2.5 rounded-[8px] transition-all",
                                      isLightPage ? "hover:bg-slate-100" : "hover:bg-white/10"
                                    )}
                                    data-cursor="link"
                                  >
                                    <div className={cn(
                                      "mt-0.5 transition-colors shrink-0",
                                      isLightPage ? "text-[#08428C]" : "text-cyan-400"
                                    )}>
                                      {subItem.icon}
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                      <span className={cn(
                                        "text-[12.5px] font-bold transition-colors leading-tight",
                                        isLightPage ? "text-slate-900 group-hover:text-[#08428C]" : "text-white group-hover:text-cyan-300 font-bold"
                                      )}>
                                        {subItem.name}
                                      </span>
                                      <span className={cn(
                                        "text-[10.5px] font-sans leading-snug transition-colors",
                                        isLightPage ? "text-slate-500 group-hover:text-slate-800" : "text-slate-300 group-hover:text-white"
                                      )}>
                                        {subItem.desc}
                                      </span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Button Action & Theme Toggle */}
            <div className="hidden lg:flex items-center gap-4">
              {!isServicePage && !isLightPage && <ThemeToggle />}
              <Button
                variant="primary"
                size="sm"
                asLink
                href="/#contact"
                className={cn(isLightPage && "!border !border-slate-900 hover:!border-black font-semibold shadow-xs")}
              >
                Request Briefing
              </Button>
            </div>

            {/* Mobile Menu Icon & Theme Toggle */}
            <div className="lg:hidden z-50 flex items-center gap-4">
              {!isServicePage && !isLightPage && <ThemeToggle />}
              <button
                onClick={toggleMobileMenu}
                className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors focus:outline-none p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Takeover */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#060606] z-40 lg:hidden flex flex-col justify-between px-6 pt-28 pb-10 overflow-y-auto"
          >
            {/* Navigation Link Stack */}
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.06,
                  },
                },
              }}
              className="flex flex-col space-y-4"
            >
              {navItems.map((item, idx) => {
                const isOpen = mobileActiveMega === idx;
                const subItems = item.megaMenu ? item.megaMenu.sections.flatMap(s => s.items) : [];
                return (
                  <motion.div
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, x: -15 },
                      visible: { opacity: 1, x: 0, transition: { ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="border-b border-[var(--border-subtle)] pb-4"
                  >
                    <div className="flex items-center justify-between">
                      <a
                        href={item.href}
                        onClick={toggleMobileMenu}
                        className="font-display font-bold text-2xl uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                      >
                        {item.label}
                      </a>
                      {subItems.length > 0 && (
                        <button
                          onClick={() => setMobileActiveMega(isOpen ? null : idx)}
                          className="p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                          aria-label={`Toggle ${item.label} sub-menu`}
                        >
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isOpen && "transform rotate-180")} />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {isOpen && subItems.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex flex-col gap-2 mt-3 pl-2 overflow-hidden"
                        >
                          {subItems.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={toggleMobileMenu}
                              className="font-mono text-[12px] text-[var(--text-secondary)] uppercase tracking-wider hover:text-[var(--text-primary)] py-1.5 flex items-center gap-2"
                            >
                              <span className="text-[var(--accent)] text-[10px]">→</span>
                              <span>{sub.name}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Bottom Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 border-t border-[var(--border-subtle)] pt-6 mt-6"
            >
              <Button
                variant="primary"
                size="md"
                className="w-full text-center"
                asLink
                href="/#contact"
                onClick={toggleMobileMenu}
              >
                Request Briefing
              </Button>
              <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest pt-2">
                <span>© ENTERSOFT SECURITY</span>
                <span>EST. 2013</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
