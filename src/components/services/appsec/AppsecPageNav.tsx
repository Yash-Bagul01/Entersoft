"use client";

import { useEffect, useRef, useState } from "react";
import { APPSEC_PAGE_NAV } from "@/data/appsecPage";

/** Anchors whose sections are published on the page; the rest stay as plain labels until they ship. */
const LIVE_ANCHORS = new Set(["coverage", "scenarios", "method", "enprobe", "standards", "deliverables", "faqs"]);

export default function AppsecPageNav() {
  const [active, setActive] = useState("");
  const [pinned, setPinned] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPinned(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = APPSEC_PAGE_NAV
      .map((item) => document.getElementById(item.anchor))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        if (id) setActive(id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0.05, 0.2, 0.45] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <div ref={sentinelRef} className="as-pagenav__sentinel" aria-hidden="true" />
    <div className="as-pagenav-slot">
    <nav aria-label="On this page" className={pinned ? "as-pagenav is-pinned" : "as-pagenav"}>
      <ul className="as-pagenav__list">
        {APPSEC_PAGE_NAV.map((item) => {
          const live = LIVE_ANCHORS.has(item.anchor);
          const current = live && active === item.anchor;
          return (
            <li key={item.anchor} className="as-pagenav__item">
              {live ? (
                <a
                  href={`#${item.anchor}`}
                  className={current ? "as-pagenav__link is-active" : "as-pagenav__link"}
                  aria-current={current ? "location" : undefined}
                >
                  {item.label}
                </a>
              ) : (
                <span className="as-pagenav__link is-pending" aria-disabled="true">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
    </div>
    </>
  );
}
