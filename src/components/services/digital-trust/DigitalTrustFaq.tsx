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
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
