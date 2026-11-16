import { AV_DELIVERABLES } from "@/data/adversarialValidationPage";

export default function AdversarialValidationDeliverables() {
  return (
    <section id={AV_DELIVERABLES.id} className="av-deliverables" aria-labelledby="deliverables-title">
      <div className="av-band">
        <h2 id="deliverables-title" className="av-section__title">
          {AV_DELIVERABLES.title}
        </h2>
        <p className="av-section__intro">{AV_DELIVERABLES.intro}</p>
        <ul className="av-deliverables__cards">
          {AV_DELIVERABLES.cards.map((card) => (
            <li key={card.id}>
              <article id={card.id} className="av-deliverables__card">
                <h3 className="av-deliverables__title">
                  <a href={AV_DELIVERABLES.enquiryHref}>{card.title}</a>
                </h3>
                <p className="av-deliverables__body">{card.body}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
