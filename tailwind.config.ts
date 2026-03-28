import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#f7f4ef",
          dark: "#ede9e0",
        },
        ink: {
          DEFAULT: "#0f0e0c",
          soft: "rgba(15,14,12,0.7)",
          muted: "rgba(15,14,12,0.45)",
        },
        accent: {
          DEFAULT: "#c8522a",
          hover: "#b04420",
          light: "rgba(200,82,42,0.1)",
        },
        white: "#ffffff",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "Arial", "sans-serif"],
      },
      fontSize: {
        "hero": "clamp(36px, 5vw, 64px)",
      },
    },
  },
  plugins: [],
};
export default config;
