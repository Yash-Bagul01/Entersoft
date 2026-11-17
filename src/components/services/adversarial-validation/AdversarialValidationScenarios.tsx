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
          {[0, 1].map((side) => (
            <div className="av-stack" key={side}>
              {AV_SCENARIOS.scenarios.map((scenario, index) => index % 2 === side ? (
                <details key={scenario.id} id={scenario.id} className="av-scn" style={{ order: index }}>
                  <summary className="av-scn__summary">
                    <h3 className="av-scn__title">{scenario.title}</h3>
                    <span className="av-scn__mark" aria-hidden="true" />
                  </summary>
                  <div className="av-scn__panel">
                    <p className="av-scn__body">{scenario.body}</p>
                    <p className="av-scn__evidence">{scenario.evidence}</p>
                  </div>
                </details>
              ) : null)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
