import { APPSEC_DIFFERENCE } from "@/data/appsecPage";

const MARKS = [
  "M4 16h16M12 8v16M8 12h8",
  "M6 12l4 4 8-8",
  "M6 14h10l-3-3M18 10H8l3 3",
];

export default function AppsecDifference() {
  return (
    <section id="difference" className="as-section" aria-labelledby="difference-title">
      <div className="sc-wrap">
        <h2 id="difference-title" className="sc-section__title as-section__title">
          {APPSEC_DIFFERENCE.title}
        </h2>
        <p className="as-section__intro">{APPSEC_DIFFERENCE.intro}</p>
        <figure className="as-frame as-illus" aria-hidden="true">
          <svg viewBox="0 0 1200 280" preserveAspectRatio="xMidYMid meet" focusable="false">
            <defs>
              <linearGradient id="as-diff-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#efeaff" />
                <stop offset="55%" stopColor="#f6f4ff" />
                <stop offset="100%" stopColor="#e5f8f4" />
              </linearGradient>
              <radialGradient id="as-diff-glow" cx="78%" cy="18%" r="42%">
                <stop offset="0%" stopColor="#c4b6ff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#c4b6ff" stopOpacity="0" />
              </radialGradient>
              <filter id="as-diff-sh" x="-20%" y="-30%" width="140%" height="160%">
                <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#31267a" floodOpacity="0.16" />
              </filter>
            </defs>
            <rect width="1200" height="280" fill="url(#as-diff-bg)" />
            <rect width="1200" height="280" fill="url(#as-diff-glow)" />
            <g fill="#8b7cf6" opacity="0.35">
              {Array.from({ length: 7 }, (_, row) =>
                Array.from({ length: 24 }, (_, col) => (
                  <circle key={`${row}-${col}`} cx={28 + col * 50} cy={18 + row * 42} r="1.2" />
                )),
              )}
            </g>
            <path d="M120 196 C 280 70, 470 250, 690 120 S 980 40, 1100 150" fill="none" stroke="#635bff" strokeWidth="2" strokeDasharray="7 9" opacity="0.55" />
            <circle cx="120" cy="196" r="5" fill="#f5a524" />
            <circle cx="690" cy="120" r="5" fill="#635bff" />
            <circle cx="1100" cy="150" r="5" fill="#0f9f8f" />
            <g filter="url(#as-diff-sh)">
              <rect x="36" y="36" width="330" height="208" rx="20" fill="#ffffff" />
              <rect x="36" y="36" width="330" height="8" fill="#f5a524" />
              <circle cx="78" cy="78" r="18" fill="#fff4dc" />
              <path d="M78 68v14M78 88h.01" stroke="#b86e00" strokeWidth="2.2" strokeLinecap="round" />
              <text x="108" y="74" fill="#8892a6" fontSize="13" fontFamily="Inter, sans-serif">Scanner</text>
              <text x="108" y="98" fill="#0a2540" fontSize="20" fontWeight="600" fontFamily="Inter, sans-serif">Possible weakness</text>
              <rect x="64" y="128" width="250" height="10" rx="5" fill="#f4efe4" />
              <rect x="64" y="128" width="168" height="10" rx="5" fill="#f5a524" />
              <rect x="64" y="148" width="250" height="10" rx="5" fill="#f4efe4" />
              <rect x="64" y="148" width="96" height="10" rx="5" fill="#f0b45a" />
              <rect x="64" y="168" width="250" height="10" rx="5" fill="#f4efe4" />
              <rect x="64" y="168" width="210" height="10" rx="5" fill="#e8c98a" />
              <text x="64" y="210" fill="#425466" fontSize="14" fontFamily="Inter, sans-serif">A candidate signal, not a confirmed issue.</text>
            </g>
            <g filter="url(#as-diff-sh)">
              <rect x="434" y="36" width="332" height="208" rx="20" fill="#ffffff" />
              <rect x="434" y="36" width="332" height="8" fill="#635bff" />
              <circle cx="476" cy="78" r="18" fill="#ecebff" />
              <path d="M468 78l6 6 12-13" fill="none" stroke="#635bff" strokeWidth="2.4" strokeLinecap="round" />
              <text x="506" y="74" fill="#8892a6" fontSize="13" fontFamily="Inter, sans-serif">Assessment</text>
              <text x="506" y="98" fill="#0a2540" fontSize="20" fontWeight="600" fontFamily="Inter, sans-serif">Confirmed issue</text>
              <circle cx="478" cy="142" r="8" fill="#ecebff" />
              <path d="M474 142l3 3 6-7" fill="none" stroke="#635bff" strokeWidth="1.6" strokeLinecap="round" />
              <text x="496" y="146" fill="#425466" fontSize="14" fontFamily="Inter, sans-serif">Evidence and impact</text>
              <circle cx="478" cy="174" r="8" fill="#ecebff" />
              <path d="M474 174l3 3 6-7" fill="none" stroke="#635bff" strokeWidth="1.6" strokeLinecap="round" />
              <text x="496" y="178" fill="#425466" fontSize="14" fontFamily="Inter, sans-serif">Business process included</text>
              <rect x="462" y="198" width="120" height="26" rx="13" fill="#635bff" />
              <text x="478" y="216" fill="#ffffff" fontSize="12" fontFamily="Inter, sans-serif">Validated</text>
            </g>
            <g filter="url(#as-diff-sh)">
              <rect x="834" y="36" width="330" height="208" rx="20" fill="#ffffff" />
              <rect x="834" y="36" width="330" height="8" fill="#0f9f8f" />
              <circle cx="876" cy="78" r="18" fill="#e7f8f3" />
              <path d="M868 74a12 12 0 1 1-2 10" fill="none" stroke="#0f9f8f" strokeWidth="2" strokeLinecap="round" />
              <path d="M866 84l4-8 8 2" fill="none" stroke="#0f9f8f" strokeWidth="2" strokeLinecap="round" />
              <text x="906" y="74" fill="#8892a6" fontSize="13" fontFamily="Inter, sans-serif">After the test</text>
              <text x="906" y="98" fill="#0a2540" fontSize="20" fontWeight="600" fontFamily="Inter, sans-serif">Remediation</text>
              <rect x="862" y="128" width="270" height="36" rx="10" fill="#f3fbf8" />
              <text x="878" y="151" fill="#425466" fontSize="14" fontFamily="Inter, sans-serif">A practical fix to apply</text>
              <rect x="862" y="174" width="270" height="36" rx="10" fill="#f3fbf8" />
              <text x="878" y="197" fill="#425466" fontSize="14" fontFamily="Inter, sans-serif">Agreed retest stays open</text>
            </g>
          </svg>
        </figure>
        <ul className="as-values">
          {APPSEC_DIFFERENCE.values.map((value, i) => (
            <li key={value.title} className="as-value">
              <span className="as-value__index" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="as-value__mark" focusable="false">
                  <path d={MARKS[i]} />
                </svg>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="as-value__title">{value.title}</h3>
              <p className="as-value__body">{value.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
