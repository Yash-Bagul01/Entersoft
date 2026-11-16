import Link from "next/link";
import { AV_BOUNDARY } from "@/data/adversarialValidationPage";

export default function ServiceBoundary() {
  return (
    <section id={AV_BOUNDARY.id} className="av-boundary" aria-labelledby="boundary-title">
      <div className="av-band">
        <h2 id="boundary-title" className="av-section__title">
          {AV_BOUNDARY.title}
        </h2>
        <p className="av-section__intro">{AV_BOUNDARY.intro}</p>
        <ul className="av-practices">
          {AV_BOUNDARY.practices.map((practice) => (
            <li key={practice.title}>
              <article
                className={practice.current ? "av-practice av-practice--current" : "av-practice"}
                aria-current={practice.current ? "page" : undefined}
              >
                <h3 className="av-practice__title">{practice.title}</h3>
                <p className="av-practice__question">{practice.question}</p>
                <p className="av-practice__body">{practice.body}</p>
                {practice.href.startsWith("#") ? (
                  <a className="av-practice__link" href={practice.href}>
                    {practice.label}
                  </a>
                ) : (
                  <Link className="av-practice__link" href={practice.href}>
                    {practice.label}
                  </Link>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
