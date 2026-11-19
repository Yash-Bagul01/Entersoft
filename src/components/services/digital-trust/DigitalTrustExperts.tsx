import { DT_EXPERTS } from "@/data/digitalTrustPage";

export default function DigitalTrustExperts() {
  return (
    <section id={DT_EXPERTS.id} className="dt-experts" aria-labelledby="experts-platform-title">
      <div className="dt-wrap">
        <p className="dt-eyebrow dt-eyebrow--ink">{DT_EXPERTS.eyebrow}</p>
        <div className="dt-experts__intro">
          <h2 id="experts-platform-title" className="dt-experts__title">
            {DT_EXPERTS.title}
          </h2>
          <p className="dt-experts__lead">{DT_EXPERTS.lead}</p>
        </div>
        <div className="dt-experts__roles">
          <article className="dt-role dt-role--expert" aria-labelledby="expert-role-title">
            <h3 id="expert-role-title">{DT_EXPERTS.expertTitle}</h3>
            <p>{DT_EXPERTS.expertBody}</p>
          </article>
          <article className="dt-role dt-role--platform" aria-labelledby="platform-role-title">
            <h3 id="platform-role-title">{DT_EXPERTS.platformTitle}</h3>
            <p>{DT_EXPERTS.platformBody}</p>
          </article>
        </div>
        <p className="dt-experts__note">{DT_EXPERTS.aiNote}</p>
      </div>
    </section>
  );
}
