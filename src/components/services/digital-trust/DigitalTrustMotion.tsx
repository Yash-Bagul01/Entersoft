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

    const cleanups: Array<() => void> = [];
    document.querySelectorAll(".dt-page details").forEach((details) => {
      const summary = details.querySelector(":scope > summary");
      if (!(summary instanceof HTMLElement)) return;
      const onClick = (event: Event) => {
        const parts = [...details.children].filter((node): node is HTMLElement => node !== summary && node instanceof HTMLElement);
        if (!parts.length) return;
        event.preventDefault();
        const finish = (element: HTMLElement, open: boolean) => {
          element.style.height = "";
          element.style.opacity = "";
          element.style.overflow = "";
          element.style.transition = "";
          if (!open) details.open = false;
        };
        if (details.open) {
          parts.forEach((element) => {
            element.style.overflow = "hidden";
            element.style.height = `${element.getBoundingClientRect().height}px`;
            element.style.opacity = "1";
          });
          requestAnimationFrame(() => {
            parts.forEach((element) => {
              element.style.transition = "height 420ms cubic-bezier(0.16, 1, 0.3, 1), opacity 280ms ease";
              element.style.height = "0px";
              element.style.opacity = "0";
              element.addEventListener("transitionend", () => finish(element, false), { once: true });
            });
          });
          return;
        }
        details.open = true;
        parts.forEach((element) => {
          const target = element.scrollHeight;
          element.style.overflow = "hidden";
          element.style.height = "0px";
          element.style.opacity = "0";
          requestAnimationFrame(() => {
            element.style.transition = "height 480ms cubic-bezier(0.16, 1, 0.3, 1), opacity 360ms ease";
            element.style.height = `${target}px`;
            element.style.opacity = "1";
            element.addEventListener("transitionend", () => finish(element, true), { once: true });
          });
        });
      };
      summary.addEventListener("click", onClick);
      cleanups.push(() => summary.removeEventListener("click", onClick));
    });

    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          entry.target.classList.add("dt-in");
          const cards = entry.target.querySelectorAll(
            ".dt-outcome, .dt-outcomes__scenes img, .dt-pillar, .dt-path, .dt-faq__item, .dt-step, .dt-doc, .dt-framework, .dt-role, .dt-engagements__grid > li, .dt-dash__card",
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
    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [reduced]);

  return null;
}
