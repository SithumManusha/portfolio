/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themeBgPrimary: "var(--bg-primary)",
        themeBgSecondary: "var(--bg-secondary)",
        themeTextPrimary: "var(--text-primary)",
        themeTextSecondary: "var(--text-secondary)",
        themeTextMuted: "var(--text-muted)",
        themePrimary: "var(--primary-color)",
        themePrimaryHover: "var(--primary-hover)",
        themeSecondary: "var(--secondary-color)",
        themeSecondaryHover: "var(--secondary-hover)",
        themeAccent: "var(--accent-color)",
      },
    },
  },
  plugins: [],
}
