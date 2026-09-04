# Theming

NN Design has one styling primitive: **CSS custom properties**. Every component
paints itself from `var(--nn-*)` tokens, so you re-theme by reassigning those
properties on any ancestor — no build step, no config, no component overrides.

The token source of truth is [`tokens/tokens.json`](../tokens/tokens.json) (W3C
DTCG format). It is compiled to `src/styles/tokens.css` and shipped three ways:

| Artifact                                        | Use it for                                                             |
| ----------------------------------------------- | ---------------------------------------------------------------------- |
| `nn-design/styles.css` / `nn-design/tokens.css` | the `:root` custom properties + dark theme + Tailwind preset           |
| `nn-design/tokens.json`                         | Figma (Tokens Studio), Style Dictionary, your own codegen              |
| `nn-design/tokens`                              | `import { light, dark } from 'nn-design/tokens'` — resolved value maps |

## The two token layers

1. **Raw ramps** — `--nn-neutral-*`, `--nn-indigo-*`, … . Fixed hues, identical
   in light and dark. Reach for these when you need a specific colour.
2. **Semantic tokens** — `--nn-color-surface-1`, `--nn-color-primary`,
   `--nn-color-text-muted`, … . These are what components use, and the only
   ones that change between themes.

Re-theming means pointing the **semantic** tokens somewhere else.

## Light / dark

Handled for you. `<Root theme>` sets `data-nn-theme`, and `tokens.css` ships all
three resolution paths:

```tsx
<Root theme="system">  {/* follows prefers-color-scheme (default) */}
<Root theme="light">   {/* force light */}
<Root theme="dark">    {/* force dark */}
```

Only semantic tokens are reassigned in dark mode; see the
`[data-nn-theme="dark"]` block in `tokens.css`. Shadows get opaque-black
variants there because translucent slate disappears on a dark surface.

## Rebranding

Set the semantic tokens on any element — the whole subtree follows. The
smallest useful override is the primary ramp plus the focus colour:

```css
.brand-emerald {
  --nn-color-primary: #059669;
  --nn-color-primary-hover: #047857;
  --nn-color-primary-active: #065f46;
  --nn-color-primary-fg: #ffffff;
  --nn-color-primary-subtle: #ecfdf5;
  --nn-color-primary-subtle-fg: #065f46;
  --nn-color-focus: #10b981;
}
```

```tsx
<Root className="brand-emerald">…</Root>
```

For a full re-skin, also reassign surfaces, borders and text:
`--nn-color-surface-1..3`, `--nn-color-border`, `--nn-color-border-strong`,
`--nn-color-text`, `--nn-color-text-muted`, `--nn-color-text-subtle`. Do it once
under `:root` (and again under `[data-nn-theme="dark"]` if you support dark).

See the **Foundations → Theming** story for a live before/after.

## With Tailwind

The Tailwind preset is declared `@theme inline`, so utilities emit
`var(--nn-color-*)` rather than a frozen value. That means `bg-primary`,
`text-text-muted`, `border-border` etc. **follow your overrides automatically** —
no Tailwind config change needed.

## Generating other formats

`tokens/tokens.json` is standard DTCG, so [Style Dictionary
v4](https://styledictionary.com/) consumes it directly:

```js
// style-dictionary.config.js
export default {
  source: ['node_modules/nn-design/dist/tokens.json'],
  platforms: {
    ios: {
      transformGroup: 'ios',
      buildPath: 'gen/',
      files: [{ destination: 'Tokens.swift', format: 'ios-swift/class.swift' }],
    },
  },
}
```

Dark-theme values live under each token's
`$extensions["nn.mode.dark"]`.
