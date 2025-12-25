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
        pegboard: {
          DEFAULT: "#8B7355",
          light: "#A08B70",
          dark: "#6B5A45",
        },
        craft: {
          cream: "#FDF6E3",
          paper: "#F5E6D3",
          wood: "#DEB887",
          pin: "#C0C0C0",
        },
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "system-ui", "sans-serif"],
        body: ["var(--font-quicksand)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        pinned: "2px 4px 8px rgba(0,0,0,0.3)",
        tool: "3px 5px 10px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
