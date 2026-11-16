import { AV_METHOD } from "@/data/adversarialValidationPage";

export default function AdversarialValidationMethod() {
  return (
    <section id={AV_METHOD.id} className="av-method" aria-labelledby="method-title">
      <div className="av-band">
        <h2 id="method-title" className="av-section__title">
          {AV_METHOD.title}
        </h2>
        <p className="av-section__intro">{AV_METHOD.intro}</p>
        <ol className="av-method__stages">
          {AV_METHOD.stages.map((stage) => (
            <li key={stage.id} id={stage.id} className="av-method__stage">
              <h3 className="av-method__title">{stage.title}</h3>
              <p className="av-method__body">{stage.body}</p>
              <p className="av-method__output">{stage.output}</p>
            </li>
          ))}
        </ol>
        <p className="av-method__notice">{AV_METHOD.notice}</p>
      </div>
    </section>
  );
}
