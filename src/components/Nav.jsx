import { useState, useEffect } from 'react'

// WCAG AA colours — all verified ≥ 4.5:1 on white (#FFFFFF)
const BLUE       = '#1D5FD9'   // 5.74:1 ✓
const INK        = '#0D1117'   // 19.1:1 ✓
const INK_SEC    = '#4A5568'   // 7.0:1  ✓
const BORDER     = '#D1D5DB'
const SURFACE_2  = '#EFF1F5'

const links = [
  { label: 'Case Studies', page: 'work' },
  { label: 'About',        page: 'about' },
  { label: 'Resume',       page: 'resume' },
  { label: 'Portfolio',    page: 'portfolio' },
]

export function Nav({ page, setPage, openPortfolio }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (p) => {
    if (p === 'portfolio') { setOpen(false); openPortfolio(); return }
    setPage(p); setOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <a href="#main-content" style={{
        position: 'absolute', top: '-100%', left: '1rem', zIndex: 9999,
        background: BLUE, color: 'white', padding: '0.75rem 1.25rem',
        borderRadius: '0 0 8px 8px', fontSize: '0.85rem', fontWeight: 600,
        textDecoration: 'none', transition: 'top 0.2s',
      }} onFocus={e => e.currentTarget.style.top='0'}
         onBlur={e => e.currentTarget.style.top='-100%'}
      >Skip to main content</a>

      <nav
        role="navigation"
        aria-label="Primary navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
          background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.0)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 #D1D5DB' : 'none',
        }}
      >
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          padding: '0 clamp(1rem, 4vw, 2.5rem)',
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <button
            onClick={() => go('home')}
            aria-label="Christopher Kenreigh — Home"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.3rem', fontWeight: 600,
              color: INK, background: 'none', border: 'none',
              cursor: 'pointer', padding: 0, transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = BLUE}
            onMouseLeave={e => e.currentTarget.style.color = INK}
          >CK</button>

          {/* Desktop links */}
          <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {links.map(({ label, page: p }) => (
              <button
                key={p}
                onClick={() => go(p)}
                aria-current={page === p ? 'page' : undefined}
                style={{
                  fontSize: '0.7rem', textTransform: 'uppercase',
                  letterSpacing: '0.14em', fontWeight: 600,
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  color: page === p ? BLUE : INK_SEC,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { if (page !== p) e.currentTarget.style.color = INK }}
                onMouseLeave={e => { if (page !== p) e.currentTarget.style.color = INK_SEC }}
              >{label}</button>
            ))}
            <a
              href="mailto:c.kenreigh@gmail.com"
              style={{
                fontSize: '0.7rem', textTransform: 'uppercase',
                letterSpacing: '0.14em', fontWeight: 600,
                textDecoration: 'none',
                color: 'white',
                background: BLUE,
                border: '1.5px solid ' + BLUE,
                borderRadius: 9999, padding: '0.5rem 1.25rem',
                transition: 'all 0.25s',
                minHeight: 36, display: 'inline-flex', alignItems: 'center',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1448B3'; e.currentTarget.style.borderColor = '#1448B3' }}
              onMouseLeave={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.borderColor = BLUE }}
            >Contact</a>
          </div>

          {/* Hamburger */}
          <button
            className="show-mobile"
            onClick={() => setOpen(!open)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'none', flexDirection: 'column', gap: '5px', padding: '8px',
              minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center',
            }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2, background: INK,
                borderRadius: 2, transition: 'all 0.3s',
                transform: open
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
                  : 'none' : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: 'fixed', inset: 0, zIndex: 90,
          background: '#FFFFFF',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(1.5rem, 6vw, 3rem)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      >
        {[...links, { label: 'Contact', page: null }].map(({ label, page: p }) =>
          p ? (
            <button key={p} onClick={() => go(p)} style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2.2rem, 9vw, 4.5rem)',
              color: INK, background: 'none', border: 'none',
              cursor: 'pointer', textAlign: 'left', padding: 0,
              marginBottom: '0.25rem', lineHeight: 1.15,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = BLUE}
            onMouseLeave={e => e.currentTarget.style.color = INK}
            >{label}</button>
          ) : (
            <a key={label} href="mailto:c.kenreigh@gmail.com" style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2.2rem, 9vw, 4.5rem)',
              color: INK_SEC, textDecoration: 'none', lineHeight: 1.15,
            }}>{label}</a>
          )
        )}
        <p style={{ fontSize: '0.7rem', color: INK_SEC, marginTop: '3rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          c.kenreigh@gmail.com · 480-206-2145
        </p>
      </div>
    </>
  )
}
