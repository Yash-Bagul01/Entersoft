"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type HoverType = "default" | "button" | "link" | "card" | "text" | "section";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const posRef = useRef({ x: -100, y: -100 });
  const innerRef = useRef({ x: -100, y: -100 });
  const outerRef = useRef({ x: -100, y: -100 });
  const scaleRef = useRef(1);
  const renderScaleRef = useRef(1);
  const hoverTypeRef = useRef<HoverType>("default");
  const isVisibleRef = useRef(false);
  const initializedRef = useRef(false);

  // Check pointer capability on mount
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    setIsFinePointer(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Main high-performance cursor loop with Direct DOM updates
  useEffect(() => {
    if (!mounted || !isFinePointer || shouldReduceMotion) return;

    document.body.classList.add("custom-cursor-active");

    const updateClasses = (type: HoverType) => {
      if (dotRef.current) {
        dotRef.current.className = `custom-cursor-dot custom-cursor-dot--${type}`;
      }
      if (ringRef.current) {
        ringRef.current.className = `custom-cursor custom-cursor-ring custom-cursor-ring--${type}`;
      }
    };

    const handleMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (!initializedRef.current) {
        posRef.current = { x: clientX, y: clientY };
        innerRef.current = { x: clientX, y: clientY };
        outerRef.current = { x: clientX, y: clientY };
        initializedRef.current = true;
      } else {
        posRef.current = { x: clientX, y: clientY };
      }

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const textInput = target.closest("input, textarea, select, [contenteditable='true']");
      const interactive = target.closest("a, button, [data-cursor], [role='button'], .btn, .service-card, summary");
      const section = target.closest("section, footer, header, main, nav");

      let type: HoverType = "default";

      if (textInput) {
        type = "text";
      } else if (interactive) {
        const cursorData = interactive.getAttribute("data-cursor");
        if (cursorData === "view" || cursorData === "drag" || cursorData === "card") {
          type = "card";
        } else if (
          interactive.tagName === "BUTTON" ||
          interactive.classList.contains("btn") ||
          interactive.getAttribute("role") === "button"
        ) {
          type = "button";
        } else {
          type = "link";
        }
      } else if (section) {
        type = "section";
      }

      if (hoverTypeRef.current !== type) {
        hoverTypeRef.current = type;
        updateClasses(type);
      }
    };

    const handleMouseDown = () => {
      scaleRef.current = 0.85;
    };

    const handleMouseUp = () => {
      scaleRef.current = 1.0;
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    let rafId: number;
    const LERP_INNER = 0.45; // Snappier, zero-lag dot tracking
    const LERP_OUTER = 0.14; // Smooth fluid trailing ring
    const LERP_SCALE = 0.22; // Responsive scale ease

    const tick = () => {
      if (isVisibleRef.current && dotRef.current && ringRef.current) {
        // Inner dot LERP
        innerRef.current.x += (posRef.current.x - innerRef.current.x) * LERP_INNER;
        innerRef.current.y += (posRef.current.y - innerRef.current.y) * LERP_INNER;

        // Outer ring LERP
        outerRef.current.x += (posRef.current.x - outerRef.current.x) * LERP_OUTER;
        outerRef.current.y += (posRef.current.y - outerRef.current.y) * LERP_OUTER;

        // Compute base scale targets for the outer ring
        let baseScale = 1;
        if (hoverTypeRef.current === "button") baseScale = 1.4;
        else if (hoverTypeRef.current === "link") baseScale = 1.25;
        else if (hoverTypeRef.current === "card") baseScale = 1.5;
        else if (hoverTypeRef.current === "text") baseScale = 0.7;
        else if (hoverTypeRef.current === "section") baseScale = 1.05;

        const targetScale = baseScale * scaleRef.current;
        renderScaleRef.current += (targetScale - renderScaleRef.current) * LERP_SCALE;

        // Hardware-accelerated direct transform updates (0 React re-renders)
        dotRef.current.style.transform = `translate3d(${innerRef.current.x}px, ${innerRef.current.y}px, 0) translate(-50%, -50%)`;
        ringRef.current.style.transform = `translate3d(${outerRef.current.x}px, ${outerRef.current.y}px, 0) translate(-50%, -50%) scale(${renderScaleRef.current})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [mounted, isFinePointer, shouldReduceMotion]);

  if (!mounted || !isFinePointer || shouldReduceMotion) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot custom-cursor-dot--default"
        style={{ opacity: 0 }}
      />
      <div
        ref={ringRef}
        className="custom-cursor custom-cursor-ring custom-cursor-ring--default"
        style={{ opacity: 0 }}
      />
    </>
  );
}
