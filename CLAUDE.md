# NN Design System — notes for AI assistants

React component library + design tokens + page blocks + a Tailwind v4 preset.
Ships as an ESM package (`dist/`), consumed as `import 'nn-design/styles.css'`
and `import { Button } from 'nn-design'`.

## Commands

```bash
npm run typecheck      # tsc --noEmit — run after any .ts/.tsx change
npm run build          # clean + vite build (js/d.ts) + postcss (css). Run before claiming done.
npm run storybook      # dev catalogue on :6006 — the only place Tailwind compiles
npm run build-storybook
```

`dist/` is git-ignored and rebuilt by CI on release; never hand-edit it or commit it.

## Layout

- `src/styles/tokens.css` — the token layer. Everything else references it.
- `src/components/<Name>/` — `<Name>.tsx`, `<Name>.css`, `<Name>.stories.tsx`. Primitives + form controls + feedback + data display.
- `src/blocks/<Name>/` — composed page sections (Hero, Pricing, Footer…), same file shape.
- `src/internal/` — CSS shared by more than one component (`field.css`, `toggle.css`).
- `src/styles/index.css` — the `@import` manifest that postcss flattens into `dist/styles.css`. Add new component CSS here.
- `src/index.ts` — the public export barrel. New components/types go here.

## Conventions

- Component CSS is **plain, scoped BEM-ish CSS** (`.nn-card`, `.nn-card__title`, `.nn-card--lg`), not CSS Modules. Class names are applied with the `cx` helper.
- Components never take a Tailwind class dependency. They style themselves with `var(--nn-*)` tokens so they work with or without Tailwind in the host app.
- Every component is wrapped by the consumer's `<Root>`, which carries `.nn-root` (base type, surface colour, `box-sizing`). Base styles are scoped under `.nn-root` — no global reset.
- Dark mode: only the **semantic** tokens (`--nn-color-*`) are reassigned, three ways (`@media prefers-color-scheme`, `[data-nn-theme="dark"]`, `[data-nn-theme="light"]` opt-out). Raw ramps (`--nn-indigo-500`) stay fixed.
- New spacing/size props on components resolve to `var(--nn-space-${v})` / `var(--nn-width-${v})` directly (see `Box.tsx`) — keep the prop union in sync with the tokens.

## Token rules — do not break these

The token file has two layers: `:root { --nn-* }` (always available) and
`@theme inline { … }` (re-export into Tailwind v4 namespaces). When editing
`tokens.css`:

1. **Spacing and width are separate scales. Never merge them.**
   - `--nn-space-*` (`3xs`…`3xl`) is a **spacing scale only**: gaps, padding, margins.
   - `--nn-width-*` (`prose`, `sm`, `md`, `lg`, `xl`) is for **`max-width`** — content columns, reading measure. `sm/md/lg/xl` mirror the `<Container>` `size` prop.

2. **Do NOT add `--spacing-<name>` keys to `@theme inline`.**
   In Tailwind v4 the `--spacing-*` namespace also backs `w-*` / `min-w-*` /
   `max-w-*`, and it wins over `--container-*`. A key like `--spacing-lg: 1.5rem`
   silently turns `max-w-lg` into 1.5rem instead of 32rem — content collapses to
   a narrow strip. Spacing stays on Tailwind's numeric scale (`gap-4`, `p-6`);
   for an exact token step use `gap-[var(--nn-space-md)]`.
   (This regression shipped once in v0.1.0 and was reverted — don't reintroduce it.)

3. Content widths are exported as `--container-{prose,narrow,content,page,wide}`
   — deliberately **not** the `sm/md/lg/xl` keys, so they can't collide with
   Tailwind's built-in `--container-*` t-shirt sizes. `max-w-sm … max-w-7xl`
   must keep their stock Tailwind values.

4. If a token is renamed or removed, update: `src/styles/Tokens.stories.tsx`
   (the foundations catalogue), the vocabulary table in `README.md`, and any
   component prop union that enumerates the keys.
