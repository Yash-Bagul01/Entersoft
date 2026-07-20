'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import type { Service } from '@/data/services'

interface ServiceHoverCardProps {
  service: Service | null
  isVisible: boolean
  position?: 'fixed-right' | 'inline-right'
}

const panelVariants = {
  hidden: { x: 16, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { x: 12, opacity: 0, transition: { duration: 0.18, ease: [0.65, 0, 0.35, 1] as const } },
}

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
}

function getEyebrowLabel(slug: string): string {
  switch (slug) {
    case 'appsec': return 'APPLICATION SECURITY';
    case 'vapt': return 'OFFENSIVE SECURITY';
    case 'managed-cloud-security': return 'CLOUD SECURITY';
    case 'compliance-management': return 'RISK & GOVERNANCE';
    case 'siem': return 'MANAGED DEFENSE';
    case 'smart-contract-audits': return 'DIGITAL ASSET SECURITY';
    case 'ai-ast': return 'AI SECURITY';
    default: return 'SECURITY PRACTICE';
  }
}

function AppAssuranceVisual() {
  return (
    <div className="relative w-full h-full bg-[#030712] overflow-hidden select-none flex items-center justify-center">
      {/* Sleek cyber grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-size-[12px_12px] opacity-40" />
      
      {/* Soft ambient glowing orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/5 rounded-full filter blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-sky-500/5 rounded-full filter blur-xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-24 h-20 bg-emerald-500/5 rounded-full filter blur-xl pointer-events-none" />

      {/* Bespoke Organic Graph SVG */}
      <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 300 140" fill="none">
        <defs>
          <filter id="glow-heavy" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-soft" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="path-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="path-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#EF4444" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes flow-dash {
            to {
              stroke-dashoffset: -20;
            }
          }
          @keyframes pulse-glow {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.08);
            }
          }
          .flow-line {
            animation: flow-dash 2.5s linear infinite;
          }
          .pulse-circle {
            transform-origin: center;
            animation: pulse-glow 3s ease-in-out infinite;
          }
          .pulse-circle-fast {
            transform-origin: center;
            animation: pulse-glow 2s ease-in-out infinite;
          }
        `}} />

        {/* --- CONNECTING BEZIER PATHS --- */}
        {/* Repo to App */}
        <path d="M 45 35 C 80 35, 80 70, 115 70" stroke="url(#path-grad-1)" strokeWidth="1.2" />
        <path d="M 45 35 C 80 35, 80 70, 115 70" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="4 6" className="flow-line" opacity="0.4" />

        {/* API to App */}
        <path d="M 45 105 C 80 105, 80 70, 115 70" stroke="url(#path-grad-1)" strokeWidth="1.2" />
        <path d="M 45 105 C 80 105, 80 70, 115 70" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="4 6" className="flow-line" opacity="0.4" />

        {/* App to Findings */}
        <path d="M 145 70 C 170 70, 170 35, 195 35" stroke="url(#path-grad-2)" strokeWidth="1.2" />
        <path d="M 145 70 C 170 70, 170 35, 195 35" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="4 6" className="flow-line" opacity="0.4" />

        {/* App to Remedy */}
        <path d="M 145 70 C 170 70, 170 105, 195 105" stroke="url(#path-grad-2)" strokeWidth="1.2" />
        <path d="M 145 70 C 170 70, 170 105, 195 105" stroke="#10B981" strokeWidth="1.2" strokeDasharray="4 6" className="flow-line" opacity="0.4" />

        {/* Findings to Remedy */}
        <path d="M 195 35 C 195 60, 195 80, 195 105" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

        {/* Remedy to Evidence */}
        <path d="M 195 105 C 225 105, 225 70, 255 70" stroke="#10B981" strokeWidth="1.2" />
        <path d="M 195 105 C 225 105, 225 70, 255 70" stroke="#10B981" strokeWidth="1.2" strokeDasharray="4 6" className="flow-line" opacity="0.4" />

        {/* --- GLOW FILTERS FOR ACTIVE NODES --- */}
        {/* Repo Node Glow */}
        <circle cx="45" cy="35" r="10" fill="#3B82F6" opacity="0.15" className="pulse-circle" />
        {/* API Node Glow */}
        <circle cx="45" cy="105" r="10" fill="#3B82F6" opacity="0.15" className="pulse-circle" />
        {/* App Node Glow */}
        <circle cx="130" cy="70" r="18" fill="#8B5CF6" opacity="0.12" className="pulse-circle" />
        {/* Findings Node Glow */}
        <circle cx="195" cy="35" r="12" fill="#EF4444" opacity="0.15" className="pulse-circle-fast" />
        {/* Remedy Node Glow */}
        <circle cx="195" cy="105" r="12" fill="#10B981" opacity="0.15" className="pulse-circle" />
        {/* Evidence Node Glow */}
        <circle cx="255" cy="70" r="10" fill="#10B981" opacity="0.15" className="pulse-circle" />

        {/* --- ACTUAL NODES (CIRCLES) --- */}
        {/* Repo Node */}
        <circle cx="45" cy="35" r="4" fill="#1E293B" stroke="#3B82F6" strokeWidth="1.5" filter="url(#glow-soft)" />
        {/* API Node */}
        <circle cx="45" cy="105" r="4" fill="#1E293B" stroke="#3B82F6" strokeWidth="1.5" filter="url(#glow-soft)" />
        {/* App Node */}
        <circle cx="130" cy="70" r="6" fill="#1E293B" stroke="#8B5CF6" strokeWidth="2" filter="url(#glow-heavy)" />
        {/* Findings Node */}
        <circle cx="195" cy="35" r="4.5" fill="#1E293B" stroke="#EF4444" strokeWidth="1.5" filter="url(#glow-soft)" />
        {/* Remedy Node */}
        <circle cx="195" cy="105" r="4.5" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" filter="url(#glow-soft)" />
        {/* Evidence Node */}
        <circle cx="255" cy="70" r="4" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" filter="url(#glow-soft)" />

        {/* --- LABELS (TYPOGRAPHY) --- */}
        <g className="font-mono">
          {/* Repo */}
          <text x="45" y="22" textAnchor="middle" fill="#94A3B8" fontSize="6.5" fontWeight="bold" letterSpacing="0.05em">repository</text>
          {/* API */}
          <text x="45" y="119" textAnchor="middle" fill="#94A3B8" fontSize="6.5" fontWeight="bold" letterSpacing="0.05em">api endpoint</text>
          {/* App */}
          <text x="130" y="53" textAnchor="middle" fill="#C084FC" fontSize="7.5" fontWeight="bold" letterSpacing="0.08em">application</text>
          {/* Findings */}
          <text x="195" y="22" textAnchor="middle" fill="#F87171" fontSize="6.5" fontWeight="bold" letterSpacing="0.05em">findings</text>
          {/* Remedy */}
          <text x="195" y="119" textAnchor="middle" fill="#34D399" fontSize="6.5" fontWeight="bold" letterSpacing="0.05em">remediation</text>
          {/* Evidence */}
          <text x="255" y="58" textAnchor="middle" fill="#34D399" fontSize="6.5" fontWeight="bold" letterSpacing="0.05em">release evidence</text>
        </g>
      </svg>
    </div>
  )
}

export default function ServiceHoverCard({ service, isVisible }: ServiceHoverCardProps) {
  return (
    <>
      <AnimatePresence mode="wait">
        {isVisible && service && (
          <motion.div
            key={service.slug}
            className="service-hover-card"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
              className="service-hover-card-inner"
              variants={contentVariants} 
              initial="hidden" 
              animate="visible"
            >
              {/* Image wrapper - renders the high-quality stock image for all services */}
              <motion.div className="card-image-wrapper" variants={itemVariants}>
                <img 
                  src={service.image} 
                  alt={service.displayName} 
                  className="card-image"
                />
              </motion.div>

              <div className="card-info-content">
                <motion.span className="card-index" variants={itemVariants}>
                  {service.index} / 07
                </motion.span>

                <motion.span className="card-eyebrow" variants={itemVariants}>
                  {getEyebrowLabel(service.slug)}
                </motion.span>

                <motion.h3 className="card-name" variants={itemVariants}>
                  {service.displayName}
                </motion.h3>

                <motion.hr className="card-rule" variants={itemVariants} />

                <motion.h4 className="card-heading" variants={itemVariants}>
                  {service.hoverCardHeading}
                </motion.h4>

                <motion.p className="card-body" variants={itemVariants}>
                  {service.hoverCardBody}
                </motion.p>

                <motion.p className="card-descriptor" variants={itemVariants}>
                  {service.descriptor.split(' • ').join(' · ')}
                </motion.p>

                <motion.div variants={itemVariants}>
                  <Link href={service.route} className="card-cta">
                    Explore service →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-ambient {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-8px) translateX(4px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }

        .service-hover-card-inner {
          animation: float-ambient 5s ease-in-out infinite;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .service-hover-card {
          width: 360px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
        }

        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 150px;
          overflow: hidden;
          border-radius: 3px;
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.2);
          flex-shrink: 0;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-info-content {
          display: flex;
          flex-direction: column;
        }

        .card-index {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--accent);
          letter-spacing: 0.18em;
          display: block;
          margin-bottom: 6px;
        }

        .card-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          display: block;
          margin-bottom: 4px;
          text-transform: uppercase;
        }

        .card-name {
          font-family: var(--font-display), sans-serif;
          font-size: 1.35rem;
          font-weight: 500;
          text-transform: uppercase;
          color: var(--text-primary);
          line-height: 1.2;
          margin: 0 0 12px 0;
        }

        .card-rule {
          border: none;
          border-top: 1px solid var(--border-subtle);
          margin: 0 0 12px 0;
        }

        .card-heading {
          font-family: 'Schibsted Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 8px 0;
        }

        .card-body {
          font-family: 'Schibsted Grotesk', sans-serif;
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0 0 16px 0;
        }

        .card-descriptor {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9.5px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin: 0 0 20px 0;
        }

        .card-cta {
          font-family: 'Schibsted Grotesk', sans-serif;
          font-size: 13px;
          color: var(--accent);
          text-decoration: none;
          transition: text-decoration 150ms ease;
        }

        .card-cta:hover {
          text-decoration: underline;
        }
      `}} />
    </>
  )
}
