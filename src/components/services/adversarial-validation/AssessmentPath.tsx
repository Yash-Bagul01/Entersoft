import { AV_HERO } from "@/data/adversarialValidationPage";

export default function AssessmentPath() {
  return (
    <figure className="av-path">
      <div className="av-path__plate">
        <p className="av-path__title">{AV_HERO.visualTitle}</p>
        <ol className="av-path__list">
          {AV_HERO.nodes.map((node, index) => (
            <li key={node} className="av-path__node">
              <span className="av-path__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="av-path__label">{node}</span>
            </li>
          ))}
        </ol>
        <p className="av-path__band">{AV_HERO.band}</p>
      </div>
      <figcaption className="av-path__caption">{AV_HERO.caption}</figcaption>
    </figure>
  );
}
