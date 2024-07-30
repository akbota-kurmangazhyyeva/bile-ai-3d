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
        "custom-blue": "#4B6294",
        "custom-green": "#88FF99",
        "custom-light-blue": "#88AFFF",
        "custom-dark-green": "#439D54"
      },
    },
  },
  plugins: [],
};
export default config;
