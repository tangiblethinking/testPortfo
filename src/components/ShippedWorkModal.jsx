import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { caseStudies } from '../lib/caseStudies'
import { designs } from '../lib/designs'
import { companyName, filterByCompanyKey } from '../lib/companyKeys'

const expo = [0.16, 1, 0.3, 1]
const BLUE = 'var(--accent)'
const INK = 'var(--ink-primary)'
const INK_BODY = 'var(--ink-body)'
const INK_SEC = 'var(--ink-secondary)'
const INK_TERT = 'var(--ink-tertiary)'
const BORDER = 'var(--border)'
const SURFACE0 = 'var(--surface-0)'
const SURFACE1 = 'var(--surface-1)'
const SURFACE2 = 'var(--surface-2)'

function toFigmaEmbedUrl(url) {
  if (!url || typeof url !== 'string') return url
  if (url.includes('embed.figma.com') || url.includes('figma.com/embed')) return url
  if (!url.includes('figma.com')) return url
  try {
    const u = new URL(url)
    const match = u.pathname.match(/^\/(design|board|proto|file|slides|deck)\/([a-zA-Z0-9]+)/)
    if (match) {
      const type = match[1] === 'file' ? 'design' : match[1]
      const params = new URLSearchParams()
      params.set('embed-host', 'uxapex')
      if (u.searchParams.get('node-id')) params.set('node-id', u.searchParams.get('node-id'))
      if (u.searchParams.get('starting-point-node-id')) params.set('starting-point-node-id', u.searchParams.get('starting-point-node-id'))
      if (u.searchParams.get('page-id')) params.set('page-id', u.searchParams.get('page-id'))
      return `https://embed.figma.com/${type}/${match[2]}?${params.toString()}`
    }
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`
  } catch { return url }
}

function DetailModal({ url, label, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div role="dialog" aria-modal="true" aria-label={label}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, zIndex: 210, background: 'var(--overlay-scrim)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(0.5rem, 2vw, 1rem)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.28, ease: expo }}
        style={{ width: '100%', maxWidth: 1200, height: '92vh', background: SURFACE0, borderRadius: 16, overflow: 'hidden', border: '1px solid ' + BORDER, display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.14)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', background: SURFACE1, borderBottom: '1px solid ' + BORDER, flexShrink: 0, height: 48 }}>
          <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: INK_SEC, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '1rem' }}>{label}</span>
          <button onClick={onClose} aria-label="Close and return to list" style={{ width: 32, height: 32, borderRadius: '50%', background: SURFACE2, border: '1px solid ' + BORDER, color: INK_BODY, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        <iframe src={toFigmaEmbedUrl(url)} title={label} style={{ width: '100%', flex: 1, border: 'none', display: 'block' }} allow="fullscreen" />
      </motion.div>
    </div>
  )
}

function MiniCaseCard({ study, onOpen }) {
  const dotColor = study.color === '#1A1A1A' || study.color === 'var(--ink-primary)' ? BLUE : study.color
  return (
    <button type="button" onClick={() => onOpen({ url: study.href, label: `${study.company} — ${study.title}` })}
      style={{ textAlign: 'left', width: '100%', cursor: 'pointer', background: SURFACE0, border: '1px solid ' + BORDER, borderRadius: 12, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE }} onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.9rem 1.15rem 0.75rem', borderBottom: '1px solid ' + BORDER, background: SURFACE1 }}>
        <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: INK_TERT, fontWeight: 600 }}>Case Study · {study.index}</span>
        <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: BLUE, fontWeight: 600 }}>Open →</span>
      </div>
      <div style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
          <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: INK_SEC, fontWeight: 600 }}>{study.company} · {study.year}</span>
        </div>
        <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem', fontWeight: 500, lineHeight: 1.25, color: INK, margin: 0 }}>{study.title}</h3>
        <p style={{ fontSize: '0.8rem', color: INK_BODY, lineHeight: 1.55, margin: 0, flex: 1 }}>{study.outcome}</p>
      </div>
    </button>
  )
}

function MiniDesignCard({ design, onOpen }) {
  const primaryLabel = design.primaryLabel || 'See Methodology'
  const secondaryLabel = design.secondaryLabel || 'See Design'
  const showSecondary = design.showSecondary !== false && design.secondaryUrl
  return (
    <div style={{ background: SURFACE0, border: '1px solid ' + BORDER, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.9rem 1.15rem 0.75rem', borderBottom: '1px solid ' + BORDER, background: SURFACE1 }}>
        <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: INK_TERT, fontWeight: 600 }}>Design · {design.index}</span>
        <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: BLUE, fontWeight: 600 }}>{design.category || 'Design'}</span>
      </div>
      {design.imageUrl && (
        <div style={{ aspectRatio: '16/10', overflow: 'hidden', background: SURFACE1 }}>
          <img src={design.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      )}
      <div style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem', fontWeight: 500, lineHeight: 1.25, color: INK, margin: 0 }}>{design.title}</h3>
        {design.subtitle && <p style={{ fontSize: '0.7rem', color: INK_SEC, margin: 0 }}>{design.subtitle}</p>}
        <p style={{ fontSize: '0.8rem', color: INK_BODY, lineHeight: 1.55, margin: 0, flex: 1 }}>{design.description}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
          <button type="button" onClick={() => onOpen({ url: design.primaryUrl, label: `${design.title} — ${primaryLabel}` })}
            style={{ width: '100%', minHeight: 40, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: 'white', background: BLUE, border: 'none', borderRadius: 9999, cursor: 'pointer' }}>{primaryLabel} →</button>
          {showSecondary && (
            <button type="button" onClick={() => onOpen({ url: design.secondaryUrl, label: `${design.title} — ${secondaryLabel}` })}
              style={{ width: '100%', minHeight: 40, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: INK_SEC, background: 'transparent', border: '1.5px solid ' + BORDER, borderRadius: 9999, cursor: 'pointer' }}>{secondaryLabel} →</button>
          )}
        </div>
      </div>
    </div>
  )
}

export function ShippedWorkModal({ companyKey, companyLabel, onClose }) {
  const [detail, setDetail] = useState(null)
  const name = companyLabel || companyName(companyKey) || 'Shipped Work'
  const relatedCases = filterByCompanyKey(caseStudies, companyKey)
  const relatedDesigns = filterByCompanyKey(designs, companyKey)
  const isEmpty = relatedCases.length === 0 && relatedDesigns.length === 0

  useEffect(() => {
    if (detail) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose, detail])

  return (
    <>
      <div role="dialog" aria-modal="true" aria-label={`Shipped work — ${name}`}
        onClick={(e) => { if (e.target === e.currentTarget && !detail) onClose() }}
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'var(--overlay-scrim)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(0.5rem, 2vw, 1rem)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.28, ease: expo }}
          style={{ width: '100%', maxWidth: 1100, maxHeight: '90vh', background: SURFACE0, borderRadius: 16, overflow: 'hidden', border: '1px solid ' + BORDER, display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.14)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.25rem', background: SURFACE1, borderBottom: '1px solid ' + BORDER, flexShrink: 0, height: 52 }}>
            <div>
              <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: BLUE, fontWeight: 600, display: 'block', marginBottom: 2 }}>Shipped Work</span>
              <span style={{ fontSize: '0.85rem', color: INK, fontWeight: 500 }}>{name}</span>
            </div>
            <button onClick={onClose} aria-label="Close shipped work" style={{ width: 32, height: 32, borderRadius: '50%', background: SURFACE2, border: '1px solid ' + BORDER, color: INK_BODY, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>
          <div style={{ overflowY: 'auto', padding: 'clamp(1.25rem, 3vw, 1.75rem)', flex: 1 }}>
            {isEmpty ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <p style={{ fontSize: '0.9rem', color: INK_BODY, marginBottom: 8 }}>No case studies or design cards are linked to this role yet.</p>
                <p style={{ fontSize: '0.75rem', color: INK_TERT }}>Assign a matching companyKey on the relevant cards to populate this view.</p>
              </div>
            ) : (
              <>
                {relatedCases.length > 0 && (
                  <div style={{ marginBottom: relatedDesigns.length ? '2rem' : 0 }}>
                    <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: INK_TERT, fontWeight: 600, marginBottom: '1rem' }}>Case Studies</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                      {relatedCases.map(s => <MiniCaseCard key={s.id} study={s} onOpen={setDetail} />)}
                    </div>
                  </div>
                )}
                {relatedDesigns.length > 0 && (
                  <div>
                    <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: INK_TERT, fontWeight: 600, marginBottom: '1rem' }}>Design Work</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                      {relatedDesigns.map(d => <MiniDesignCard key={d.id} design={d} onOpen={setDetail} />)}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
      {detail && <DetailModal url={detail.url} label={detail.label} onClose={() => setDetail(null)} />}
    </>
  )
}

export function ShippedWorkCta({ onClick }) {
  return (
    <button type="button" onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: BLUE, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-h)'}
      onMouseLeave={e => e.currentTarget.style.color = BLUE}
    >Shipped Work →</button>
  )
}
