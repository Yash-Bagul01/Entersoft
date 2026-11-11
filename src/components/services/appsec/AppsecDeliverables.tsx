import { APPSEC_DELIVERABLES } from "@/data/appsecPage";

function DeliverableCards({ hidden = false }: { hidden?: boolean }) {
  return APPSEC_DELIVERABLES.items.map((item) => (
    <li key={hidden ? `${item.heading}-loop` : item.heading} className="as-deliverable" aria-hidden={hidden || undefined}>
      <h3 className="as-deliverable__title">{item.heading}</h3>
      <p className="as-deliverable__body">{item.body}</p>
    </li>
  ));
}

export default function AppsecDeliverables() {
  return (
    <section id="deliverables" className="as-section" aria-labelledby="deliverables-title">
      <div className="sc-wrap">
        <h2 id="deliverables-title" className="sc-section__title as-section__title">
          {APPSEC_DELIVERABLES.title}
        </h2>
        <p className="as-section__intro">{APPSEC_DELIVERABLES.intro}</p>
        <div className="as-deliverables">
          <ul className="as-deliverables__track">
            <DeliverableCards />
            <DeliverableCards hidden />
          </ul>
        </div>
        <details id="evidence-example" className="as-evidence">
          <summary className="as-evidence__summary">
            <span className="as-evidence__label">{APPSEC_DELIVERABLES.example.label}</span>
            <span className="as-evidence__toggle" aria-hidden="true" />
          </summary>
          <dl className="as-evidence__list">
            {APPSEC_DELIVERABLES.example.fields.map((field) => (
              <div key={field.term} className="as-evidence__row">
                <dt>{field.term}</dt>
                <dd>{field.detail}</dd>
              </div>
            ))}
          </dl>
        </details>
      </div>
    </section>
  );
}
