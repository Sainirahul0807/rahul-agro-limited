import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "farm-green": "#1b4332",
        "farm-green-light": "#2d6a4f",
        "mustard-gold": "#d97706",
        "mustard-light": "#f59e0b",
        "warm-soil": "#f4f1ea",
        "charcoal": "#1e293b",
        "agro-red": "#dc2626",
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        boxy: "4px 4px 0px 0px rgba(30,41,59,1)",
        "boxy-sm": "2px 2px 0px 0px rgba(30,41,59,1)",
        "boxy-lg": "6px 6px 0px 0px rgba(30,41,59,1)",
        "boxy-gold": "4px 4px 0px 0px rgba(217,119,6,1)",
        "boxy-green": "4px 4px 0px 0px rgba(27,67,50,1)",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "wheat-sway": {
          "0%, 100%": { transform: "rotate(-2deg) translateY(0px)" },
          "50%": { transform: "rotate(2deg) translateY(-4px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "check-draw": {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
        "pulse-green": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(27,67,50,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(27,67,50,0)" },
        },
      },
      animation: {
        ticker: "ticker 28s linear infinite",
        "wheat-sway": "wheat-sway 3s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease-out forwards",
        "slide-up": "slide-up 0.4s ease-out forwards",
        "check-draw": "check-draw 0.6s ease-out forwards",
        "pulse-green": "pulse-green 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
