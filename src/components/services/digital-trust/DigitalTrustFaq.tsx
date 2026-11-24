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
          {[0, 1].map((column) => (
            <div key={column} className="dt-faq__col">
              {DT_FAQ.items.map((item, index) =>
                index % 2 === column ? (
                  <details key={item.question} className="dt-faq__item" style={{ order: index }}>
                    <summary className="dt-faq__summary">
                      <span className="dt-faq__question">{item.question}</span>
                      <span className="dt-faq__mark" aria-hidden="true" />
                    </summary>
                    <div className="dt-faq__panel">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ) : null,
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
