import { Link } from 'react-router-dom'
const BLUE = '#3B82F6'
export default function NotFound() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(1.5rem,5vw,3rem)', textAlign: 'center' }}>
      <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(6rem,20vw,14rem)', color: 'rgba(255,255,255,0.04)', lineHeight: 1, margin: 0, userSelect: 'none' }}>404</p>
      <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(1.8rem,5vw,2.5rem)', color: 'white', fontWeight: 500, marginTop: '-2rem', marginBottom: '1rem' }}>Page not found</h1>
      <p style={{ color: 'rgba(255,255,255,0.58)', marginBottom: '2.5rem', maxWidth: 320, lineHeight: 1.65 }}>That page doesn't exist. Head back home or view the work.</p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500, color: 'white', background: BLUE, borderRadius: 9999, padding: '0.75rem 1.5rem', textDecoration: 'none', minHeight: 44, display: 'inline-flex', alignItems: 'center' }}
          onMouseEnter={e => e.currentTarget.style.background='#2563EB'}
          onMouseLeave={e => e.currentTarget.style.background=BLUE}
        >Home</Link>
        <Link to="/work" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500, color: 'rgba(255,255,255,0.72)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 9999, padding: '0.75rem 1.5rem', textDecoration: 'none', minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>View Work</Link>
      </div>
    </main>
  )
}
