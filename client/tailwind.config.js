/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dot: {
          navy: '#272F45',       // Navy (Core Brand)
          blue: '#5D7FC4',       // Dot Blue (Core Accent)
          warmwhite: '#F5F5EB',  // Warm White (Core Brand)
          teal: '#5C7C8D',       // Teal (Supporting)
          softblue: '#D6E3EE',   // Soft Blue (Supporting)
          cardborder: '#E7E5DA', // Card border
          inputborder: '#D98BCC',// Input border
          moss: '#2C3424',       // Moss (Supporting success)
          cedar: '#9AA08F',      // Cedar (Supporting inactive)
        }
      },
      fontFamily: {
        sans: ['Satoshi', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        accent: ['Instrument Serif', 'serif'], // Italic
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(214, 220, 230, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(214, 220, 230, 0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-size': '48px 48px',
      }
    },
  },
  plugins: [],
}
