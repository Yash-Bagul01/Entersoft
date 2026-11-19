"use client";

import { useState } from "react";
import { DT_BRIEFING } from "@/data/digitalTrustPage";

type Fields = {
  name: string;
  email: string;
  company: string;
  priority: string;
  timeline: string;
  message: string;
};

const EMPTY: Fields = {
  name: "",
  email: "",
  company: "",
  priority: "",
  timeline: "",
  message: "",
};

function fieldErrors(values: Fields) {
  const next: Partial<Record<keyof Fields, string>> = {};
  if (!values.name.trim()) next.name = DT_BRIEFING.name.error;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = DT_BRIEFING.email.error;
  if (!values.company.trim()) next.company = DT_BRIEFING.company.error;
  if (!values.priority) next.priority = DT_BRIEFING.priority.error;
  if (values.message.length > 1000) next.message = DT_BRIEFING.message.error;
  return next;
}

export default function DigitalTrustBriefingForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [attempted, setAttempted] = useState(false);
  const errors = attempted ? fieldErrors(values) : {};

  function update(key: keyof Fields, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function reveal(event?: { preventDefault: () => void }) {
    event?.preventDefault();
    setAttempted(true);
  }

  return (
    <form
      className="dt-form"
      method="dialog"
      noValidate
      onSubmit={reveal}
      onKeyDown={(event) => {
        if (event.key === "Enter" && (event.target as HTMLElement).tagName !== "TEXTAREA") {
          reveal(event);
        }
      }}
    >
      <p className="dt-form__preview" role="status">
        {DT_BRIEFING.preview}
      </p>
      <p className="dt-form__notice">{DT_BRIEFING.notice}</p>
      <p className="dt-form__privacy">{DT_BRIEFING.privacy}</p>
      <p className="dt-form__required">{DT_BRIEFING.required}</p>

      <div className="dt-field">
        <label htmlFor="dt-name">{DT_BRIEFING.name.label}</label>
        <input
          id="dt-name"
          type="text"
          autoComplete="name"
          placeholder={DT_BRIEFING.name.placeholder}
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "dt-name-error" : undefined}
          onChange={(event) => update("name", event.target.value)}
        />
        {errors.name ? (
          <p id="dt-name-error" className="dt-field__error" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="dt-field">
        <label htmlFor="dt-email">{DT_BRIEFING.email.label}</label>
        <input
          id="dt-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={DT_BRIEFING.email.placeholder}
          value={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "dt-email-error" : undefined}
          onChange={(event) => update("email", event.target.value)}
        />
        {errors.email ? (
          <p id="dt-email-error" className="dt-field__error" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="dt-field">
        <label htmlFor="dt-company">{DT_BRIEFING.company.label}</label>
        <input
          id="dt-company"
          type="text"
          autoComplete="organization"
          placeholder={DT_BRIEFING.company.placeholder}
          value={values.company}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "dt-company-error" : undefined}
          onChange={(event) => update("company", event.target.value)}
        />
        {errors.company ? (
          <p id="dt-company-error" className="dt-field__error" role="alert">
            {errors.company}
          </p>
        ) : null}
      </div>

      <div className="dt-field">
        <label htmlFor="dt-priority">{DT_BRIEFING.priority.label}</label>
        <select
          id="dt-priority"
          value={values.priority}
          aria-invalid={Boolean(errors.priority)}
          aria-describedby={errors.priority ? "dt-priority-error" : undefined}
          onChange={(event) => update("priority", event.target.value)}
        >
          {DT_BRIEFING.priority.options.map((option, index) => (
            <option key={option} value={index === 0 ? "" : option}>
              {option}
            </option>
          ))}
        </select>
        {errors.priority ? (
          <p id="dt-priority-error" className="dt-field__error" role="alert">
            {errors.priority}
          </p>
        ) : null}
      </div>

      <div className="dt-field">
        <label htmlFor="dt-timeline">{DT_BRIEFING.timeline.label}</label>
        <select id="dt-timeline" value={values.timeline} onChange={(event) => update("timeline", event.target.value)}>
          {DT_BRIEFING.timeline.options.map((option, index) => (
            <option key={option} value={index === 0 ? "" : option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="dt-field">
        <label htmlFor="dt-message">{DT_BRIEFING.message.label}</label>
        <textarea
          id="dt-message"
          rows={4}
          placeholder={DT_BRIEFING.message.placeholder}
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "dt-message-error" : undefined}
          onChange={(event) => update("message", event.target.value)}
        />
        {errors.message ? (
          <p id="dt-message-error" className="dt-field__error" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button type="submit" className="dt-form__submit" onClick={reveal}>
        {DT_BRIEFING.button}
      </button>
    </form>
  );
}
