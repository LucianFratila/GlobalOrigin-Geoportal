/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#323030",
        secundary: "#736f6f",
        maintext: "#f0e6e6",
      },
      keyframes: {
        loading: {
          '0%': { left: '-100%' },
          '50%': { left: '100%' },
          '100%': { left: '-100%' },
        },
      },
      animation: {
        loading: 'loading 3s linear infinite',
      },
    },
  },
  plugins: [],
};
