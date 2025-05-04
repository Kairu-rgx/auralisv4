/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #060606 0%, #060606 25%, #06193a 40%, #132548 50%, #061631 60%, #060606 75%, #060606 100%)',
      },
      // Add this colors extension
      colors: {
        scroll: {
          thumb: '#4b5563', // gray-600
          track: '#1f2937', // gray-800
          hover: '#6b7280', // gray-500
        }
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ]
}