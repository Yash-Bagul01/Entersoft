import { APPSEC_ENPROBE } from "@/data/appsecPage";

export default function AppsecEnprobe() {
  return (
    <section id="enprobe" className="as-section" aria-labelledby="enprobe-title">
      <div className="sc-wrap">
        <h2 id="enprobe-title" className="sc-section__title as-section__title">
          {APPSEC_ENPROBE.title}
        </h2>
        <p className="as-section__intro">{APPSEC_ENPROBE.intro}</p>
        <div className="as-modules">
          <ul className="as-modules__track">
            {[false, true].map((hidden) =>
              APPSEC_ENPROBE.modules.map((module, index) => (
                <li
                  key={hidden ? `${module.name}-loop` : module.name}
                  className="as-module"
                  data-index={String(index + 1).padStart(2, "0")}
                  aria-hidden={hidden || undefined}
                >
                  <h3 className="as-module__name">{module.name}</h3>
                  <p className="as-module__body">{module.body}</p>
                </li>
              )),
            )}
          </ul>
        </div>
        <p className="as-enprobe__note">{APPSEC_ENPROBE.note}</p>
        <p className="as-enprobe__cta">
          <a href={APPSEC_ENPROBE.cta.href} className="as-btn as-btn--primary">
            {APPSEC_ENPROBE.cta.label}
            <span aria-hidden="true">→</span>
          </a>
        </p>
      </div>
    </section>
  );
}
