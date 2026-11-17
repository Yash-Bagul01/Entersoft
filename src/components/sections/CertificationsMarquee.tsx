"use client";

import React, { useRef } from "react";
import { Familjen_Grotesk } from "next/font/google";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useStripeWipe } from "@/hooks/useStripeWipe";
import StripeWipeBars from "@/components/ui/StripeWipeBars";
import { cn } from "@/lib/utils";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function CertificationsMarquee() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const stripesRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  useStripeWipe(rootRef, stripesRef, sheetRef, reduce);

  return (
    <section
      id="certifications"
      ref={rootRef}
      className="relative z-[5] w-full bg-[#111111] text-[#f3f2ee] md:-mt-[100vh]"
    >
      <div
        ref={stripesRef}
        className="pointer-events-none fixed inset-0 z-[6] hidden flex-col md:flex"
        aria-hidden="true"
      >
        <StripeWipeBars />
      </div>
      <div
        ref={sheetRef}
        className="ov-sheet relative z-[7] w-full min-h-[100svh] overflow-hidden bg-[#111111]"
      >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="max-w-[720px]">
          <h2
            className={cn(
              familjen.className,
              "max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.6rem)] font-normal leading-[0.92] tracking-[-0.055em] text-white"
            )}
          >
            Current applicable credentials available during supplier due diligence.
          </h2>
        </div>
      </div>
      </div>
    </section>
  );
}
