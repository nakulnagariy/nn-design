// Flattens the @import graph so dist/styles.css is a single self-contained file.
export default {
  plugins: {
    'postcss-import': {},
  },
}
