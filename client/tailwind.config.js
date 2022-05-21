module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '2xl': '0 50px 60px -15px rgba(0, 0, 0, 1)',
      },
      height: {
        'max-h-screen-80': 'max-height: 80vh'
      }
    },
  },
  plugins: [],
}