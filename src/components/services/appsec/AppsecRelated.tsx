import Link from "next/link";
import { APPSEC_RELATED } from "@/data/appsecPage";

export default function AppsecRelated() {
  return (
    <section id="related" className="as-section" aria-labelledby="related-title">
      <div className="sc-wrap">
        <h2 id="related-title" className="sc-section__title as-section__title">
          {APPSEC_RELATED.title}
        </h2>
        <p className="as-section__intro">{APPSEC_RELATED.intro}</p>
        <ul className="as-related">
          {APPSEC_RELATED.practices.map((practice) => (
            <li key={practice.href} className="as-related__item">
              <h3 className="as-related__name">{practice.name}</h3>
              <p className="as-related__body">{practice.body}</p>
              <Link href={practice.href} className="as-related__link">
                <span className="as-related__mark" aria-hidden="true">↳</span>
                {practice.cta}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
