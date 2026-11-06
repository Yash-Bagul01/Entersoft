"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { APPSEC_FAQ_SECTION } from "@/data/appsecPage";

type FaqItemProps = {
  question: string;
  answer: string;
  index: number;
  open: boolean;
  onToggle: () => void;
};

function FaqItem({ question, answer, index, open, onToggle }: FaqItemProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!panel || !inner) return;
    if (first.current) {
      first.current = false;
      panel.style.height = "0px";
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = (event: TransitionEvent) => {
      if (event.propertyName !== "height" || !open) return;
      panel.style.height = "auto";
      panel.removeEventListener("transitionend", finish);
    };
    panel.removeEventListener("transitionend", finish);

    if (reduce) {
      panel.style.height = open ? "auto" : "0px";
      return;
    }

    const from = panel.offsetHeight;
    const to = open ? inner.scrollHeight : 0;
    panel.style.height = `${from}px`;
    panel.getBoundingClientRect();
    const frame = requestAnimationFrame(() => {
      panel.style.height = `${to}px`;
    });
    if (open) panel.addEventListener("transitionend", finish);
    return () => {
      cancelAnimationFrame(frame);
      panel.removeEventListener("transitionend", finish);
    };
  }, [open]);

  return (
    <div className={open ? "as-faq is-open" : "as-faq"}>
      <h3 className="as-faq__heading">
        <button
          id={buttonId}
          type="button"
          className="as-faq__button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="as-faq__question">{question}</span>
          <span className="as-faq__icon" aria-hidden="true">+</span>
        </button>
      </h3>
      <div
        ref={panelRef}
        className="as-faq__panel"
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={open ? undefined : true}
      >
        <div ref={innerRef} className="as-faq__panel-inner">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function AppsecFaqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="as-section" aria-labelledby="faqs-title">
      <div className="sc-wrap">
        <h2 id="faqs-title" className="sc-section__title as-section__title">
          {APPSEC_FAQ_SECTION.title}
        </h2>
        <div className="as-faqs">
          {APPSEC_FAQ_SECTION.items.map((item, index) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
