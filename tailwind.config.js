module.exports = {
  purge: ['**/*.tsx'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'base-white-blue': '#f3f4f7',
        'base-black-soft': '#1b1b1b',
        'base-gray': '#8a8a8a',
        'eodiro-primary-color': '#ff3852',
        'eodiro-secondary-color': '#ff7037',
        'eodiro-pink-1': '#ff79b9',
        'eodiro-pink-2': '#ff3e78',
        'eodiro-violet-1': '#e751ff',
        'eodiro-violet-2': '#b221f6',
        'eodiro-purple-1': '#7b5aff',
        'eodiro-purple-2': '#5f14be',
        'eodiro-blue-1': '#31a8ff',
        'eodiro-blue-2': '#305dff',
        'eodiro-sky-1': '#00e3d6',
        'eodiro-sky-2': '#00b5dd',
        'eodiro-grass-1': '#33d9a7',
        'eodiro-grass-2': '#04ab65',
        'eodiro-green-1': '#6ccf2f',
        'eodiro-green-2': '#02ba41',
        'eodiro-orange-1': '#ffb986',
        'eodiro-orange-2': '#ff7438',
        'eodiro-yellow-1': '#ffcf26',
        'eodiro-yellow-2': '#ff9922',
      },
    },
    borderRadius: {
      none: '0',
      outer: '0.75rem',
      inner: '0.5rem',
      full: '9999px',
    },
  },
  variants: {
    extend: {
      margin: ['first'],
    },
  },
  plugins: [],
}
