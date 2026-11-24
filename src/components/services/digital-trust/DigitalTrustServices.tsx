import { DT_SERVICES } from "@/data/digitalTrustPage";

/** DEV-11 visual specification for the privacy pillar. Not an additional claim. */
const DATA_LIFECYCLE = ["collect", "use", "share", "retain", "delete"] as const;

function ServiceMark({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 18V9.5L12 5l7 4.5V18" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 18v-4h6v4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="7" cy="12" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="12" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9.4 12h5.2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function DigitalTrustServices() {
  return (
    <section id="services" className="dt-services" aria-labelledby="services-title">
      <div className="dt-wrap dt-services__stage">
        <div>
        <p className="dt-eyebrow dt-eyebrow--ink">{DT_SERVICES.eyebrow}</p>
        <div className="dt-services__intro">
          <h2 id="services-title" className="dt-services__title">
            {DT_SERVICES.title}
          </h2>
          <p className="dt-services__lead">{DT_SERVICES.lead}</p>
        </div>

        <div className="dt-services__board">
          {DT_SERVICES.items.map((item, index) => (
            <article
              key={item.id}
              id={item.id}
              className="dt-pillar"
              aria-labelledby={`${item.id}-title`}
            >
              <span className="dt-pillar__mark" aria-hidden="true">
                <ServiceMark index={index} />
              </span>
              <p className="dt-pillar__number">{item.number}</p>
              <h3 id={`${item.id}-title`} className="dt-pillar__title">
                {item.id === "third-party-service" ? (
                  <a href="#third-party-risk">{item.title}</a>
                ) : (
                  item.title
                )}
              </h3>
              <p className="dt-pillar__summary">{item.summary}</p>
              {item.id === "privacy-data" ? (
                <ol className="dt-lifecycle" aria-label="Data lifecycle">
                  {DATA_LIFECYCLE.map((step, index) => (
                    <li key={step}>
                      {index > 0 ? (
                        <span className="dt-lifecycle__arrow" aria-hidden="true">
                          →
                        </span>
                      ) : null}
                      <span className="dt-lifecycle__step">{step}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
              <details className="dt-pillar__details">
                <summary className="dt-pillar__toggle">Scope, output and boundary</summary>
                <div className="dt-pillar__panel">
                  <p>{item.detail}</p>
                  <div>
                    <p className="dt-pillar__label">Scope</p>
                    <ul className="dt-pillar__scope">
                      {item.scope.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                  <dl className="dt-pillar__facts">
                    <div className="dt-pillar__fact dt-pillar__fact--output">
                      <dt>Output</dt>
                      <dd>{item.output}</dd>
                    </div>
                    <div className="dt-pillar__fact dt-pillar__fact--boundary">
                      <dt>Boundary</dt>
                      <dd>{item.boundary}</dd>
                    </div>
                  </dl>
                </div>
              </details>
            </article>
          ))}
        </div>
        </div>
        <div className="dt-services__visual">
        <figure className="dt-services__chart" aria-hidden="true">
          <svg viewBox="0 0 520 420">
            <defs>
              <linearGradient id="dt-bar" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#0e3d2c" />
                <stop offset="55%" stopColor="#1f9a62" />
                <stop offset="100%" stopColor="#b8ffd4" />
              </linearGradient>
              <linearGradient id="dt-bar-hot" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#145c40" />
                <stop offset="40%" stopColor="#3dce86" />
                <stop offset="100%" stopColor="#f3fff6" />
              </linearGradient>
              <linearGradient id="dt-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3dce86" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#3dce86" stopOpacity="0" />
              </linearGradient>
              <filter id="dt-line-glow" x="-15%" y="-40%" width="130%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <line x1="48" y1="36" x2="48" y2="360" stroke="#ffffff" strokeOpacity="0.08" />
            <line x1="48" y1="360" x2="488" y2="360" stroke="#ffffff" strokeOpacity="0.16" />
            {[70, 140, 210, 280, 350].map((y) => (
              <line key={y} x1="48" y1={y} x2="488" y2={y} stroke="#ffffff" strokeOpacity="0.06" />
            ))}
            {[70, 118, 166, 214, 262, 310, 340].map((height, index) => (
              <rect
                key={height}
                className="dt-chart__bar"
                style={{ animationDelay: `${0.08 + index * 0.07}s` }}
                x={78 + index * 54}
                y={360 - height}
                width="28"
                height={height}
                rx="7"
                fill={index > 4 ? "url(#dt-bar-hot)" : "url(#dt-bar)"}
              />
            ))}
            <polygon points="92,300 146,250 200,230 254,180 308,150 362,96 416,64 416,360 92,360" fill="url(#dt-area)" />
            <polyline
              points="92,300 146,250 200,230 254,180 308,150 362,96 416,64"
              fill="none"
              stroke="#3dce86"
              strokeWidth="7"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.35"
              filter="url(#dt-line-glow)"
            />
            <polyline
              className="dt-chart__line"
              points="92,300 146,250 200,230 254,180 308,150 362,96 416,64"
              fill="none"
              stroke="#e9fff3"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {[
              [92, 300],
              [146, 250],
              [200, 230],
              [254, 180],
              [308, 150],
              [362, 96],
              [416, 64],
            ].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <circle cx={x} cy={y} r="8" fill="#3dce86" opacity="0.22" />
                <circle cx={x} cy={y} r="4.2" fill="#07110d" stroke="#e9fff3" strokeWidth="1.8" />
              </g>
            ))}
          </svg>
        </figure>
        <div className="dt-services__shots">
          <img src="/images/digital-trust/dt-civic-seal.jpg?v=11" alt="" />
          <img src="/images/digital-trust/dt-balance-proof.jpg?v=11" alt="" />
        </div>
        </div>
      </div>
    </section>
  );
}
