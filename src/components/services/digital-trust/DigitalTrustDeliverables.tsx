import { DT_DELIVERABLES } from "@/data/digitalTrustPage";

export default function DigitalTrustDeliverables() {
  return (
    <section id={DT_DELIVERABLES.id} className="dt-deliverables" aria-labelledby="deliverables-title">
      <div className="dt-wrap">
        <p className="dt-eyebrow dt-eyebrow--ink">{DT_DELIVERABLES.eyebrow}</p>
        <h2 id="deliverables-title" className="dt-deliverables__title">
          {DT_DELIVERABLES.title}
        </h2>
        <p className="dt-deliverables__note">{DT_DELIVERABLES.note}</p>
        <ol className="dt-deliverables__grid">
          {DT_DELIVERABLES.items.map((item) => (
            <li key={item.title} className="dt-doc">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
