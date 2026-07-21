"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function useMagnetic(strength = 0.35, radius = 80) {
  const elementRef = useRef<any>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Disable magnetic effects for reduced-motion settings or touch interfaces
    if (shouldReduceMotion || typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      // Distance between cursor and button center
      const deltaX = e.clientX - elementCenterX;
      const deltaY = e.clientY - elementCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < radius) {
        // Calculate displacement and cap it at 10px
        const rawX = deltaX * strength;
        const rawY = deltaY * strength;
        const pullDistance = Math.hypot(rawX, rawY);
        const maxDisplacement = 10;
        let pullX = rawX;
        let pullY = rawY;
        if (pullDistance > maxDisplacement) {
          pullX = (rawX / pullDistance) * maxDisplacement;
          pullY = (rawY / pullDistance) * maxDisplacement;
        }

        // Move element slightly towards cursor
        gsap.to(element, {
          x: pullX,
          y: pullY,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Smoothly return to center without overshoot
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    };

    const handleMouseLeave = () => {
      // Return smoothly to original coordinates on mouse leave
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, radius, shouldReduceMotion]);

  return elementRef;
}
