import { FadeUp } from '../components/Motion'

const BLUE  = 'var(--accent)'
const BLUE2 = 'var(--accent-h)'
const WARM  = 'var(--warm)'
const INK   = 'var(--ink-primary)'
const INK_BODY = 'var(--ink-body)'
const INK_SEC  = 'var(--ink-secondary)'
const INK_TERT = 'var(--ink-tertiary)'
const BORDER   = 'var(--border)'
const SURF1    = 'var(--surface-1)'
const SP       = 'clamp(3.5rem,7vw,6.5rem) clamp(1rem,4vw,2.5rem)'
const MAX      = { maxWidth: 1400, margin: '0 auto' }

const LBL = {
  fontSize: '0.6rem', textTransform: 'uppercase',
  letterSpacing: '0.15em', color: INK_TERT, fontWeight: 600,
}

const experience = [
  {
    title: 'Principal UX and Product Designer',
    company: 'Plexus Worldwide', url: 'https://www.plexusworldwide.com',
    period: '05/2024 – Present', location: 'Phoenix, AZ · Office',
    bullets: [
      'Directing a growing team of 7 cross-disciplinary designers (UX, content, research, interaction) across US and 3 international e-commerce markets — owning team structure, project allocation, design quality, and direct 1:1 mentorship.',
      'Reduced checkout abandonment 43% through data-driven UX redesign of mobile-first PDPs, PLPs, and cart flows — informed by Power BI behavioral analytics.',
      'Consolidated 6 fragmented design tools into a unified platform, cutting team inefficiency 60% and implementing a token-based design system for CMS consistency.',
      'Led org-wide adoption of LLM-driven design tools, increasing sprint delivery velocity 35% across product and engineering teams.',
      'Launched e-commerce experiences across 3 international regions through cross-functional collaboration with PMs, developers, and BI.',
    ],
  },
  {
    title: 'UX Consultant',
    company: 'Independent Practice', url: null,
    period: '10/2023 – 06/2024', location: 'Remote',
    bullets: [
      'Delivered UX strategy and design systems consulting for e-commerce clients during intentional transition between leadership roles.',
      'Deepened expertise in AI-augmented prototyping and LLM-assisted research synthesis.',
    ],
  },
  {
    title: 'Senior Product Designer',
    company: 'Freeport-McMoRan', url: 'https://www.freeportmcmoran.com',
    period: '08/2022 – 10/2023', location: 'Phoenix, AZ · Hybrid',
    bullets: [
      'Led end-to-end design for mining operation digital tools across web, iOS, and Android — improving worker efficiency 30%.',
      'Facilitated 10 stakeholder workshops to define user needs and translate insights into actionable product requirements.',
      'Presented product roadmaps and design strategy to C-suite leadership for 5 major release approvals.',
      'Built and maintained a scalable UI design system spanning 3 platform targets.',
    ],
  },
  {
    title: 'Senior Product Designer',
    company: 'OpenTech Alliance', url: null,
    period: '2021 – 2022', location: 'Phoenix, AZ · Hybrid',
    bullets: [
      'Increased POS completion rates 75% through redesigned checkout and payment flows.',
      'Improved e-commerce fulfillment experience 25% through data-driven UX optimizations.',
    ],
  },
  {
    title: 'UX Design Operator',
    company: 'Siemens', url: 'https://www.siemens.com',
    period: '2020 – 2021', location: 'Phoenix, AZ · Remote',
    bullets: [
      'Reduced internal data dissemination friction by 50% through unified industrial design systems.',
      'Delivered design systems across 4 industrial software projects.',
    ],
  },
  {
    title: 'Senior UX Designer',
    company: 'Glynlyon Inc', url: null,
    period: '2014 – 2019', location: 'Phoenix, AZ · Office',
    bullets: [
      'Increased product ease of use 65% through iterative UX research and redesign of education platforms.',
      'Ensured WCAG and ADA compliance across all digital learning products.',
      'Senior and Lead Designer for engineering Virtual Lab Environments.',
    ],
  },
]

