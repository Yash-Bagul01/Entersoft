import { AV_STANDARDS } from "@/data/adversarialValidationPage";

export default function AdversarialValidationStandards() {
  return (
    <section id={AV_STANDARDS.id} className="av-standards" aria-labelledby="standards-title">
      <div className="av-band">
        <h2 id="standards-title" className="av-section__title">
          {AV_STANDARDS.title}
        </h2>
        <p className="av-section__intro">{AV_STANDARDS.intro}</p>
        <ul className="av-standards__cards">
          {AV_STANDARDS.cards.map((card) => (
            <li key={card.id}>
              <article id={card.id} className="av-standards__card">
                <h3 className="av-standards__title">{card.title}</h3>
                <p className="av-standards__body">{card.body}</p>
                <ul className="av-standards__sources">
                  {card.sources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} rel="noopener noreferrer">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
        <p className="av-standards__note">{AV_STANDARDS.note}</p>
      </div>
    </section>
  );
}
