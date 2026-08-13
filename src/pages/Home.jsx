import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FadeUp, SlideIn } from '../components/Motion'
import { CaseStudyCard } from '../components/CaseStudyCard'
import { DesignCard } from '../components/DesignCard'
import { caseStudies } from '../lib/caseStudies'
import { designs } from '../lib/designs'
import { BLUE, BLUE2, WARM, INK, INK_BODY, INK_SEC, INK_TERT, BORDER, SURF0, SURF1, SURF2, OVERLAY, ACCENT_MUTED } from '../themeColors'

const expo  = [0.16, 1, 0.3, 1]

const DESIGN_OPS_URL = 'https://opdesignoprojo.vercel.app/'

function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const dur = 1600, t0 = Date.now()
        const tick = () => {
          const p = Math.min((Date.now() - t0) / dur, 1)
          const e = 1 - Math.pow(1 - p, 4)
          setVal(Math.round(e * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])
  return <span ref={ref}>{val}{suffix}</span>
}

function InlineModal({ url, label, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div role="dialog" aria-modal="true" aria-label={label}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: OVERLAY, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(0.5rem, 2vw, 1rem)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28, ease: expo }}
        style={{ width: '100%', maxWidth: 1200, height: '92vh', background: SURF0, borderRadius: 16, overflow: 'hidden', border: '1px solid ' + BORDER, display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', borderBottom: '1px solid ' + BORDER, flexShrink: 0 }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: INK_SEC }}>{label}</span>
          <button onClick={onClose} aria-label="Close" style={{ background: SURF2, border: '1px solid ' + BORDER, color: INK_BODY, width: 36, height: 36, borderRadius: '50%', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
        <iframe src={url} title={label} style={{ flex: 1, border: 'none', width: '100%' }} />
      </motion.div>
    </div>
  )
}

function PillButton({ onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, fontSize: '0.7rem', fontFamily: '"DM Sans", Helvetica Neue, sans-serif', letterSpacing: '0.06em', fontWeight: 500, color: hov ? INK : INK_SEC, border: '1.5px solid ' + (hov ? INK_SEC : BORDER), borderRadius: 9999, padding: '0.65rem 1.25rem', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
      Design Ops <span style={{ fontSize: '0.9rem' }}>→</span>
    </button>
  )
}

const metrics = [
  { value: 43, suffix: '%', label: 'Checkout abandonment reduced', sub: 'Plexus Worldwide' },
  { value: 60, suffix: '%', label: 'Tool consolidation efficiency', sub: 'Design Ops · 6→1' },
  { value: 35, suffix: '%', label: 'Sprint velocity increase', sub: 'AI-augmented workflows' },
  { value: 11, suffix: '+', label: 'Years in product design', sub: 'e-Com · Enterprise · Industrial' },
  { value: 5, suffix: '', label: 'Designers led', sub: 'Direct reports · Plexus' },
]

const capabilities = [
  { verb: 'Lead', color: BLUE, headline: 'I grow design organizations.', body: 'Mentoring the team infrastructure to make great design scalable — applying methodologies for recruiting, mentoring, structuring critique, and creating a culture where designers do their best work.', items: ['Team structure & hiring', 'Design critique systems', '1:1 development & coaching', 'Cross-functional alignment', 'Design maturity roadmaps'] },
  { verb: 'Build', color: WARM, headline: 'I architect systems, not screens.', body: 'Design systems, tooling ecosystems, process frameworks, research repositories — I build the infrastructure that lets teams move fast without fragmenting.', items: ['Design systems architecture', 'Design operations frameworks', 'AI-augmented workflows', 'Coded prototypes & tokens', 'Component library governance'] },
  { verb: 'Ship', color: '#55A763', headline: 'I translate strategy into outcomes.', body: 'From product vision to shipped product, I own the full end-to-end — user research, journey mapping, stakeholder alignment, A/B testing, and post-launch optimization. I speak business: retention, conversion, abandonment, and revenue.', items: ['UX strategy & roadmapping', 'e-Commerce optimization', 'Stakeholder presentations', 'Usability & A/B testing', 'Multi-region product launches'] },
]

const go = (setPage, p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }
const SP  = 'clamp(3.5rem,7vw,6.5rem) clamp(1rem,4vw,2.5rem)'
const MAX = { maxWidth: 1400, margin: '0 auto' }

export default function Home({ setPage }) {
  const [designOpsOpen, setDesignOpsOpen] = useState(false)

  return (
    <main id="main-content">
      <section aria-label="Hero" style={{ minHeight: '100svh', background: SURF0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(1rem,4vw,5rem)', paddingTop: '7rem', paddingBottom: 'clamp(3rem,6vw,5rem)', position: 'relative', overflow: 'hidden' }} className="mesh-bg grid-bg">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ position: 'absolute', top: '4.8rem', left: 'clamp(1rem,4vw,5rem)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: INK_TERT }}>Portfolio · 2026</span>
          <span style={{ display: 'block', width: 28, height: 1, background: BORDER }} />
          <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'white', background: BLUE, borderRadius: 9999, padding: '0.25rem 0.75rem', fontWeight: 600 }}>Available for Strategic Roles</span>
        </motion.div>
        <div style={{ ...MAX, width: '100%' }}>
          <motion.p initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.35, ease: expo }} style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: INK_TERT, marginBottom: '1.25rem', fontWeight: 600 }}>Christopher Kenreigh</motion.p>
          {[{ text: 'Strategy. Design. Builder.', color: INK, delay: 0.45 }, { text: 'Excellence', color: BLUE, delay: 0.55, italic: true }, { text: 'for digital products', color: INK, delay: 0.63 }, { text: 'and spaces.', color: INK, delay: 0.70 }].map(({ text, color, delay, italic }) => (
            <div key={text} style={{ overflow: 'visible', paddingBottom: '0.12em' }}>
              <motion.div initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.85, delay, ease: expo }} style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.4rem, 7vw, 8rem)', lineHeight: 1.0, letterSpacing: '-0.03em', color, fontStyle: italic ? 'italic' : 'normal', fontWeight: 500 }}>{text}</motion.div>
            </div>
          ))}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.95, ease: expo }} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginTop: 'clamp(1.5rem,4vw,3rem)' }}>
            <p style={{ fontSize: '0.9rem', color: INK_BODY, maxWidth: 380, lineHeight: 1.65, margin: 0 }}>Strategic leader for Designing Digital Products · 11+ years across Ed-Tech, E-commerce, Enterprise, and Industrial Solutions</p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={() => go(setPage, 'work')} style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600, color: INK, border: '1.5px solid ' + BORDER, borderRadius: 9999, padding: '0.75rem 1.5rem', background: 'transparent', cursor: 'pointer', transition: 'all 0.25s', display: 'inline-flex', alignItems: 'center', minHeight: 44 }}
                onMouseEnter={e => { e.currentTarget.style.color = BLUE; e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.background = ACCENT_MUTED }}
                onMouseLeave={e => { e.currentTarget.style.color = INK; e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = 'transparent' }}>View Work →</button>
              <a href="mailto:c.kenreigh@gmail.com" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600, color: 'white', background: BLUE, borderRadius: 9999, padding: '0.75rem 1.5rem', textDecoration: 'none', transition: 'background 0.25s', display: 'inline-flex', alignItems: 'center', minHeight: 44 }}
                onMouseEnter={e => e.currentTarget.style.background = BLUE2}
                onMouseLeave={e => e.currentTarget.style.background = BLUE}>Contact</a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            aria-hidden="true"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              marginTop: '16px',
              width: 'fit-content',
            }}
          >
            <span
              style={{
                fontSize: '0.55rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: INK_TERT,
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: 1,
                height: 36,
                background: BORDER,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div className="scroll-dot" />
            </div>
          </motion.div>
        </div>
      </section>

      <section aria-label="Impact metrics" style={{ background: SURF1, borderTop: '1px solid ' + BORDER, borderBottom: '1px solid ' + BORDER }}>
        <div style={{ ...MAX, padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))' }}>
            {metrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08, ease: expo }}
                style={{ padding: 'clamp(1.25rem,3vw,2rem) clamp(0.75rem,2vw,1.5rem)', borderRight: i < metrics.length - 1 ? '1px solid ' + BORDER : 'none' }}>
                <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: BLUE, margin: '0 0 6px', lineHeight: 1, fontWeight: 600 }}><Counter target={m.value} suffix={m.suffix} /></p>
                <p style={{ fontSize: '0.75rem', color: INK_BODY, margin: '0 0 3px', lineHeight: 1.4, fontWeight: 500 }}>{m.label}</p>
                <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: INK_TERT, margin: 0, fontWeight: 600 }}>{m.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="About" style={{ background: SURF0, padding: SP }}>
        <div style={{ ...MAX, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'start' }}>
          <SlideIn>
            <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: INK_TERT, marginBottom: 12, fontWeight: 600 }}>About</p>
            <hr className="divider-light" style={{ marginBottom: 20 }} />
            <p style={{ fontSize: '0.75rem', color: INK_SEC, lineHeight: 1.6, fontWeight: 500 }}>USA Based · Remote / Hybrid / Relocation</p>
          </SlideIn>
          <div>
            <FadeUp>
              <h2 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(1.5rem,3.5vw,3rem)', color: INK, lineHeight: 1.08, marginBottom: '1.75rem', fontWeight: 500 }}>A design principal who measures success in{' '}<em style={{ color: WARM, fontStyle: 'normal' }}>business outcomes</em>, not deliverables.</h2>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p style={{ fontSize: '0.95rem', color: INK_BODY, lineHeight: 1.7, marginBottom: '1.5rem' }}>I partner with founders, product leaders, and engineering teams to turn ambiguous problems into clear product direction — and then into shipped experiences that move the metrics that matter.</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                <PillButton onClick={() => setDesignOpsOpen(true)} />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section aria-label="Selected work" style={{ background: SURF1, padding: SP, borderTop: '1px solid ' + BORDER }}>
        <div style={MAX}>
          <FadeUp>
            <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: INK_TERT, marginBottom: 12, fontWeight: 600 }}>Selected Work</p>
            <hr className="divider-light" style={{ marginBottom: 28 }} />
          </FadeUp>
          <div className="card-grid">
            {caseStudies.slice(0, 4).map((cs, i) => (
              <FadeUp key={cs.slug} delay={i * 0.08}>
                <CaseStudyCard study={cs} onClick={() => go(setPage, 'work')} />
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.35}>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button onClick={() => go(setPage, 'work')} style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: INK_SEC, background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>View all case studies →</button>
            </div>
          </FadeUp>
        </div>
      </section>

      <section aria-label="Design explorations" style={{ background: SURF0, padding: SP }}>
        <div style={MAX}>
          <FadeUp>
            <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: INK_TERT, marginBottom: 12, fontWeight: 600 }}>Design Explorations</p>
            <hr className="divider-light" style={{ marginBottom: 28 }} />
          </FadeUp>
          <div className="designs-grid">
            {designs.slice(0, 6).map((d, i) => (
              <FadeUp key={d.id || i} delay={i * 0.06}>
                <DesignCard design={d} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Capabilities" style={{ background: SURF0, padding: SP, borderTop: '1px solid ' + BORDER }}>
        <div style={MAX}>
          <FadeUp>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: INK_TERT, marginBottom: 12, fontWeight: 600 }}>How I work</p>
                <h2 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: INK, fontWeight: 500, lineHeight: 1.15 }}>Lead. Build. Ship.</h2>
              </div>
              <PillButton onClick={() => setDesignOpsOpen(true)} />
            </div>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
            {capabilities.map((cap, i) => (
              <FadeUp key={cap.verb} delay={i * 0.1}>
                <div style={{ background: SURF1, border: '1px solid ' + BORDER, borderRadius: 16, padding: '1.5rem', height: '100%' }}>
                  <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: cap.color, fontWeight: 700, marginBottom: 8 }}>{cap.verb}</p>
                  <h3 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.25rem', color: INK, fontWeight: 500, marginBottom: 10, lineHeight: 1.25 }}>{cap.headline}</h3>
                  <p style={{ fontSize: '0.85rem', color: INK_BODY, lineHeight: 1.6, marginBottom: 16 }}>{cap.body}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {cap.items.map(item => (
                      <li key={item} style={{ fontSize: '0.75rem', color: INK_SEC, padding: '0.35rem 0', borderTop: '1px solid ' + BORDER }}>{item}</li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Contact" style={{ background: SURF1, padding: SP, borderTop: '1px solid ' + BORDER }}>
        <div style={{ ...MAX, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'center' }}>
          <FadeUp><p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: INK_TERT, fontWeight: 600 }}>Communication is Key</p></FadeUp>
          <FadeUp delay={0.1}>
            <h2 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(1.5rem,3.5vw,3rem)', color: INK, fontWeight: 500, lineHeight: 1.08, marginBottom: '2rem' }}>Where there is opportunity{' '}<em style={{ color: BLUE, fontStyle: 'normal' }}>I speak up</em>, to bring attention to the actions that bring solutions.</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a href="mailto:c.kenreigh@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 48, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: 'white', background: BLUE, borderRadius: 9999, padding: '0.875rem 2rem', textDecoration: 'none', transition: 'background 0.25s' }}
                onMouseEnter={e => e.currentTarget.style.background = BLUE2}
                onMouseLeave={e => e.currentTarget.style.background = BLUE}>c.kenreigh@gmail.com →</a>
              <a href="https://www.linkedin.com/in/kenreigh/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 48, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: INK_SEC, border: '1.5px solid ' + BORDER, borderRadius: 9999, padding: '0.875rem 2rem', textDecoration: 'none', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.color = INK; e.currentTarget.style.borderColor = INK }}
                onMouseLeave={e => { e.currentTarget.style.color = INK_SEC; e.currentTarget.style.borderColor = BORDER }}>LinkedIn ↗</a>
            </div>
            <p style={{ fontSize: '0.65rem', color: INK_TERT, marginTop: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>480-206-2145 · USA Based · Remote / Hybrid / Relocation</p>
          </FadeUp>
        </div>
      </section>

      {designOpsOpen && <InlineModal url={DESIGN_OPS_URL} label="Design Ops — Case Study" onClose={() => setDesignOpsOpen(false)} />}
    </main>
  )
}
