import { DT_EVIDENCE } from "@/data/digitalTrustPage";

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
        <p className="dt-eyebrow">{DT_EVIDENCE.eyebrow}</p>
        <div className="dt-evidence__intro">
          <h2 id="evidence-title" className="dt-evidence__title">
            {DT_EVIDENCE.title}
          </h2>
          <p className="dt-evidence__lead">{DT_EVIDENCE.lead}</p>
        </div>

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
