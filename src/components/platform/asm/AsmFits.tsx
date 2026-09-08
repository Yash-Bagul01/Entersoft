"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Familjen_Grotesk } from "next/font/google";
import { platformPillars } from "@/data/platform";
import { ROUTES } from "@/config/routes";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useStripeWipe } from "@/hooks/useStripeWipe";
import StripeWipeBars from "@/components/ui/StripeWipeBars";
import { cn } from "@/lib/utils";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const pillar = platformPillars["attack-surface-management"];

const FITS = [
  {
    ...pillar.whereItFits[0],
    href: ROUTES.services.siem,
  },
  {
    ...pillar.whereItFits[1],
    href: ROUTES.services.cloud,
  },
];

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg width="10" height="9" viewBox="0 0 10 9" fill="none" className={className} aria-hidden="true">
      <path
        d="M5.474 8.652V6.552L8.33 3.752V4.9L5.474 2.1V0L9.324 3.836V4.816L5.474 8.652ZM0 5.11V3.542H8.61V5.11H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="14" height="6" viewBox="0 0 14 6" fill="none" aria-hidden="true" className="h-1.5 w-3.5">
      <path
        d="M3.66 5.58C3.487 5.18 3.307 4.827 3.12 4.52C2.933 4.2 2.747 3.927 2.56 3.7H13.94V2.62H2.56C2.747 2.38 2.933 2.107 3.12 1.8C3.307 1.48 3.487 1.127 3.66 0.74H2.72C1.88 1.713 0.993 2.433 0.06 2.9V3.42C0.993 3.873 1.88 4.593 2.72 5.58H3.66Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="6" viewBox="0 0 14 6" fill="none" aria-hidden="true" className="h-1.5 w-3.5">
      <path
        d="M10.34 5.58C10.513 5.18 10.693 4.827 10.88 4.52C11.067 4.2 11.253 3.927 11.44 3.7H0.06V2.62H11.44C11.253 2.38 11.067 2.107 10.88 1.8C10.693 1.48 10.513 1.127 10.34 0.74H11.28C12.12 1.713 13.007 2.433 13.94 2.9V3.42C13.007 3.873 12.12 4.593 11.28 5.58H10.34Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function AsmFits() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const stripesRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const item = FITS[active];

  useStripeWipe(rootRef, stripesRef, sheetRef, reduce);

  const go = useCallback((index: number) => {
    setActive((index + FITS.length) % FITS.length);
  }, []);

  return (
    <section
      id="asm-fits"
      ref={rootRef}
      className="relative z-[5] w-full bg-transparent text-[var(--text-primary)] md:-mt-[100vh]"
    >
      <div
        ref={stripesRef}
        className="pointer-events-none fixed inset-0 z-[6] hidden flex-col md:flex"
        aria-hidden="true"
      >
        <StripeWipeBars />
      </div>
      <div ref={sheetRef} className="ov-sheet relative z-[7] w-full overflow-hidden bg-[var(--bg-primary)]">
        <div className="mx-auto min-h-[100dvh] w-full max-w-[1440px] px-9 py-20 lg:py-[9.375rem]">
          <div className="grid grid-cols-12 gap-6">
            <h2
              className={cn(
                familjen.className,
                "col-span-12 text-[clamp(2.75rem,5.94vw,5.344rem)] font-normal leading-[0.95] tracking-[-0.06em] text-[var(--text-primary)] sm:col-span-6 lg:col-span-5 lg:col-start-2"
              )}
            >
              Where it fits
            </h2>
            <div className="col-span-12 flex flex-col justify-end sm:col-span-6 lg:col-span-5">
              <p className="font-sans text-[16.2px] font-normal leading-[20px] text-[var(--text-primary)]">
                EnProbe visibility feeds
                <br />
                Entersoft practices so
                <br />
                exposure becomes action.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="relative col-span-12 my-10 lg:col-span-10 lg:col-start-2 lg:my-20">
              <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[var(--text-primary)]/15" />
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                className="relative mx-auto block h-4 w-4 bg-[var(--bg-primary)] lg:h-[13px] lg:w-[13px]"
                aria-hidden="true"
              >
                <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="currentColor" strokeWidth="1" />
                <line x1="0" y1="6.5" x2="13" y2="6.5" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="order-2 col-span-12 flex flex-col justify-between md:order-1 md:col-span-6 md:min-h-[280px] lg:col-span-5 lg:col-start-2">
              <div className="hidden flex-col gap-4 md:flex">
                {FITS.map((entry, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={entry.serviceName}
                      type="button"
                      aria-label={`Show how it fits ${entry.serviceName}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => go(index)}
                      className={cn(
                        familjen.className,
                        "flex cursor-pointer items-center gap-4 border-0 bg-transparent p-0 text-left text-[15.3px] leading-none tracking-[-0.02em] text-[var(--text-primary)] uppercase transition-opacity duration-500",
                        isActive ? "opacity-100" : "opacity-30 hover:opacity-100"
                      )}
                    >
                      {entry.serviceName}
                      <ArrowIcon
                        className={cn(
                          "h-2.5 w-2.5 shrink-0 transition-opacity duration-500",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 flex md:mt-16">
                <button
                  type="button"
                  aria-label="Previous practice"
                  onClick={() => go(active - 1)}
                  className="stories-arrow left"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  aria-label="Next practice"
                  onClick={() => go(active + 1)}
                  className="stories-arrow right -ml-px"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>

            <div className="order-1 col-span-12 mb-10 md:order-2 md:col-span-6 md:mb-0 lg:col-span-5">
              <p
                className={cn(
                  familjen.className,
                  "mb-6 text-[15.3px] leading-none tracking-[-0.02em] text-[var(--text-primary)] uppercase md:hidden"
                )}
              >
                {item.serviceName}
              </p>
              <div key={item.serviceName} className="stories-quote-in">
                <blockquote
                  className={cn(
                    familjen.className,
                    "m-0 mb-10 text-[clamp(1.35rem,2.25vw,2.025rem)] font-normal leading-none tracking-[-0.04em] text-[var(--text-primary)] md:mb-20"
                  )}
                >
                  {item.description}
                </blockquote>
              </div>
              <Link href={item.href} className="stories-cta mt-10 md:mt-[2.15rem]">
                <span>View practice</span>
                <ArrowIcon className="h-2.5 w-2.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
