/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#2E7D32", hover: "#1B5E20" },
        secondary: "#F57C00",
        background: "#FAFAF8",
        surface: "#FFFFFF",
        textPrimary: "#1F2937",
        textSecondary: "#6B7280",
        success: "#4CAF50",
        warning: "#FFC107",
        error: "#D32F2F",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
