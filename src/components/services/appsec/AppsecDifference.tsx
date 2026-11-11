import { APPSEC_DIFFERENCE } from "@/data/appsecPage";
import AppsecInkStage from "@/components/services/appsec/AppsecInkStage";

const MARKS = [
  "M4 16h16M12 8v16M8 12h8",
  "M6 12l4 4 8-8",
  "M6 14h10l-3-3M18 10H8l3 3",
];

export default function AppsecDifference() {
  return (
    <section id="difference" className="as-section" aria-labelledby="difference-title">
      <div className="sc-wrap">
        <h2 id="difference-title" className="sc-section__title as-section__title">
          {APPSEC_DIFFERENCE.title}
        </h2>
        <p className="as-section__intro">{APPSEC_DIFFERENCE.intro}</p>
        <figure className="as-frame as-illus as-illus--ink" aria-hidden="true">
          <AppsecInkStage>
          <svg viewBox="0 0 520 480" preserveAspectRatio="xMidYMid meet" focusable="false">
            <g className="as-ink-ambient" fill="none" stroke="#d9d4ff" strokeOpacity="0.45">
              <circle cx="260" cy="240" r="214" />
              <circle className="as-spin" cx="260" cy="240" r="168" strokeDasharray="4 12" />
              <circle className="as-ink-dot" cx="78" cy="86" r="4" fill="#d9d4ff" stroke="none" />
              <circle className="as-ink-dot" cx="438" cy="390" r="4" fill="#635bff" stroke="none" />
              <circle className="as-ink-dot" cx="430" cy="78" r="3" fill="#d9d4ff" stroke="none" />
            </g>
            <g className="as-drift">
            <g className="as-ink" fill="none" stroke="#d9d4ff" strokeWidth="1.35" strokeLinejoin="round" transform="translate(260 246) scale(1.22) translate(-600 -175)">
              <path d="M600,158 L735.1,236 L600,314 L464.9,236 Z" />
              <path d="M735.1,236 L735.1,250 L600,328 L600,314 Z" />
              <path d="M464.9,236 L600,314 L600,328 L464.9,250 Z" />
              <path d="M600,124 L735.1,202 L600,280 L464.9,202 Z" />
              <path d="M735.1,202 L735.1,216 L600,294 L600,280 Z" />
              <path d="M464.9,202 L600,280 L600,294 L464.9,216 Z" />
              <path d="M600,90 L735.1,168 L600,246 L464.9,168 Z" />
              <path d="M735.1,168 L735.1,182 L600,260 L600,246 Z" />
              <path d="M464.9,168 L600,246 L600,260 L464.9,182 Z" />
              <path d="M600,56 L735.1,134 L600,212 L464.9,134 Z" />
              <path d="M735.1,134 L735.1,148 L600,226 L600,212 Z" />
              <path d="M464.9,134 L600,212 L600,226 L464.9,148 Z" />
              <path d="M600,22 L735.1,100 L600,178 L464.9,100 Z" />
              <path d="M735.1,100 L735.1,114 L600,192 L600,178 Z" />
              <path d="M464.9,100 L600,178 L600,192 L464.9,114 Z" />
              <path d="M629.4,117 L626.4,118.6 L623.1,120 L619.6,121.2 L615.9,122.2 L612.1,123 L608.1,123.6 L604.1,123.9 L600,124 L595.9,123.9 L591.9,123.6 L587.9,123 L584.1,122.2 L580.4,121.2 L576.9,120 L573.6,118.6 L570.6,117 L567.8,115.3 L565.4,113.4 L563.3,111.3 L561.5,109.2 L560.2,107 L559.2,104.7 L558.6,102.4 L558.4,100 L558.6,97.6 L559.2,95.3 L560.2,93 L561.5,90.8 L563.3,88.7 L565.4,86.6 L567.8,84.7 L570.6,83 L573.6,81.4 L576.9,80 L580.4,78.8 L584.1,77.8 L587.9,77 L591.9,76.4 L595.9,76.1 L600,76 L604.1,76.1 L608.1,76.4 L612.1,77 L615.9,77.8 L619.6,78.8 L623.1,80 L626.4,81.4 L629.4,83 L632.2,84.7 L634.6,86.6 L636.7,88.7 L638.5,90.8 L639.8,93 L640.8,95.3 L641.4,97.6 L641.6,100 L641.4,102.4 L640.8,104.7 L639.8,107 L638.5,109.2 L636.7,111.3 L634.6,113.4 L632.2,115.3 L629.4,117 Z" />
              <path d="M619.1,111 L617.1,112 L615,112.9 L612.7,113.7 L610.3,114.4 L607.8,114.9 L605.3,115.3 L602.6,115.5 L600,115.6 L597.4,115.5 L594.7,115.3 L592.2,114.9 L589.7,114.4 L587.3,113.7 L585,112.9 L582.9,112 L580.9,111 L579.2,109.9 L577.6,108.6 L576.2,107.3 L575.1,106 L574.2,104.5 L573.6,103 L573.2,101.5 L573.1,100 L573.2,98.5 L573.6,97 L574.2,95.5 L575.1,94 L576.2,92.7 L577.6,91.4 L579.2,90.1 L580.9,89 L582.9,88 L585,87.1 L587.3,86.3 L589.7,85.6 L592.2,85.1 L594.7,84.7 L597.4,84.5 L600,84.4 L602.6,84.5 L605.3,84.7 L607.8,85.1 L610.3,85.6 L612.7,86.3 L615,87.1 L617.1,88 L619.1,89 L620.8,90.1 L622.4,91.4 L623.8,92.7 L624.9,94 L625.8,95.5 L626.4,97 L626.8,98.5 L626.9,100 L626.8,101.5 L626.4,103 L625.8,104.5 L624.9,106 L623.8,107.3 L622.4,108.6 L620.8,109.9 L619.1,111 Z" />
              <path d="M586.1,82 L631.2,108" />
              <path d="M577.5,87 L622.5,113" />
              <path d="M568.8,92 L613.9,118" />
            </g>
            </g>
          </svg>
          </AppsecInkStage>
          <div className="as-illus__notes">
            <div>
              <p className="as-illus__kicker">Scanner</p>
              <p className="as-illus__title">Possible weakness</p>
              <p className="as-illus__line">A candidate signal, not a confirmed issue.</p>
            </div>
            <div>
              <p className="as-illus__kicker">Assessment</p>
              <p className="as-illus__title">Confirmed issue</p>
              <p className="as-illus__line">Evidence and impact</p>
              <p className="as-illus__line">Business process included</p>
              <span className="as-illus__pill">Validated</span>
            </div>
            <div>
              <p className="as-illus__kicker">After the test</p>
              <p className="as-illus__title">Remediation</p>
              <p className="as-illus__line">A practical fix to apply</p>
              <p className="as-illus__line">Agreed retest stays open</p>
            </div>
          </div>
        </figure>
        <ul className="as-values">
          {APPSEC_DIFFERENCE.values.map((value, i) => (
            <li key={value.title} className="as-value">
              <span className="as-value__index" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="as-value__mark" focusable="false">
                  <path d={MARKS[i]} />
                </svg>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="as-value__title">{value.title}</h3>
              <p className="as-value__body">{value.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
