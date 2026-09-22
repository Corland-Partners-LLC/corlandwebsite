import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#105594",
          50: "#f3f7fa",
          100: "#e7eef4",
          200: "#c3d5e4",
          300: "#9fbbd4",
          400: "#5888b4",
          500: "#105594",
          600: "#0e487e",
          700: "#0b3c68",
          800: "#092f51",
          900: "#06223b",
        },
        teal: {
          DEFAULT: "#3ec4d1",
          50: "#f5fcfd",
          100: "#ecf9fa",
          200: "#cff0f4",
          300: "#b2e7ed",
          400: "#78d6df",
          500: "#3ec4d1",
          600: "#35a7b2",
          700: "#2b8992",
          800: "#226c73",
          900: "#194e54",
        },
        charcoal: "#262626",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
