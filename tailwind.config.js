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
        retro: {
          black: "#0a0a0a",
          white: "#f5f5f5",
          gray: "#2a2a2a",
          light: "#e5e5e5",
        },
      },
      fontFamily: {
        mono: ['"Courier New"', "Courier", "monospace"],
        retro: ['"VT323"', "monospace"],
      },
    },
  },
  plugins: [],
};
