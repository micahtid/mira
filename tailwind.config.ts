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
        offBlack: "#222222",
        minimalistGray: "#F5F5F5"
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