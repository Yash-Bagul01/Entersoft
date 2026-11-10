"use client";

import { useEffect } from "react";
import { APPSEC_COVERAGE } from "@/data/appsecPage";

const DOMAIN_ANCHORS = new Set(APPSEC_COVERAGE.domains.map((domain) => domain.anchor));

function domainFromHash(hash: string): HTMLDetailsElement | null {
  let id = hash.replace(/^#/, "");
  try {
    id = decodeURIComponent(id);
  } catch {
    return null;
  }
  if (!DOMAIN_ANCHORS.has(id)) return null;
  const el = document.getElementById(id);
  return el instanceof HTMLDetailsElement ? el : null;
}

function openAndFocus(details: HTMLDetailsElement, scroll: boolean) {
  details.open = true;
  if (scroll) details.scrollIntoView({ block: "start" });
  details.querySelector("summary")?.focus({ preventScroll: true });
}

export default function AppsecCoverage() {
  useEffect(() => {
    const openFromLocation = () => {
      const details = domainFromHash(window.location.hash);
      if (details) openAndFocus(details, true);
    };

    openFromLocation();
    // Web fonts can change line heights after the first pass, so settle the deep link once they load.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) openFromLocation();
    });

    // In-page links are scrolled by the smooth-scroll provider, which prevents the hash change.
    const onClick = (event: globalThis.MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href^='#']");
      if (!anchor) return;
      const details = domainFromHash(anchor.getAttribute("href") ?? "");
      if (details) openAndFocus(details, false);
    };

    window.addEventListener("hashchange", openFromLocation);
    document.addEventListener("click", onClick);
    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", openFromLocation);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <section id="coverage" className="as-section" aria-labelledby="coverage-title">
      <div className="sc-wrap">
        <h2 id="coverage-title" className="sc-section__title as-section__title">
          {APPSEC_COVERAGE.title}
        </h2>
        <p className="as-section__intro">{APPSEC_COVERAGE.intro}</p>
        <div className="as-coverage">
          {APPSEC_COVERAGE.domains.map((domain, i) => (
            <details key={domain.anchor} id={domain.anchor} className="as-cov">
              <summary className="as-cov__summary">
                <span className="as-cov__index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="as-cov__head">
                  <h3 className="as-cov__title">{domain.heading}</h3>
                  <span className="as-cov__lede">{domain.summary}</span>
                </span>
                <span className="as-cov__toggle" aria-hidden="true" />
              </summary>
              <div className="as-cov__body">
                <p className="as-cov__detail">{domain.detail}</p>
                <h4 className="as-cov__label">Test scope</h4>
                <ul className="as-cov__scope">
                  {domain.scope.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="as-cov__output">{domain.output}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
