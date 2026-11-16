import { AV_EVIDENCE } from "@/data/adversarialValidationPage";

export default function AdversarialValidationEvidence() {
  return (
    <section id={AV_EVIDENCE.id} className="av-evidence" aria-labelledby="evidence-title">
      <div className="av-band">
        <h2 id="evidence-title" className="av-section__title">
          {AV_EVIDENCE.title}
        </h2>
        <p className="av-section__intro">{AV_EVIDENCE.intro}</p>
        <div className="av-evidence__record">
          <p className="av-evidence__mark">{AV_EVIDENCE.label}</p>
          <dl className="av-evidence__fields">
            {AV_EVIDENCE.fields.map((field) => (
              <div key={field.label} className="av-evidence__field">
                <dt>{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="av-evidence__status">{AV_EVIDENCE.status}</p>
        <p className="av-evidence__note">{AV_EVIDENCE.note}</p>
      </div>
    </section>
  );
}
