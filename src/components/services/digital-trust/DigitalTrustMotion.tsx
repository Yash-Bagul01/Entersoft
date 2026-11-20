"use client";

import { useEffect } from "react";
import { animate, stagger } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SECTIONS =
  ".dt-outcomes, .dt-services, .dt-tprm, .dt-evidence, .dt-delivery, .dt-deliverables, .dt-frameworks, .dt-experts, .dt-engagements, .dt-faq, .dt-briefing";

export default function DigitalTrustMotion() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          entry.target.classList.add("dt-in");
          const cards = entry.target.querySelectorAll(
            ".dt-outcome, .dt-pillar, .dt-path, .dt-faq__item, .dt-step, .dt-doc, .dt-framework, .dt-role, .dt-engagements__grid > li",
          );
          if (!cards.length) return;
          try {
            animate(cards, {
              translateY: [18, 0],
              delay: stagger(70),
              duration: 700,
              ease: "outQuad",
            });
          } catch {
            cards.forEach((card) => {
              if (card instanceof HTMLElement) card.style.opacity = "1";
            });
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(SECTIONS).forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [reduced]);

  return null;
}
