"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Shield, Code, Cloud, CheckSquare, Server, Cpu, HelpCircle, Layers, FileText } from "lucide-react";
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
    sections: {
      title: string;
      items: MegaItem[];
    }[];
  };
}

export default function Navbar() {
  const pathname = usePathname();
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
      label: "Services",
      href: "/#services",
      megaMenu: {
        blurb: "EnProbe — the technology and operating layer powering our 7 expert practices and capabilities to deliver packaged customer outcomes.",
        sections: [
          {
            title: "Expert Practices",
            items: [
              { name: "Application Assurance", href: ROUTES.services.appsec, desc: "CI/CD automated vulnerability tests.", icon: <Code className="w-4 h-4" /> },
              { name: "Adversarial Validation", href: ROUTES.services.vapt, desc: "Expert-validated penetration auditing.", icon: <Shield className="w-4 h-4" /> },
              { name: "Cloud Resilience", href: ROUTES.services.cloud, desc: "Continuous CSPM cloud posture checks.", icon: <Cloud className="w-4 h-4" /> },
              { name: "Digital Trust", href: ROUTES.services.compliance, desc: "Gap analysis & ISO 27001 readiness.", icon: <CheckSquare className="w-4 h-4" /> }
            ]
          },
          {
            title: "Specialized Solutions",
            items: [
              { name: "Protocol Assurance", href: ROUTES.services.smartContract, desc: "Decentralized DeFi code stress-testing.", icon: <Cpu className="w-4 h-4" /> },
              { name: "AI Systems Assurance", href: ROUTES.services.aiAst, desc: "LLM guardrails and prompt safety.", icon: <Layers className="w-4 h-4" /> },
              { name: "Cyber Defense Operations", href: ROUTES.services.siem, desc: "Incident SOC telemetry and response.", icon: <Server className="w-4 h-4" /> }
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
      label: "Case Studies",
      href: "/#case-studies",
      megaMenu: {
        blurb: "Proof: validated outcomes, metrics, client problems, and evidence demonstrating our 14 years of human security judgment.",
        sections: [
          {
            title: "Factual Results",
            items: [
              { name: "Cision M&A Audit", href: "/#case-studies", desc: "Due diligence software posture validation.", icon: <FileText className="w-4 h-4" /> },
              { name: "Retirement NBFC RBI", href: "/#case-studies", desc: "Rapid 100% compliance mapping case.", icon: <CheckSquare className="w-4 h-4" /> },
              { name: "Logistics Pipeline Sec", href: "/#case-studies", desc: "Optimizing code gate verification.", icon: <Code className="w-4 h-4" /> }
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
        blurb: "13 years of uninterrupted cyber defense led by a stable, veteran engineering cohort.",
        sections: [
          {
            title: "About Us",
            items: [
              { name: "Corporate Overview", href: "/#contact", desc: "13 years breach-free engineering.", icon: <Layers className="w-4 h-4" /> },
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

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
          (isScrolled || isVaptPage)
            ? "bg-[#060606]/85 hover:bg-[#060606]/98 backdrop-blur-md hover:backdrop-blur-xl border-b border-[var(--border-subtle)] py-4"
            : "bg-transparent border-b border-transparent py-6"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50 text-text-primary" data-cursor="link">
            <Image
              src="https://d2ghx8biuioax8.cloudfront.net/main-website-images/entersoftLogo.svg"
              alt="Entersoft Security Logo"
              width={110}
              height={22}
              className="h-5.5 w-auto object-contain logo-img"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, idx) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveMega(idx)}
                onMouseLeave={() => setActiveMega(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-wider text-text-primary hover:text-accent py-2 transition-colors relative"
                  data-cursor="link"
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-300 opacity-60",
                      activeMega === idx && "transform rotate-180 opacity-100"
                    )}
                  />
                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--accent)] origin-right scale-x-0 transition-transform duration-300 hover:origin-left hover:scale-x-100" />
                </a>

                {/* Mega Dropdown */}
                <AnimatePresence>
                  {activeMega === idx && item.megaMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full -left-36 w-[780px] bg-gradient-to-b from-[#060606]/98 to-[#0f0f0f]/98 border border-[var(--border-glass)] backdrop-blur-2xl p-8 mt-2 rounded-[8px] shadow-2xl flex gap-8 nav-dropdown-box"
                    >
                      {/* Left Info Blurb */}
                      <div className="w-1/3 flex flex-col justify-between border-r border-[var(--border-subtle)] pr-6">
                        <div>
                          <span className="font-mono text-[11.5px] font-bold text-[var(--accent)] uppercase tracking-widest block mb-2.5">
                            Overview
                          </span>
                          <p className="text-[13.5px] text-[var(--text-secondary)] leading-relaxed font-sans">
                            {item.megaMenu.blurb}
                          </p>
                        </div>
                        <div className="pt-4">
                          <a
                            href={item.href}
                            className="text-[12.5px] font-mono text-[var(--text-primary)] hover:text-[var(--accent)] underline transition-colors"
                            data-cursor="link"
                          >
                            Explore Platform →
                          </a>
                        </div>
                      </div>

                      {/* Right Links Directory */}
                      <div className="w-2/3 grid grid-cols-2 gap-6">
                        {item.megaMenu.sections.map((section) => (
                          <div key={section.title} className="flex flex-col gap-3.5">
                            <span className="font-mono text-[11.5px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">
                              {section.title}
                            </span>
                            <div className="flex flex-col gap-2">
                              {section.items.map((subItem) => (
                                <a
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="flex items-start gap-2.5 group p-2 hover:bg-[var(--text-primary)]/[0.03] rounded transition-all"
                                  data-cursor="link"
                                >
                                  <div className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] mt-0.5 transition-colors">
                                    {subItem.icon}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[12.5px] font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                                      {subItem.name}
                                    </span>
                                    <span className="text-[11.5px] text-[var(--text-secondary)] leading-normal mt-0.5">
                                      {subItem.desc}
                                    </span>
                                  </div>
                                </a>
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
            {!isAppSecPage && !isVaptPage && !isCompliancePage && !isAiAstPage && <ThemeToggle />}
            <Button variant="primary" size="sm" asLink href="/#contact">
              Request Briefing
            </Button>
          </div>

          {/* Mobile Menu Icon & Theme Toggle */}
          <div className="lg:hidden z-50 flex items-center gap-4">
            {!isAppSecPage && !isVaptPage && !isCompliancePage && !isAiAstPage && <ThemeToggle />}
            <button
              onClick={toggleMobileMenu}
              className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors focus:outline-none p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
