import { APPSEC_FAQ_SECTION } from "@/data/appsecPage";

export default function AppsecFaqs() {
  return (
    <section id="faqs" className="as-section" aria-labelledby="faqs-title">
      <div className="sc-wrap">
        <h2 id="faqs-title" className="sc-section__title as-section__title">
          {APPSEC_FAQ_SECTION.title}
        </h2>
        <div className="as-faqs">
          {APPSEC_FAQ_SECTION.items.map((item) => (
            <details key={item.question} className="as-faq">
              <summary className="as-faq__summary">
                <span className="as-faq__question">{item.question}</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
