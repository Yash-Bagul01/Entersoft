import { AV_SAFETY } from "@/data/adversarialValidationPage";

export default function AdversarialValidationSafety() {
  return (
    <section id={AV_SAFETY.id} className="av-safety" aria-labelledby="safety-title">
      <div className="av-band">
        <h2 id="safety-title" className="av-section__title">
          {AV_SAFETY.title}
        </h2>
        <p className="av-section__intro">{AV_SAFETY.intro}</p>
        <ul className="av-safety__cards">
          {AV_SAFETY.cards.map((card) => (
            <li key={card.id}>
              <article id={card.id} className="av-safety__card">
                <h3 className="av-safety__title">{card.title}</h3>
                <p className="av-safety__body">{card.body}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
