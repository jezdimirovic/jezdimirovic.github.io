/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './privacy.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        base: '#0a0e17',      // dark navy background
        surface: '#111827',   // card surface
        line: '#1f2937',      // borders
        muted: '#94a3b8',     // secondary text
        ink: '#e5edf5',       // primary text
        accent: '#22d3ee',    // cyan
        accent2: '#a78bfa',   // violet
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)',
      },
    },
  },
  plugins: [],
};
