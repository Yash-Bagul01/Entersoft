"use client";

import React, { useState } from "react";

export default function SolutionDemoForm({
  heading,
  idPrefix,
}: {
  heading: string;
  idPrefix: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !email) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 900);
  };

  if (done) {
    return (
      <div className="sl-form">
        <p className="sl-form__ok">
          Thank you. We received your details and will follow up to schedule a briefing.
        </p>
      </div>
    );
  }

  return (
    <form className="sl-form" onSubmit={onSubmit}>
      <h2>{heading}</h2>
      <label htmlFor={`${idPrefix}-name`}>Name</label>
      <input
        id={`${idPrefix}-name`}
        name="name"
        autoComplete="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <label htmlFor={`${idPrefix}-email`}>Work email</label>
      <input
        id={`${idPrefix}-email`}
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <label htmlFor={`${idPrefix}-company`}>Company</label>
      <input
        id={`${idPrefix}-company`}
        name="company"
        autoComplete="organization"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Get a briefing"}
      </button>
      <p className="sl-form__note">
        Used only to schedule a conversation with Entersoft. No third-party sharing.
      </p>
    </form>
  );
}
