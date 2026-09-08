"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Shield, Code, Cloud, CheckSquare, Server, Cpu, HelpCircle, Layers, FileText, Database, Target, Zap, Activity, Eye, Compass, Workflow, Key, Terminal, Box, Award } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import ThemeToggle from "../ui/ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { Familjen_Grotesk } from "next/font/google";
import { ROUTES } from "@/config/routes";
import ExoMenuOverlay from "./ExoMenuOverlay";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

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
    ctaHref?: string;
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
  const isExoCase = pathname === "/platform/dast" || pathname === "/platform/iac" || pathname === "/platform/agentic-pentesting";
  const isAsmLanding = pathname === ROUTES.platform.attackSurfaceManagement;
  const isServicePage =
    (pathname?.startsWith("/services") || pathname?.startsWith("/platform")) &&
    !isLightPage &&
    !isPlatformSubpage &&
    !isExoCase &&
    !isAsmLanding;
  const isAppSecPage = pathname === ROUTES.services.appsec;
  const isVaptPage = pathname === ROUTES.services.vapt;
  const isCompliancePage = pathname === ROUTES.services.compliance;
  const isAiAstPage = pathname === ROUTES.services.aiAst;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exoMenuOpen, setExoMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>("dark");

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme") || "dark";
      setCurrentTheme(theme);
    };
    checkTheme();
    window.addEventListener("themeChange", checkTheme);
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      window.removeEventListener("themeChange", checkTheme);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroWrap = document.getElementById("hero-wrap");
      const heroEl = document.getElementById("hero");
      if (heroWrap) {
        setIsScrolled(heroWrap.getBoundingClientRect().bottom <= 96);
      } else if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setIsScrolled(rect.bottom <= 120);
      } else {
        setIsScrolled(window.scrollY > 400);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    {
      label: "Platform",
      href: ROUTES.platform.enprobe,
      megaMenu: {
        blurb: "EnProbe — continuous security visibility, vulnerability lifecycle management, and evidence across your enterprise.",
        ctaText: "Explore EnProbe Platform →",
        ctaHref: ROUTES.platform.enprobe,
        sections: [
          {
            title: "Core Platform",
            items: [
              { name: "EnProbe Overview", href: ROUTES.platform.enprobe, desc: "Continuous visibility, decisioning & evidence", icon: <Code className="w-4 h-4" /> },
              { name: "Static Security (SAST)", href: ROUTES.platform.sast, desc: "Source code flaw discovery", icon: <Code className="w-4 h-4" /> },
              { name: "Open Source Risk (SCA)", href: ROUTES.platform.sca, desc: "Vulnerable third-party libraries", icon: <Database className="w-4 h-4" /> },
              { name: "SBOM & License Governance", href: ROUTES.platform.sbomLicenseRisk, desc: "Generate SBOMs & track license risk", icon: <CheckSquare className="w-4 h-4" /> },
              { name: "Secrets Detection", href: ROUTES.platform.secrets, desc: "Find exposed credentials in code", icon: <Key className="w-4 h-4" /> },
              { name: "Infrastructure as Code", href: ROUTES.platform.iac, desc: "IaC configuration risk scanning", icon: <Terminal className="w-4 h-4" /> }
            ]
          },
          {
            title: "Runtime & Exposure",
            items: [
              { name: "DAST & Dynamic Testing", href: ROUTES.platform.dast, desc: "Runtime exploitability testing", icon: <Activity className="w-4 h-4" /> },
              { name: "Agentic Pentesting", href: ROUTES.platform.agenticPentesting, desc: "Automate adversarial workflows", icon: <Zap className="w-4 h-4" /> },
              { name: "API Security Testing", href: ROUTES.platform.apiSecurity, desc: "Discover and test API endpoints", icon: <Compass className="w-4 h-4" /> },
              { name: "Attack Surface Visibility", href: ROUTES.platform.attackSurfaceManagement, desc: "Identify reachable endpoints", icon: <Target className="w-4 h-4" /> },
              { name: "Cloud AppSec", href: ROUTES.platform.cloudAppsec, desc: "Single-pane cloud application risk", icon: <Cloud className="w-4 h-4" /> },
              { name: "AI AppSec", href: ROUTES.platform.aiAppsec, desc: "LLM & pipeline assurance", icon: <Cpu className="w-4 h-4" /> }
            ]
          }
        ]
      }
    },
    {
      label: "Services",
      href: "/#services",
      megaMenu: {
        blurb: "Enterprise security engineering: Application security, penetration testing, cloud, GRC, MDR, smart contracts, and AI security.",
        ctaText: "Explore Expert Services →",
        sections: [
          {
            title: "Core Practices",
            items: [
              { name: "Application Security", href: ROUTES.services.appsec, desc: "Web, API & Mobile AST", icon: <Code className="w-4 h-4" /> },
              { name: "Penetration Testing", href: ROUTES.services.vapt, desc: "CREST-Accredited Pen Testing", icon: <Shield className="w-4 h-4" /> },
              { name: "Cloud Security", href: ROUTES.services.cloud, desc: "AWS, Azure, GCP & Identity", icon: <Cloud className="w-4 h-4" /> },
              { name: "GRC, Privacy & Compliance", href: ROUTES.services.compliance, desc: "ISO 27001, SOC 2, DPDP", icon: <CheckSquare className="w-4 h-4" /> }
            ]
          },
          {
            title: "Specialized Practices",
            items: [
              { name: "Managed Detection & Response", href: ROUTES.services.siem, desc: "Continuous 24/7 MDR Operations", icon: <Server className="w-4 h-4" /> },
              { name: "Smart Contract Security", href: ROUTES.services.smartContract, desc: "Web3 & Protocol Audits", icon: <Cpu className="w-4 h-4" /> },
              { name: "AI Security Testing", href: ROUTES.services.aiAst, desc: "LLM, RAG & Agentic Red-Teaming", icon: <Zap className="w-4 h-4" /> }
            ]
          }
        ]
      }
    },
    {
      label: "Solutions",
      href: ROUTES.solutions,
      megaMenu: {
        blurb: "Outcome-aligned solutions connecting technology, specialist expertise, and enterprise security programmes.",
        ctaText: "View All Solutions →",
        ctaHref: ROUTES.solutions,
        sections: [
          {
            title: "Enterprise Solutions",
            items: [
              { name: "AppSec Transformation", href: ROUTES.services.appsec, desc: "Embed security into release cycles", icon: <Code className="w-4 h-4" /> },
              { name: "Continuous Exposure Management", href: ROUTES.platform.enprobe, desc: "Visibility, prioritisation & evidence", icon: <Eye className="w-4 h-4" /> },
              { name: "Cloud Security Transformation", href: ROUTES.services.cloud, desc: "Posture, containers & IAM controls", icon: <Cloud className="w-4 h-4" /> },
              { name: "Managed Cyber Defense", href: ROUTES.services.siem, desc: "Continuous threat monitoring", icon: <Server className="w-4 h-4" /> },
              { name: "Regulatory Readiness", href: ROUTES.services.compliance, desc: "Turn compliance into evidence", icon: <CheckSquare className="w-4 h-4" /> },
              { name: "Digital Asset Launch Assurance", href: ROUTES.services.smartContract, desc: "Pre-launch smart contract audits", icon: <Cpu className="w-4 h-4" /> },
              { name: "AI Security Readiness", href: ROUTES.services.aiAst, desc: "Secure AI deployments", icon: <Zap className="w-4 h-4" /> }
            ]
          }
        ]
      }
    },
    {
      label: "Industries",
      href: "/#services",
      megaMenu: {
        blurb: "Tailored cybersecurity postures engineered for regulated and high-growth technology sectors.",
        ctaText: "Explore Industries →",
        sections: [
          {
            title: "Sectors Served",
            items: [
              { name: "BFSI & Fintech", href: ROUTES.contact, desc: "Banking, payments & API compliance", icon: <Shield className="w-4 h-4" /> },
              { name: "SaaS & Technology", href: ROUTES.contact, desc: "Release assurance & SOC 2 evidence", icon: <Code className="w-4 h-4" /> },
              { name: "Healthcare & Life Sciences", href: ROUTES.contact, desc: "HIPAA & health data boundaries", icon: <CheckSquare className="w-4 h-4" /> },
              { name: "Government & Public Sector", href: ROUTES.contact, desc: "CERT-In empanelled auditing", icon: <Award className="w-4 h-4" /> },
              { name: "Manufacturing & Infrastructure", href: ROUTES.contact, desc: "Critical infrastructure security", icon: <Server className="w-4 h-4" /> },
              { name: "Web3 & Digital Assets", href: ROUTES.contact, desc: "Protocol & smart contract audits", icon: <Cpu className="w-4 h-4" /> }
            ]
          }
        ]
      }
    },
    {
      label: "Resources",
      href: "/#insights",
      megaMenu: {
        blurb: "Practical security research, vulnerability writeups, and security advisories by Entersoft analysts.",
        ctaText: "Read Research & Advisories →",
        sections: [
          {
            title: "Knowledge & Evidence",
            items: [
              { name: "Research & Insights", href: "/#insights", desc: "Practical guidance for engineering teams", icon: <FileText className="w-4 h-4" /> },
              { name: "Security Advisories", href: "/#insights", desc: "Technical vulnerability disclosures", icon: <HelpCircle className="w-4 h-4" /> },
              { name: "Sample Deliverables", href: ROUTES.contact, desc: "Examine report structure & evidence", icon: <Layers className="w-4 h-4" /> }
            ]
          }
        ]
      }
    },
    {
      label: "Company",
      href: ROUTES.company.accreditations,
      megaMenu: {
        blurb: "Since 2013 · CREST-accredited penetration testing · CERT-In empanelled auditing organisation.",
        ctaText: "Verify Accreditations →",
        ctaHref: ROUTES.company.accreditations,
        sections: [
          {
            title: "Corporate",
            items: [
              { name: "Accreditations", href: ROUTES.company.accreditations, desc: "CREST, CERT-In, ISO 27001", icon: <Award className="w-4 h-4" /> },
              { name: "Contact & Briefing", href: ROUTES.contact, desc: "Book an enterprise security briefing", icon: <Layers className="w-4 h-4" /> }
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
        return "left-1/2 -translate-x-1/2 w-[900px] max-w-[calc(100vw-2rem)]";
      case "Services":
        return "left-1/2 -translate-x-1/2 w-[900px] max-w-[calc(100vw-2rem)]";
      case "Solutions":
        return "left-1/2 -translate-x-1/2 w-[840px] max-w-[calc(100vw-2rem)]";
      case "Industries":
        return "left-1/2 -translate-x-1/2 w-[640px] max-w-[calc(100vw-2rem)]";
      default:
        return "left-1/2 -translate-x-1/2 w-[840px] max-w-[calc(100vw-2rem)]";
    }
  };

  const isLightThemeActive = currentTheme === "light" || isLightPage;
  const isLightNavbar = isLightThemeActive || (isPlatformSubpage && isScrolled) || (isExoCase && isScrolled);
  const isLightFloatingPill = (isLightThemeActive && isScrolled) || (isExoCase && isScrolled);
  const isLightNavHeader = isLightFloatingPill || isLightPage;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none">
        <div className={cn(
          "w-full transition-all duration-500 ease-in-out pointer-events-auto",
          isScrolled ? "pt-3 px-3 md:px-4" : "pt-0 px-0"
        )}>
          <div
            className={cn(
              "w-full transition-all duration-500 ease-in-out flex items-center justify-between mx-auto relative",
              isLightFloatingPill
                ? "max-w-none px-6 py-3 rounded-[16px] border border-slate-200/40 backdrop-blur-xl bg-white/30 text-slate-900 shadow-sm nav-floating-pill nav-floating-pill-light"
                : (isScrolled
                    ? "max-w-none px-6 py-3 rounded-[16px] border backdrop-blur-xl shadow-sm nav-floating-pill " +
                      (isServicePage
                        ? "bg-[#060606]/30 border-white/12 text-white service-nav-header"
                        : "bg-[var(--bg-elevated)]/30 border-[var(--border-glass)] text-[var(--text-primary)]")
                    : (isLightNavHeader
                        ? "max-w-full px-6 md:px-12 py-5 rounded-none border-none bg-transparent text-slate-900 nav-transparent-header"
                        : "max-w-full px-6 md:px-12 py-5 rounded-none border-none bg-transparent text-white nav-transparent-header"))
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
                  isLightNavHeader ? "[filter:brightness(0)] opacity-100" : "brightness-0 invert opacity-90 hover:opacity-100"
                )}
                priority
              />
            </Link>

            {/* Desktop Navbar Dropdown Links: Platform, Services, Solutions (Centered) */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-4 z-50 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              {navItems.slice(0, 3).map((item, idx) => (
                <div
                  key={item.label}
                  className="relative group py-2"
                  onMouseEnter={() => setActiveMega(idx)}
                  onMouseLeave={() => setActiveMega(null)}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      // Allow toggling dropdown on click
                      setActiveMega(activeMega === idx ? null : idx);
                    }}
                    className={cn(
                      familjen.className,
                      "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-normal uppercase tracking-wider transition-all duration-300 cursor-pointer",
                      isLightNavHeader
                        ? "text-slate-800 hover:text-slate-950 hover:bg-slate-200/70 font-bold"
                        : "text-slate-200 hover:text-white hover:bg-white/10",
                      activeMega === idx && (isLightNavHeader ? "bg-slate-200 text-slate-950" : "bg-white/10 text-white")
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300 opacity-60 group-hover:opacity-100", activeMega === idx && "rotate-180")} />
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
                          "absolute top-full border p-6 lg:p-8 mt-3 rounded-[20px] shadow-2xl flex gap-6 lg:gap-7 nav-dropdown-box z-50 transition-colors duration-300 max-w-[calc(100vw-2rem)] pointer-events-auto",
                          isLightNavHeader
                            ? "bg-white/98 border-slate-200 text-slate-900 shadow-xl"
                            : "bg-[#090F1E]/95 border-white/20 text-white shadow-2xl shadow-cyan-950/80 backdrop-blur-2xl",
                          getDropdownStyle(item.label)
                        )}
                      >
                        {/* Left Info Blurb */}
                        <div className={cn(
                          "w-[230px] shrink-0 flex flex-col justify-between border-r pr-6",
                          isLightNavHeader ? "border-slate-200" : "border-white/10"
                        )}>
                          <div>
                            <span className={cn(
                              "font-mono text-[11.5px] font-bold uppercase tracking-widest block mb-2.5",
                              isLightNavHeader ? "text-[#08428C]" : "text-cyan-400"
                            )}>
                              Overview
                            </span>
                            <p className={cn(
                              "text-[13px] leading-relaxed font-sans",
                              isLightNavHeader ? "text-slate-600" : "text-slate-200"
                            )}>
                              {item.megaMenu.blurb}
                            </p>
                          </div>
                          <div className="pt-4">
                            {item.megaMenu.ctaHref ? (
                              <a
                                href={item.megaMenu.ctaHref}
                                target={item.megaMenu.ctaHref.startsWith("http") ? "_blank" : undefined}
                                rel={item.megaMenu.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                                className={cn(
                                  "text-[12px] font-mono underline transition-colors",
                                  isLightNavHeader ? "text-slate-900 hover:text-[#08428C]" : "text-white hover:text-cyan-400"
                                )}
                                data-cursor="link"
                              >
                                {item.megaMenu.ctaText || "Explore →"}
                              </a>
                            ) : (
                              <Link
                                href={item.href}
                                className={cn(
                                  "text-[12px] font-mono underline transition-colors",
                                  isLightNavHeader ? "text-slate-900 hover:text-[#08428C]" : "text-white hover:text-cyan-400"
                                )}
                                data-cursor="link"
                              >
                                {item.megaMenu.ctaText || "Explore →"}
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Right Sections & Subitems Grid */}
                        <div className={cn(
                          "flex-1 grid gap-8",
                          item.megaMenu.sections.length > 1 ? "grid-cols-2" : "grid-cols-1"
                        )}>
                          {item.megaMenu.sections.map((sec) => (
                            <div key={sec.title} className="space-y-3">
                              <span className={cn(
                                "font-mono text-[11px] font-bold uppercase tracking-wider block",
                                isLightNavHeader ? "text-slate-500" : "text-slate-400"
                              )}>
                                {sec.title}
                              </span>
                              <div className="space-y-1">
                                {sec.items.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className={cn(
                                      "flex items-start gap-3 group p-2.5 rounded-[8px] transition-all",
                                      isLightNavHeader ? "hover:bg-slate-100" : "hover:bg-white/10"
                                    )}
                                    data-cursor="link"
                                  >
                                    <div className={cn(
                                      "mt-0.5 transition-colors shrink-0",
                                      isLightNavHeader ? "text-[#08428C]" : "text-cyan-400"
                                    )}>
                                      {subItem.icon}
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                      <span className={cn(
                                        "text-[12.5px] font-bold transition-colors leading-tight",
                                        isLightNavHeader ? "text-slate-900 group-hover:text-[#08428C]" : "text-white group-hover:text-cyan-300 font-bold"
                                      )}>
                                        {subItem.name}
                                      </span>
                                      <span className={cn(
                                        "text-[10.5px] font-sans leading-snug transition-colors",
                                        isLightNavHeader ? "text-slate-500 group-hover:text-slate-800" : "text-slate-300 group-hover:text-white"
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

            {/* Right Action Bar with Exo Ape Styled Menu Button */}
            <div className="hidden lg:flex items-center gap-4 z-50">
              {/* Exo Ape Styled Header Menu Button */}
              <button
                onClick={() => setExoMenuOpen(true)}
                className={cn(
                  familjen.className,
                  "flex items-center gap-3 py-1.5 px-3 rounded-full transition-all duration-300 text-xs font-normal uppercase tracking-widest cursor-pointer group",
                  isLightNavHeader
                    ? "text-slate-900 hover:text-black font-bold"
                    : "text-slate-300 hover:text-white font-semibold"
                )}
                data-cursor="link"
                aria-label="Open fullscreen navigation menu"
              >
                <span>Menu</span>
                <div className="flex flex-col gap-1 w-4 justify-center items-end">
                  <span className="w-4 h-[1.5px] bg-current transition-all duration-300 group-hover:w-5" />
                  <span className="w-2.5 h-[1.5px] bg-current transition-all duration-300 group-hover:w-5" />
                </div>
              </button>

              {!isServicePage && !isLightPage && !isExoCase && <ThemeToggle />}
              <Button
                variant="primary"
                size="sm"
                asLink
                href="/#contact"
                className={cn(
                  familjen.className,
                  "transition-all duration-300 rounded-full px-4 py-1.5 font-normal",
                  isLightFloatingPill &&
                    "!border-[#060606] hover:!border-[#007AFF]",
                  isLightPage && !isLightFloatingPill
                    ? "!bg-[#08428C] !text-white hover:!bg-[#007AFF] hover:!border-[#007AFF] !border-[#08428C] font-semibold shadow-md"
                    : ""
                )}
              >
                Book a Briefing
              </Button>
            </div>

            {/* Mobile Menu Icon & Theme Toggle */}
            <div className="lg:hidden z-50 flex items-center gap-4">
              {!isServicePage && !isLightPage && !isExoCase && <ThemeToggle />}
              <button
                onClick={() => setExoMenuOpen(true)}
                className={cn(
                  familjen.className,
                  "focus:outline-none p-2 min-h-[44px] min-w-[44px] flex items-center justify-center gap-3 text-xs font-normal uppercase tracking-widest transition-colors",
                  isLightNavHeader
                    ? "text-slate-900 hover:text-black font-bold"
                    : "text-slate-300 hover:text-white"
                )}
                aria-label="Open menu"
              >
                <span>Menu</span>
                <div className="flex flex-col gap-1 w-4 justify-center items-end">
                  <span className="w-4 h-[1.5px] bg-current" />
                  <span className="w-2.5 h-[1.5px] bg-current" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Exo Ape Fullscreen Menu Overlay */}
      <ExoMenuOverlay isOpen={exoMenuOpen} onClose={() => setExoMenuOpen(false)} />


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
                        className={cn(familjen.className, "text-2xl font-normal uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors")}
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
