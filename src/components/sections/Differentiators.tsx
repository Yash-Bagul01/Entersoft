'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animate } from 'animejs'
import { capabilities } from '@/data/differentiators'
import CapabilityCard from '@/components/ui/CapabilityCard'
import { useSmoothScroll } from '@/components/layout/SmoothScrollProvider'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const wordReveal = (text: string, isReducedMotion: boolean) => {
  const words = text.split(' ')
  return words.map((word, i) => (
    <React.Fragment key={i}>
      <motion.span
        className="inline-block"
        style={{ display: 'inline-block' }}
        initial={{ opacity: isReducedMotion ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: isReducedMotion ? 0 : 0.3 + i * 0.03,
          duration: isReducedMotion ? 0 : 0.5,
          ease: 'easeOut',
        }}
      >
        {word}
      </motion.span>
      {i < words.length - 1 ? ' ' : ''}
    </React.Fragment>
  ))
}

export default function Differentiators() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridWrapperRef = useRef<HTMLDivElement>(null)
  const svgBorderRef = useRef<SVGRectElement>(null)
  const lenis = useSmoothScroll()
  const isReducedMotion = useReducedMotion()

  const rows = [
    { cards: capabilities.slice(0, 2), className: 'row-left-heavy' },
    { cards: capabilities.slice(2, 4), className: 'row-right-heavy' },
    { cards: capabilities.slice(4, 6), className: 'row-right-heavy' },
    { cards: capabilities.slice(6, 8), className: 'row-left-heavy' },
  ]

  // Lenis Scroll-Velocity Skew effect on grid wrapper
  useEffect(() => {
    if (!lenis || isReducedMotion || !gridWrapperRef.current) return

    const handleScroll = ({ velocity }: { velocity: number }) => {
      const clamped = Math.max(-1.8, Math.min(1.8, velocity * 0.015))
      gsap.to(gridWrapperRef.current, {
        skewY: clamped,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    lenis.on('scroll', handleScroll)

    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [lenis, isReducedMotion])

  // Outer grid frame SVG border draw animation + GSAP ScrollTrigger batch card entrance
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (isReducedMotion) return

    const sectionEl = sectionRef.current
    const rectEl = svgBorderRef.current
    if (!sectionEl) return

    let borderAnimated = false
    const triggerBorderDraw = () => {
      if (borderAnimated || !rectEl) return
      borderAnimated = true

      try {
        const totalLength = rectEl.getTotalLength()
        rectEl.style.strokeDasharray = `${totalLength}`
        rectEl.style.strokeDashoffset = `${totalLength}`
        rectEl.style.opacity = '1'

        animate(rectEl, {
          strokeDashoffset: [totalLength, 0],
          duration: 600,
          ease: 'easeInOutQuad',
        })
      } catch {
        rectEl.style.opacity = '1'
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          triggerBorderDraw()
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(sectionEl)

    const cards = gsap.utils.toArray<HTMLElement>('.capability-card')
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: (i % 2) * 0.1,
          }
        )
      })
    }, sectionRef)

    return () => {
      observer.disconnect()
      ctx.revert()
    }
  }, [isReducedMotion])

  return (
    <section ref={sectionRef} className="differentiators-section" id="capabilities">
      {/* Embedded CSS for layout, refined typography & grid specs */}
      <style jsx global>{`
        .differentiators-section {
          padding: clamp(60px, 7vw, 110px) 0;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: clamp(24px, 5vw, 80px);
          padding-right: clamp(24px, 5vw, 80px);
        }

        .diff-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 32px;
          margin-bottom: clamp(32px, 4.5vw, 54px);
        }

        .diff-header-left {
          flex: 1;
          max-width: 760px;
        }

        .diff-header-right {
          flex-shrink: 0;
          padding-top: 4px;
        }

        .diff-overline {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--accent);
          display: block;
          margin-bottom: 0.6rem;
        }

        .diff-heading {
          font-family: var(--font-heading, sans-serif);
          font-size: clamp(1.8rem, 3.2vw, 3rem);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
          text-transform: uppercase;
        }

        .diff-intro {
          font-family: var(--font-body, sans-serif);
          font-size: clamp(14px, 1.25vw, 16px);
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 640px;
          margin: 1rem 0 0 0;
        }

        .diff-microcopy {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          display: block;
          white-space: nowrap;
        }

        .capability-grid-wrapper {
          position: relative;
          border: 1px solid var(--border-subtle);
          overflow: hidden;
          will-change: transform;
        }

        .capability-grid {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: var(--border-subtle);
        }

        .capability-row {
          display: grid;
          gap: 1px;
          background: var(--border-subtle);
        }

        /* White Theme Specific Overrides for Cyber Operating Model */
        [data-theme="light"] .capability-card {
          background-color: #ffffff !important;
          color: #060606 !important;
        }

        [data-theme="light"] .capability-card:hover {
          background-color: #f9f8f4 !important;
        }

        [data-theme="light"] .card-title {
          color: #060606 !important;
        }

        [data-theme="light"] .card-body {
          color: #5e5e5a !important;
        }

        [data-theme="light"] .capability-card:hover .card-body {
          color: #060606 !important;
        }

        [data-theme="light"] .card-descriptor {
          color: #9c9c97 !important;
        }

        [data-theme="light"] .capability-card:hover .card-descriptor {
          color: var(--accent) !important;
        }

        [data-theme="light"] .capability-grid-wrapper,
        [data-theme="light"] .capability-grid,
        [data-theme="light"] .capability-row {
          background-color: rgba(6, 6, 6, 0.08) !important;
          border-color: rgba(6, 6, 6, 0.08) !important;
        }

        @media (min-width: 1024px) {
          .capability-row.row-left-heavy {
            grid-template-columns: 62fr 38fr;
          }
          .capability-row.row-right-heavy {
            grid-template-columns: 38fr 62fr;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .capability-row {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 767px) {
          .diff-header {
            flex-direction: column;
            gap: 16px;
          }

          .diff-header-right {
            order: -1;
            padding-top: 0;
          }

          .capability-row {
            grid-template-columns: 1fr !important;
          }

          .capability-card {
            min-height: unset !important;
            padding: 20px 18px !important;
          }

          .card-top-row {
            flex-direction: column;
            gap: 6px;
          }

          .card-descriptor {
            text-align: left !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .card-spotlight {
            display: none !important;
          }
          .card-bottom-accent {
            transition: none !important;
          }
          .capability-card {
            transition: none !important;
          }
          .capability-grid-wrapper {
            transform: none !important;
          }
        }
      `}</style>

      {/* ── Section Header ─────────────────────────────────────── */}
      <div className="diff-header">
        <div className="diff-header-left">
          <motion.span
            className="diff-overline font-mono"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            // CYBER OPERATING MODEL
          </motion.span>

          <motion.h2
            className="diff-heading font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            FROM SECURITY SIGNALS TO GOVERNED ACTION.
          </motion.h2>

          <p className="diff-intro font-sans">
            {wordReveal(
              'Entersoft starts with application risk and connects it to cloud, identity, endpoint, threat and control context—turning fragmented signals into governed decisions and verified action.',
              isReducedMotion
            )}
          </p>
        </div>

        <div className="diff-header-right">
          <motion.span
            className="diff-microcopy font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            // APPLICATION-FIRST. ENTERPRISE-WIDE.
          </motion.span>
        </div>
      </div>

      {/* ── Capability Grid ────────────────────────────────────── */}
      <div ref={gridWrapperRef} className="capability-grid-wrapper">
        {!isReducedMotion && (
          <svg
            className="absolute inset-0 pointer-events-none w-full h-full"
            style={{ zIndex: 10 }}
          >
            <rect
              ref={svgBorderRef}
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              style={{ opacity: 0 }}
            />
          </svg>
        )}

        <div className="capability-grid">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className={`capability-row ${row.className}`}>
              {row.cards.map((card) => (
                <CapabilityCard
                  key={card.id}
                  card={card}
                  isWide={card.gridPosition.includes('wide')}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
