/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-nesting': {},
    '@csstools/postcss-media-minmax': {}
  },
};

export default config;
