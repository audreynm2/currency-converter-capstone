module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 60s linear infinite',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'shoot': 'shoot 2s linear infinite',
        'stars': 'stars 60s linear infinite',
      },
      keyframes: {
        'spin-reverse': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(-360deg)' } },
        'shoot': { '0%': { transform: 'translateX(-100%) rotate(45deg)', opacity: 0 }, '50%': { opacity: 1 }, '100%': { transform: 'translateX(100vw) rotate(45deg)', opacity: 0 } },
        'stars': { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '1000px 1000px' } },
      },
    },
  },
  plugins: [],
};
