#!/usr/bin/env node
/**
 * Token pipeline.
 *
 *   node scripts/build-tokens.mjs           write dist artifacts + verify CSS
 *   node scripts/build-tokens.mjs --check   verify only (used in CI / pre-publish)
 *
 * `tokens/tokens.json` (W3C DTCG format) is the source of truth. This script
 * resolves it and:
 *   1. checks that `src/styles/tokens.css` still matches — every `--nn-*` custom
 *      property in the `:root` block and the `[data-nn-theme="dark"]` block must
 *      equal what the token file says. CI fails on drift.
 *   2. in write mode, emits `dist/tokens.json` (the source, for Figma / Style
 *      Dictionary / Tokens Studio) and `dist/tokens.js` + `.d.ts` — resolved
 *      light and dark maps consumers can import.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const CHECK_ONLY = process.argv.includes('--check')

const source = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'))

/* ---- Walk the DTCG tree, collecting leaf tokens ------------------------- */

/** @type {Map<string, { path: string[], value: string, dark?: string }>} */
const byPath = new Map()

function walk(node, path) {
  if (node && typeof node === 'object' && '$value' in node) {
    byPath.set(path.join('.'), {
      path,
      value: String(node.$value),
      dark: node.$extensions?.['nn.mode.dark'],
    })
    return
  }
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue
    walk(child, [...path, key])
  }
}
walk(source, [])

/* ---- path -> CSS custom property name --------------------------------- */

function cssVarName(path) {
  const [group, ...rest] = path
  switch (group) {
    case 'color':
      return `--nn-${rest[0]}-${rest[1]}` // ramp, step
    case 'semanticColor':
      return `--nn-color-${rest.join('-')}`
    case 'focusRing':
      return '--nn-focus-ring'
    case 'space':
      return `--nn-space-${rest[0]}`
    case 'width':
      return `--nn-width-${rest[0]}`
    case 'radius':
      return `--nn-radius-${rest[0]}`
    case 'font':
      return `--nn-font-${rest[0]}`
    case 'text':
      return rest[1] === 'lineHeight' ? `--nn-text-${rest[0]}--line-height` : `--nn-text-${rest[0]}`
    case 'weight':
      return `--nn-weight-${rest[0]}`
    case 'shadow':
      return `--nn-shadow-${rest[0]}`
    case 'duration':
      return `--nn-duration-${rest[0]}`
    case 'ease':
      return '--nn-ease'
    case 'z':
      return `--nn-z-${rest[0]}`
    default:
      throw new Error(`No CSS var mapping for token group "${group}" (${path.join('.')})`)
  }
}

const REF = /^\{([^}]+)\}$/
const norm = (s) => s.replace(/\s+/g, ' ').trim()

/** Value as it should appear in CSS: a reference becomes `var(--nn-…)`. */
function toCssValue(raw) {
  const m = raw.match(REF)
  if (!m) return norm(raw)
  const target = byPath.get(m[1])
  if (!target) throw new Error(`Unresolved reference {${m[1]}}`)
  return `var(${cssVarName(target.path)})`
}

/** Fully resolved literal value (follows references). */
function toLiteral(raw, seen = new Set()) {
  const m = raw.match(REF)
  if (!m) return norm(raw)
  if (seen.has(m[1])) throw new Error(`Circular reference at {${m[1]}}`)
  seen.add(m[1])
  const target = byPath.get(m[1])
  if (!target) throw new Error(`Unresolved reference {${m[1]}}`)
  return toLiteral(target.value, seen)
}

/* ---- Build the expected maps ----------------------------------------- */

const expectedRoot = new Map() // cssVar -> css value (reference form)
const expectedDark = new Map() // cssVar -> css value, only overridden tokens
const literalLight = {}
const literalDark = {}

for (const token of byPath.values()) {
  const name = cssVarName(token.path)
  expectedRoot.set(name, toCssValue(token.value))
  const key = name.slice(2) // drop leading --
  literalLight[key] = toLiteral(token.value)
  literalDark[key] = literalLight[key]
  if (token.dark !== undefined) {
    expectedDark.set(name, toCssValue(token.dark))
    literalDark[key] = toLiteral(token.dark)
  }
}

/* ---- Verify src/styles/tokens.css ----------------------------------- */

const cssPath = join(root, 'src/styles/tokens.css')
const css = readFileSync(cssPath, 'utf8')

function block(re) {
  const m = css.match(re)
  if (!m) throw new Error(`Could not find block ${re} in src/styles/tokens.css`)
  const decls = new Map()
  for (const d of m[1].matchAll(/(--nn-[\w-]+)\s*:\s*([^;]+);/g)) {
    decls.set(d[1], norm(d[2]))
  }
  return decls
}

const rootDecls = block(/:root\s*\{([\s\S]*?)\n\s*\}/)
const darkDecls = block(/\[data-nn-theme=['"]dark['"]\]\s*\{([\s\S]*?)\n\s*\}/)

const problems = []
// Quote style in CSS is Prettier's call, not the token file's — compare loosely.
const cmp = (s) => s.replace(/["']/g, '"')
function diff(label, expected, actual) {
  for (const [k, v] of expected) {
    if (!actual.has(k)) problems.push(`${label}: missing ${k} (tokens.json has "${v}")`)
    else if (cmp(actual.get(k)) !== cmp(v))
      problems.push(`${label}: ${k} is "${actual.get(k)}" in CSS but "${v}" in tokens.json`)
  }
  for (const k of actual.keys()) {
    if (!expected.has(k)) problems.push(`${label}: ${k} is in CSS but not in tokens.json`)
  }
}
diff(':root', expectedRoot, rootDecls)
diff('[data-nn-theme="dark"]', expectedDark, darkDecls)

if (problems.length) {
  console.error('✗ tokens.css has drifted from tokens/tokens.json:\n')
  for (const p of problems) console.error('  ' + p)
  console.error('\nUpdate tokens/tokens.json and src/styles/tokens.css together.')
  process.exit(1)
}
console.log(
  `✓ tokens.css matches tokens/tokens.json (${expectedRoot.size} tokens, ${expectedDark.size} dark overrides)`,
)

/* ---- Emit dist artifacts ------------------------------------------- */

if (CHECK_ONLY) process.exit(0)

const dist = join(root, 'dist')
if (!existsSync(dist)) mkdirSync(dist, { recursive: true })

writeFileSync(join(dist, 'tokens.json'), JSON.stringify(source, null, 2) + '\n')

const banner = '// Generated from tokens/tokens.json by scripts/build-tokens.mjs — do not edit.\n'
writeFileSync(
  join(dist, 'tokens.js'),
  banner +
    `export const light = ${JSON.stringify(literalLight, null, 2)}\n\n` +
    `export const dark = ${JSON.stringify(literalDark, null, 2)}\n\n` +
    `export const tokens = { light, dark }\n\n` +
    `export default tokens\n`,
)
writeFileSync(
  join(dist, 'tokens.d.ts'),
  banner +
    `export type TokenName = keyof typeof light\n` +
    `export declare const light: Record<string, string>\n` +
    `export declare const dark: Record<string, string>\n` +
    `export declare const tokens: { light: typeof light; dark: typeof dark }\n` +
    `export default tokens\n`,
)

console.log('✓ wrote dist/tokens.json, dist/tokens.js, dist/tokens.d.ts')
