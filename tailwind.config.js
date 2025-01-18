/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        complementPrimary: 'var(--complement-primary)',
        complementSecondary: 'var(--complement-secondary)',
        accent1: 'var(--accent-1)',
        accent2: 'var(--accent-2)',
        highlight: 'var(--highlight)',
        navbar: 'var(--navbar)'
      },
      fontFamily: {
        test: ['Times New Roman', 'serif'],
        dmSans: ['DM Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'], // Add Inter font
      },
    },
  },
  plugins: [],
};
