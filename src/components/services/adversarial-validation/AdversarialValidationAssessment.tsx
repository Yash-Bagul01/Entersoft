"use client";

import { FormEvent, useEffect, useState } from "react";
import { AV_ASSESSMENT } from "@/data/adversarialValidationPage";

type Values = {
  fullName: string;
  workEmail: string;
  company: string;
  format: string;
  environment: string;
  timing: string;
  context: string;
};

type RequiredName = "fullName" | "workEmail" | "company" | "format" | "context";

const EMPTY: Values = {
  fullName: "",
  workEmail: "",
  company: "",
  format: "",
  environment: "",
  timing: "",
  context: "",
};

const FIELD_IDS: Record<RequiredName, string> = {
  fullName: "av-full-name",
  workEmail: "av-work-email",
  company: "av-company",
  format: "av-format",
  context: "av-context",
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isFormatOption(value: string) {
  return (AV_ASSESSMENT.formatOptions as readonly string[]).includes(value);
}

export default function AdversarialValidationAssessment() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [invalid, setInvalid] = useState<RequiredName[]>([]);
  const [status, setStatus] = useState<"idle" | "validation" | "preview">("idle");

  const setField = (name: keyof Values, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const invalidFields = (next: Values) => {
    const found: RequiredName[] = [];
    if (!next.fullName.trim()) found.push("fullName");
    if (!isEmail(next.workEmail.trim())) found.push("workEmail");
    if (!next.company.trim()) found.push("company");
    if (!next.format) found.push("format");
    if (!next.context.trim()) found.push("context");
    return found;
  };

  const submitAssessment = () => {
    const found = invalidFields(values);
    setInvalid(found);
    if (found.length > 0) {
      setStatus("validation");
      document.getElementById(FIELD_IDS[found[0]])?.focus();
      return;
    }
    setStatus("preview");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitAssessment();
  };

  useEffect(() => {
    const box = document.querySelector(".av-assess-drop");
    const openForm = () => {
      if (box instanceof HTMLDetailsElement) box.open = true;
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href='#assessment']");
      if (!link) return;
      openForm();
      const format = link.getAttribute("data-format") ?? "";
      if (!isFormatOption(format)) return;
      setValues((current) => ({ ...current, format }));
    };
    const onHash = () => {
      if (window.location.hash === "#assessment") openForm();
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <section id={AV_ASSESSMENT.id} className="av-assessment" aria-labelledby="assessment-title">
      <div className="av-band">
        <h2 id="assessment-title" className="av-section__title">
          {AV_ASSESSMENT.title}
        </h2>
        <p className="av-section__intro">{AV_ASSESSMENT.lead}</p>
        <details className="av-assess-drop">
          <summary className="av-assess-drop__summary">
            <span className="av-assess-drop__title">{AV_ASSESSMENT.formTitle}</span>
            <span className="av-assess-drop__action" aria-hidden="true" />
          </summary>
        <form className="av-assessment__form" method="post" action="#assessment" noValidate onSubmit={onSubmit}>
          <h3 className="av-assess__title" aria-hidden="true">{AV_ASSESSMENT.formTitle}</h3>
          <p className="av-assessment__notice">{AV_ASSESSMENT.notice}</p>
          <p className="av-assessment__required">{AV_ASSESSMENT.required}</p>
          <div className="av-assessment__grid">
            <div className="av-field">
              <label htmlFor="av-full-name">{AV_ASSESSMENT.fields.fullName.label}</label>
              <input
                id="av-full-name"
                name="full_name"
                type="text"
                autoComplete="name"
                required
                placeholder={AV_ASSESSMENT.fields.fullName.placeholder}
                aria-invalid={invalid.includes("fullName") ? true : undefined}
                aria-describedby={invalid.includes("fullName") ? "assessment-validation" : undefined}
                value={values.fullName}
                onChange={(event) => setField("fullName", event.target.value)}
              />
            </div>
            <div className="av-field">
              <label htmlFor="av-work-email">{AV_ASSESSMENT.fields.workEmail.label}</label>
              <input
                id="av-work-email"
                name="work_email"
                type="email"
                autoComplete="email"
                required
                placeholder={AV_ASSESSMENT.fields.workEmail.placeholder}
                aria-invalid={invalid.includes("workEmail") ? true : undefined}
                aria-describedby={invalid.includes("workEmail") ? "assessment-validation" : undefined}
                value={values.workEmail}
                onChange={(event) => setField("workEmail", event.target.value)}
              />
            </div>
            <div className="av-field">
              <label htmlFor="av-company">{AV_ASSESSMENT.fields.company.label}</label>
              <input
                id="av-company"
                name="company"
                type="text"
                autoComplete="organization"
                required
                placeholder={AV_ASSESSMENT.fields.company.placeholder}
                aria-invalid={invalid.includes("company") ? true : undefined}
                aria-describedby={invalid.includes("company") ? "assessment-validation" : undefined}
                value={values.company}
                onChange={(event) => setField("company", event.target.value)}
              />
            </div>
            <div className="av-field">
              <label htmlFor="av-format">{AV_ASSESSMENT.fields.format.label}</label>
              <select
                id="av-format"
                name="format"
                required
                aria-invalid={invalid.includes("format") ? true : undefined}
                aria-describedby={invalid.includes("format") ? "assessment-validation" : undefined}
                value={values.format}
                onChange={(event) => setField("format", event.target.value)}
              >
                <option value=""></option>
                {AV_ASSESSMENT.formatOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="av-field">
              <label htmlFor="av-environment">{AV_ASSESSMENT.fields.environment.label}</label>
              <select
                id="av-environment"
                name="environment"
                value={values.environment}
                onChange={(event) => setField("environment", event.target.value)}
              >
                <option value=""></option>
                {AV_ASSESSMENT.environmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="av-field">
              <label htmlFor="av-timing">{AV_ASSESSMENT.fields.timing.label}</label>
              <select
                id="av-timing"
                name="timing"
                value={values.timing}
                onChange={(event) => setField("timing", event.target.value)}
              >
                <option value=""></option>
                {AV_ASSESSMENT.timingOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="av-field av-field--wide">
              <label htmlFor="av-context">{AV_ASSESSMENT.fields.context.label}</label>
              <textarea
                id="av-context"
                name="context"
                rows={5}
                required
                placeholder={AV_ASSESSMENT.fields.context.placeholder}
                aria-invalid={invalid.includes("context") ? true : undefined}
                aria-describedby={invalid.includes("context") ? "assessment-validation" : undefined}
                value={values.context}
                onChange={(event) => setField("context", event.target.value)}
              />
            </div>
          </div>
          <p className="av-assessment__privacy">{AV_ASSESSMENT.privacy}</p>
          <button className="av-assessment__submit" type="button" onClick={submitAssessment}>
            {AV_ASSESSMENT.submit}
          </button>
          {status === "validation" ? (
            <p id="assessment-validation" className="av-assessment__validation" role="alert">
              {AV_ASSESSMENT.validation}
            </p>
          ) : null}
          <p className="av-assessment__preview" role="status">
            {AV_ASSESSMENT.preview}
          </p>
        </form>
        </details>
      </div>
    </section>
  );
}
