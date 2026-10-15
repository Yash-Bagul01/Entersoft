"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Familjen_Grotesk } from "next/font/google";
import { ROUTES } from "@/config/routes";
import { companyNav } from "@/data/companyPages";
import { industryNav } from "@/data/industries";
import { resourceNav } from "@/data/resources";
import { cn } from "@/lib/utils";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

interface ExoMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLS = 10;
const ROWS = 8;
const CELL_COUNT = COLS * ROWS;

const PRIMARY_ITEMS = [
  { label: "Platform", href: ROUTES.platform.hub },
  { label: "Services", href: ROUTES.servicesHub },
  { label: "Solutions", href: ROUTES.solutions },
];

const SECONDARY_ITEMS = [
  { label: "Industries", href: industryNav[0].href },
  { label: "Resources", href: ROUTES.resources.blog },
  { label: "Company", href: companyNav[0].href },
  { label: "Accreditations", href: ROUTES.company.accreditations },
  { label: "Contact Us", href: ROUTES.contact },
];

const FLYOUTS: Record<string, readonly { label: string; href: string }[]> = {
  Platform: [
    { label: "EnProbe overview", href: ROUTES.platform.enprobe },
    { label: "Static security", href: ROUTES.platform.sast },
    { label: "Open source risk", href: ROUTES.platform.sca },
    { label: "SBOM and license governance", href: ROUTES.platform.sbomLicenseRisk },
    { label: "Secrets detection", href: ROUTES.platform.secrets },
    { label: "Infrastructure as code", href: ROUTES.platform.iac },
    { label: "Dynamic testing", href: ROUTES.platform.dast },
    { label: "Agentic pentesting", href: ROUTES.platform.agenticPentesting },
    { label: "API security testing", href: ROUTES.platform.apiSecurity },
    { label: "Attack surface visibility", href: ROUTES.platform.attackSurfaceManagement },
    { label: "Cloud application security", href: ROUTES.platform.cloudAppsec },
    { label: "AI application security", href: ROUTES.platform.aiAppsec },
  ],
  Services: [
    { label: "Application assurance", href: ROUTES.services.appsec },
    { label: "Adversarial validation", href: ROUTES.services.vapt },
    { label: "Cloud resilience", href: ROUTES.services.cloud },
    { label: "Digital trust", href: ROUTES.services.compliance },
    { label: "Cyber defense operations", href: ROUTES.services.siem },
    { label: "Protocol assurance", href: ROUTES.services.smartContract },
    { label: "AI systems assurance", href: ROUTES.services.aiAst },
  ],
  Solutions: [
    { label: "API discovery", href: ROUTES.solutionsPages.apiDiscovery },
    { label: "AI-BOM", href: ROUTES.solutionsPages.aiBom },
    { label: "Manage vulnerabilities", href: ROUTES.solutionsPages.manageVulnerabilities },
    { label: "Automate security workflows", href: ROUTES.solutionsPages.automateWorkflows },
    { label: "Track AppSec KPIs", href: ROUTES.solutionsPages.trackKpis },
    { label: "Manage open source risk", href: ROUTES.solutionsPages.openSourceRisk },
  ],
  Industries: industryNav,
  Resources: resourceNav,
  Company: [{ label: "Accreditations", href: ROUTES.company.accreditations }, ...companyNav],
};

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

function cellDelay(index: number, reverse = false) {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const step = col + row;
  const max = COLS + ROWS - 2;
  return ((reverse ? max - step : step) * 0.032);
}

