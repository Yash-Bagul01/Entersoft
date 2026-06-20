"use client";

import { useEffect, useRef, useState } from "react";

export type HoverType = "default" | "button" | "link" | "card" | "text" | "section";

export function useCursor() {
  const posRef = useRef({ x: 0, y: 0 });       // target raw mouse coordinates
  const innerRef = useRef({ x: 0, y: 0 });     // snappier inner dot position
  const outerRef = useRef({ x: 0, y: 0 });     // slower trailing outer ring position
  const scaleRef = useRef(1);                  // target click scale modifier
  const renderScaleRef = useRef(1);             // LERPed visual scale value
  const hoverTypeRef = useRef<HoverType>("default");

  const [coords, setCoords] = useState({
    innerX: -100,
    innerY: -100,
    outerX: -100,
    outerY: -100,
    scale: 1,
  });
  const [hoverType, setHoverTypeState] = useState<HoverType>("default");
  const [hasMouse, setHasMouse] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (isFine) {
      setTimeout(() => {
        setHasMouse(true);
      }, 0);
    }

    const handleFirstMouseMove = () => {
      setHasMouse(true);
      window.removeEventListener("mousemove", handleFirstMouseMove);
    };

    const handleTouchStart = () => {
      setHasMouse(false);
      window.addEventListener("mousemove", handleFirstMouseMove, { passive: true });
    };

    if (!isFine) {
      window.addEventListener("mousemove", handleFirstMouseMove, { passive: true });
    }
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      // Closure-safe functional update
      setHasMouse(prev => prev ? prev : true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest("a, button, [data-cursor]");
      const section = target.closest("section, footer, header");

      let type: HoverType = "default";

      if (interactive) {
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

      hoverTypeRef.current = type;
      setHoverTypeState(type);
    };

    const handleMouseDown = () => {
      scaleRef.current = 0.85; // squeeze ring on click
    };

    const handleMouseUp = () => {
      scaleRef.current = 1.0;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    let rafId: number;
    const LERP_INNER = 0.28; // snappier dot follow
    const LERP_OUTER = 0.08; // slower trailing ring follow
    const LERP_SCALE = 0.20; // scale ease rate

    const tick = () => {
      // Inner dot LERP
      innerRef.current.x += (posRef.current.x - innerRef.current.x) * LERP_INNER;
      innerRef.current.y += (posRef.current.y - innerRef.current.y) * LERP_INNER;

      // Outer ring LERP
      outerRef.current.x += (posRef.current.x - outerRef.current.x) * LERP_OUTER;
      outerRef.current.y += (posRef.current.y - outerRef.current.y) * LERP_OUTER;

      // Compute base scale targets for the outer trailing ring
      let baseScale = 1;
      if (hoverTypeRef.current === "button") baseScale = 1.4;
      else if (hoverTypeRef.current === "link") baseScale = 1.2;
      else if (hoverTypeRef.current === "card") baseScale = 1.6;
      else if (hoverTypeRef.current === "section") baseScale = 1.1;

      const targetScale = baseScale * scaleRef.current;

      // Scale LERP
      renderScaleRef.current += (targetScale - renderScaleRef.current) * LERP_SCALE;

      setCoords({
        innerX: innerRef.current.x,
        innerY: innerRef.current.y,
        outerX: outerRef.current.x,
        outerY: outerRef.current.y,
        scale: renderScaleRef.current,
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleFirstMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { coords, hoverType, hasMouse };
}
