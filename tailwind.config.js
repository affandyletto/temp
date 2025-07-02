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
          100: "#FFFFFF",
          200: "#F8F9FC",
          300: "#F1F3F9",
          400: "#E1E6EF",
          500: "#DADADA",
          600: "#3F444D",
          700: "#23272F",
          800: "#1B1F27",
          900: "#0A0D14",
        },
        primary: {
          100: "#EDF8FC",
          200: "#2C6499",
          300: "#003F7D",
        },
        blue: {
          100: "#3A74C2",
        },
        green: {
          100: "#DCFCE7",
          800: "#2B693F",
        },
        purple: {
          100: "#F3E8FF",
          800: "#805CBF",
        },
        orange: {
          100: "#FFEDD5",
          800: "#9D3412",
        },
        navy: {
          100: "#DBEAFE",
          800: "#1E40AF",
        },
        success: {
          100: "#F0FDF2",
          200: "#1EC940",
          300: "#128329",
          400: "#146726",
        },
        danger: {
          100: "#FFF0F0",
          200: "#FF2828",
          300: "#CA0202",
          400: "#AE0606",
        },
        secondary: {
          DEFAULT: "#767A83",
          300: "#39527B",
        },
        light: "#DCE1EB",
        gray: {
          200: "#F5F5F5",
          300: "#D9D9D9",
        },
      },
      animation: {
        tooltipIn: "fadeInScale 0.2s ease-out forwards",
      },
      keyframes: {
        fadeInScale: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
