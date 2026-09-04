# Right-to-left (RTL)

NN Design is built for bidirectional layouts. Component CSS uses **CSS logical
properties** throughout — `padding-inline`, `margin-inline-start`,
`inset-inline-end`, `border-start-start-radius` — so spacing, alignment and
rounded corners flip automatically when the writing direction is `rtl`.

## Turning it on

Set `dir` on `<html>` (or on the `Root`, or any ancestor):

```html
<html dir="rtl" lang="ar"></html>
```

```tsx
<Root dir="rtl">…</Root>
```

That is the whole setup. There is no RTL stylesheet to import and no provider to
configure — the logical properties do the work.

## What flips

- All padding, margin and gap that runs along the inline axis
- Flex/grid inline alignment (`justify-content`, `text-align: start/end`)
- Border radii on component corners
- Icon-and-label ordering in `Button`, `Alert`, `Dropdown`, `Link`
- The `Avatar` status dot, `Badge` and `Input` affix placement
- `Table` cell alignment (`align="start" | "end"`)

## What does **not** flip (by design)

- **`Tooltip` `side="left"` / `side="right"`** — these name a physical side. Use
  `side="top"` / `side="bottom"`, or choose the side that suits your layout.
- **Icon glyphs themselves** — a chevron pointing right still points right. If a
  directional glyph needs mirroring, wrap it: `<span style={{ transform: 'scaleX(-1)' }}>`.
- **Numbers, code, and `font-variant-numeric: tabular-nums`** in `Stats` /
  `Table` — digits stay LTR, which is correct in an RTL context.

## Testing it

Storybook has a **Direction** toolbar toggle (LTR / RTL) that sets
`document.documentElement.dir`, so every story can be checked in both directions.
