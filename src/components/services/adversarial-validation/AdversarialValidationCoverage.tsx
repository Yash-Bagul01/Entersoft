import { AV_COVERAGE } from "@/data/adversarialValidationPage";
import CoverageDeepLink from "@/components/services/adversarial-validation/CoverageDeepLink";

export default function AdversarialValidationCoverage() {
  return (
    <section id={AV_COVERAGE.id} className="av-coverage" aria-labelledby="coverage-title">
      <CoverageDeepLink />
      <div className="av-band">
        <h2 id="coverage-title" className="av-section__title">
          {AV_COVERAGE.title}
        </h2>
        <p className="av-section__intro">{AV_COVERAGE.intro}</p>
        <div className="av-coverage__grid">
          {AV_COVERAGE.areas.map((area) => (
            <details key={area.id} id={area.id} className="av-cov">
              <summary className="av-cov__summary">
                <span className="av-cov__heading">
                  <h3 className="av-cov__title">{area.title}</h3>
                  <span className="av-cov__lede">{area.summary}</span>
                </span>
                <span className="av-cov__mark" aria-hidden="true" />
              </summary>
              <div className="av-cov__panel">
                <p className="av-cov__body">{area.body}</p>
                <ul className="av-cov__checks">
                  {area.checks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
                <p className="av-cov__output">{area.output}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
