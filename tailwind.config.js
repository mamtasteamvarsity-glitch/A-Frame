module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#06090F',
        'bg-dark-2': '#0B1220',
        'bg-dark-3': '#111827',
        'neon-cyan': '#00F0FF',
        'neon-blue': '#1E90FF',
        'neon-violet': '#7C7CFF',
        'soft-pink': '#FF7EB6',
        'lavender': '#C084FC',
        'rose-neon': '#FF9EDB',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 240, 255, 0.25)',
        'glow-md': '0 0 20px rgba(0, 240, 255, 0.35)',
        'glow-lg': '0 0 30px rgba(0, 240, 255, 0.45)',
        'glow-pink': '0 0 20px rgba(255, 126, 182, 0.4)',
        'glow-purple': '0 0 20px rgba(192, 132, 252, 0.4)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 240, 255, 0.25)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 240, 255, 0.45)' },
        },
      },
    },
  },
  plugins: [],
}
