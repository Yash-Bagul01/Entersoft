"use client";

import React, { useEffect, useRef, useState } from "react";

export type PhoneRow = {
  method: string;
  path: string;
  tag: string;
  auth: string;
  note: string;
};

export type PhoneTab = {
  id: string;
  label: string;
  title: string;
  rows: readonly PhoneRow[];
};

export const PHONE_TABS: readonly PhoneTab[] = [
  {
    id: "inventory",
    label: "Inventory",
    title: "API inventory",
    rows: [
      { method: "GET", path: "/v1/accounts", tag: "documented", auth: "Bearer", note: "In the published OpenAPI contract." },
      { method: "POST", path: "/admin/export", tag: "shadow", auth: "Session", note: "Never made the spec. Marked for review." },
      { method: "GET", path: "/graphql", tag: "live", auth: "Bearer", note: "Served by the environment right now." },
      { method: "POST", path: "/webhooks/v1", tag: "stale", auth: "Signature", note: "Deprecated or leftover partner hook." },
    ],
  },
  {
    id: "validation",
    label: "Validation",
    title: "Live validation",
    rows: [
      { method: "BOLA", path: "/orders/{id}", tag: "queued", auth: "Bearer", note: "Queued for object-access testing." },
      { method: "SCHEMA", path: "/v1/accounts", tag: "matched", auth: "Bearer", note: "Matches the published contract." },
      { method: "BFLA", path: "/admin/export", tag: "shadow", auth: "Session", note: "Function-level check on an admin route." },
      { method: "AUTH", path: "/graphql", tag: "live", auth: "Bearer", note: "Token handling on a live method." },
    ],
  },
  {
    id: "findings",
    label: "Findings",
    title: "Routed findings",
    rows: [
      { method: "POST", path: "/admin/export", tag: "in review", auth: "Session", note: "With the team that owns the service." },
      { method: "GET", path: "/orders/{id}", tag: "owner", auth: "Bearer", note: "Routed on the same engagement path." },
      { method: "POST", path: "/webhooks/v1", tag: "queued", auth: "Signature", note: "Queued for the service owner." },
      { method: "GET", path: "/v1/accounts", tag: "matched", auth: "Bearer", note: "Contract check complete." },
    ],
  },
];

export default function PhoneMock({
  tab = 0,
  onTab,
  onInteract,
}: {
  tab?: number;
  onTab?: (index: number) => void;
  onInteract?: () => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [clock, setClock] = useState("9:41");
  const [open, setOpen] = useState<PhoneRow | null>(null);
  const [localTab, setLocalTab] = useState(tab);
  const current = onTab ? tab : localTab;
  const setTab = onTab ?? setLocalTab;
  const active = PHONE_TABS[current] ?? PHONE_TABS[0];

  const rows = active.rows;

  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    setOpen(null);
    setLocalTab(tab);
  }, [tab]);

  const markInteract = () => onInteract?.();

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
    el.style.transition = "transform 0.08s linear";
  };

  const onLeave = () => {
    const el = frameRef.current;
    if (!el) return;
    el.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      ref={frameRef}
      className="adf-device"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className="adf-device__btn adf-device__btn--silent" />
      <span className="adf-device__btn adf-device__btn--vol" />
      <span className="adf-device__btn adf-device__btn--vol2" />
      <span className="adf-device__btn adf-device__btn--power" />
      <div className="adf-device__glass">
        <span className="adf-device__shine" aria-hidden="true" />
        <div className="adf-device__island" />
        <div className="adf-device__status">
          <span>{clock}</span>
          <span className="adf-device__icons" aria-hidden="true">
            <i className="adf-ico adf-ico--signal" />
            <i className="adf-ico adf-ico--wifi" />
            <i className="adf-ico adf-ico--battery" />
          </span>
        </div>

        <div className={`adf-app${open ? " is-detail" : ""}`}>
          <header className="adf-app__head">
            <p>API Discovery</p>
            <h3>{open ? open.path : active.title}</h3>
            {open ? (
              <button type="button" className="adf-app__back" onClick={() => setOpen(null)}>
                Back to {active.label.toLowerCase()}
              </button>
            ) : null}
          </header>

          {!open ? (
            <div className="adf-app__list">
              {rows.map((row) => (
                <button
                  type="button"
                  className={`adf-app__row adf-app__row--${row.method.toLowerCase()}`}
                  key={`${row.method}-${row.path}-${row.tag}`}
                  onClick={() => {
                    markInteract();
                    setOpen(row);
                  }}
                >
                  <div className="adf-app__method">{row.method}</div>
                  <div className="adf-app__copy">
                    <strong>{row.path}</strong>
                  </div>
                  <em className={`adf-app__tag adf-app__tag--${row.tag.replace(/\s+/g, "-")}`}>
                    {row.tag}
                  </em>
                </button>
              ))}
            </div>
          ) : (
            <div className="adf-app__sheet">
              <div className={`adf-app__method adf-app__method--lg adf-app__method--${open.method.toLowerCase()}`}>
                {open.method}
              </div>
              <h4>{open.path}</h4>
              <ul>
                <li>
                  <span>Status</span>
                  <strong>{open.tag}</strong>
                </li>
                <li>
                  <span>Auth</span>
                  <strong>{open.auth}</strong>
                </li>
                <li>
                  <span>Note</span>
                  <strong>{open.note}</strong>
                </li>
              </ul>
              <p className="adf-app__hint">Same engagement path as discovery — not a separate scanner dump.</p>
            </div>
          )}

          <nav className="adf-app__nav" aria-label="Phone screens">
            {PHONE_TABS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={current === index ? "is-on" : ""}
                onClick={() => {
                    markInteract();
                    setTab(index);
                  }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="adf-device__home" />
      </div>
    </div>
  );
}
