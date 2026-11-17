import { AV_EXPERT } from "@/data/adversarialValidationPage";

export default function AdversarialValidationExpert() {
  return (
    <section id={AV_EXPERT.id} className="av-expert" aria-labelledby="expert-title">
      <div className="av-band">
        <h2 id="expert-title" className="av-section__title">
          {AV_EXPERT.title}
        </h2>
        <p className="av-section__intro">{AV_EXPERT.intro}</p>
        <div className="av-marquee av-marquee--reverse">
          <ul className="av-marquee__track">
            {[false, true].map((hidden) =>
              AV_EXPERT.cards.map((card) => (
                <li key={hidden ? `${card.id}-loop` : card.id} aria-hidden={hidden || undefined} inert={hidden || undefined}>
                  <article
                    id={hidden ? undefined : card.id}
                    className={card.id === "expert-2" ? "av-expert__card av-expert__card--decision" : "av-expert__card"}
                  >
                    <h3 className="av-expert__title">{card.title}</h3>
                    <p className="av-expert__body">{card.body}</p>
                  </article>
                </li>
              )),
            )}
          </ul>
        </div>
        <div className="av-expert__platform">
          <h3 className="av-expert__platform-title">{AV_EXPERT.enprobeTitle}</h3>
          <p className="av-expert__platform-body">{AV_EXPERT.enprobeBody}</p>
          <p className="av-expert__note">{AV_EXPERT.enprobeNote}</p>
        </div>
      </div>
    </section>
  );
}
