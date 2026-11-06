"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { APPSEC_ASSESSMENT } from "@/data/appsecPage";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";

type FieldName = "fullName" | "workEmail" | "company" | "assessmentType" | "context";

type FormValues = {
  fullName: string;
  workEmail: string;
  company: string;
  assessmentType: string;
  timeline: string;
  context: string;
};

const EMPTY: FormValues = {
  fullName: "",
  workEmail: "",
  company: "",
  assessmentType: "",
  timeline: "",
  context: "",
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function AppsecAssessment() {
  const copy = APPSEC_ASSESSMENT;
  const titleId = useId();
  const lenis = useSmoothScroll();
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#assessment") setOpen(true);
    };
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href='#assessment']");
      if (anchor) setOpen(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", openFromHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    lenis?.stop();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    dialog?.querySelector<HTMLElement>("input, select, textarea, button")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const nodes = [...dialog.querySelectorAll<HTMLElement>("button, input, select, textarea")].filter(
        (node) => !node.hasAttribute("disabled"),
      );
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = previousOverflow;
      lenis?.start();
      previous?.focus();
    };
  }, [open, lenis]);

  const setField = (name: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const validate = (next: FormValues) => {
    const found: Partial<Record<FieldName, string>> = {};
    if (!next.fullName.trim()) found.fullName = copy.fields.fullName.error;
    if (!isEmail(next.workEmail.trim())) found.workEmail = copy.fields.workEmail.error;
    if (!next.company.trim()) found.company = copy.fields.company.error;
    if (!next.assessmentType) found.assessmentType = copy.fields.assessmentType.error;
    if (!next.context.trim()) found.context = copy.fields.context.error;
    return found;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      const first = Object.keys(found)[0];
      document.getElementById(`assessment-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    // No approved lead endpoint exists in this project. Do not invent one or show success.
    window.setTimeout(() => setStatus("error"), 0);
  };

  const describedBy = (name: FieldName, helperId: string) =>
    errors[name] ? `${helperId} assessment-${name}-error` : helperId;

  return (
    <section id="assessment" className="as-section" aria-labelledby="assessment-title">
      <div className="sc-wrap">
        <h2 id="assessment-title" className="sc-section__title as-section__title">
          {copy.titleLines[0]}
          <br />
          {copy.titleLines[1]}
        </h2>
        <p className="as-section__intro">{copy.intro}</p>
        <div className="as-discuss">
          <button
            ref={openerRef}
            type="button"
            className="as-discuss__hit"
            onClick={() => setOpen(true)}
          >
            <span>Discuss your project</span>
            <span className="as-discuss__arrow" aria-hidden="true">→</span>
          </button>
        </div>
        {open
          ? createPortal(
              <div className="as-modal">
                <button type="button" className="as-modal__veil" aria-label="Close" onClick={() => setOpen(false)} />
                <div
                  ref={dialogRef}
                  className="as-modal__sheet"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                >
                  <div className="as-modal__bar">
                    <button type="button" className="as-modal__close" onClick={() => setOpen(false)}>
                      Close
                    </button>
                  </div>
                  <form className="as-assess" method="post" action="#assessment" noValidate onSubmit={onSubmit}>
          <h3 id={titleId} className="as-assess__title">{copy.formTitle}</h3>
          <p className="as-assess__safety">{copy.safety}</p>
          <p className="as-assess__required">{copy.requiredNotice}</p>
          <div className="as-assess__grid">
            <div className="as-field">
              <label htmlFor="assessment-fullName">
                {copy.fields.fullName.label} <span aria-hidden="true">*</span>
              </label>
              <input
                id="assessment-fullName"
                name="full_name"
                type="text"
                autoComplete="name"
                required
                aria-invalid={errors.fullName ? true : undefined}
                aria-describedby={describedBy("fullName", "assessment-fullName-help")}
                value={values.fullName}
                onChange={(event) => setField("fullName", event.target.value)}
              />
              <p id="assessment-fullName-help" className="as-field__help">{copy.fields.fullName.helper}</p>
              {errors.fullName ? <p id="assessment-fullName-error" className="as-field__error" role="alert">{errors.fullName}</p> : null}
            </div>
            <div className="as-field">
              <label htmlFor="assessment-workEmail">
                {copy.fields.workEmail.label} <span aria-hidden="true">*</span>
              </label>
              <input
                id="assessment-workEmail"
                name="work_email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                aria-invalid={errors.workEmail ? true : undefined}
                aria-describedby={describedBy("workEmail", "assessment-workEmail-help")}
                value={values.workEmail}
                onChange={(event) => setField("workEmail", event.target.value)}
              />
              <p id="assessment-workEmail-help" className="as-field__help">{copy.fields.workEmail.helper}</p>
              {errors.workEmail ? <p id="assessment-workEmail-error" className="as-field__error" role="alert">{errors.workEmail}</p> : null}
            </div>
            <div className="as-field">
              <label htmlFor="assessment-company">
                {copy.fields.company.label} <span aria-hidden="true">*</span>
              </label>
              <input
                id="assessment-company"
                name="company"
                type="text"
                autoComplete="organization"
                required
                aria-invalid={errors.company ? true : undefined}
                aria-describedby={describedBy("company", "assessment-company-help")}
                value={values.company}
                onChange={(event) => setField("company", event.target.value)}
              />
              <p id="assessment-company-help" className="as-field__help">{copy.fields.company.helper}</p>
              {errors.company ? <p id="assessment-company-error" className="as-field__error" role="alert">{errors.company}</p> : null}
            </div>
            <div className="as-field">
              <label htmlFor="assessment-assessmentType">
                {copy.fields.assessmentType.label} <span aria-hidden="true">*</span>
              </label>
              <select
                id="assessment-assessmentType"
                name="assessment_type"
                required
                aria-invalid={errors.assessmentType ? true : undefined}
                aria-describedby={describedBy("assessmentType", "assessment-assessmentType-help")}
                value={values.assessmentType}
                onChange={(event) => setField("assessmentType", event.target.value)}
              >
                <option value="">{copy.fields.assessmentType.helper}</option>
                {copy.assessmentOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <p id="assessment-assessmentType-help" className="as-field__help">{copy.fields.assessmentType.helper}</p>
              {errors.assessmentType ? <p id="assessment-assessmentType-error" className="as-field__error" role="alert">{errors.assessmentType}</p> : null}
            </div>
            <div className="as-field">
              <label htmlFor="assessment-timeline">{copy.fields.timeline.label}</label>
              <select
                id="assessment-timeline"
                name="timeline"
                aria-describedby="assessment-timeline-help"
                value={values.timeline}
                onChange={(event) => setField("timeline", event.target.value)}
              >
                <option value="">{copy.fields.timeline.helper}</option>
                {copy.timingOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <p id="assessment-timeline-help" className="as-field__help">{copy.fields.timeline.helper}</p>
            </div>
            <div className="as-field as-field--wide">
              <label htmlFor="assessment-context">
                {copy.fields.context.label} <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="assessment-context"
                name="context"
                rows={5}
                required
                aria-invalid={errors.context ? true : undefined}
                aria-describedby={describedBy("context", "assessment-context-help")}
                value={values.context}
                onChange={(event) => setField("context", event.target.value)}
              />
              <p id="assessment-context-help" className="as-field__help">{copy.fields.context.helper}</p>
              {errors.context ? <p id="assessment-context-error" className="as-field__error" role="alert">{errors.context}</p> : null}
            </div>
          </div>
          <p className="as-assess__privacy">{copy.privacy}</p>
          <div className="as-assess__actions">
            <button type="submit" className="as-btn as-btn--primary" disabled={status === "sending"}>
              {status === "sending" ? copy.sending : copy.submit}
            </button>
          </div>
          <p className="as-assess__status" role="status" aria-live="polite">
            {status === "success" ? copy.success : status === "error" ? copy.failure : ""}
          </p>
        </form>
                </div>
              </div>,
              document.body,
            )
          : null}
      </div>
    </section>
  );
}
