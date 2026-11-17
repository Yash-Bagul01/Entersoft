import { AV_RELATED } from "@/data/adversarialValidationPage";

function RelatedCards({ hidden = false }: { hidden?: boolean }) {
  return AV_RELATED.cards.map((card) => (
    <li key={hidden ? `${card.id}-loop` : card.id} aria-hidden={hidden || undefined} inert={hidden || undefined}>
      <article id={hidden ? undefined : card.id} className="av-related__card">
        <h3 className="av-related__title">{card.title}</h3>
        <p className="av-related__body">{card.body}</p>
        <a className="av-related__link" href={card.href} tabIndex={hidden ? -1 : undefined}>
          {card.label}
        </a>
      </article>
    </li>
  ));
}

export default function AdversarialValidationRelated() {
  return (
    <section id={AV_RELATED.id} className="av-related" aria-labelledby="related-title">
      <div className="av-band">
        <h2 id="related-title" className="av-section__title">
          {AV_RELATED.title}
        </h2>
        <p className="av-section__intro">{AV_RELATED.intro}</p>
        <div className="av-marquee">
          <ul className="av-marquee__track">
            <RelatedCards />
            <RelatedCards hidden />
          </ul>
        </div>
      </div>
    </section>
  );
}
