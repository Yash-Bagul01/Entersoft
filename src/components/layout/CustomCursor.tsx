"use client";

import { useEffect, useState } from "react";
import { useCursor } from "@/hooks/useCursor";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const { coords, hoverType, hasMouse } = useCursor();
  const shouldReduceMotion = useReducedMotion();

  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    setIsFinePointer(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!mounted || !isFinePointer || shouldReduceMotion) return;

    if (hasMouse) {
      document.body.classList.add("custom-cursor-active");
    } else {
      document.body.classList.remove("custom-cursor-active");
    }

    return () => {
      document.body.classList.remove("custom-cursor-active");
    };
  }, [mounted, hasMouse, isFinePointer, shouldReduceMotion]);

  // Hydration, mouse detection, and accessibility checks
  if (!mounted || !hasMouse || !isFinePointer || shouldReduceMotion) return null;

  return (
    <>
      {/* Inner dot - high LERP speed */}
      <div
        className={`custom-cursor-dot custom-cursor-dot--${hoverType}`}
        style={{
          transform: `translate3d(${coords.innerX}px, ${coords.innerY}px, 0) translate(-50%, -50%)`,
        }}
      />
      {/* Outer trailing ring - slower LERP speed + scale */}
      <div
        className={`custom-cursor custom-cursor-ring custom-cursor-ring--${hoverType}`}
        style={{
          transform: `translate3d(${coords.outerX}px, ${coords.outerY}px, 0) translate(-50%, -50%) scale(${coords.scale})`,
        }}
      />
    </>
  );
}

