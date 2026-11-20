import { DT_FAQ } from "@/data/digitalTrustPage";

export default function DigitalTrustFaq() {
  return (
    <section id={DT_FAQ.id} className="dt-faq" aria-labelledby="faq-title">
      <div className="dt-wrap">
        <p className="dt-eyebrow dt-eyebrow--ink">{DT_FAQ.eyebrow}</p>
        <h2 id="faq-title" className="dt-faq__title">
          {DT_FAQ.title}
        </h2>
        <div className="dt-faq__list">
          {DT_FAQ.items.map((item) => (
            <details key={item.question} className="dt-faq__item">
              <summary className="dt-faq__summary">
                <span className="dt-faq__question">{item.question}</span>
                <span className="dt-faq__mark" aria-hidden="true" />
              </summary>
              <div className="dt-faq__panel">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
