import { APPSEC_PAGE_NAV } from "@/data/appsecPage";

/** Anchors whose sections are published on the page; the rest stay as plain labels until they ship. */
const LIVE_ANCHORS = new Set(["coverage", "scenarios", "method", "enprobe", "standards", "deliverables", "faqs"]);

export default function AppsecPageNav() {
  return (
    <nav aria-label="On this page" className="as-pagenav">
      <ul className="as-pagenav__list">
        {APPSEC_PAGE_NAV.map((item) => (
          <li key={item.anchor} className="as-pagenav__item">
            {LIVE_ANCHORS.has(item.anchor) ? (
              <a href={`#${item.anchor}`} className="as-pagenav__link">
                {item.label}
              </a>
            ) : (
              <span className="as-pagenav__link is-pending" aria-disabled="true">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
