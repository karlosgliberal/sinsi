module.exports = {
  // purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    fontFamily: {
      sinsimono: ['Space Mono', 'monospace'],
      ibmmono: ['IBM Plex Mono', 'monospace'],
    },
    spacing: {
      px: '1px',
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
      40: '10rem',
      48: '12rem',
      56: '14rem',
      64: '16rem',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        purple: '#6C03AB',
        sinsiblue: '#16242D',
        sinsipurple: '#E204E6',
      },
      gridTemplateColumns: {
        // Complex site-specific column configuration
        submit: '1.9fr 0.2fr;',
      },
    },
  },
  variants: {},
  plugins: [],
};
