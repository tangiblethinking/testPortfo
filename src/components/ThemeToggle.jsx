import { useTheme } from '../context/ThemeContext'

/**
 * Floating Action Button — lower-right corner
 * Sun icon when dark (click → light), Moon icon when light (click → dark)
 */
export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      style={{
        position: 'fixed',
        right: 'clamp(1rem, 3vw, 1.5rem)',
        bottom: 'clamp(1rem, 3vw, 1.5rem)',
        zIndex: 150,
        width: 52,
        height: 52,
        borderRadius: '50%',
        border: '1px solid var(--border)',
        background: 'var(--surface-0)',
        color: 'var(--ink-primary)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.06)'
        e.currentTarget.style.boxShadow = '0 6px 28px rgba(0,0,0,0.16), 0 2px 6px rgba(0,0,0,0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)'
      }}
    >
      {isDark ? (
        /* Sun — switch to light */
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        /* Moon — switch to dark */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
