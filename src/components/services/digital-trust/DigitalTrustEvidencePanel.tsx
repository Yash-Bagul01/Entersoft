import { DT_HERO_RECORD } from "@/data/digitalTrustPage";

const FIELDS = [
  ["Review title", DT_HERO_RECORD.reviewTitle],
  ["Control", DT_HERO_RECORD.control],
  ["Evidence reviewed", DT_HERO_RECORD.evidenceReviewed],
  ["Evidence state", DT_HERO_RECORD.evidenceState],
  ["Accountable owner", DT_HERO_RECORD.accountableOwner],
  ["Next action", DT_HERO_RECORD.nextAction],
] as const;

export default function DigitalTrustEvidencePanel() {
  return (
    <figure className="dt-record">
      <figcaption className="dt-record__caption">{DT_HERO_RECORD.caption}</figcaption>
      <dl className="dt-record__list">
        {FIELDS.map(([label, value]) => (
          <div
            key={label}
            className={label === "Evidence state" ? "dt-record__row dt-record__row--open" : "dt-record__row"}
          >
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
