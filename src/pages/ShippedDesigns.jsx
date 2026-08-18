import { DesignCard } from '../components/DesignCard'
import { designs } from '../lib/designs'
import { FadeUp } from '../components/Motion'

const BLUE     = 'var(--accent)'
const INK      = 'var(--ink-primary)'
const INK_BODY = 'var(--ink-body)'
const INK_SEC  = 'var(--ink-secondary)'
const INK_TERT = 'var(--ink-tertiary)'
const BORDER   = 'var(--border)'
const SURF1    = 'var(--surface-1)'
const MAX      = { maxWidth: 1400, margin: '0 auto' }

export default function ShippedDesigns({ setPage }) {
  return (
    <main id="main-content">

      {/* Hero — same structure as Case Studies (Work) page */}
      <div style={{ background: SURF1, padding: 'clamp(1rem,4vw,2.5rem)', paddingTop: 'clamp(5rem,10vw,8rem)', paddingBottom: 'clamp(2.5rem,5vw,4rem)', borderBottom: '1px solid var(--border)' }}>
        <div style={MAX}>
          <FadeUp>
            <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: BLUE, marginBottom: 12, fontWeight: 600 }}>Selected Work</p>
            <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(2.8rem,8vw,7rem)', color: INK, fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
              Shipped Designs
            </h1>
            <p style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)', color: INK_BODY, maxWidth: 560, lineHeight: 1.65, fontWeight: 400 }}>
              Design work and methodology artifacts — process, architecture, and shipped interfaces across product and enterprise contexts.
            </p>
          </FadeUp>
        </div>
      </div>

      <div style={{ ...MAX, padding: 'clamp(2.5rem,5vw,4rem) clamp(1rem,4vw,2.5rem)' }}>
        <div className="designs-grid" style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          {designs.map((d, i) => <DesignCard key={d.id} design={d} index={i} />)}
        </div>

        <FadeUp delay={0.3}>
          <hr className="divider-light" style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 'clamp(1.5rem,3vw,3rem)' }}>
            <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: INK_TERT, fontWeight: 600 }}>Additional Work</p>
            <div>
              <p style={{ fontSize: '0.875rem', color: INK_BODY, lineHeight: 1.7, marginBottom: '1.25rem' }}>
                Additional design artifacts and process documentation are available on request. Most involve NDA-protected interfaces — redacted versions available for Director-level discussions.
              </p>
              <a
                href="mailto:c.kenreigh@gmail.com?subject=Additional Design Work Request"
                style={{
                  fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600,
                  color: BLUE, textDecoration: 'none',
                }}
              >Request materials →</a>
            </div>
          </div>
        </FadeUp>
      </div>
    </main>
  )
}
