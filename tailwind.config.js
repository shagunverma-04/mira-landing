/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F0E0C',
        surface: '#1A1814',
        'surface-raised': '#221F1B',
        coral: '#D94F3D',
        'coral-dark': '#C24436',
        gold: '#C9A882',
        live: '#7AAF6E',
        'text-primary': '#F0EBE3',
        'text-secondary': '#8A7E72',
        'text-muted': '#5C5248',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(40px, 6vw, 72px)',
        'h2': 'clamp(28px, 4vw, 48px)',
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)',
      },
      animation: {
        breathe: 'breathe 2.5s ease-in-out infinite',
        ripple: 'ripple 2s ease-out infinite',
        'ripple-delay': 'ripple 2s ease-out 1s infinite',
        pulseDot: 'pulseDot 2s ease-in-out infinite',
        reveal: 'reveal 280ms cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        breathe: {
          '0%,100%': { transform: 'scale(1)', opacity: '0.35' },
          '50%': { transform: 'scale(1.12)', opacity: '0.65' },
        },
        ripple: {
          'from': { transform: 'scale(1)', opacity: '0.65' },
          'to': { transform: 'scale(1.6)', opacity: '0' },
        },
        pulseDot: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        reveal: {
          'from': { opacity: '0', transform: 'translateY(14px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
