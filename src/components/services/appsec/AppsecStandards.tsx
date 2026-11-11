import { APPSEC_STANDARDS, type AppsecStandardLink } from "@/data/appsecPage";

function Applicability({ body, links }: { body: string; links: AppsecStandardLink[] }) {
  const inline = links.filter((link) => body.includes(link.label));
  const listed = links.filter((link) => !body.includes(link.label));
  let remaining = body;
  const parts: Array<string | AppsecStandardLink> = [];

  inline.forEach((link) => {
    const index = remaining.indexOf(link.label);
    if (index === -1) return;
    parts.push(remaining.slice(0, index));
    parts.push(link);
    remaining = remaining.slice(index + link.label.length);
  });
  parts.push(remaining);

  return (
    <>
      <p className="as-standard__body">
        {parts.map((part, index) =>
          typeof part === "string" ? (
            <span key={`${index}-${part.slice(0, 12)}`}>{part}</span>
          ) : (
            <a key={part.href} href={part.href} className="as-standard__link">
              {part.label}
            </a>
          ),
        )}
      </p>
      {listed.length > 0 ? (
        <p className="as-standard__sources">
          {listed.map((link) => (
            <a key={link.href} href={link.href} className="as-standard__link">
              {link.label}
            </a>
          ))}
        </p>
      ) : null}
    </>
  );
}

export default function AppsecStandards() {
  return (
    <section id="standards" className="as-section" aria-labelledby="standards-title">
      <div className="sc-wrap">
        <h2 id="standards-title" className="sc-section__title as-section__title">
          {APPSEC_STANDARDS.title}
        </h2>
        <p className="as-section__intro">{APPSEC_STANDARDS.intro}</p>
        <div className="as-standards">
          {[0, 1].map((side) => (
          <div className="as-stack" key={side}>
          {APPSEC_STANDARDS.references.map((reference, i) => i % 2 === side ? (
            <details key={reference.name} className="as-standard" style={{ order: i }}>
              <summary className="as-standard__summary">
                <h3 className="as-standard__name">{reference.name}</h3>
                <span className="as-standard__toggle" aria-hidden="true" />
              </summary>
              <div className="as-standard__panel">
                <Applicability body={reference.body} links={reference.links} />
              </div>
            </details>
          ) : null)}
          </div>
          ))}
        </div>
        <p className="as-standards__note">{APPSEC_STANDARDS.distinction}</p>
      </div>
    </section>
  );
}
