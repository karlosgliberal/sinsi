module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        purple: '#6C03AB',
      },
    },
  },
  variants: {},
  plugins: [],
};
