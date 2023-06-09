export default {
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
  ],
  important: true,
  theme: {
    // maxWidth: {
    //   240: '240px',
    // },
    container: {
      center: true,
      padding: '15px',
    },
    extend: {
      fontFamily: {
        NotoSansArabic: 'Noto Sans Arabic',
        NotoSans: 'Noto Sans',
      },
      colors: {
        'kk-blue': {
          light: '#ddedf7',
          DEFAULT: '#56a7d9',
          dark: '#355686'
        },
        'kk-black': '#2e3436',
      },
      backgroundImage: {
        'kk-tile-transparent': "url('/images/background/tile_transparent.svg')",
      }
      // padding: {
      //   '15px': '15px',
      // },
      // opacity: {
      //   90: '0.9',
      //   80: '0.8',
      //   70: '0.7',
      // },
      // maxWidth: {
      //   '1/4': '25%',
      //   '1/2': '50%',
      // },
      // lineHeight: {
      //   golden: '1.1618',
      //   18: '1.8',
      // },
      // width: {
      //   175: '175px',
      //   240: '240px',
      // },
      // height: {
      //   'half-screen': '50vh',
      // },
      // inset: {
      //   12: '3rem',
      // },
    },
  },
}
