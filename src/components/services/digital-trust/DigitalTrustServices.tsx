import { DT_SERVICES } from "@/data/digitalTrustPage";

/** DEV-11 visual specification for the privacy pillar. Not an additional claim. */
const DATA_LIFECYCLE = ["collect", "use", "share", "retain", "delete"] as const;

export default function DigitalTrustServices() {
  return (
    <section id="services" className="dt-services" aria-labelledby="services-title">
      <div className="dt-wrap">
        <p className="dt-eyebrow dt-eyebrow--ink">{DT_SERVICES.eyebrow}</p>
        <div className="dt-services__intro">
          <h2 id="services-title" className="dt-services__title">
            {DT_SERVICES.title}
          </h2>
          <p className="dt-services__lead">{DT_SERVICES.lead}</p>
        </div>

        <nav className="dt-services__index" aria-label={DT_SERVICES.eyebrow}>
          <ol>
            {DT_SERVICES.items.map((item) => (
              <li key={item.id}>
                <a href={item.id === "third-party-service" ? "#third-party-risk" : `#${item.id}`}>
                  <span aria-hidden="true">{item.number}</span>
                  <span className="dt-sr">
                    {item.number} {item.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="dt-services__board">
          {DT_SERVICES.items.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="dt-pillar"
              aria-labelledby={`${item.id}-title`}
            >
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
                      {step}
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
    </section>
  );
}
