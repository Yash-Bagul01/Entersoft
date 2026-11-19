import { DT_ENGAGEMENTS } from "@/data/digitalTrustPage";

export default function DigitalTrustEngagements() {
  return (
    <section id={DT_ENGAGEMENTS.id} className="dt-engagements" aria-labelledby="engagements-title">
      <div className="dt-wrap">
        <p className="dt-eyebrow dt-eyebrow--ink">{DT_ENGAGEMENTS.eyebrow}</p>
        <h2 id="engagements-title" className="dt-engagements__title">
          {DT_ENGAGEMENTS.title}
        </h2>
        <ol className="dt-engagements__grid">
          {DT_ENGAGEMENTS.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <p className="dt-engagement__tag">{item.tag}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
