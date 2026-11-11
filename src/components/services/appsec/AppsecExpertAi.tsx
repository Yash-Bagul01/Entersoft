import { APPSEC_EXPERT_AI } from "@/data/appsecPage";

export default function AppsecExpertAi() {
  return (
    <section id="expert-ai" className="as-section" aria-labelledby="expert-ai-title">
      <div className="sc-wrap">
        <h2 id="expert-ai-title" className="sc-section__title as-section__title">
          {APPSEC_EXPERT_AI.titleLines.map((line) => (
            <span key={line} className="as-expert__line">
              {line}
            </span>
          ))}
        </h2>
        <p className="as-section__intro">{APPSEC_EXPERT_AI.intro}</p>
        <figure className="as-frame as-frame--wide as-illus" aria-hidden="true">
          <svg viewBox="0 0 1200 280" preserveAspectRatio="xMidYMid meet" focusable="false">
            <defs>
              <linearGradient id="as-exp-bg" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#f4f2ff" />
                <stop offset="100%" stopColor="#ebe7ff" />
              </linearGradient>
              <linearGradient id="as-exp-card" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7a6bff" />
                <stop offset="100%" stopColor="#4d3de0" />
              </linearGradient>
              <filter id="as-exp-sh" x="-15%" y="-20%" width="140%" height="150%">
                <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#2a1d78" floodOpacity="0.2" />
              </filter>
            </defs>
            <rect width="1200" height="280" fill="url(#as-exp-bg)" />
            <circle cx="180" cy="40" r="90" fill="#d9d2ff" opacity="0.55" />
            <circle cx="1040" cy="230" r="120" fill="#c8bfff" opacity="0.35" />
            <g stroke="#b7adf5" strokeWidth="1.4" fill="none" opacity="0.9">
              <path d="M70 90 L150 60 L230 110 L150 160 Z" />
              <path d="M150 60 L250 40" />
              <path d="M230 110 L310 80" />
              <path d="M150 160 L250 190" />
            </g>
            <g fill="#635bff">
              <circle cx="70" cy="90" r="6" />
              <circle cx="150" cy="60" r="7" />
              <circle cx="230" cy="110" r="6" />
              <circle cx="150" cy="160" r="5" />
              <circle cx="250" cy="40" r="4" />
              <circle cx="310" cy="80" r="5" />
              <circle cx="250" cy="190" r="4" />
            </g>
            <g filter="url(#as-exp-sh)">
              <rect x="250" y="34" width="430" height="212" rx="22" fill="#ffffff" />
              <text x="278" y="70" fill="#635bff" fontSize="13" fontFamily="Inter, sans-serif">Where AI can help</text>
              <text x="278" y="100" fill="#0a2540" fontSize="22" fontWeight="600" fontFamily="Inter, sans-serif">Organise the signals</text>
              <rect x="278" y="122" width="374" height="32" rx="10" fill="#f3f1ff" />
              <circle cx="298" cy="138" r="5" fill="#635bff" />
              <text x="314" y="143" fill="#243044" fontSize="14" fontFamily="Inter, sans-serif">Discovery results grouped for review</text>
              <rect x="278" y="162" width="374" height="32" rx="10" fill="#f3f1ff" />
              <circle cx="298" cy="178" r="5" fill="#7c6bff" />
              <text x="314" y="183" fill="#243044" fontSize="14" fontFamily="Inter, sans-serif">Related signals correlated</text>
              <rect x="278" y="202" width="374" height="28" rx="10" fill="#fff6e8" />
              <text x="294" y="221" fill="#243044" fontSize="13" fontFamily="Inter, sans-serif">Draft guidance, still awaiting review</text>
            </g>
            <g filter="url(#as-exp-sh)">
              <rect x="710" y="34" width="454" height="212" rx="22" fill="url(#as-exp-card)" />
              <circle cx="1080" cy="70" r="46" fill="#ffffff" opacity="0.12" />
              <circle cx="1080" cy="70" r="28" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" />
              <path d="M1068 70l8 8 16-18" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
              <text x="738" y="72" fill="#d9d6ff" fontSize="13" fontFamily="Inter, sans-serif">Where experts lead</text>
              <text x="738" y="106" fill="#ffffff" fontSize="22" fontWeight="600" fontFamily="Inter, sans-serif">The conclusion stays human</text>
              <text x="738" y="152" fill="#ffffff" fontSize="16" fontFamily="Inter, sans-serif">Validate the evidence</text>
              <text x="738" y="180" fill="#ffffff" fontSize="16" fontFamily="Inter, sans-serif">Judge the business consequence</text>
              <text x="738" y="214" fill="#ffffff" fontSize="16" fontFamily="Inter, sans-serif">An alert is not a confirmed finding</text>
            </g>
          </svg>
        </figure>
        <ul className="as-govern">
          {APPSEC_EXPERT_AI.blocks.map((block) => (
            <li key={block.title} className="as-govern__block">
              <h3 className="as-govern__title">{block.title}</h3>
              <p className="as-govern__body">{block.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
