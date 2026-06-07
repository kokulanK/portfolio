/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#050810',
        'bg-section': '#0a0f1e',
        'bg-card': '#0f1628',
        'bg-surface': '#0f1628',
        'accent-cyan': '#00d4ff',
        'accent-purple': '#7c3aed',
        'border-dark': '#1e2a45',
        'text-main': '#e8edf5',
        'text-muted': '#6b7a99'
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
