/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#3B82F6',
        ink: '#172033',
        mist: '#eef5ff',
      },
      boxShadow: {
        panel: '0 20px 50px rgba(59, 130, 246, 0.10)',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};