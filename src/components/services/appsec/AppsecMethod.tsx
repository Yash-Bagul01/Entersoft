import { APPSEC_METHOD } from "@/data/appsecPage";

export default function AppsecMethod() {
  return (
    <section id="method" className="as-section" aria-labelledby="method-title">
      <div className="sc-wrap">
        <h2 id="method-title" className="sc-section__title as-section__title">
          {APPSEC_METHOD.title}
        </h2>
        <p className="as-section__intro">{APPSEC_METHOD.intro}</p>
        <ol className="as-method">
          {APPSEC_METHOD.phases.map((phase) => (
            <li key={phase.heading} className="as-phase">
              <h3 className="as-phase__title">{phase.heading}</h3>
              <p className="as-phase__body">{phase.body}</p>
              <p className="as-phase__output">
                <span className="as-phase__label">Output</span>
                {phase.output}
              </p>
            </li>
          ))}
        </ol>
        <p className="as-method__safety">{APPSEC_METHOD.safety}</p>
      </div>
    </section>
  );
}
