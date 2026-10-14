"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { EditorialBlock } from "@/data/editorial";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const EASE = [0.16, 1, 0.3, 1] as const;
const TICKER = ["THREAT", "EVIDENCE", "RETEST", "SCOPE", "IDENTITY", "EXPOSURE", "FIX"];

export default function EditorialPage({
  kicker,
  headline,
  lede,
  image,
  imageAlt,
  frames = [],
  blocks,
}: {
  kicker: string;
  headline: string;
  lede: string;
  image: string;
  imageAlt: string;
  frames?: { src: string; alt: string }[];
  blocks: EditorialBlock[];
}) {
  const reduce = useReducedMotion();

  return (
    <main data-page="dark-editorial" className="dark-editorial min-h-screen bg-[#060606] text-[#f4f3ee]">
      <section className="ed-hero relative h-[92svh] min-h-[680px] overflow-hidden bg-[#060606]">
        <motion.img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-black/55 to-black/40" />
        <div className="pointer-events-none absolute left-1/3 top-1/4 h-[420px] w-[640px] rounded-full bg-[#08428C]/30 blur-[130px]" />
        {reduce ? null : <div className="ed-scan pointer-events-none absolute inset-x-0 top-0 h-24" />}

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-12 md:px-12 md:pb-16">
          <div className="ed-on-photo mx-auto grid max-w-[1400px] items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="ed-accent font-mono text-[12px] font-bold uppercase tracking-[0.22em]"
              >
                [ {kicker} ]
              </motion.p>
              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
                className="ed-title mt-4 max-w-[14ch] text-[clamp(2.8rem,6.4vw,6rem)] font-medium leading-[0.9] tracking-[-0.045em]"
              >
                {headline}
              </motion.h1>
            </div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="max-w-[36ch] text-[15px] leading-[1.65] text-[#d5d4ce] md:col-span-4"
            >
              {lede}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-[#060606]">
        <div className="ed-marquee flex w-max gap-8 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
          {[...TICKER, ...TICKER].map((word, index) => (
            <span key={`${word}-${index}`} className="flex items-center gap-8">
              {word}
              <span className="ed-accent">+</span>
            </span>
          ))}
        </div>
      </div>

      {frames.length > 0 ? (
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-12 md:py-16">
            <p className="ed-accent font-mono text-[11px] uppercase tracking-[0.2em]">In the work</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {frames.map((frame) => (
                <figure key={frame.src} className="ed-frame">
                  <div className="overflow-hidden">
                    <img src={frame.src} alt={frame.alt} loading="lazy" className="h-[280px] w-full object-cover md:h-[420px]" />
                  </div>
                  <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#9c9c97]">{frame.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {blocks.map((block, index) => (
        <motion.section
          key={`${block.kind}-${index}`}
          id={block.kind === "prose" ? block.id : undefined}
          className="border-t border-white/10"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, delay: 0.04, ease: EASE }}
        >
          <Block block={block} />
        </motion.section>
      ))}
    </main>
  );
}

function Block({ block }: { block: EditorialBlock }) {
  if (block.kind === "stats") {
    const cols = block.items.length % 3 === 0 ? "md:grid-cols-3" : "md:grid-cols-2";
    return (
      <div className={`mx-auto grid max-w-[1400px] gap-px bg-white/10 px-0 ${cols}`}>
        {block.items.map((item) => (
          <div key={item.label} className="bg-[#0b0b0d] px-6 py-12 md:px-12">
            <p className="ed-title text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-[-0.05em]">{item.value}</p>
            <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-[#9c9c97]">{item.label}</p>
          </div>
        ))}
      </div>
    );
  }

  if (block.kind === "panels") {
    const cols = block.items.length % 3 === 0 ? "md:grid-cols-3" : "md:grid-cols-2";
    return (
      <div className={`mx-auto grid max-w-[1400px] ${cols}`}>
        {block.items.map((item, index) => (
          <article key={item.title} className="group border-b border-white/10 px-6 py-12 transition-colors duration-300 hover:bg-white/[0.03] md:border-b-0 md:border-r md:px-10 md:last:border-r-0">
            <p className="ed-accent font-mono text-[11px] tracking-[0.18em]">0{index + 1}</p>
            <h2 className="ed-title mt-6 text-[1.7rem] font-medium leading-tight tracking-[-0.03em]">{item.title}</h2>
            <p className="mt-4 text-sm leading-[1.7] text-[#b7b6b0]">{item.body}</p>
          </article>
        ))}
      </div>
    );
  }

  if (block.kind === "steps") {
    return (
      <ol className="mx-auto max-w-[1400px] px-6 py-6 md:px-12">
        {block.items.map((item, index) => (
          <li key={item.title} className="grid gap-3 border-b border-white/10 py-7 md:grid-cols-12 md:items-baseline">
            <span className="font-mono text-[12px] text-[#9c9c97] md:col-span-1">{String(index + 1).padStart(2, "0")}</span>
            <h2 className="ed-title text-[1.45rem] font-medium tracking-[-0.03em] md:col-span-4">{item.title}</h2>
            <p className="text-sm leading-[1.7] text-[#b7b6b0] md:col-span-7">{item.body}</p>
          </li>
        ))}
      </ol>
    );
  }

  if (block.kind === "split") {
    return (
      <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-16 md:grid-cols-12 md:px-12 md:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9c9c97] md:col-span-3">{block.aside}</p>
        <div className="md:col-span-9">
          <h2 className="ed-title max-w-[20ch] text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[0.95] tracking-[-0.04em]">{block.title}</h2>
          <p className="mt-6 max-w-[62ch] text-[16px] leading-[1.7] text-[#b7b6b0]">{block.body}</p>
        </div>
      </div>
    );
  }

  if (block.kind === "people") {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-8 md:px-12">
        {block.groups.map((group) => (
          <div key={group.title} className="border-b border-white/10 py-10">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9c9c97]">{group.title}</h2>
            <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              {group.people.map((person) => (
                <li key={person.name}>
                  <p className="ed-title text-[1.35rem] font-medium tracking-[-0.03em]">{person.name}</p>
                  <p className="mt-1 text-sm text-[#9c9c97]">{person.role}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  if (block.kind === "quote") {
    return (
      <blockquote className="mx-auto max-w-[900px] px-6 py-16 md:px-12 md:py-24">
        <p className="ed-title text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.25] tracking-[-0.03em]">“{block.quote}”</p>
        <footer className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-[#9c9c97]">
          {block.name} · {block.role}
        </footer>
      </blockquote>
    );
  }

  if (block.kind === "prose") {
    return (
      <div className="mx-auto max-w-[820px] px-6 py-16 md:px-0 md:py-20">
        {block.title ? <h2 className="ed-title mb-6 text-3xl font-medium tracking-[-0.03em]">{block.title}</h2> : null}
        <div className="space-y-5 text-[16px] leading-[1.75] text-[#c8c7c1]">
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    );
  }

  if (block.kind === "faq") {
    return (
      <div className="mx-auto max-w-[900px] px-6 py-8 md:px-0">
        {block.title ? (
          <h2 className="ed-title mb-2 pt-6 text-2xl font-medium tracking-[-0.03em]">{block.title}</h2>
        ) : null}
        {block.items.map((item, index) => (
          <details key={item.q} className="group border-b border-white/10">
            <summary className="flex cursor-pointer list-none items-baseline gap-5 py-6 [&::-webkit-details-marker]:hidden">
              <span className="w-8 shrink-0 font-mono text-[12px] text-[#9c9c97]">{String(index + 1).padStart(2, "0")}</span>
              <span className="ed-title flex-1 text-[1.25rem] font-medium leading-snug tracking-[-0.03em]">{item.q}</span>
            </summary>
            <p className="max-w-[62ch] pb-6 pl-13 text-[15px] leading-[1.7] text-[#b7b6b0]">{item.a}</p>
          </details>
        ))}
      </div>
    );
  }

  if (block.kind === "index") {
    return (
      <div>
        {block.items.map((item) => {
          const inner = (
            <>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9c9c97] md:col-span-3">{item.meta}</span>
              <span className="md:col-span-9">
                <span className="ed-title block text-[clamp(1.4rem,2vw,1.9rem)] font-medium leading-tight tracking-[-0.03em]">{item.title}</span>
                <span className="mt-3 block max-w-[62ch] text-sm leading-[1.7] text-[#b7b6b0]">{item.body}</span>
              </span>
            </>
          );
          const className = "mx-auto grid max-w-[1400px] gap-4 border-b border-white/10 px-6 py-8 md:grid-cols-12 md:px-12";
          return item.href ? (
            <Link key={item.title} href={item.href} className={`${className} hover:bg-white/[0.03]`}>
              {inner}
            </Link>
          ) : (
            <article key={item.title} className={className}>
              {inner}
            </article>
          );
        })}
      </div>
    );
  }

  const external = block.href.startsWith("mailto:") || block.href.startsWith("http");
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 py-14 md:flex-row md:items-center md:px-12">
      <h2 className="ed-title max-w-[16ch] text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[0.95] tracking-[-0.04em]">{block.title}</h2>
      {external ? (
        <a href={block.href} className="ed-cta border border-white/30 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] hover:bg-[#f4f3ee] hover:text-[#0b0b0d]">
          {block.label}
        </a>
      ) : (
        <Link href={block.href} className="ed-cta border border-white/30 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] hover:bg-[#f4f3ee] hover:text-[#0b0b0d]">
          {block.label}
        </Link>
      )}
    </div>
  );
}