const skills = {
  Leadership: ['Team structure & hiring', 'Design critique systems', '1:1 coaching', 'Cross-functional alignment', 'Design maturity'],
  Craft: ['Design systems', 'UX strategy', 'Prototyping', 'User research', 'A/B testing'],
  Tools: ['Figma', 'FigJam', 'Power BI', 'Jira', 'LLM tooling'],
  Domains: ['e-Commerce', 'Enterprise', 'Industrial', 'Ed-Tech'],
}

export default function Resume({ setPage }) {
  return (
    <main id="main-content">

      <div style={{ background: SURF1, padding: 'clamp(1rem,4vw,2.5rem)', paddingTop: 'clamp(5rem,10vw,8rem)', paddingBottom: 'clamp(2.5rem,5vw,4rem)', borderBottom: '1px solid ' + BORDER }}>
        <div style={MAX}>
          <FadeUp>
            <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: BLUE, marginBottom: 12, fontWeight: 600 }}>Resume</p>
            <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(2.8rem,8vw,7rem)', color: INK, fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
              Experience
            </h1>
            <p style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)', color: INK_BODY, maxWidth: 560, lineHeight: 1.65, fontWeight: 400, marginBottom: '0.5rem' }}>
              Principal of UX & Product Design · USA / Remote / Office
            </p>
            <p style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)', color: INK_BODY, maxWidth: 560, lineHeight: 1.65, fontWeight: 400 }}>
              Design Principal with 11+ years leading advanced systems thinking, stakeholder management, enterprise-level product strategy, and design direction.
            </p>
          </FadeUp>
        </div>
      </div>

      <div style={{ ...MAX, padding: 'clamp(2.5rem,5vw,4rem) clamp(1rem,4vw,2.5rem)' }}>
        {experience.map((job, i) => (
          <FadeUp key={job.title + job.period} delay={i * 0.05}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
              gap: 'clamp(1rem,3vw,1.5rem)',
              padding: 'clamp(1.5rem,3vw,2.5rem) 0',
              borderBottom: '1px solid ' + BORDER,
            }}>
              <div>
                <p style={{ fontSize: '0.7rem', color: INK_SEC, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4, fontWeight: 600 }}>{job.period}</p>
                <p style={{ fontSize: '0.65rem', color: INK_TERT, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{job.location}</p>
              </div>
              <div>
                <h3 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(1.1rem,2vw,1.35rem)', color: INK, fontWeight: 500, marginBottom: 4 }}>{job.title}</h3>
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: BLUE, textDecoration: 'none', marginBottom: 16, display: 'inline-block' }}>{job.company} ↗</a>
                ) : (
                  <p style={{ fontSize: '0.875rem', color: INK_SEC, marginBottom: 16 }}>{job.company}</p>
                )}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {job.bullets.map((b, bi) => (
                    <li key={bi} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: BORDER, flexShrink: 0, marginTop: 8 }} />
                      <span style={{ fontSize: '0.875rem', color: INK_BODY, lineHeight: 1.65 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        ))}

        <FadeUp>
          <div style={{ marginTop: 'clamp(2.5rem,5vw,4rem)', marginBottom: '1rem' }}>
            <p style={LBL}>Skills</p>
          </div>
          <hr className="divider-light" style={{ marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 'clamp(1.5rem,3vw,2rem)' }}>
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat}>
                <p style={{ ...LBL, marginBottom: 12 }}>{cat}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {items.map(s => (
                    <li key={s} style={{ fontSize: '0.875rem', color: INK_BODY, marginBottom: 7 }}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp>
          <div style={{ marginTop: 'clamp(2.5rem,5vw,4rem)', marginBottom: '1rem' }}>
            <p style={LBL}>Education</p>
          </div>
          <hr className="divider-light" style={{ marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1.5rem' }}>
            <div />
            <div>
              <h3 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.35rem', color: INK, fontWeight: 500, marginBottom: 4 }}>Bachelor of Arts</h3>
              <p style={{ color: INK_BODY, marginBottom: 4 }}>The Art Institute of Phoenix</p>
              <p style={{ fontSize: '0.82rem', color: INK_SEC }}>2002 – 2005 · Phoenix, AZ</p>
            </div>
          </div>
        </FadeUp>

      </div>
    </main>
  )
}
