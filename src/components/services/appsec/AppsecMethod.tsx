import { APPSEC_METHOD } from "@/data/appsecPage";

const ICONS = [
  "M4 7h16v12H4zM8 7V5h8v2",
  "M5 19l4-8 3 5 3-3 4 6",
  "M10 4l1.5 4.5L16 10l-4.5 1.5L10 16l-1.5-4.5L4 10l4.5-1.5z",
  "M5 12l4 4 10-10",
  "M6 6h12v4H6zM6 14h8v4H6z",
  "M12 4v4M12 16v4M4 12h4M16 12h4M7 7l2.5 2.5M14.5 14.5L17 17M17 7l-2.5 2.5M9.5 14.5L7 17",
];

export default function AppsecMethod() {
  return (
    <section id="method" className="as-section" aria-labelledby="method-title">
      <div className="sc-wrap">
        <h2 id="method-title" className="sc-section__title as-section__title">
          {APPSEC_METHOD.title}
        </h2>
        <p className="as-section__intro">{APPSEC_METHOD.intro}</p>
        <ol className="as-method">
          {APPSEC_METHOD.phases.map((phase, i) => (
            <li key={phase.heading} className="as-phase">
              <span className="as-phase__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d={ICONS[i]} />
                </svg>
              </span>
              <h3 className="as-phase__title">{phase.heading}</h3>
              <ul className="as-phase__points">
                <li>{phase.body}</li>
                <li>{phase.output}</li>
              </ul>
            </li>
          ))}
        </ol>
        <p className="as-method__safety">{APPSEC_METHOD.safety}</p>
      </div>
    </section>
  );
}
