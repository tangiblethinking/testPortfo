import { useEffect, useRef } from 'react'

const BLUE  = '#3B82F6'
const URL   = 'https://www.uxapex.com/portfolioa32'

const NAV_LINKS = [
  { label: 'Case Studies', page: 'work' },
  { label: 'About',        page: 'about' },
  { label: 'Resume',       page: 'resume' },
]

export function PortfolioOverlay({ open, onClose, setPage }) {
  const iframeRef = useRef(null)

  const navigate = (page) => {
    onClose()
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Lock body scroll while overlay is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Escape key closes overlay
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
      background: '#080808',
      animation: 'overlayIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
    }}>

      {/* ── Top nav bar ── */}
      <div style={{
        height: 64,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(1rem, 4vw, 2.5rem)',
        background: 'rgba(8,8,8,0.94)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>

        {/* Left — Back button + pipe + Portfolio title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              color: 'rgba(255,255,255,0.72)',
              fontSize: '0.7rem',
              fontFamily: '"DM Sans", Helvetica Neue, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.72)'}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          <span style={{
            color: 'rgba(255,255,255,0.20)',
            fontSize: '1rem',
            fontWeight: 200,
            lineHeight: 1,
            userSelect: 'none',
          }}>|</span>

          <span style={{
            fontFamily: '"DM Sans", Helvetica Neue, sans-serif',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: 500,
            color: 'white',
          }}>Portfolio</span>
        </div>

        {/* Right — nav links + Contact pill + pipe + × close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontWeight: 500,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                color: 'rgba(255,255,255,0.72)',
                fontFamily: '"DM Sans", Helvetica Neue, sans-serif',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.72)'}
            >{label}</button>
          ))}

          {/* Contact pill */}
          <a
            href="mailto:c.kenreigh@gmail.com"
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 500,
              fontFamily: '"DM Sans", Helvetica Neue, sans-serif',
              textDecoration: 'none',
              color: 'rgba(255,255,255,0.82)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 9999,
              padding: '0.5rem 1.25rem',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = BLUE; e.currentTarget.style.borderColor = BLUE }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.82)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
          >Contact</a>

          {/* Pipe divider */}
          <span style={{
            color: 'rgba(255,255,255,0.20)',
            fontSize: '1rem',
            fontWeight: 200,
            lineHeight: 1,
            userSelect: 'none',
            marginLeft: '-0.5rem',
          }}>|</span>

          {/* × close */}
          <button
            onClick={onClose}
            aria-label="Close portfolio"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.55)',
              padding: '6px',
              lineHeight: 1,
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '-0.5rem',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── iframe fills remaining space ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Subtle loading shimmer behind iframe */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#0d0d0d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.20)',
            fontFamily: '"DM Sans", Helvetica Neue, sans-serif',
          }}>Loading portfolio…</span>
        </div>

        <iframe
          ref={iframeRef}
          src={URL}
          title="Portfolio"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
          }}
          allow="fullscreen"
        />
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes overlayIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
