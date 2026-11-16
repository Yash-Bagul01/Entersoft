import { AV_SCENARIOS } from "@/data/adversarialValidationPage";

export default function AdversarialValidationScenarios() {
  return (
    <section id={AV_SCENARIOS.id} className="av-scenarios" aria-labelledby="scenarios-title">
      <div className="av-band">
        <h2 id="scenarios-title" className="av-section__title">
          {AV_SCENARIOS.title}
        </h2>
        <p className="av-section__intro">{AV_SCENARIOS.intro}</p>
        <div className="av-scenarios__grid">
          {AV_SCENARIOS.scenarios.map((scenario) => (
            <details key={scenario.id} id={scenario.id} className="av-scn">
              <summary className="av-scn__summary">
                <h3 className="av-scn__title">{scenario.title}</h3>
                <span className="av-scn__mark" aria-hidden="true" />
              </summary>
              <div className="av-scn__panel">
                <p className="av-scn__body">{scenario.body}</p>
                <p className="av-scn__evidence">{scenario.evidence}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
