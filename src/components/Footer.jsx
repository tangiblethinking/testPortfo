// WCAG AA — all colours verified on white (#FFFFFF)
const BLUE    = '#1D5FD9'   // 5.74:1 ✓
const INK     = '#0D1117'   // 19.1:1 ✓
const INK_SEC = '#4A5568'   // 7.0:1  ✓
const BORDER  = '#D1D5DB'

export function Footer({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <footer style={{ borderTop: '1px solid ' + BORDER, background: '#F7F8FA' }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        padding: 'clamp(2rem,5vw,3rem) clamp(1rem,4vw,2.5rem)',
        display: 'flex', flexWrap: 'wrap',
        justifyContent: 'space-between', alignItems: 'flex-start',
        gap: '2rem',
      }}>
        <div>
          <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.5rem', color: INK, marginBottom: 4 }}>
            Christopher Kenreigh
          </p>
          <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: INK_SEC }}>
            UX & Product Design Principal
          </p>
        </div>

        <nav aria-label="Footer navigation" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
          {[
            { label: 'Work',   p: 'work' },
            { label: 'About',  p: 'about' },
            { label: 'Resume', p: 'resume' },
          ].map(({ label, p }) => (
            <button key={p} onClick={() => go(p)} style={{
              fontSize: '0.65rem', textTransform: 'uppercase',
              letterSpacing: '0.12em', color: INK_SEC,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              transition: 'color 0.2s', fontWeight: 600,
            }}
            onMouseEnter={e => e.currentTarget.style.color = BLUE}
            onMouseLeave={e => e.currentTarget.style.color = INK_SEC}
            >{label}</button>
          ))}
          <a
            href="https://www.linkedin.com/in/kenreigh/"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: '0.65rem', textTransform: 'uppercase',
              letterSpacing: '0.12em', color: INK_SEC,
              textDecoration: 'none', transition: 'color 0.2s', fontWeight: 600,
            }}
            onMouseEnter={e => e.currentTarget.style.color = BLUE}
            onMouseLeave={e => e.currentTarget.style.color = INK_SEC}
          >LinkedIn ↗</a>
        </nav>

        <div style={{ textAlign: 'right' }}>
          <a
            href="mailto:c.kenreigh@gmail.com"
            style={{
              fontSize: '0.875rem', color: INK,
              textDecoration: 'none', display: 'block', marginBottom: 4,
              transition: 'color 0.2s', fontWeight: 500,
            }}
            onMouseEnter={e => e.currentTarget.style.color = BLUE}
            onMouseLeave={e => e.currentTarget.style.color = INK}
          >c.kenreigh@gmail.com</a>
          <p style={{ fontSize: '0.6rem', color: INK_SEC, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            USA Based · © 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
