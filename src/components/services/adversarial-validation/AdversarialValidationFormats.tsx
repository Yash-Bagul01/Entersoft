import { AV_FORMATS } from "@/data/adversarialValidationPage";

export default function AdversarialValidationFormats() {
  return (
    <section id={AV_FORMATS.id} className="av-formats" aria-labelledby="formats-title">
      <div className="av-band">
        <h2 id="formats-title" className="av-section__title">
          {AV_FORMATS.title}
        </h2>
        <p className="av-section__intro">{AV_FORMATS.intro}</p>
        <ul className="av-formats__grid">
          {AV_FORMATS.formats.map((format) => (
            <li key={format.id}>
              <article id={format.id} className="av-format">
                <h3 className="av-format__title">
                  <a href="#assessment" data-format={format.title}>
                    {format.title}
                  </a>
                </h3>
                <p className="av-format__question">{format.question}</p>
                <p className="av-format__body">{format.body}</p>
                <p className="av-format__fit">{format.fit}</p>
              </article>
            </li>
          ))}
        </ul>
        <p className="av-formats__note">{AV_FORMATS.note}</p>
      </div>
    </section>
  );
}
