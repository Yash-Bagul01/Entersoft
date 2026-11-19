import { DT_FRAMEWORKS } from "@/data/digitalTrustPage";

export default function DigitalTrustFrameworks() {
  return (
    <section id={DT_FRAMEWORKS.id} className="dt-frameworks" aria-labelledby="frameworks-title">
      <div className="dt-wrap">
        <p className="dt-eyebrow dt-eyebrow--ink">{DT_FRAMEWORKS.eyebrow}</p>
        <div className="dt-frameworks__intro">
          <h2 id="frameworks-title" className="dt-frameworks__title">
            {DT_FRAMEWORKS.title}
          </h2>
          <p className="dt-frameworks__lead">{DT_FRAMEWORKS.lead}</p>
        </div>
        <p className="dt-frameworks__note">{DT_FRAMEWORKS.note}</p>
        <div className="dt-frameworks__list">
          {DT_FRAMEWORKS.items.map((item) => (
            <details key={item.name} className="dt-framework">
              <summary>{item.name}</summary>
              <p>{item.detail}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
