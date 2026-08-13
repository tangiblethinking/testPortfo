/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        ink:    '#080808',
        paper:  '#F4F1EA',
        zinc:   '#111111',
        mist:   '#A8A49E',
        accent: '#3B82F6',
        warm:   '#FF6B35',
      },
    },
  },
  plugins: [],
}
