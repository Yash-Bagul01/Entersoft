import { DT_OUTCOMES } from "@/data/digitalTrustPage";

const BOX_ART = [
  "/images/digital-trust/dt-bw-attention.jpg?v=5",
  "/images/digital-trust/dt-bw-evidence.jpg?v=5",
  "/images/digital-trust/dt-bw-decision.jpg?v=6",
] as const;

function OutcomeMark({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M12 3.2v2.4M12 18.4v2.4M3.2 12h2.4M18.4 12h2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="7.5" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.6 12h2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function DigitalTrustOutcomes() {
  return (
    <section id="outcomes" className="dt-outcomes" aria-labelledby="outcomes-title">
      <div className="dt-wrap">
        <p className="dt-eyebrow dt-eyebrow--ink">{DT_OUTCOMES.eyebrow}</p>
        <div className="dt-outcomes__intro">
          <h2 id="outcomes-title" className="dt-outcomes__title">
            {DT_OUTCOMES.title}
          </h2>
          <p className="dt-outcomes__lead">{DT_OUTCOMES.lead}</p>
        </div>
        <ul className="dt-outcomes__grid">
          {DT_OUTCOMES.cards.map((card, index) => (
            <li key={card.title} className="dt-rise" style={{ animationDelay: `${0.08 + index * 0.1}s` }}>
              <article className={index === 1 ? "dt-outcome dt-outcome--feature" : "dt-outcome"}>
                <div className="dt-outcome__art" aria-hidden="true">
                  <img className="dt-outcome__fill" src={BOX_ART[index]} alt="" />
                </div>
                <span className="dt-outcome__mark">
                  <OutcomeMark index={index} />
                </span>
                <h3 className="dt-outcome__title">{card.title}</h3>
                <p className="dt-outcome__body">{card.body}</p>
              </article>
            </li>
          ))}
        </ul>
        <div className="dt-outcomes__scenes" aria-hidden="true">
          <img src="/images/digital-trust/dt-gap-gate.jpg?v=11" alt="" />
          <img src="/images/digital-trust/dt-tensile-proof.jpg?v=11" alt="" />
          <img src="/images/digital-trust/dt-port-decision.jpg?v=11" alt="" />
        </div>
      </div>
    </section>
  );
}
