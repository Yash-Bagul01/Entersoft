import { AV_RELATED } from "@/data/adversarialValidationPage";

export default function AdversarialValidationRelated() {
  return (
    <section id={AV_RELATED.id} className="av-related" aria-labelledby="related-title">
      <div className="av-band">
        <h2 id="related-title" className="av-section__title">
          {AV_RELATED.title}
        </h2>
        <p className="av-section__intro">{AV_RELATED.intro}</p>
        <ul className="av-related__cards">
          {AV_RELATED.cards.map((card) => (
            <li key={card.id}>
              <article id={card.id} className="av-related__card">
                <h3 className="av-related__title">{card.title}</h3>
                <p className="av-related__body">{card.body}</p>
                <a className="av-related__link" href={card.href}>
                  {card.label}
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
