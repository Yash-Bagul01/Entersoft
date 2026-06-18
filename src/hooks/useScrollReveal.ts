"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollReveal(threshold = 0.1, rootMargin = "0px 0px -60px 0px") {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<any>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          // Once it reveals, we can unobserve
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin]);

  return [elementRef, isRevealed] as const;
}
