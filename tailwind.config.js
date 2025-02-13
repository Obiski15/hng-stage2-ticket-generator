import { opacity } from "html2canvas/dist/types/css/property-descriptors/opacity";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        foreground: "hsl(var(--foreground))",
        secondary: "hsl(var(--secondary))",
        border: {
          DEFAULT: "hsl(var(--border))",
          primary: "hsl(var(--border-primary))",
        },
        destructive: "hsl(var(--destructive))",
      },

      backgroundImage: {
        background:
          "linear-gradient(0deg, #02191D, #02191D),radial-gradient(52.52% 32.71% at 50% 97.66%, rgba(36, 160, 181, 0.2) 0%, rgba(36, 160, 181, 0) 100%)",
        hero: "linear-gradient(0deg, rgba(10, 12, 17, 0.1), rgba(10, 12, 17, 0.1)), radial-gradient(103.64% 57.39% at 14.02% 32.06%, rgba(36, 160, 181, 0.2) 0%, rgba(36, 160, 181, 0) 100%)",
      },

      keyframes: {
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },

      animation: {
        "in-view": "fade-in 1s linear",
      },
    },
  },
  plugins: [],
};
