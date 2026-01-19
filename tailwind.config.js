/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        game: {
          bg: "#0a0a12",
          dark: "#11111e",
          card: "#1a1a2e",
          primary: "#00f0ff", // Neon Cyan
          secondary: "#7000ff", // Neon Purple
          accent: "#ff003c", // Cyberpunk Red
          success: "#00ff9f", // Neon Green
          dim: "rgba(255, 255, 255, 0.1)",
        }
      },
      fontFamily: {
        orbitron: ["'Orbitron'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"], // Tech stats
        sans: ["'Inter'", "sans-serif"], // Readable text
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)",
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00f0ff' },
          '100%': { boxShadow: '0 0 20px #00f0ff, 0 0 10px #7000ff' },
        }
      }
    },
  },
  plugins: [],
}
