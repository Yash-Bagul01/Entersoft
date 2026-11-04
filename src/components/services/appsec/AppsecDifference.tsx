import { APPSEC_DIFFERENCE } from "@/data/appsecPage";

const MARKS = [
  "M4 16h16M12 8v16M8 12h8",
  "M6 12l4 4 8-8",
  "M6 14h10l-3-3M18 10H8l3 3",
];

export default function AppsecDifference() {
  return (
    <section id="difference" className="as-section" aria-labelledby="difference-title">
      <div className="sc-wrap">
        <h2 id="difference-title" className="sc-section__title as-section__title">
          {APPSEC_DIFFERENCE.title}
        </h2>
        <p className="as-section__intro">{APPSEC_DIFFERENCE.intro}</p>
        <ul className="as-values">
          {APPSEC_DIFFERENCE.values.map((value, i) => (
            <li key={value.title} className="as-value">
              <span className="as-value__index" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="as-value__mark" focusable="false">
                  <path d={MARKS[i]} />
                </svg>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="as-value__title">{value.title}</h3>
              <p className="as-value__body">{value.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
