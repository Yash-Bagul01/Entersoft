import { APPSEC_METHOD } from "@/data/appsecPage";

export default function AppsecMethod() {
  return (
    <section id="method" className="as-section" aria-labelledby="method-title">
      <div className="sc-wrap">
        <h2 id="method-title" className="sc-section__title as-section__title">
          {APPSEC_METHOD.title}
        </h2>
        <p className="as-section__intro">{APPSEC_METHOD.intro}</p>
        <figure className="as-reel as-reel--wide">
          <video
            className="as-reel__video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/solutions/open-source/hero-runtime.jpg"
            aria-label="An editor open on an application source file"
          >
            <source src="/videos/solutions/open-source/work-scan.mp4" type="video/mp4" />
          </video>
        </figure>
        <ol className="as-method">
          {APPSEC_METHOD.phases.map((phase) => (
            <li key={phase.heading} className="as-phase">
              <h3 className="as-phase__title">{phase.heading}</h3>
              <p className="as-phase__body">{phase.body}</p>
              <p className="as-phase__output">{phase.output}</p>
            </li>
          ))}
        </ol>
        <p className="as-method__safety">{APPSEC_METHOD.safety}</p>
      </div>
    </section>
  );
}
