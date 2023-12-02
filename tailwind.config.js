/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontSize: {
        size16: "16px",
        size32: "32px"
      },
      fontFamily: {
        satoshiMedium: ["Satoshi-Medium", "serif"],
        satoshiVariable: ["Satoshi-Variable", "serif"],
      },
      colors: {
        customBlue: "#00819E",
        customLightBlue: "#D9EEF2",
        customBeige: "#F1EFE8",
        customDark: "#2E2E2E",
        customDarkGrey: "#4E4E4E",
        customMediumGrey: "#6E6E6E",
        customLightGrey: "#FAFAFA",
        primary: {
          light: "#4da6ff",
          DEFAULT: "#0B84FF",
          dark: "#0066cc",
        },
        secondary: {
          light: "#f39e58",
          DEFAULT: "#ed7410",
          dark: "#bf5d0d",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
