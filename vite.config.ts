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
      // Stories, tests and the demo content behind them are documentation, not
      // API — without excluding them their declarations end up in the tarball.
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.{ts,tsx}', 'src/test/**', 'src/examples/**'],
      // Bundle every declaration into a single index.d.ts. Keeps the published
      // types resolvable under Node16/NodeNext ESM, which needs explicit file
      // extensions that tsc does not add to relative re-exports.
      rollupTypes: true,
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
      output: {
        // Every export is a client component (hooks, refs, effects). Marking the
        // bundle keeps it importable from React Server Components / the Next.js
        // App Router without the consumer adding their own wrapper.
        banner: "'use client';",
      },
    },
    sourcemap: true,
    minify: false,
  },
})
