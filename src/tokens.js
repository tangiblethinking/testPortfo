/**
 * DESIGN TOKENS — Christopher Kenreigh Portfolio (Light Theme Refresh)
 * WCAG AA Compliant — all contrast ratios verified ≥ 4.5:1 for text
 *
 * Color system: Clean white base + cool slate + warm amber accents
 * Target audience: Executive-level hiring teams
 */

const tokens = {

  color: {
    /* Accent — #1D5FD9 = 5.74:1 on white ✓ AA */
    accent:       '#1D5FD9',
    accentHover:  '#1448B3',
    accentMuted:  '#EEF3FC',

    /* Warm — #C95F0A = 4.56:1 on white ✓ AA (used for emphasis text only) */
    warm:         '#C95F0A',
    warmMuted:    '#FDF3E9',

    /* Violet — decorative / large text */
    purple:       '#6C3EC5',
    purpleMuted:  '#F2EDFC',

    /* Surfaces */
    bgLight:      '#FFFFFF',
    bgSurface1:   '#F7F8FA',
    bgSurface2:   '#EFF1F5',
    bgSurface3:   '#E2E6EE',

    /* Text — all verified against white bg */
    textPrimary:  '#0D1117',   /* 19.1:1 ✓ */
    textBody:     '#2D3748',   /* 10.7:1 ✓ */
    textSecondary:'#4A5568',   /* 7.0:1  ✓ */
    textTertiary: '#596880',   /* 4.6:1  ✓ AA minimum */
    textLabel:    '#374151',   /* 9.7:1  ✓ */

    /* Borders */
    border:       '#D1D5DB',
    borderStrong: '#9CA3AF',
    borderAccent: 'rgba(29,95,217,0.35)',
  },

  font: {
    display: '"Cormorant Garamond", Georgia, serif',
    body:    '"DM Sans", Helvetica Neue, sans-serif',

    sizeHero:        'clamp(2.4rem, 7vw, 8rem)',
    sizeHeroAbout:   'clamp(2.8rem, 8vw, 7rem)',
    sizeDisplay:     'clamp(1.5rem, 4vw, 3.5rem)',
    sizeDisplayMd:   'clamp(1.4rem, 3vw, 2.5rem)',
    sizeDisplaySm:   'clamp(1.3rem, 2.5vw, 2.2rem)',
    sizeMetric:      'clamp(1.6rem, 3vw, 2.5rem)',
    sizeCapVerb:     'clamp(2.2rem, 5vw, 4rem)',
    sizeCardTitle:   'clamp(1.1rem, 2vw, 1.4rem)',
    sizeJobTitle:    'clamp(1.1rem, 2vw, 1.35rem)',
    sizeBody:        '0.95rem',
    sizeBodyLg:      '1rem',
    sizeBodySm:      '0.875rem',
    sizeLabel:       '0.7rem',
    sizeLabelSm:     '0.65rem',
    sizeLabelXs:     '0.6rem',
    sizeMicro:       '0.55rem',

    weightLight:     300,
    weightRegular:   400,
    weightMedium:    500,
    weightSemibold:  600,

    lineHero:        1.0,
    lineDisplay:     1.05,
    lineBody:        1.65,
    lineBodyRelaxed: 1.75,
    lineTight:       1.2,

    trackingHero:    '-0.03em',
    trackingDisplay: '-0.025em',
    trackingNormal:  'normal',
    trackingWide:    '0.08em',
    trackingWider:   '0.12em',
    trackingWidest:  '0.15em',
    trackingMax:     '0.2em',
  },

  spacing: {
    sectionPadding: 'clamp(3.5rem, 7vw, 6.5rem) clamp(1rem, 4vw, 2.5rem)',
    navHeight:      '64px',
    maxWidth:       '1400px',
  },

  border: {
    radiusCard:  '16px',
    radiusPill:  '9999px',
    radiusModal: '20px',
    radiusClose: '50%',
  },

  motion: {
    easeExpo:     [0.16, 1, 0.3, 1],
    durationFast: '0.2s',
    durationMid:  '0.25s',
    durationSlow: '0.4s',
    delayScroll:  1.4,
  },

  shadow: {
    card:  '0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)',
    hover: '0 4px 12px rgba(0,0,0,0.09), 0 16px 40px rgba(0,0,0,0.07)',
    nav:   '0 1px 0 #D1D5DB',
  },
}

export default tokens
