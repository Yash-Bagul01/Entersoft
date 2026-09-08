"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Familjen_Grotesk } from "next/font/google";
import { Button } from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import { platformPillars } from "@/data/platform";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useStripeWipe } from "@/hooks/useStripeWipe";
import StripeWipeBars from "@/components/ui/StripeWipeBars";
import { cn } from "@/lib/utils";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const pillar = platformPillars["attack-surface-management"];

export default function AsmManifesto() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const stripesRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  useStripeWipe(rootRef, stripesRef, sheetRef, reduce);

  return (
    <section id="asm-manifesto" ref={rootRef} className="relative z-[5] w-full bg-transparent">
      <div
        ref={stripesRef}
        className="pointer-events-none fixed inset-0 z-[15] hidden flex-col md:flex"
        aria-hidden="true"
      >
        <StripeWipeBars />
      </div>
      <div
        ref={sheetRef}
        className="ov-sheet relative z-[7] flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[var(--bg-primary)] px-6 py-24 text-center md:px-12"
      >
        <div className="flex max-w-[1150px] flex-col items-center gap-6 text-center md:gap-8">
          <SectionLabel color="secondary">Exposure discipline</SectionLabel>
          <h2
            className={cn(
              familjen.className,
              "max-w-[16ch] text-[clamp(2.6rem,7vw,6.4rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-[var(--text-primary)]"
            )}
          >
            {pillar.coreCapability}.
          </h2>
          <p className="max-w-[42ch] text-[16px] leading-relaxed text-[var(--text-secondary)]">{pillar.summary}</p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 flex flex-col items-center gap-4"
          >
            <Button variant="secondary" size="md" asLink href="#asm-gallery" className="gap-2">
              Explore the map <span className="font-sans">↓</span>
            </Button>
            <span
              className="text-[10px] tracking-[0.3em] text-[#5c5c5c]/70 uppercase"
              style={{ fontFamily: "var(--font-ibm-plex-mono), ui-monospace, monospace" }}
            >
              Scroll to map exposure
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
