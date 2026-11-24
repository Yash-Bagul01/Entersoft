import { DT_EVIDENCE, DT_HERO } from "@/data/digitalTrustPage";
import DigitalTrustGlobe from "@/components/services/digital-trust/DigitalTrustGlobe";

const STATE_MARK: Record<(typeof DT_EVIDENCE.rows)[number]["state"], string> = {
  Reviewed: "reviewed",
  "Action required": "action",
  "Under review": "pending",
};

export default function DigitalTrustEvidence() {
  const [area, evidence, state, action] = DT_EVIDENCE.columns;

  return (
    <section id={DT_EVIDENCE.id} className="dt-evidence" aria-labelledby="evidence-title">
      <div className="dt-wrap">
        <div className="dt-evidence__stage">
          <div>
            <p className="dt-eyebrow">{DT_EVIDENCE.eyebrow}</p>
            <div className="dt-evidence__intro">
              <h2 id="evidence-title" className="dt-evidence__title">
                {DT_EVIDENCE.title}
              </h2>
              <p className="dt-evidence__lead">{DT_EVIDENCE.lead}</p>
            </div>
            <div className="dt-evidence__actions">
              <a className="dt-btn dt-btn--primary" href={DT_HERO.primary.href}>
                {DT_HERO.primary.label}
                <span aria-hidden="true">→</span>
              </a>
              <a className="dt-btn" href={DT_HERO.secondary.href}>
                {DT_HERO.secondary.label}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="dt-globe" aria-hidden="true">
            <DigitalTrustGlobe />
          </div>
        </div>

        <ul className="dt-dash">
          {DT_EVIDENCE.rows.map((row) => (
            <li key={row.area} className={`dt-dash__card dt-dash__card--${STATE_MARK[row.state]}`}>
              <p>{row.area}</p>
              <strong className={`dt-state dt-state--${STATE_MARK[row.state]}`}>{row.state}</strong>
              <span>{row.evidence}</span>
            </li>
          ))}
          <li className="dt-dash__card dt-dash__card--note">
            <strong>{DT_EVIDENCE.recordTitle}</strong>
            <p>{DT_EVIDENCE.caption}</p>
          </li>
        </ul>

        <figure className="dt-evidence__record">
          <figcaption className="dt-evidence__caption">{DT_EVIDENCE.caption}</figcaption>
          <details className="dt-evidence__detail">
            <summary>{DT_EVIDENCE.recordTitle}</summary>
            <p>{DT_EVIDENCE.record}</p>
          </details>
          <div className="dt-evidence__table">
            <table>
              <thead>
                <tr>
                  {DT_EVIDENCE.columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DT_EVIDENCE.rows.map((row) => (
                  <tr key={row.area}>
                    <td>
                      <span className="dt-ev__label" aria-hidden="true">
                        {area}
                      </span>
                      {row.area}
                    </td>
                    <td>
                      <span className="dt-ev__label" aria-hidden="true">
                        {evidence}
                      </span>
                      {row.evidence}
                    </td>
                    <td>
                      <span className="dt-ev__label" aria-hidden="true">
                        {state}
                      </span>
                      <span className={`dt-state dt-state--${STATE_MARK[row.state]}`}>{row.state}</span>
                    </td>
                    <td>
                      <span className="dt-ev__label" aria-hidden="true">
                        {action}
                      </span>
                      {row.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      </div>
    </section>
  );
}
