import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// Library build: ESM only, React left external so consumers dedupe their own copy.
// CSS is deliberately NOT imported from TS — it ships as a standalone dist/styles.css
// so non-bundler consumers (and the Claude Design runtime) can link it directly.
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      // Stories and the demo content behind them are documentation, not API —
      // without excluding them their declarations end up in the tarball.
      exclude: ['src/**/*.stories.tsx', 'src/examples/**'],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    sourcemap: true,
    minify: false,
  },
})
