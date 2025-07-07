/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'react-blue': '#61dafb',
        'react-dark': '#20232a',
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444'
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'confetti': 'confetti 0.5s ease-out'
      },
      keyframes: {
        confetti: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(180deg)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
} 