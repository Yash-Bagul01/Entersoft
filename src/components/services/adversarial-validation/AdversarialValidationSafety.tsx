import { AV_SAFETY } from "@/data/adversarialValidationPage";

function SafetyCards({ hidden = false }: { hidden?: boolean }) {
  return AV_SAFETY.cards.map((card) => (
    <li key={hidden ? `${card.id}-loop` : card.id} aria-hidden={hidden || undefined} inert={hidden || undefined}>
      <article id={hidden ? undefined : card.id} className="av-safety__card">
        <h3 className="av-safety__title">{card.title}</h3>
        <p className="av-safety__body">{card.body}</p>
      </article>
    </li>
  ));
}

export default function AdversarialValidationSafety() {
  return (
    <section id={AV_SAFETY.id} className="av-safety" aria-labelledby="safety-title">
      <div className="av-band">
        <h2 id="safety-title" className="av-section__title">
          {AV_SAFETY.title}
        </h2>
        <p className="av-section__intro">{AV_SAFETY.intro}</p>
        <div className="av-marquee av-marquee--reverse">
          <ul className="av-marquee__track">
            <SafetyCards />
            <SafetyCards hidden />
          </ul>
        </div>
      </div>
    </section>
  );
}
