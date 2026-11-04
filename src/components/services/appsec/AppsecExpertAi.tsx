import { APPSEC_EXPERT_AI } from "@/data/appsecPage";

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
