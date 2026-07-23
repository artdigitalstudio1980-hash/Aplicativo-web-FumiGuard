/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--text)",
        accent: {
          50: "#e6f7f0",
          100: "#ccefe1",
          200: "#99dfc3",
          300: "#66cfa5",
          400: "#33bf87",
          500: "#0f7b5a",
          600: "#0c6248",
          700: "#0a5e44",
          800: "#084a36",
          900: "#063628",
          950: "#04251b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
