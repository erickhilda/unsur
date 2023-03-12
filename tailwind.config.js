/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 18 column grid for elements
        18: 'repeat(18, minmax(0, 1fr))',
      },
      fontSize: {
        xxs: '0.625rem',
        xxxs: '0.5rem',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
