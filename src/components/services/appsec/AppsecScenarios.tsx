import { APPSEC_SCENARIOS } from "@/data/appsecPage";

export default function AppsecScenarios() {
  return (
    <section id="scenarios" className="as-section" aria-labelledby="scenarios-title">
      <div className="sc-wrap">
        <h2 id="scenarios-title" className="sc-section__title as-section__title">
          {APPSEC_SCENARIOS.title}
        </h2>
        <p className="as-section__intro">{APPSEC_SCENARIOS.intro}</p>
        <div className="as-scenarios">
          {APPSEC_SCENARIOS.scenarios.map((scenario, i) => (
            <details key={scenario.title} className="as-scene">
              <summary className="as-scene__summary">
                <span className="as-scene__index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="as-scene__title">{scenario.title}</h3>
                <span className="as-scene__toggle" aria-hidden="true" />
              </summary>
              <div className="as-scene__body">
                <p className="as-scene__explanation">{scenario.explanation}</p>
                <h4 className="as-scene__label">Evidence produced</h4>
                <p className="as-scene__evidence">{scenario.evidence}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
