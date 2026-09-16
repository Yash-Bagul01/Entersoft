"use client";

import React, { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";

const LERP = 0.1;

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

export default function HeroCursor({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lenis = useSmoothScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!mounted || !container || !cursor) return;

    const canHover = window.matchMedia("(hover: hover)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || !finePointer || reduceMotion) return;

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let visible = false;
    let hovering = false;
    let seeded = false;
    let hasPointer = false;
    let rafId = 0;

    const setHover = (next: boolean) => {
      if (hovering === next) return;
      hovering = next;
      cursor.classList.toggle("is-hover", next);
    };

    const show = () => {
      if (visible) return;
      visible = true;
      cursor.classList.add("is-visible");
    };

    const hide = () => {
      if (!visible) return;
      visible = false;
      seeded = false;
      setHover(false);
      cursor.classList.remove("is-visible");
    };

    const isOverHero = (x: number, y: number) => {
      const rect = container.getBoundingClientRect();
      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
        return false;
      }

      const el = document.elementFromPoint(x, y);
      if (!el) return false;
      if (cursor.contains(el)) return true;
      return container.contains(el);
    };

    const syncFromPointer = (hitTarget?: EventTarget | null) => {
      if (!hasPointer) return;

      const over = isOverHero(pointer.x, pointer.y);
      if (!over) {
        hide();
        return;
      }

      target.x = pointer.x;
      target.y = pointer.y;

      if (!seeded) {
        current.x = pointer.x;
        current.y = pointer.y;
        seeded = true;
      }

      show();

      const node =
        (hitTarget as Element | null) ||
        document.elementFromPoint(pointer.x, pointer.y);
      const hit = node?.closest?.("a, button");
      setHover(Boolean(hit && container.contains(hit)));
    };

    const onMove = (event: MouseEvent) => {
      hasPointer = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      syncFromPointer(event.target);
    };

    const tick = () => {
      if (hasPointer) {
        syncFromPointer();
      }

      current.x = lerp(current.x, target.x, LERP);
      current.y = lerp(current.y, target.y, LERP);
      const half = cursor.offsetWidth / 2;
      cursor.style.transform = `translate3d(${current.x - half}px, ${current.y - half}px, 0)`;
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    const onScroll = () => syncFromPointer();
    window.addEventListener("scroll", onScroll, { passive: true });
    lenis?.on("scroll", onScroll);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      lenis?.off("scroll", onScroll);
      window.cancelAnimationFrame(rafId);
    };
  }, [containerRef, lenis, mounted]);

  if (!mounted) return null;

  return createPortal(
    <div ref={cursorRef} className="hero-cursor" aria-hidden="true">
      <div className="hero-cursor__inner" />
      <span className="hero-cursor__label">Scroll</span>
    </div>,
    document.body,
  );
}
