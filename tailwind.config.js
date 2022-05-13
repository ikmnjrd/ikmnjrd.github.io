module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      red: '#8b0000',
      /* 100~400を中心にスタイリングする */
      newmo: {
        100: '#EFF2F9',
        200: '#E4EBF1',
        300: '#B5BFC6',
        400: '#6E7F8D',
        600: '#5A6872',
        800: '#3F4950',
      },
    },
  },
  plugins: [],
}
