import { APPSEC_ENPROBE } from "@/data/appsecPage";
import AppsecInkStage from "@/components/services/appsec/AppsecInkStage";

export default function AppsecEnprobe() {
  return (
    <section id="enprobe" className="as-section" aria-labelledby="enprobe-title">
      <div className="sc-wrap">
        <h2 id="enprobe-title" className="sc-section__title as-section__title">
          {APPSEC_ENPROBE.title}
        </h2>
        <p className="as-section__intro">{APPSEC_ENPROBE.intro}</p>
        <figure className="as-frame as-illus as-illus--ink" aria-hidden="true">
          <AppsecInkStage>
          <svg viewBox="0 0 520 480" preserveAspectRatio="xMidYMid meet" focusable="false">
            <g className="as-ink-ambient" fill="none" stroke="#d9d4ff" strokeOpacity="0.45">
              <circle cx="260" cy="240" r="214" />
              <circle className="as-spin" cx="260" cy="240" r="160" strokeDasharray="4 12" />
              <circle className="as-ink-dot" cx="70" cy="96" r="4" fill="#d9d4ff" stroke="none" />
              <circle className="as-ink-dot" cx="446" cy="392" r="4" fill="#635bff" stroke="none" />
              <circle className="as-ink-dot" cx="448" cy="78" r="3" fill="#d9d4ff" stroke="none" />
            </g>
            <g className="as-drift">
            <g className="as-ink" fill="none" stroke="#d9d4ff" strokeWidth="1.35" strokeLinejoin="round" transform="translate(260 248) scale(1.45) translate(-580 -214)">
              <path d="M645.4,104 L693.9,132 L645.4,160 L596.9,132 Z" />
              <path d="M693.9,132 L693.9,210 L645.4,238 L645.4,160 Z" />
              <path d="M596.9,132 L645.4,160 L645.4,238 L596.9,210 Z" />
              <path d="M512.1,113 L570.9,147 L519,177 L460.1,143 Z" />
              <path d="M570.9,147 L570.9,221 L519,251 L519,177 Z" />
              <path d="M460.1,143 L519,177 L519,251 L460.1,217 Z" />
              <path d="M640.2,187 L699.1,221 L647.2,251 L588.3,217 Z" />
              <path d="M699.1,221 L699.1,295 L647.2,325 L647.2,251 Z" />
              <path d="M588.3,217 L647.2,251 L647.2,325 L588.3,291 Z" />
              <path d="M534.6,192 L583.1,220 L531.1,250 L482.6,222 Z" />
              <path d="M583.1,220 L583.1,282 L531.1,312 L531.1,250 Z" />
              <path d="M482.6,222 L531.1,250 L531.1,312 L482.6,284 Z" />
            </g>
            </g>
          </svg>
          </AppsecInkStage>
          <div className="as-illus__notes">
            <div>
              <p className="as-illus__kicker">EnProbe</p>
              <p className="as-illus__title">Shared view</p>
              <p className="as-illus__chips">DAST · SCA · ASPM · CSPM · GRC</p>
            </div>
            <div>
              <p className="as-illus__title">What the platform connects</p>
              <p className="as-illus__line">Running application checks</p>
              <p className="as-illus__line">Dependency exposure</p>
              <p className="as-illus__line">AWS and Azure configuration context</p>
              <p className="as-illus__line">Controls and evidence, beside the service</p>
            </div>
          </div>
        </figure>
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
