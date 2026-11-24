import { DT_TPRM } from "@/data/digitalTrustPage";

/**
 * DT-058–DT-077.
 * VIS-09 places the independence note below the two paths.
 * DEV-14 and blueprint 04 place the annual programme in an expandable panel under those paths.
 */
function PathMark({ id }: { id: string }) {
  if (id === "supplier") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="11" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="21" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5.5 23c.6-3.2 2.8-4.8 5.5-4.8s4.9 1.6 5.5 4.8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M17 23c.5-2.6 2.2-3.8 4.2-3.8 2 0 3.6 1.2 4.1 3.8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6 26V13.5L16 6l10 7.5V26" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M13 26v-6h6v6" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function DigitalTrustTprm() {
  const [first, accent] = DT_TPRM.title.split(/(?=both ways\.)/);

  return (
    <section id={DT_TPRM.id} className="dt-tprm" aria-labelledby="third-party-risk-title">
      <div className="dt-wrap">
        <p className="dt-tprm__eyebrow">{DT_TPRM.eyebrow}</p>
        <div className="dt-tprm__intro">
          <h2 id="third-party-risk-title" className="dt-tprm__title">
            {first}
            <span>{accent}</span>
          </h2>
          <p className="dt-tprm__lead">{DT_TPRM.lead}</p>
        </div>

        <div className="dt-tprm__paths">
          {DT_TPRM.paths.map((path) => (
            <article key={path.id} className={`dt-path dt-path--${path.id}`} aria-labelledby={`${path.id}-path-title`}>
              <div className="dt-path__head">
                <span className="dt-path__mark">
                  <PathMark id={path.id} />
                </span>
                <div>
                  <h3 id={`${path.id}-path-title`} className="dt-path__title">
                    {path.title}
                  </h3>
                  <p className="dt-path__body">{path.body}</p>
                </div>
              </div>
              <ul className="dt-path__actions">
                {path.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
              <p className="dt-path__output">{path.output}</p>
              <a className="dt-path__cta" href={path.href}>
                {path.cta}
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>

        <p className="dt-tprm__independence">{DT_TPRM.independence}</p>

        <details className="dt-tprm__programme">
          <summary>{DT_TPRM.programmeTitle}</summary>
          <p>{DT_TPRM.programme}</p>
        </details>
      </div>
    </section>
  );
}
