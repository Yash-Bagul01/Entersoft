"use client";

import { useEffect } from "react";
import { AV_COVERAGE } from "@/data/adversarialValidationPage";

const AREA_IDS = new Set<string>(AV_COVERAGE.areas.map((area) => area.id));

function detailsFromHash(hash: string): HTMLDetailsElement | null {
  let id = hash.replace(/^#/, "");
  try {
    id = decodeURIComponent(id);
  } catch {
    return null;
  }
  if (!AREA_IDS.has(id)) return null;
  const element = document.getElementById(id);
  return element instanceof HTMLDetailsElement ? element : null;
}

function openAndFocus(details: HTMLDetailsElement) {
  document.querySelectorAll(".av-cov").forEach((node) => {
    if (node instanceof HTMLDetailsElement && node !== details) node.open = false;
  });
  details.open = true;
  details.scrollIntoView({ block: "start" });
  const summary = details.querySelector("summary");
  if (!(summary instanceof HTMLElement)) return;
  summary.focus({ preventScroll: true });
}

export default function CoverageDeepLink() {
  useEffect(() => {
    const apply = () => {
      const details = detailsFromHash(window.location.hash);
      if (details) openAndFocus(details);
    };

    apply();
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) apply();
    });

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href^='#']");
      if (!anchor) return;
      const details = detailsFromHash(anchor.getAttribute("href") ?? "");
      if (details) openAndFocus(details);
    };

    window.addEventListener("hashchange", apply);
    window.addEventListener("click", onClick, true);
    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", apply);
      window.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
