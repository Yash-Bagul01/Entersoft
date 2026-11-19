import { DT_TPRM } from "@/data/digitalTrustPage";

/**
 * DT-058–DT-077.
 * VIS-09 places the independence note below the two paths.
 * DEV-14 and blueprint 04 place the annual programme in an expandable panel under those paths.
 */
export default function DigitalTrustTprm() {
  return (
    <section id={DT_TPRM.id} className="dt-tprm" aria-labelledby="third-party-risk-title">
      <div className="dt-wrap">
        <p className="dt-eyebrow dt-eyebrow--ink">{DT_TPRM.eyebrow}</p>
        <div className="dt-tprm__intro">
          <h2 id="third-party-risk-title" className="dt-tprm__title">
            {DT_TPRM.title}
          </h2>
          <p className="dt-tprm__lead">{DT_TPRM.lead}</p>
        </div>

        <div className="dt-tprm__paths">
          {DT_TPRM.paths.map((path) => (
            <article key={path.id} className={`dt-path dt-path--${path.id}`} aria-labelledby={`${path.id}-path-title`}>
              <h3 id={`${path.id}-path-title`} className="dt-path__title">
                {path.title}
              </h3>
              <p className="dt-path__body">{path.body}</p>
              <ol className="dt-path__actions">
                {path.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ol>
              <p className="dt-path__output">{path.output}</p>
              <a className="dt-path__cta" href={path.href}>
                {path.cta}
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
