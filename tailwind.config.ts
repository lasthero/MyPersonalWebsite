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
        green: {
          terminal: '#22c55e',
          dim: '#16a34a',
          muted: '#14532d',
        },
        dark: {
          bg: '#0d0d0d',
          bg2: '#111111',
          bg3: '#1a1a1a',
          border: '#222222',
          border2: '#2a2a2a',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
