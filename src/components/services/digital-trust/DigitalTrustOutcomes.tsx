import { DT_OUTCOMES } from "@/data/digitalTrustPage";

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
              <article className="dt-outcome">
                <span className="dt-outcome__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="dt-outcome__title">{card.title}</h3>
                <p className="dt-outcome__body">{card.body}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
