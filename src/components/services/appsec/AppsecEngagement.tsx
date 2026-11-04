import { APPSEC_ENGAGEMENT } from "@/data/appsecPage";

export default function AppsecEngagement() {
  return (
    <section id="engagement" className="as-section" aria-labelledby="engagement-title">
      <div className="sc-wrap">
        <h2 id="engagement-title" className="sc-section__title as-section__title">
          {APPSEC_ENGAGEMENT.title}
        </h2>
        <p className="as-section__intro">{APPSEC_ENGAGEMENT.intro}</p>
        <ul className="as-engagements">
          {APPSEC_ENGAGEMENT.modes.map((mode) => (
            <li key={mode.title} className="as-engagement">
              <h3 className="as-engagement__title">{mode.title}</h3>
              <p className="as-engagement__body">{mode.body}</p>
            </li>
          ))}
        </ul>
        <p className="as-engagement__note">{APPSEC_ENGAGEMENT.scoping}</p>
        <p className="as-engagement__note">{APPSEC_ENGAGEMENT.boundary}</p>
      </div>
    </section>
  );
}
