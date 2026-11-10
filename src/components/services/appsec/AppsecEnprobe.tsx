import Image from "next/image";
import { APPSEC_ENPROBE } from "@/data/appsecPage";

export default function AppsecEnprobe() {
  return (
    <section id="enprobe" className="as-section" aria-labelledby="enprobe-title">
      <div className="sc-wrap">
        <h2 id="enprobe-title" className="sc-section__title as-section__title">
          {APPSEC_ENPROBE.title}
        </h2>
        <p className="as-section__intro">{APPSEC_ENPROBE.intro}</p>
        <figure className="as-frame">
          <Image
            src="/images/solutions/open-source/hero-runtime.jpg"
            alt="An application project open in a code editor, with the file tree beside the source."
            width={1600}
            height={1066}
            sizes="(max-width: 800px) 100vw, 1120px"
          />
        </figure>
        <ul className="as-modules">
          {APPSEC_ENPROBE.modules.map((module) => (
            <li key={module.name} className="as-module">
              <h3 className="as-module__name">{module.name}</h3>
              <p className="as-module__body">{module.body}</p>
            </li>
          ))}
        </ul>
        <p className="as-enprobe__note">{APPSEC_ENPROBE.note}</p>
        <p className="as-enprobe__cta">
          <a href={APPSEC_ENPROBE.cta.href} className="as-btn as-btn--primary">
            {APPSEC_ENPROBE.cta.label}
            <span aria-hidden="true">→</span>
          </a>
        </p>
      </div>
    </section>
  );
}
