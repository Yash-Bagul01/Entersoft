"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { Familjen_Grotesk } from "next/font/google";
import { testimonials } from "@/data/testimonials";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const FEATURED = testimonials.slice(0, 5);

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5.474 8.652V6.552L8.33 3.752V4.9L5.474 2.1V0L9.324 3.836V4.816L5.474 8.652ZM0 5.11V3.542H8.61V5.11H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="14" height="6" viewBox="0 0 14 6" fill="none" aria-hidden="true" className="w-3.5 h-1.5">
      <path
        d="M3.66 5.58C3.487 5.18 3.307 4.827 3.12 4.52C2.933 4.2 2.747 3.927 2.56 3.7H13.94V2.62H2.56C2.747 2.38 2.933 2.107 3.12 1.8C3.307 1.48 3.487 1.127 3.66 0.74H2.72C1.88 1.713 0.993 2.433 0.06 2.9V3.42C0.993 3.873 1.88 4.593 2.72 5.58H3.66Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="6" viewBox="0 0 14 6" fill="none" aria-hidden="true" className="w-3.5 h-1.5">
      <path
        d="M10.34 5.58C10.513 5.18 10.693 4.827 10.88 4.52C11.067 4.2 11.253 3.927 11.44 3.7H0.06V2.62H11.44C11.253 2.38 11.067 2.107 10.88 1.8C10.693 1.48 10.513 1.127 10.34 0.74H11.28C12.12 1.713 13.007 2.433 13.94 2.9V3.42C13.007 3.873 12.12 4.593 11.28 5.58H10.34Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const item = FEATURED[active];

  const go = useCallback((index: number) => {
    setActive((index + FEATURED.length) % FEATURED.length);
  }, []);

  return (
    <section
      id="operational-validation"
      className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500"
    >
      <div className="mx-auto w-full max-w-[1440px] px-9 min-h-[100dvh] py-20 lg:py-[9.375rem]">
        <div className="grid grid-cols-12 gap-6">
          <h2
            className={cn(
              familjen.className,
              "col-span-12 sm:col-span-6 lg:col-span-5 lg:col-start-2",
              "text-[clamp(2.75rem,5.94vw,5.344rem)] font-normal leading-[0.95] tracking-[-0.06em] text-[var(--text-primary)]"
            )}
          >
            Operational Validation
          </h2>
          <div className="col-span-12 sm:col-span-6 lg:col-span-5 flex flex-col justify-end">
            <p className="font-sans text-[16.2px] font-normal leading-[20px] text-[var(--text-primary)]">
              Great work is built through
              <br />
              partnership. Here&apos;s what
              <br />
              our clients say.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="relative my-10 lg:my-20 col-span-12 lg:col-span-10 lg:col-start-2">
            <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[var(--text-primary)]/15" />
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              className="relative mx-auto block h-4 w-4 lg:h-[13px] lg:w-[13px] bg-[var(--bg-primary)]"
              aria-hidden="true"
            >
              <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="currentColor" strokeWidth="1" />
              <line x1="0" y1="6.5" x2="13" y2="6.5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="flex flex-col justify-between col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2 order-2 md:order-1 md:min-h-[420px]">
            <div className="hidden md:flex flex-col gap-4">
              {FEATURED.map((entry, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    aria-label={`Show testimonial from ${entry.company}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => go(index)}
                    className={cn(
                      familjen.className,
                      "flex items-center gap-4 bg-transparent border-0 p-0 text-left uppercase text-[15.3px] leading-none tracking-[-0.02em] text-[var(--text-primary)] transition-opacity duration-500 ease-in-out cursor-pointer",
                      isActive ? "opacity-100" : "opacity-30 hover:opacity-100"
                    )}
                  >
                    {entry.company}
                    <ArrowIcon
                      className={cn(
                        "w-2.5 h-2.5 shrink-0 transition-opacity duration-500",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex mt-10 md:mt-16">
              <button
                type="button"
                aria-label="Previous client story"
                onClick={() => go(active - 1)}
                className="stories-arrow left"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                aria-label="Next client story"
                onClick={() => go(active + 1)}
                className="stories-arrow right -ml-px"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-5 order-1 md:order-2 mb-10 md:mb-0">
            <p
              className={cn(
                familjen.className,
                "md:hidden mb-6 uppercase text-[15.3px] leading-none tracking-[-0.02em] text-[var(--text-primary)]"
              )}
            >
              {item.company}
            </p>

            <div key={item.id} className="stories-quote-in">
              <blockquote
                className={cn(
                  familjen.className,
                  "m-0 mb-10 md:mb-20 text-[clamp(1.35rem,2.25vw,2.025rem)] font-normal leading-none tracking-[-0.04em] text-[var(--text-primary)]"
                )}
              >
                {item.quote}
              </blockquote>

              <div className="flex items-end justify-between gap-6">
                <div className="flex items-end min-w-0">
                  <div
                    className={cn(
                      "w-14 h-14 md:w-20 md:h-20 overflow-hidden rounded-sm mr-4 md:mr-6 shrink-0 flex items-center justify-center text-white font-mono text-sm font-semibold bg-gradient-to-br",
                      item.avatarColor || "from-blue-500 to-indigo-600"
                    )}
                    aria-hidden="true"
                  >
                    {item.initials}
                  </div>
                  <div className="min-w-0 pb-0.5">
                    <p className="font-sans text-[16.2px] font-normal leading-[20px] text-[var(--text-primary)] md:mb-1">
                      {item.author}
                    </p>
                    <p className="font-sans text-[16.2px] font-normal leading-[20px] text-[var(--text-primary)] opacity-60">
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href={ROUTES.contact}
              className="stories-cta mt-10 md:mt-[2.15rem]"
            >
              <span>Become a Client</span>
              <ArrowIcon className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
