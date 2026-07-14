import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ffffff",
        neonGreen: {
          DEFAULT: "#5CFF3D",
          dim: "#4ad42c",
          dark: "#1f6e0f",
          glow: "rgba(92, 255, 61, 0.15)",
        },
        cyberGreen: "#39FF14",
        cyberMint: "#00FF99",
        cyberAccent: "#66FFCC",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        space: ["var(--font-space-grotesk)", "sans-serif"],
        neuropol: ["'Neuropol X'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
