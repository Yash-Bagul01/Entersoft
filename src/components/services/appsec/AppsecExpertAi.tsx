import { APPSEC_EXPERT_AI } from "@/data/appsecPage";
import AppsecInkStage from "@/components/services/appsec/AppsecInkStage";

export default function AppsecExpertAi() {
  return (
    <section id="expert-ai" className="as-section" aria-labelledby="expert-ai-title">
      <div className="sc-wrap">
        <h2 id="expert-ai-title" className="sc-section__title as-section__title">
          {APPSEC_EXPERT_AI.titleLines.map((line) => (
            <span key={line} className="as-expert__line">
              {line}
            </span>
          ))}
        </h2>
        <p className="as-section__intro">{APPSEC_EXPERT_AI.intro}</p>
        <figure className="as-frame as-frame--wide as-illus as-illus--ink" aria-hidden="true">
          <AppsecInkStage>
          <svg viewBox="0 0 520 480" preserveAspectRatio="xMidYMid meet" focusable="false">
            <g className="as-ink-ambient" fill="none" stroke="#d9d4ff" strokeOpacity="0.45">
              <circle cx="250" cy="240" r="210" />
              <circle className="as-spin" cx="250" cy="240" r="156" strokeDasharray="3 11" />
              <circle className="as-ink-dot" cx="64" cy="92" r="4" fill="#d9d4ff" stroke="none" />
              <circle className="as-ink-dot" cx="450" cy="400" r="4" fill="#635bff" stroke="none" />
              <circle className="as-ink-dot" cx="456" cy="70" r="3" fill="#d9d4ff" stroke="none" />
            </g>
            <g className="as-drift">
            <g className="as-ink" fill="none" stroke="#d9d4ff" strokeWidth="1.35" strokeLinejoin="round" transform="translate(250 250) scale(1.28) translate(-600 -241)">
              <path d="M652,180 L752.4,238 L746.4,241.5 L645.9,183.5 Z" />
              <path d="M752.4,238 L752.4,268 L746.4,271.5 L746.4,241.5 Z" />
              <path d="M645.9,183.5 L746.4,241.5 L746.4,271.5 L645.9,213.5 Z" />
              <path d="M624.2,162 L731.6,224 L725.6,227.5 L618.2,165.5 Z" />
              <path d="M731.6,224 L731.6,280 L725.6,283.5 L725.6,227.5 Z" />
              <path d="M618.2,165.5 L725.6,227.5 L725.6,283.5 L618.2,221.5 Z" />
              <path d="M596.5,144 L710.9,210 L704.8,213.5 L590.5,147.5 Z" />
              <path d="M710.9,210 L710.9,292 L704.8,295.5 L704.8,213.5 Z" />
              <path d="M590.5,147.5 L704.8,213.5 L704.8,295.5 L590.5,229.5 Z" />
              <path d="M568.8,126 L690.1,196 L684,199.5 L562.8,129.5 Z" />
              <path d="M690.1,196 L690.1,304 L684,307.5 L684,199.5 Z" />
              <path d="M562.8,129.5 L684,199.5 L684,307.5 L562.8,237.5 Z" />
              <path d="M541.1,146 L669.3,220 L663.2,223.5 L535,149.5 Z" />
              <path d="M669.3,220 L669.3,316 L663.2,319.5 L663.2,223.5 Z" />
              <path d="M535,149.5 L663.2,223.5 L663.2,319.5 L535,245.5 Z" />
              <path d="M513.4,176 L648.5,254 L642.4,257.5 L507.3,179.5 Z" />
              <path d="M648.5,254 L648.5,328 L642.4,331.5 L642.4,257.5 Z" />
              <path d="M507.3,179.5 L642.4,257.5 L642.4,331.5 L507.3,253.5 Z" />
              <path d="M485.7,206 L627.7,288 L621.7,291.5 L479.6,209.5 Z" />
              <path d="M627.7,288 L627.7,340 L621.7,343.5 L621.7,291.5 Z" />
              <path d="M479.6,209.5 L621.7,291.5 L621.7,343.5 L479.6,261.5 Z" />
              <path d="M458,236 L606.9,322 L600.9,325.5 L451.9,239.5 Z" />
              <path d="M606.9,322 L606.9,352 L600.9,355.5 L600.9,325.5 Z" />
              <path d="M451.9,239.5 L600.9,325.5 L600.9,355.5 L451.9,269.5 Z" />
            </g>
            </g>
          </svg>
          </AppsecInkStage>
          <div className="as-illus__notes as-illus__notes--split">
            <div>
              <p className="as-illus__kicker">Where AI can help</p>
              <p className="as-illus__title">Organise the signals</p>
              <p className="as-illus__line">Discovery results grouped for review</p>
              <p className="as-illus__line">Related signals correlated</p>
              <p className="as-illus__line">Draft guidance, still awaiting review</p>
            </div>
            <div>
              <p className="as-illus__kicker">Where experts lead</p>
              <p className="as-illus__title">The conclusion stays human</p>
              <p className="as-illus__line">Validate the evidence</p>
              <p className="as-illus__line">Judge the business consequence</p>
              <p className="as-illus__line">An alert is not a confirmed finding</p>
            </div>
          </div>
        </figure>
        <ul className="as-govern">
          {APPSEC_EXPERT_AI.blocks.map((block) => (
            <li key={block.title} className="as-govern__block">
              <h3 className="as-govern__title">{block.title}</h3>
              <p className="as-govern__body">{block.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
