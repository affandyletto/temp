/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        default: "#1D2433",
        neutral: {
          200: "#F8F9FC",
          300: "#F1F3F9",
          400: "#E1E6EF",
          500: "#DADADA",
        },
        primary: {
          100: "#EDF8FC",
          200: "#2C6499",
          300: "#003F7D",
        },
        blue: {
          100: "#3A74C2",
        },
        success: {
          100: "#F0FDF2",
          300: "#128329",
        },
        danger: {
          200: "#FF2828",
          300: "#CA0202",
        },
        secondary: "#767A83",
        light: "#DCE1EB",
      },
    },
  },
  plugins: [],
};
