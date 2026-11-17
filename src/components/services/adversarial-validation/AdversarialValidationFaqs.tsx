import { AV_FAQS } from "@/data/adversarialValidationPage";

export default function AdversarialValidationFaqs() {
  return (
    <section id={AV_FAQS.id} className="av-faqs" aria-labelledby="faqs-title">
      <div className="av-band">
        <h2 id="faqs-title" className="av-section__title">
          {AV_FAQS.title}
        </h2>
        <div className="av-faqs__list">
          {[0, 1].map((side) => (
            <div className="av-stack" key={side}>
              {AV_FAQS.items.map((item, index) => index % 2 === side ? (
                <details key={item.id} id={item.id} className="av-faq" style={{ order: index }}>
                  <summary className="av-faq__summary">
                    <h3 className="av-faq__question">{item.question}</h3>
                    <span className="av-faq__mark" aria-hidden="true" />
                  </summary>
                  <div className="av-faq__panel">
                    <p className="av-faq__answer">{item.answer}</p>
                  </div>
                </details>
              ) : null)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
