import { useEffect, useRef } from 'react'

const BLUE  = 'var(--accent)'
const URL   = 'https://www.uxapex.com/portfolioa32'

const NAV_LINKS = [
  { label: 'Case Studies', page: 'work' },
  { label: 'About',        page: 'about' },
  { label: 'Resume',       page: 'resume' },
]

export function PortfolioOverlay({ open, onClose, setPage }) {
  const iframeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const go = (p) => {
    onClose()
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio"
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'var(--ink-primary)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1rem,4vw,2.5rem)', height: 56,
        background: 'rgba(8,8,8,0.94)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button
            onClick={() => go('home')}
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.15rem', fontWeight: 600,
              background: 'none', border: 'none',
              cursor: 'pointer', padding: 0,
              color: 'rgba(255,255,255,0.72)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.72)'}
          >CK</button>
          <span style={{
            fontSize: '0.6rem', textTransform: 'uppercase',
            letterSpacing: '0.14em', fontWeight: 600,
            color: 'rgba(255,255,255,0.20)',
          }}>Portfolio</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {NAV_LINKS.map(({ label, page: p }) => (
            <button key={p} onClick={() => go(p)} style={{
              fontSize: '0.65rem', textTransform: 'uppercase',
              letterSpacing: '0.12em', fontWeight: 600,
              background: 'none', border: 'none',
              cursor: 'pointer', padding: 0,
              color: 'rgba(255,255,255,0.72)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = BLUE}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.72)'}
            >{label}</button>
          ))}
          <a
            href="mailto:c.kenreigh@gmail.com"
            style={{
              fontSize: '0.65rem', textTransform: 'uppercase',
              letterSpacing: '0.12em', fontWeight: 600,
              color: 'rgba(255,255,255,0.82)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 9999, padding: '0.4rem 1rem',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = BLUE; e.currentTarget.style.borderColor = BLUE }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.82)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
          >Contact</a>
          <span style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.20)' }} />
          <button
            onClick={onClose}
            aria-label="Close portfolio"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'none', border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.55)',
              fontSize: '1.1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
          >✕</button>
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative', background: 'var(--surface-0)' }}>
        <iframe
          ref={iframeRef}
          src={URL}
          title="Portfolio"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          allow="fullscreen"
        />
      </div>
    </div>
  )
}
