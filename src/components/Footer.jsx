export function Footer({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-1)' }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        padding: 'clamp(2rem,5vw,3rem) clamp(1rem,4vw,2.5rem)',
        display: 'flex', flexWrap: 'wrap',
        justifyContent: 'space-between', alignItems: 'flex-start',
        gap: '2rem',
      }}>
        <div>
          <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.5rem', color: 'var(--ink-primary)', marginBottom: 4 }}>
            Christopher Kenreigh
          </p>
          <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-secondary)' }}>
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
              letterSpacing: '0.12em', color: 'var(--ink-secondary)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              transition: 'color 0.2s', fontWeight: 600,
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-secondary)'}
            >{label}</button>
          ))}
          <a
            href="https://www.linkedin.com/in/kenreigh/"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: '0.65rem', textTransform: 'uppercase',
              letterSpacing: '0.12em', color: 'var(--ink-secondary)',
              textDecoration: 'none', transition: 'color 0.2s', fontWeight: 600,
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-secondary)'}
          >LinkedIn ↗</a>
        </nav>

        <div style={{ textAlign: 'right' }}>
          <a
            href="mailto:c.kenreigh@gmail.com"
            style={{
              fontSize: '0.875rem', color: 'var(--ink-primary)',
              textDecoration: 'none', display: 'block', marginBottom: 4,
              transition: 'color 0.2s', fontWeight: 500,
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-primary)'}
          >c.kenreigh@gmail.com</a>
          <p style={{ fontSize: '0.6rem', color: 'var(--ink-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            USA Based · © 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
