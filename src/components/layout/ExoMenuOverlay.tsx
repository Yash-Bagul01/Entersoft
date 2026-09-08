"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Familjen_Grotesk } from "next/font/google";
import { ROUTES } from "@/config/routes";
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
  { label: "Platform", href: ROUTES.platform.enprobe },
  { label: "Services", href: "/#services" },
  { label: "Solutions", href: ROUTES.solutions },
];

const SECONDARY_ITEMS = [
  { label: "Industries", href: "/#services" },
  { label: "Resources", href: "/#insights" },
  { label: "Company", href: ROUTES.company.accreditations },
  { label: "Accreditations", href: ROUTES.company.accreditations },
  { label: "Contact Us", href: ROUTES.contact },
];

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
                  return (
                    <motion.div
                      key={item.label}
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
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        onMouseEnter={() => setHovered(item.label)}
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
                    </motion.div>
                  );
                })}
              </nav>

              <nav className="flex flex-col items-start gap-1 md:items-end">
                {SECONDARY_ITEMS.map((item, idx) => {
                  const isActive = activeLabel === item.label;
                  return (
                    <motion.div
                      key={item.label}
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
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        onMouseEnter={() => setHovered(item.label)}
                        className={cn(
                          familjen.className,
                          "block py-1 text-[clamp(1.15rem,2.2vw,1.85rem)] font-normal tracking-[-0.07em] transition-colors duration-300 md:text-right",
                          isActive ? "menu-link-on" : "menu-link-dim"
                        )}
                      >
                        {item.label}
                      </Link>
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
