import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const expo = [0.16, 1, 0.3, 1]

const BLUE     = 'var(--accent)'
const INK      = 'var(--ink-primary)'
const INK_BODY = 'var(--ink-body)'
const INK_SEC  = 'var(--ink-secondary)'
const INK_TERT = 'var(--ink-tertiary)'
const BORDER   = 'var(--border)'
const SURFACE1 = 'var(--surface-1)'
const SURFACE2 = 'var(--surface-2)'

function toFigmaEmbedUrl(url) {
  if (!url || typeof url !== 'string') return url
  if (url.includes('embed.figma.com') || url.includes('figma.com/embed')) return url
  if (!url.includes('figma.com')) return url
  try {
    const u = new URL(url)
    const path = u.pathname
    const match = path.match(/^\/(design|board|proto|file|slides|deck)\/([a-zA-Z0-9]+)/)
    if (match) {
      const type = match[1] === 'file' ? 'design' : match[1]
      const fileKey = match[2]
      const params = new URLSearchParams()
      params.set('embed-host', 'uxapex')
      if (u.searchParams.get('node-id')) params.set('node-id', u.searchParams.get('node-id'))
      if (u.searchParams.get('starting-point-node-id')) params.set('starting-point-node-id', u.searchParams.get('starting-point-node-id'))
      if (u.searchParams.get('page-id')) params.set('page-id', u.searchParams.get('page-id'))
      return `https://embed.figma.com/${type}/${fileKey}?${params.toString()}`
    }
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`
  } catch {
    return url
  }
}

function DesignModal({ url, label, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'var(--overlay-scrim)',
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
          background: 'var(--surface-0)', borderRadius: 16,
          overflow: 'hidden', border: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 24px 80px rgba(0,0,0,0.14)',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 1rem', background: SURFACE1,
          borderBottom: '1px solid var(--border)',
          flexShrink: 0, height: 48, minHeight: 48,
        }}>
          <span style={{
            fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em',
            color: INK_SEC, fontWeight: 600,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '1rem',
          }}>{label}</span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: SURFACE2, border: '1px solid var(--border)',
              color: INK_BODY, fontSize: '0.9rem', cursor: 'pointer',
              flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
            onMouseLeave={e => e.currentTarget.style.background = SURFACE2}
          >✕</button>
        </div>
        <iframe
          src={toFigmaEmbedUrl(url)}
          title={label}
          style={{ width: '100%', flex: 1, border: 'none', display: 'block' }}
          allow="fullscreen"
          allowFullScreen
        />
      </motion.div>
    </div>
  )
}

export function DesignCard({ design, index = 0 }) {
  const [modal, setModal] = useState(null)
  const dotColor = design.color === '#1A1A1A' || design.color === 'var(--ink-primary)' ? BLUE : design.color
  const primaryLabel   = design.primaryLabel   || 'See Design'
  const secondaryLabel = design.secondaryLabel || 'See Research'
  const showSecondary  = design.showSecondary === true && !!design.secondaryUrl
  const category       = design.category || 'Design'
  const openModal = (url, label) => { if (url) setModal({ url, label }) }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, delay: index * 0.12, ease: expo }}
        style={{ display: 'flex', height: '100%' }}
      >
        <div
          style={{
            display: 'flex', flexDirection: 'column',
            width: '100%',
            background: 'var(--surface-0)',
            border: '1.5px solid ' + BORDER,
            borderRadius: 16, overflow: 'hidden',
            transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
            position: 'relative',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.boxShadow   = '0 4px 12px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.07)'
            e.currentTarget.style.transform   = 'translateY(-3px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = BORDER
            e.currentTarget.style.boxShadow   = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'
            e.currentTarget.style.transform   = 'translateY(0)'
          }}
        >
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '1.1rem 1.5rem 0.9rem',
            borderBottom: '1px solid var(--border)',
            flexShrink: 0, background: SURFACE1,
          }}>
            <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: INK_TERT, fontWeight: 600 }}>{design.index}</span>
            <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: BLUE, fontWeight: 600 }}>{category}</span>
          </div>

          {design.imageUrl && (
            <div style={{ width: '100%', aspectRatio: '16 / 10', overflow: 'hidden', background: SURFACE2, flexShrink: 0 }}>
              <img src={design.imageUrl} alt={design.title || 'Design preview'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
            </div>
          )}

          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: INK_SEC, fontWeight: 600 }}>{design.subtitle}</span>
            </div>
            <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', fontWeight: 500, lineHeight: 1.2, color: INK, margin: '0 0 0.875rem' }}>{design.title}</h3>
            <p style={{ fontSize: '0.875rem', color: INK_BODY, lineHeight: 1.65, margin: '0 0 1.25rem', flex: 1 }}>{design.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.25rem' }}>
              {design.tags.map(tag => (<span key={tag} className="tag">{tag}</span>))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
              <button
                onClick={() => openModal(design.primaryUrl, `${design.title} — ${primaryLabel}`)}
                aria-label={`${primaryLabel}: ${design.title}`}
                style={{ width: '100%', minHeight: 42, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: 'white', background: BLUE, border: 'none', borderRadius: 9999, cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-h)'}
                onMouseLeave={e => e.currentTarget.style.background = BLUE}
              >{primaryLabel} →</button>
              {showSecondary && (
                <button
                  onClick={() => openModal(design.secondaryUrl, `${design.title} — ${secondaryLabel}`)}
                  aria-label={`${secondaryLabel}: ${design.title}`}
                  style={{ width: '100%', minHeight: 42, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: INK_SEC, background: 'transparent', border: '1.5px solid ' + BORDER, borderRadius: 9999, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = INK; e.currentTarget.style.borderColor = INK }}
                  onMouseLeave={e => { e.currentTarget.style.color = INK_SEC; e.currentTarget.style.borderColor = BORDER }}
                >{secondaryLabel} →</button>
              )}
            </div>
          </div>

          <div style={{ height: 3, background: dotColor, flexShrink: 0, transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}
            ref={el => {
              if (!el) return
              const card = el.closest('div[style]')
              if (!card) return
              const parent = card.parentElement
              const onEnter = () => { el.style.transform = 'scaleX(1)' }
              const onLeave = () => { el.style.transform = 'scaleX(0)' }
              parent.addEventListener('mouseenter', onEnter)
              parent.addEventListener('mouseleave', onLeave)
            }}
          />
        </div>
      </motion.div>

      {modal && (
        <DesignModal url={modal.url} label={modal.label} onClose={() => setModal(null)} />
      )}
    </>
  )
}
