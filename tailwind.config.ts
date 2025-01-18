import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f2efff",
          100: "#dad0ff",
          200: "#c1b0ff",
          300: "#a790ff",
          400: "#8265fe",
          500: "#6d51fb",
          600: "#5741c9",
          700: "#413197",
          800: "#2b2064",
          900: "#161032",
        },
        secondary: {
          50: "#eff5ff",
          100: "#dfebff",
          200: "#b3d0ff",
          300: "#9fc3ff",
          400: "#6ca3ff",
          500: "#518afb",
          600: "#416ec9",
          700: "#315397",
          800: "#203764",
          900: "#101c32",
        },
        accent: {
          50: "#fcf2ff",
          100: "#f9e5ff",
          200: "#f3ccff",
          300: "#edb2ff",
          400: "#e17eff",
          500: "#c251fb",
          600: "#9b41c9",
          700: "#743197",
          800: "#4d2064",
          900: "#261032",
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      maxWidth: {
        'standard': '1500px',
      },
      spacing: {
        'standard': '20px',
      }
    },
  },
};

export default config;