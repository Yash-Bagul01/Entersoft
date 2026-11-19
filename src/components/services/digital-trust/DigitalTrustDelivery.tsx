import { DT_DELIVERY } from "@/data/digitalTrustPage";

export default function DigitalTrustDelivery() {
  return (
    <section id={DT_DELIVERY.id} className="dt-delivery" aria-labelledby="delivery-title">
      <div className="dt-wrap">
        <p className="dt-eyebrow dt-eyebrow--ink">{DT_DELIVERY.eyebrow}</p>
        <div className="dt-delivery__intro">
          <h2 id="delivery-title" className="dt-delivery__title">
            {DT_DELIVERY.title}
          </h2>
          <p className="dt-delivery__lead">{DT_DELIVERY.lead}</p>
        </div>
        <p className="dt-delivery__note">{DT_DELIVERY.note}</p>
        <ol className="dt-delivery__steps">
          {DT_DELIVERY.steps.map((step) => (
            <li key={step.title}>
              <details className="dt-step">
                <summary>
                  <span className="dt-step__title">{step.title}</span>
                  <span className="dt-step__output">{step.output}</span>
                </summary>
                <p>{step.body}</p>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
