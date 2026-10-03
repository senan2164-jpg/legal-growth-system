import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#040507",
        ink: "#07090D",
        night: "#0A1424",
        navy: "#102039",
        ivory: "#F3EEE3",
        paper: "#F8F6F1",
        bone: "#E8E2D5",
        fog: "#8E97A8",
        graphite: "#4A4E57",
        champagne: { DEFAULT: "#C6A86C", soft: "#E2CE9E", deep: "#8F7340" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        paper: "0 1px 0 rgba(7,9,13,.04), 0 24px 48px -28px rgba(7,9,13,.35)",
        console: "0 0 0 1px rgba(243,238,227,.06), 0 40px 120px -40px rgba(0,0,0,.8)",
        glow: "0 0 0 1px rgba(198,168,108,.35), 0 18px 60px -18px rgba(198,168,108,.45)",
      },
    },
  },
  plugins: [],
};

export default config;
