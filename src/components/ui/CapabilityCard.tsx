'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { CapabilityCard as CapabilityCardType } from '@/data/differentiators'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface CapabilityCardProps {
  card: CapabilityCardType
  isWide?: boolean
  className?: string
}

export default function CapabilityCard({ card, isWide = false, className = '' }: CapabilityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const cardEl = cardRef.current
    if (!cardEl) return
    const rect = cardEl.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardEl.style.setProperty('--x', `${x}%`)
    cardEl.style.setProperty('--y', `${y}%`)
  }, [])

  useEffect(() => {
    const cardEl = cardRef.current
    if (!cardEl || isReducedMotion) return

    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    const scaleUp = gsap.quickTo(cardEl, 'scale', { duration: 0.25, ease: 'power2.out' })
    const scaleDown = gsap.quickTo(cardEl, 'scale', { duration: 0.2, ease: 'power2.in' })

    const onEnter = () => {
      setIsHovered(true)
      scaleUp(1.01)
    }

    const onLeave = () => {
      setIsHovered(false)
      scaleDown(1)
    }

    cardEl.addEventListener('mouseenter', onEnter)
    cardEl.addEventListener('mouseleave', onLeave)

    return () => {
      cardEl.removeEventListener('mouseenter', onEnter)
      cardEl.removeEventListener('mouseleave', onLeave)
    }
  }, [isReducedMotion])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-card-id={card.id}
      className={`capability-card ${isWide ? 'card-wide' : 'card-narrow'} ${className}`}
      style={{
        position: 'relative',
        background: isHovered ? 'var(--bg-elevated)' : 'var(--bg-primary)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        transition: 'background 200ms ease',
        minHeight: isWide ? '210px' : '190px',
        padding: isWide ? '28px 24px 22px 24px' : '24px 20px 20px 20px',
        willChange: 'transform',
      }}
    >
      {/* Spotlight overlay — follows cursor */}
      {!isReducedMotion && (
        <div
          className="card-spotlight"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), var(--accent-dim) 0%, transparent 70%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 300ms ease',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Card content */}
      <div
        className="card-inner"
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          className="card-top-row"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '12px',
            marginBottom: '14px',
          }}
        >
          <span
            className="card-title font-display"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: isWide ? 'clamp(1.05rem, 1.4vw, 1.3rem)' : 'clamp(0.95rem, 1.2vw, 1.15rem)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
              lineHeight: 1.25,
              flex: 1,
            }}
          >
            {card.title}
          </span>
          <span
            className="card-descriptor font-mono"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9.5px',
              color: isHovered ? 'var(--accent)' : 'var(--text-tertiary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textAlign: 'right',
              whiteSpace: 'nowrap',
              paddingTop: '2px',
              flexShrink: 0,
              transition: 'color 200ms ease',
            }}
          >
            {card.descriptor}
          </span>
        </div>

        <p
          className="card-body font-sans"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px, 1.1vw, 14.5px)',
            color: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
            lineHeight: 1.6,
            margin: 0,
            transition: 'color 200ms ease',
          }}
        >
          {card.body}
        </p>
      </div>

      {/* Bottom edge: accent bar that expands on hover with asymmetric timing */}
      <div
        className="card-bottom-accent"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '1.5px',
          width: isHovered ? '100%' : '0%',
          background: 'var(--accent)',
          transition: isHovered
            ? 'width 350ms cubic-bezier(0.22, 1, 0.36, 1)'
            : 'width 200ms ease-in',
          zIndex: 1,
        }}
      />
    </div>
  )
}
