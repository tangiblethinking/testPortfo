import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const expo = [0.16, 1, 0.3, 1]

// WCAG AA colours — verified on white
const BLUE     = '#1D5FD9'   // 5.74:1 ✓
const INK      = '#0D1117'   // 19.1:1 ✓
const INK_BODY = '#2D3748'   // 10.7:1 ✓
const INK_SEC  = '#4A5568'   // 7.0:1  ✓
const INK_TERT = '#596880'   // 4.6:1  ✓
const BORDER   = '#D1D5DB'
const SURFACE1 = '#F7F8FA'
const SURFACE2 = '#EFF1F5'

function CaseStudyModal({ study, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${study.company} — ${study.title}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(13,17,23,0.70)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(0.5rem, 2vw, 1rem)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: expo }}
        style={{
          width: '100%', maxWidth: 1200, height: '92vh',
          background: '#FFFFFF', borderRadius: 16,
          overflow: 'hidden', border: '1px solid ' + BORDER,
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 24px 80px rgba(0,0,0,0.14)',
        }}
      >
        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 1rem', background: SURFACE1,
          borderBottom: '1px solid ' + BORDER,
          flexShrink: 0, height: 48, minHeight: 48,
        }}>
          <span style={{
            fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em',
            color: INK_SEC, fontWeight: 600,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '1rem',
          }}>
            {study.company} — {study.title}
          </span>
          <button
            onClick={onClose}
            aria-label="Close case study"
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: SURFACE2, border: '1px solid ' + BORDER,
              color: INK_BODY, fontSize: '0.9rem', cursor: 'pointer',
              flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#D1D5DB'}
            onMouseLeave={e => e.currentTarget.style.background = SURFACE2}
          >✕</button>
        </div>

        <iframe
          src={study.href}
          title={study.title}
          style={{ width: '100%', flex: 1, border: 'none', display: 'block' }}
          allow="fullscreen"
        />
      </motion.div>
    </div>
  )
}

export function CaseStudyCard({ study, index = 0 }) {
  const [open, setOpen] = useState(false)

  // Map original dark accent colours to light-theme WCAG-safe equivalents for tags/dots
  const dotColor = study.color === '#1A1A1A' || study.color === '#080808'
    ? BLUE : study.color

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, delay: index * 0.12, ease: expo }}
        style={{ display: 'flex', height: '100%' }}
      >
        <button
          onClick={() => setOpen(true)}
          aria-label={`View case study: ${study.title}`}
          style={{
            display: 'flex', flexDirection: 'column',
            width: '100%',
            background: '#FFFFFF',
            border: '1.5px solid ' + BORDER,
            borderRadius: 16, overflow: 'hidden',
            cursor: 'pointer',
            transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
            position: 'relative', textAlign: 'left',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(29,95,217,0.40)'
            e.currentTarget.style.boxShadow   = '0 4px 12px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.07)'
            e.currentTarget.style.transform   = 'translateY(-3px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = BORDER
            e.currentTarget.style.boxShadow   = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'
            e.currentTarget.style.transform   = 'translateY(0)'
          }}
        >
          {/* Card header row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '1.1rem 1.5rem 0.9rem',
            borderBottom: '1px solid ' + BORDER,
            flexShrink: 0, background: SURFACE1,
          }}>
            <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: INK_TERT, fontWeight: 600 }}>
              {study.index}
            </span>
            <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: BLUE, fontWeight: 600 }}>
              View Case Study →
            </span>
          </div>

          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: INK_SEC, fontWeight: 600 }}>
                {study.company} · {study.year}
              </span>
            </div>

            <h3 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              fontWeight: 500, lineHeight: 1.2,
              color: INK, margin: '0 0 0.875rem',
            }}>{study.title}</h3>

            <p style={{
              fontSize: '0.875rem', color: INK_BODY,
              lineHeight: 1.65, margin: '0 0 1.25rem', flex: 1,
            }}>{study.outcome}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {study.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Accent bar */}
          <div style={{
            height: 3, background: dotColor, flexShrink: 0,
            transform: 'scaleX(0)', transformOrigin: 'left',
            transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}
          ref={el => {
            if (!el) return
            const card = el.closest('button')
            card.addEventListener('mouseenter', () => el.style.transform = 'scaleX(1)')
            card.addEventListener('mouseleave', () => el.style.transform = 'scaleX(0)')
          }}
          />
        </button>
      </motion.div>

      {open && <CaseStudyModal study={study} onClose={() => setOpen(false)} />}
    </>
  )
}
