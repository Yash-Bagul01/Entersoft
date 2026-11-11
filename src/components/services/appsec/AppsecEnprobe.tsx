import { APPSEC_ENPROBE } from "@/data/appsecPage";

export default function AppsecEnprobe() {
  return (
    <section id="enprobe" className="as-section" aria-labelledby="enprobe-title">
      <div className="sc-wrap">
        <h2 id="enprobe-title" className="sc-section__title as-section__title">
          {APPSEC_ENPROBE.title}
        </h2>
        <p className="as-section__intro">{APPSEC_ENPROBE.intro}</p>
        <figure className="as-frame as-illus" aria-hidden="true">
          <svg viewBox="0 0 1200 280" preserveAspectRatio="xMidYMid meet" focusable="false">
            <defs>
              <linearGradient id="as-en-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e7fff6" />
                <stop offset="48%" stopColor="#eef1ff" />
                <stop offset="100%" stopColor="#ffeaf3" />
              </linearGradient>
              <filter id="as-en-sh" x="-20%" y="-25%" width="140%" height="160%">
                <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#1a2458" floodOpacity="0.16" />
              </filter>
            </defs>
            <rect width="1200" height="280" fill="url(#as-en-bg)" />
            <circle cx="250" cy="140" r="108" fill="none" stroke="#c9c6f2" strokeDasharray="4 7" />
            <circle cx="250" cy="140" r="68" fill="none" stroke="#d7c6ea" />
            <g stroke="#9aa3d6" strokeWidth="1.5">
              <path d="M250 140 L110 62" />
              <path d="M250 140 L400 58" />
              <path d="M250 140 L96 196" />
              <path d="M250 140 L392 214" />
              <path d="M250 140 L250 248" />
            </g>
            <g filter="url(#as-en-sh)">
              <circle cx="250" cy="140" r="42" fill="#635bff" />
            </g>
            <text x="250" y="136" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="600" fontFamily="Inter, sans-serif">EnProbe</text>
            <text x="250" y="154" textAnchor="middle" fill="#d9d6ff" fontSize="10" fontFamily="Inter, sans-serif">Shared view</text>
            <g filter="url(#as-en-sh)">
              <rect x="72" y="40" width="78" height="32" rx="16" fill="#ffffff" />
              <rect x="362" y="36" width="78" height="32" rx="16" fill="#ffffff" />
              <rect x="58" y="180" width="72" height="32" rx="16" fill="#ffffff" />
              <rect x="356" y="198" width="72" height="32" rx="16" fill="#ffffff" />
              <rect x="214" y="228" width="72" height="32" rx="16" fill="#ffffff" />
            </g>
            <text x="111" y="61" textAnchor="middle" fill="#0a2540" fontSize="13" fontWeight="600" fontFamily="Inter, sans-serif">DAST</text>
            <text x="401" y="57" textAnchor="middle" fill="#0a2540" fontSize="13" fontWeight="600" fontFamily="Inter, sans-serif">CSPM</text>
            <text x="94" y="201" textAnchor="middle" fill="#0a2540" fontSize="13" fontWeight="600" fontFamily="Inter, sans-serif">SCA</text>
            <text x="392" y="219" textAnchor="middle" fill="#0a2540" fontSize="13" fontWeight="600" fontFamily="Inter, sans-serif">GRC</text>
            <text x="250" y="249" textAnchor="middle" fill="#0a2540" fontSize="13" fontWeight="600" fontFamily="Inter, sans-serif">ASPM</text>
            <g filter="url(#as-en-sh)">
              <rect x="500" y="28" width="664" height="224" rx="22" fill="#0a2540" />
            </g>
            <text x="532" y="66" fill="#ffffff" fontSize="20" fontWeight="600" fontFamily="Inter, sans-serif">What the platform connects</text>
            <rect x="532" y="90" width="250" height="8" rx="4" fill="#635bff" />
            <rect x="790" y="90" width="140" height="8" rx="4" fill="#2ec8c0" />
            <text x="532" y="132" fill="#d6deea" fontSize="16" fontFamily="Inter, sans-serif">Running application checks</text>
            <text x="532" y="164" fill="#d6deea" fontSize="16" fontFamily="Inter, sans-serif">Dependency exposure</text>
            <text x="532" y="196" fill="#d6deea" fontSize="16" fontFamily="Inter, sans-serif">AWS and Azure configuration context</text>
            <text x="532" y="228" fill="#d6deea" fontSize="16" fontFamily="Inter, sans-serif">Controls and evidence, beside the service</text>
          </svg>
        </figure>
        <div className="as-modules">
          <ul className="as-modules__track">
            {[false, true].map((hidden) =>
              APPSEC_ENPROBE.modules.map((module, index) => (
                <li
                  key={hidden ? `${module.name}-loop` : module.name}
                  className="as-module"
                  data-index={String(index + 1).padStart(2, "0")}
                  aria-hidden={hidden || undefined}
                >
                  <h3 className="as-module__name">{module.name}</h3>
                  <p className="as-module__body">{module.body}</p>
                </li>
              )),
            )}
          </ul>
        </div>
        <p className="as-enprobe__note">{APPSEC_ENPROBE.note}</p>
        <p className="as-enprobe__cta">
          <a href={APPSEC_ENPROBE.cta.href} className="as-btn as-btn--primary">
            {APPSEC_ENPROBE.cta.label}
            <span aria-hidden="true">→</span>
          </a>
        </p>
      </div>
    </section>
  );
}
