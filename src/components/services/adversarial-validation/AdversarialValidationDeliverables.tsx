import { AV_DELIVERABLES } from "@/data/adversarialValidationPage";

function DeliverableCards({ hidden = false }: { hidden?: boolean }) {
  return AV_DELIVERABLES.cards.map((card) => (
    <li key={hidden ? `${card.id}-loop` : card.id} aria-hidden={hidden || undefined} inert={hidden || undefined}>
      <article id={hidden ? undefined : card.id} className="av-deliverables__card">
        <h3 className="av-deliverables__title">
          <a href={AV_DELIVERABLES.enquiryHref} tabIndex={hidden ? -1 : undefined}>{card.title}</a>
        </h3>
        <p className="av-deliverables__body">{card.body}</p>
      </article>
    </li>
  ));
}

export default function AdversarialValidationDeliverables() {
  return (
    <section id={AV_DELIVERABLES.id} className="av-deliverables" aria-labelledby="deliverables-title">
      <div className="av-band">
        <h2 id="deliverables-title" className="av-section__title">
          {AV_DELIVERABLES.title}
        </h2>
        <p className="av-section__intro">{AV_DELIVERABLES.intro}</p>
        <div className="av-marquee">
          <ul className="av-marquee__track">
            <DeliverableCards />
            <DeliverableCards hidden />
          </ul>
        </div>
      </div>
    </section>
  );
}
