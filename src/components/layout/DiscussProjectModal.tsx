"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Familjen_Grotesk } from "next/font/google";
import gsap from "gsap";
import { services } from "@/data/services";
import { ROUTES } from "@/config/routes";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { cn } from "@/lib/utils";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const SERVICE_OPTIONS = [
  ...services.map((s) => s.plainLanguageTitle),
  "EnProbe platform demo",
  "Something else",
];

const BUDGETS = [
  "Scoping conversation",
  "Single assessment",
  "Programme (3–6 months)",
  "Continuous retainer",
  "Not sure yet",
];


type Props = {
  open: boolean;
  onClose: () => void;
};

export default function DiscussProjectModal({ open, onClose }: Props) {
  const lenis = useSmoothScroll();
  const rootRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [details, setDetails] = useState("");
  const [budget, setBudget] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => setMounted(true), []);

  const seenOpen = useRef(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const sheet = sheetRef.current;
    if (!root || !sheet) return;

    if (open) {
      seenOpen.current = true;
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      gsap.set(root, { autoAlpha: 1, pointerEvents: "auto" });
      gsap.fromTo(root.querySelector("[data-veil]"), { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(
        sheet,
        { yPercent: 100, borderRadius: "48px 48px 0 0" },
        { yPercent: 0, borderRadius: "28px 28px 0 0", duration: 0.85, ease: "expo.out" }
      );
      gsap.fromTo(
        sheet.querySelectorAll("[data-rise]"),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.045, delay: 0.18, ease: "power3.out" }
      );
      return;
    }

    if (!seenOpen.current) {
      gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(sheet, { yPercent: 100 });
      return;
    }

    gsap.to(sheet, { yPercent: 100, duration: 0.55, ease: "power3.in" });
    gsap.to(root.querySelector("[data-veil]"), {
      opacity: 0,
      duration: 0.4,
      delay: 0.1,
      onComplete: () => {
        gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
        document.documentElement.style.overflow = "";
        lenis?.start();
      },
    });
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const scroller = rootRef.current?.querySelector<HTMLElement>(".discuss-modal-scroll");
    const keepWheel = (e: WheelEvent | TouchEvent) => {
      e.stopPropagation();
    };
    window.addEventListener("keydown", onKey);
    scroller?.addEventListener("wheel", keepWheel, { passive: true });
    scroller?.addEventListener("touchmove", keepWheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      scroller?.removeEventListener("wheel", keepWheel);
      scroller?.removeEventListener("touchmove", keepWheel);
    };
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || details.trim().length < 20) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      ref={rootRef}
      className="discuss-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="discuss-title"
      style={{ visibility: "hidden" }}
    >
      <button type="button" className="discuss-modal-veil" data-veil aria-label="Close" onClick={onClose} />
      <div ref={sheetRef} className="discuss-modal-sheet">
        <button type="button" className="discuss-modal-close" onClick={onClose} aria-label="Close">
          Close
        </button>
        <div
          className="discuss-modal-scroll"
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
        >

        {sent ? (
          <div className="mx-auto flex min-h-full max-w-[720px] flex-col justify-center px-6 py-20 text-center" data-rise>
            <p className="discuss-kicker">Request received</p>
            <h2 id="discuss-title" className={cn(familjen.className, "discuss-title mt-4")}>
              We will be in touch.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#c8c6c0]">
              Thank you, {name}. An Entersoft coordinator will reply to {email} within one business day.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mx-auto grid max-w-[1100px] gap-12 px-6 py-16 md:grid-cols-12 md:px-10 md:py-20">
            <div className="md:col-span-5" data-rise>
              <p className="discuss-kicker">Let&apos;s talk</p>
              <h2 id="discuss-title" className={cn(familjen.className, "discuss-title mt-4")}>
                Let&apos;s build something great.
              </h2>
              <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-[#c8c6c0]">
                Tell us about your programme. We usually reply within one business day.
              </p>
              <a href={ROUTES.booking} className="discuss-line-link mt-8">
                Book a 30-minute call →
              </a>
            </div>

            <div className="flex flex-col gap-7 md:col-span-7">
              <label className="discuss-field" data-rise>
                <span>Enter your name</span>
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </label>
              <label className="discuss-field" data-rise>
                <span>Enter a valid email</span>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" />
              </label>

              <div className="discuss-field" data-rise>
                <span>Select a service</span>
                <button type="button" className="discuss-select" onClick={() => { setServiceOpen((v) => !v); setBudgetOpen(false); }}>
                  {service || "Select a service"}
                  <em>{serviceOpen ? "–" : "+"}</em>
                </button>
                {serviceOpen ? (
                  <ul className="discuss-options">
                    {SERVICE_OPTIONS.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => {
                            setService(item);
                            setServiceOpen(false);
                          }}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <label className="discuss-field" data-rise>
                <span>Tell us about your project</span>
                <textarea
                  required
                  minLength={20}
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Minimum 20 characters"
                />
              </label>

              <div className="discuss-field" data-rise>
                <span>Select a budget</span>
                <button type="button" className="discuss-select" onClick={() => { setBudgetOpen((v) => !v); setServiceOpen(false); }}>
                  {budget || "Select your estimated budget"}
                  <em>{budgetOpen ? "–" : "+"}</em>
                </button>
                {budgetOpen ? (
                  <ul className="discuss-options">
                    {BUDGETS.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => {
                            setBudget(item);
                            setBudgetOpen(false);
                          }}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2" data-rise>
                <button type="submit" className="discuss-submit" disabled={sending}>
                  {sending ? "Sending…" : "Send inquiry"}
                </button>
                <a href="mailto:hello@entersoftsecurity.com" className="text-[13px] text-[#c8c6c0]">
                  Prefer email? hello@entersoftsecurity.com
                </a>
              </div>
            </div>
          </form>
        )}
        </div>
      </div>
    </div>,
    document.body
  );
}
