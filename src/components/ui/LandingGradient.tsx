"use client";

import React, { useEffect, useRef } from "react";
import { viewportHeight } from "@/lib/viewport";

type LandingGradientTone = "light" | "dark" | "theme";

const tracked = new Set<HTMLElement>();
let frame = 0;
let resizeObserver: ResizeObserver | null = null;

/* Keeps every gradient layer pinned to the viewport so the pattern lines up across sections. */
const lastY = new WeakMap<HTMLElement, number>();

function sync() {
  frame = 0;
  const vh = viewportHeight();
  const rects: DOMRect[] = [];
  tracked.forEach((el) => rects.push(el.getBoundingClientRect()));
  let i = 0;
  tracked.forEach((el) => {
    const r = rects[i++];
    // Far off-screen sections drop their animated layers (several screens of GPU texture each).
    const off = r.bottom < -vh * 0.5 || r.top > vh * 1.5;
    if (off !== el.hasAttribute("data-lg-off")) {
      if (off) {
        el.setAttribute("data-lg-off", "");
      } else {
        // The layers restart when shown; a negative delay from the shared clock puts them back in phase.
        const now = Number(document.timeline?.currentTime ?? performance.now());
        el.style.setProperty("--lg-t", `${-now}ms`);
        el.removeAttribute("data-lg-off");
      }
    }
    if (off) return;
    const y = -r.top;
    if (lastY.get(el) === y) return;
    lastY.set(el, y);
    el.style.setProperty("--lg-y", `${y}px`);
  });
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(sync);
}

function track(el: HTMLElement) {
  if (tracked.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);
  }
  tracked.add(el);
  // Starts hidden so every layer is (re)started by sync() on the shared clock and stays in phase.
  el.setAttribute("data-lg-off", "");
  schedule();
}

function untrack(el: HTMLElement) {
  tracked.delete(el);
  if (tracked.size > 0) return;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  resizeObserver?.disconnect();
  resizeObserver = null;
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
}

/* Must sit inside a stacking context (z-index or isolation) so z-index: -1 stays above the host background. */
export default function LandingGradient({ tone = "theme" }: { tone?: LandingGradientTone }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    track(el);
    return () => untrack(el);
  }, []);

  return (
    <div ref={ref} className={`landing-gradient landing-gradient--${tone}`} aria-hidden="true">
      <div className="landing-gradient__flow" />
      <div className="landing-gradient__veil" />
    </div>
  );
}