export default function ExoMenuOverlay({ isOpen, onClose }: ExoMenuOverlayProps) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setHovered(null);
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const allItems = [...PRIMARY_ITEMS, ...SECONDARY_ITEMS];
  const activeLabel =
    hovered ??
    allItems.find((item) => pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href)))
      ?.label ??
    PRIMARY_ITEMS[0].label;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="kt-menu"
          id="exo-menu"
          className="fixed inset-0 z-[100] overflow-hidden"
          initial="closed"
          animate="open"
          exit="closed"
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          <div
            className="pointer-events-none absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            }}
            aria-hidden="true"
          >
            {Array.from({ length: CELL_COUNT }, (_, i) => (
              <motion.div
                key={i}
                className="bg-[#1a1c1a]"
                style={{ transformOrigin: "50% 0%" }}
                variants={{
                  closed: {
                    scaleY: 0,
                    transition: { duration: 0.48, delay: cellDelay(i, true), ease: EASE },
                  },
                  open: {
                    scaleY: 1,
                    transition: { duration: 0.52, delay: cellDelay(i), ease: EASE },
                  },
                }}
              />
            ))}
          </div>

          <motion.div
            className="relative z-10 flex h-full w-full flex-col text-[#f4f4f4]"
            variants={{
              closed: {
                opacity: 0,
                transition: { duration: 0.2, ease: "easeIn" },
              },
              open: {
                opacity: 1,
                transition: { duration: 0.45, delay: 0.38, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <div className="flex shrink-0 justify-center px-4 pt-5 md:pt-6">
              <div className="flex items-center gap-1 rounded-full border border-white/20 bg-[#111] py-1 pl-5 pr-1">
                <Link
                  href="/"
                  onClick={onClose}
                  className={cn(familjen.className, "pr-4 text-[13px] font-normal uppercase tracking-[0.08em] text-white")}
                >
                  Entersoft
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:bg-white/10"
                >
                  <span className="text-lg leading-none">×</span>
                </button>
              </div>
            </div>

            <div
              className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center gap-12 px-8 pb-8 pt-6 md:flex-row md:items-center md:justify-between md:gap-16 md:px-16 lg:px-24"
              onMouseLeave={() => setHovered(null)}
            >
              <nav className="flex flex-col">
                {PRIMARY_ITEMS.map((item, idx) => {
                  const isActive = activeLabel === item.label;
                  const flyout = FLYOUTS[item.label];
                  const flyoutId = `menu-flyout-${item.label}`;
                  return (
                    <motion.div
                      key={item.label}
                      className="relative"
                      variants={{
                        closed: { y: 28, opacity: 0 },
                        open: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.55,
                            delay: 0.42 + idx * 0.06,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                      onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                          setHovered(null);
                        }
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-expanded={hovered === item.label}
                        aria-controls={flyoutId}
                        onClick={(event) => {
                          if (window.matchMedia("(max-width: 767px)").matches) {
                            event.preventDefault();
                            setHovered((current) => (current === item.label ? null : item.label));
                            return;
                          }
                          onClose();
                        }}
                        onMouseEnter={() => setHovered(item.label)}
                        onFocus={() => setHovered(item.label)}
                        className={cn(
                          familjen.className,
                          "relative flex items-center py-[0.1em] text-[clamp(2.1rem,5vw,4.6rem)] font-normal uppercase leading-[0.82] tracking-[-0.07em] transition-colors duration-300",
                          isActive ? "menu-link-on" : "menu-link-dim"
                        )}
                      >
                        <span
                          className={cn(
                            "mr-3 inline-block h-2 w-2 shrink-0 rounded-full bg-[#f26b2b] transition-opacity duration-300 md:mr-4",
                            isActive ? "opacity-100" : "opacity-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.label}
                      </Link>

                      <AnimatePresence>
                        {hovered === item.label ? (
                          <motion.div
                            id={flyoutId}
                            key={flyoutId}
                            initial={{ opacity: 0, x: -18 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -12 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="z-20 w-max md:absolute md:left-full md:top-1/2 md:max-h-[70vh] md:-translate-y-1/2 md:overflow-y-auto md:pl-12"
                          >
                            <ul className="mt-2 flex w-max flex-col items-start gap-0.5 border-l border-white/15 pl-4 md:mt-0 md:pl-5">
                              {flyout.map((sub, subIndex) => {
                                const subActive = pathname === sub.href;
                                return (
                                  <motion.li
                                    key={sub.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.28,
                                      delay: 0.04 + subIndex * 0.03,
                                      ease: [0.22, 1, 0.36, 1],
                                    }}
                                  >
                                    <Link
                                      href={sub.href}
                                      onClick={onClose}
                                      onFocus={() => setHovered(item.label)}
                                      className={cn(
                                        familjen.className,
                                        "menu-sublink block whitespace-nowrap py-0.5 text-[clamp(1rem,1.5vw,1.35rem)] font-normal tracking-[-0.04em]",
                                        subActive && "menu-link-on"
                                      )}
                                    >
                                      {sub.label}
                                    </Link>
                                  </motion.li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </nav>

              <nav className="flex flex-col items-start gap-1 md:items-end">
                {SECONDARY_ITEMS.map((item, idx) => {
                  const isActive = activeLabel === item.label;
                  const flyout = FLYOUTS[item.label];
                  const flyoutId = `menu-flyout-${item.label}`;
                  return (
                    <motion.div
                      key={item.label}
                      className={cn(flyout && "relative")}
                      variants={{
                        closed: { y: 20, opacity: 0 },
                        open: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.5,
                            delay: 0.5 + idx * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                      onBlur={(event) => {
                        if (!flyout) return;
                        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                          setHovered(null);
                        }
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-expanded={flyout ? hovered === item.label : undefined}
                        aria-controls={flyout ? flyoutId : undefined}
                        onClick={(event) => {
                          if (flyout && window.matchMedia("(max-width: 767px)").matches) {
                            event.preventDefault();
                            setHovered((current) => (current === item.label ? null : item.label));
                            return;
                          }
                          onClose();
                        }}
                        onMouseEnter={() => setHovered(item.label)}
                        onFocus={() => setHovered(item.label)}
                        className={cn(
                          familjen.className,
                          "block py-1 text-[clamp(1.15rem,2.2vw,1.85rem)] font-normal tracking-[-0.07em] transition-colors duration-300 md:text-right",
                          isActive ? "menu-link-on" : "menu-link-dim"
                        )}
                      >
                        {item.label}
                      </Link>

                      {flyout ? (
                        <AnimatePresence>
                          {hovered === item.label ? (
                            <motion.div
                              id={flyoutId}
                              key={flyoutId}
                              initial={{ opacity: 0, x: 18 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 12 }}
                              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                              className="z-20 w-max md:absolute md:right-full md:top-1/2 md:block md:max-h-[70vh] md:-translate-y-1/2 md:overflow-y-auto md:pr-12"
                            >
                              <ul className="mt-2 flex w-max flex-col items-start gap-0.5 border-l border-white/15 pl-4 md:mt-0 md:items-end md:border-l-0 md:border-r md:pl-0 md:pr-5">
                                {flyout.map((sub, subIndex) => {
                                  const subActive = pathname === sub.href;
                                  return (
                                    <motion.li
                                      key={sub.href}
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        duration: 0.28,
                                        delay: 0.04 + subIndex * 0.035,
                                        ease: [0.22, 1, 0.36, 1],
                                      }}
                                    >
                                      <Link
                                        href={sub.href}
                                        onClick={onClose}
                                        onFocus={() => setHovered(item.label)}
                                        className={cn(
                                          familjen.className,
                                          "menu-sublink block whitespace-nowrap py-0.5 text-[clamp(1rem,1.5vw,1.35rem)] font-normal tracking-[-0.04em] md:text-right",
                                          subActive && "menu-link-on"
                                        )}
                                      >
                                        {sub.label}
                                      </Link>
                                    </motion.li>
                                  );
                                })}
                              </ul>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      ) : null}
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            <div className="flex shrink-0 items-end justify-between px-8 pb-7 md:px-16 lg:px-24">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">Copyright</p>
                <p className="mt-1 text-[13px] text-white/85">© {new Date().getFullYear()} Entersoft</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">Design</p>
                <p className="mt-1 text-[13px] text-white/85">Entersoft</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
