import { DT_BRIEFING } from "@/data/digitalTrustPage";
import DigitalTrustBriefingForm from "@/components/services/digital-trust/DigitalTrustBriefingForm";

export default function DigitalTrustBriefing() {
  return (
    <section id={DT_BRIEFING.id} className="dt-briefing" aria-labelledby="briefing-title">
      <div className="dt-wrap">
        <p className="dt-eyebrow dt-eyebrow--ink">{DT_BRIEFING.eyebrow}</p>
        <div className="dt-briefing__intro">
          <h2 id="briefing-title" className="dt-briefing__title">
            {DT_BRIEFING.title}
          </h2>
          <p className="dt-briefing__lead">{DT_BRIEFING.lead}</p>
        </div>
        <details className="dt-briefing__drop">
          <summary className="dt-briefing__summary">
            <span>{DT_BRIEFING.button}</span>
            <span className="dt-briefing__mark" aria-hidden="true" />
          </summary>
          <DigitalTrustBriefingForm />
        </details>
        <div className="dt-related">
          <h2 className="dt-related__title">{DT_BRIEFING.relatedTitle}</h2>
          <ul>
            {DT_BRIEFING.related.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.title}</a>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="dt-briefing__close">
        <div className="dt-wrap">
          <p>{DT_BRIEFING.statement}</p>
          <p>{DT_BRIEFING.parent}</p>
          <p>{DT_BRIEFING.page}</p>
          <p>{DT_BRIEFING.copyright}</p>
          <p>{DT_BRIEFING.launchNote}</p>
        </div>
      </div>
    </section>
  );
}
