import { APPSEC_FAQ_SECTION } from "@/data/appsecPage";

export default function AppsecFaqs() {
  return (
    <section id="faqs" className="as-section" aria-labelledby="faqs-title">
      <div className="sc-wrap">
        <h2 id="faqs-title" className="sc-section__title as-section__title">
          {APPSEC_FAQ_SECTION.title}
        </h2>
        <div className="sc-fits">
          {APPSEC_FAQ_SECTION.items.map((item) => (
            <details key={item.question} className="sc-fits__item">
              <summary className="sc-fits__q">
                <h3 className="sc-fits__name">{item.question}</h3>
                <span className="sc-fits__icon" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="sc-fits__a">
                <div className="sc-fits__a-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
