/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        60: "60",
        70: "70",
      },
      fontFamily: {
        sans: ['"General Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
