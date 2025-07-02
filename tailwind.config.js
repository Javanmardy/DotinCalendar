module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#e60023',
        'brand-secondary': '#14213d',
        'brand-neutral': '#f9fafb'
      },
      fontFamily: {
        sans: ['Vazirmatn', 'sans-serif']
      }
    }
  },
  plugins: []
};
