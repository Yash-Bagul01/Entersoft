"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { platformPillars } from "@/data/platform";

const pillar = platformPillars["api-security"];

const CHAPTERS = [
  {
    title: "Undocumented APIs are your most expensive habit.",
    body: `${pillar.whatItDoes[0].description} They sit in gateways and old services, taking engineer time every sprint — then the same unknown path is tested by someone else.`,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
    cta: null,
    flip: false,
  },
  {
    title: "Every untested endpoint is a booked incident — somewhere else.",
    body: pillar.whatItDoes[1].description,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    cta: "Talk to sales",
    flip: true,
  },
];

export default function ApiStory() {
  return (
    <section className="api-story">
      {CHAPTERS.map((chapter) => (
        <div key={chapter.title} className={chapter.flip ? "api-story-row is-flip" : "api-story-row"}>
          <div className="api-story-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={chapter.image} alt="" />
          </div>
          <motion.article
            className="api-story-chapter"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="api-display">{chapter.title}</h2>
            <p>{chapter.body}</p>
            {chapter.cta && (
              <Link href={ROUTES.contact} className="api-btn api-btn-dark">
                {chapter.cta}
              </Link>
            )}
          </motion.article>
        </div>
      ))}
    </section>
  );
}
