import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "custom-red": "#34222D",
        "custom-pink": "#F1BCDB",
        "custom-bg": "#00070A",
        "custom-yellow": "#FFAA00",
        "custom-blue": "#1C263E",
        "custom-green": "#88FF99",
        "custom-blue-button": "#4B6294",
        "custom-light-blue": "#88AFFF",
        "custom-dark-green": "#1C3E2A"
      },
    },
  },
  plugins: [],
};
export default config;
