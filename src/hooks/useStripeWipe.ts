"use client";

import { useLayoutEffect, useState, type RefObject } from "react";
import gsap from "gsap";
import { isTouchFirst, viewportHeight } from "@/lib/viewport";

type StripeWipeOptions = {
  /** When false, stripes wipe and the incoming sheet is already in place. */
  slideSheet?: boolean;
  /** Pin the incoming sheet to the viewport during the second half of the wipe. */
  coverIncoming?: boolean;
};

export function useStripeWipe(
  rootRef: RefObject<HTMLElement | null>,
  stripesRef: RefObject<HTMLElement | null>,
  sheetRef: RefObject<HTMLElement | null>,
  reduce: boolean,
  options?: StripeWipeOptions
) {
  const slideSheet = options?.slideSheet !== false;
  const coverIncoming = options?.coverIncoming === true;
  // Phones have no stripes and no section overlap, so sliding the sheet only opens an empty band.
  const [phone, setPhone] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stripes = stripesRef.current;
    const sheet = sheetRef.current;
    if (!root || !stripes || !sheet) return;

    if (reduce || phone) {
      // yPercent is zeroed first: GSAP caches it, and the footer's tween on this sheet would re-apply it.
      gsap.set(sheet, { yPercent: 0 });
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
    if (slideSheet) {
      wipe.fromTo(sheet, { yPercent: 42 }, { yPercent: 0, duration: 0.72, ease: "none" }, 0.22);
    } else {
      gsap.set(sheet, { yPercent: 0 });
    }

    const releaseSheet = () => {
      root.style.minHeight = "";
      gsap.set(sheet, { clearProps: "position,top,left,right,width,zIndex,y" });
    };

    const coverSheet = () => {
      if (!root.dataset.sheetH) root.dataset.sheetH = String(sheet.offsetHeight);
      root.style.minHeight = `${root.dataset.sheetH}px`;
      gsap.set(sheet, {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        y: 0,
        zIndex: 5,
      });
    };

    let lastHold = -1;
    const drive = () => {
      const holdT = gsap.utils.clamp(0, 1, 1 - root.getBoundingClientRect().top / viewportHeight());
      if (holdT === lastHold) return;
      lastHold = holdT;
      wipe.progress(holdT);

      if (!slideSheet) {
        if (coverIncoming) {
          if (holdT >= 0.62 && holdT < 1) coverSheet();
          else releaseSheet();
        }
        gsap.set(stripes, { autoAlpha: holdT > 0 && holdT < 1 ? 1 : 0 });
      } else {
        gsap.set(stripes, { autoAlpha: holdT > 0 && holdT < 0.98 ? 1 : 0 });
      }
    };

    gsap.ticker.add(drive);
    // Native (touch) scrolling is already current when the ticker runs, so one call per frame suffices.
    if (!isTouchFirst()) window.addEventListener("scroll", drive, { passive: true });
    drive();

    return () => {
      gsap.ticker.remove(drive);
      window.removeEventListener("scroll", drive);
      wipe.kill();
      delete root.dataset.sheetH;
      root.style.minHeight = "";
      gsap.set(sheet, { clearProps: "transform,position,top,left,right,width,zIndex,y" });
      gsap.set(stripes, { clearProps: "opacity,visibility" });
    };
  }, [rootRef, stripesRef, sheetRef, reduce, phone, slideSheet, coverIncoming]);
}
