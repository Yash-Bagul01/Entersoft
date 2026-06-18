"use client";

import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [shouldReduceMotion, setShouldReduceMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setShouldReduceMotion(event.matches);
    };

    // Use standard addEventListener or fallback for older browsers
    try {
      mediaQuery.addEventListener("change", handleChange);
    } catch {
      // Fallback for Safari/older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      try {
        mediaQuery.removeEventListener("change", handleChange);
      } catch {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return shouldReduceMotion;
}
