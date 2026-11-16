import { AV_OVERVIEW } from "@/data/adversarialValidationPage";

export default function AdversarialValidationOverview() {
  return (
    <section id={AV_OVERVIEW.id} className="av-overview" aria-labelledby="overview-title">
      <div className="av-band">
        <h2 id="overview-title" className="av-section__title">
          {AV_OVERVIEW.title}
        </h2>
        <p className="av-section__intro">{AV_OVERVIEW.intro}</p>
        <ol className="av-outcomes">
          {AV_OVERVIEW.outcomes.map((item, index) => (
            <li key={item.title} className="av-outcome">
              <span className="av-outcome__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="av-outcome__title">{item.title}</h3>
              <p className="av-outcome__body">{item.body}</p>
            </li>
          ))}
        </ol>
        <p className="av-definition">{AV_OVERVIEW.definition}</p>
      </div>
    </section>
  );
}
