"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";

export function useStripeWipe(
  rootRef: RefObject<HTMLElement | null>,
  stripesRef: RefObject<HTMLElement | null>,
  sheetRef: RefObject<HTMLElement | null>,
  reduce: boolean
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    const stripes = stripesRef.current;
    const sheet = sheetRef.current;
    if (!root || !stripes || !sheet) return;

    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (!desktop || reduce) {
      gsap.set(sheet, { clearProps: "transform" });
      gsap.set(stripes, { autoAlpha: 0 });
      return;
    }

    const bars = Array.from(stripes.querySelectorAll<HTMLElement>("[data-ov-stripe]"));
    const wipe = gsap.timeline({ paused: true });
    bars
      .slice()
      .reverse()
      .forEach((bar, i) => {
        wipe.fromTo(
          bar,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.42, ease: "none", transformOrigin: "50% 50%", force3D: true },
          i * 0.048
        );
      });
    wipe.fromTo(sheet, { yPercent: 42 }, { yPercent: 0, duration: 0.72, ease: "none" }, 0.22);

    const drive = () => {
      const holdT = gsap.utils.clamp(0, 1, 1 - root.getBoundingClientRect().top / window.innerHeight);
      wipe.progress(holdT);
      gsap.set(stripes, { autoAlpha: holdT > 0 && holdT < 0.98 ? 1 : 0 });
    };

    gsap.ticker.add(drive);
    window.addEventListener("scroll", drive, { passive: true });
    drive();

    return () => {
      gsap.ticker.remove(drive);
      window.removeEventListener("scroll", drive);
      wipe.kill();
      gsap.set(sheet, { clearProps: "transform" });
      gsap.set(stripes, { clearProps: "opacity,visibility" });
    };
  }, [rootRef, stripesRef, sheetRef, reduce]);
}
