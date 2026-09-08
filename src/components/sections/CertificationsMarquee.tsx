"use client";

import React, { useRef } from "react";
import { Familjen_Grotesk } from "next/font/google";
import { certifications } from "@/data/certifications";
import { ROUTES } from "@/config/routes";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useStripeWipe } from "@/hooks/useStripeWipe";
import StripeWipeBars from "@/components/ui/StripeWipeBars";
import { cn } from "@/lib/utils";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const ICON_COLORS = {
  "cert-in": "#7CFF6B",
  crest: "#FF7A2F",
  iso27001: "#1F6B63",
  gdpr: "#2F7CFF",
} as const;

const MARKS = [
  { src: "/images/track-record/certin.png", label: "CERT-In" },
  { src: "/images/track-record/crest.png", label: "CREST" },
  { src: "/images/track-record/iso.png", label: "ISO/IEC 27001" },
  { src: null, label: "GDPR" },
] as const;

function markFor(id: string) {
  if (id === "cert-in") return "CI";
  if (id === "crest") return "CR";
  if (id === "iso27001") return "ISO";
  return "EU";
}

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
        className="ov-sheet relative z-[7] w-full min-h-[100dvh] overflow-hidden bg-[#111111]"
      >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="max-w-[720px]">
          <h2
            className={cn(
              familjen.className,
              "text-[clamp(2.4rem,5.4vw,4.6rem)] font-normal leading-[0.92] tracking-[-0.055em] text-white"
            )}
          >
            Accredited Security Compliance
          </h2>
          <p
            className={cn(
              familjen.className,
              "mt-5 max-w-[42ch] text-[clamp(1rem,1.4vw,1.2rem)] font-normal leading-[1.35] tracking-[-0.02em] text-white/50"
            )}
          >
            Independently verified credentials used across Entersoft practices, audits, and enterprise programmes.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:border-t-0">
          {certifications.map((cert, index) => (
            <article
              key={cert.id}
              className={cn(
                "flex flex-col border-white/10 py-10 lg:py-0 lg:pr-8",
                index === 0 ? "lg:border-l lg:pl-8" : "lg:border-l lg:pl-8",
                "border-b last:border-b-0 sm:[&:nth-child(2)]:border-r-0 lg:border-b-0 lg:border-r-0"
              )}
            >
              <span
                className="cert-mark flex h-11 w-11 items-center justify-center rounded-[6px] text-[13px] font-semibold tracking-[-0.04em] text-[#111111]"
                style={{
                  backgroundColor: ICON_COLORS[cert.id as keyof typeof ICON_COLORS] || "#7CFF6B",
                  fontFamily: "var(--font-ibm-plex-mono), ui-monospace, monospace",
                }}
              >
                {markFor(cert.id)}
              </span>
              <h3
                className={cn(
                  familjen.className,
                  "mt-8 text-[clamp(1.35rem,1.8vw,1.7rem)] font-normal leading-[1.15] tracking-[-0.03em] text-white"
                )}
              >
                {cert.name}
              </h3>
              <p className="cert-copy mt-4 text-[14.5px] leading-[1.55] text-white/48">{cert.description}</p>
              <p
                className="cert-meta mt-6 text-[11px] uppercase tracking-[0.16em] text-white/32"
                style={{ fontFamily: "var(--font-ibm-plex-mono), ui-monospace, monospace" }}
              >
                {cert.authority}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-10 md:mt-20">
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-8">
            {MARKS.map((mark) =>
              mark.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={mark.label}
                  src={mark.src}
                  alt={mark.label}
                  className="h-7 w-auto max-w-[140px] object-contain opacity-70 brightness-0 invert md:h-8"
                />
              ) : (
                <span
                  key={mark.label}
                  className={cn(
                    familjen.className,
                    "text-[1.15rem] tracking-[-0.04em] text-white/55"
                  )}
                >
                  {mark.label}
                </span>
              )
            )}
            <a
              href={ROUTES.company.accreditations}
              className="text-[11px] uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-white"
              style={{ fontFamily: "var(--font-ibm-plex-mono), ui-monospace, monospace" }}
            >
              View credentials →
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
