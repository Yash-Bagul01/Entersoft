"use client";

import { useEffect } from "react";

/**
 * In-page links stay on the browser hash.
 * The site-wide smooth scroll would otherwise cancel that default.
 */
export default function AdversarialValidationAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor || !anchor.closest(".av-page")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.charAt(0) !== "#" || href.length < 2) return;
      event.stopPropagation();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
