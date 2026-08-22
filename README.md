# NN Design System

React components, design tokens, page blocks, and a Tailwind v4 preset.

**27 components** and **12 page blocks** built on a single token layer, shipped
as an ESM library with TypeScript declarations and one self-contained
stylesheet. Zero runtime dependencies beyond React.

```bash
npm install nn-design
```

## Getting started

Import the stylesheet once at your app entry, then wrap your tree in `Root`:

```tsx
import 'nn-design/styles.css'
import { Root, Stack, Heading, Button } from 'nn-design'

export default function App() {
  return (
    <Root theme="system">
      <Stack gap="md">
        <Heading level={1}>Dashboard</Heading>
        <Button variant="primary">New report</Button>
      </Stack>
    </Root>
  )
}
```

`Root` is required. It applies the `.nn-root` class that carries base
typography, surface colour and `box-sizing`. Components rendered outside a
`Root` keep their own styles but inherit the page's font and background, which
usually reads as broken.

A whole marketing page, using nothing but blocks:

```tsx
<Root>
  <Header logo={<Logo />} links={nav} actions={<Button variant="primary">Get started</Button>} sticky />
  <Hero title="Ship faster" description="…" actions={<Button variant="primary" size="lg">Start</Button>} />
  <Features title="Why us" variant="cards" items={features} />
  <Pricing title="Pricing" tiers={tiers} />
  <FAQ title="Questions" items={faqs} />
  <CTA title="Start building today" actions={<Button size="lg">Get started</Button>} />
  <Footer logo={<Logo />} columns={footerColumns} copyright="© 2026 Acme" />
</Root>
```

## Two ways to style

Components come pre-styled — you never write CSS for them. For the layout glue
*between* components, the tokens are also exported as a Tailwind v4 preset:

```tsx
<div className="flex gap-md p-container bg-surface-2 rounded-lg">
  <Button variant="primary">Save</Button>
</div>
```

To enable those utilities, import Tailwind before the design system:

```css
@import 'tailwindcss';
@import 'nn-design/styles.css';
```

Tailwind is optional. Without it, everything still works — reference the tokens
directly as `var(--nn-space-md)`, `var(--nn-color-surface-2)`, and so on.

### The vocabulary

| Namespace | Tokens | Tailwind utilities |
|---|---|---|
| Surfaces | `surface-1` `surface-2` `surface-3` | `bg-surface-2` |
| Lines | `border` `border-strong` | `border-border` |
| Text | `text` `text-muted` `text-subtle` `text-inverted` | `text-text-muted` |
| Primary | `primary` `primary-hover` `primary-fg` `primary-subtle` | `bg-primary` `text-primary` |
| Status | `success` `warning` `danger` `info` (each with `-subtle`, `-subtle-fg`) | `bg-danger-subtle` |
| Spacing | `3xs` `2xs` `xs` `sm` `md` `lg` `xl` `2xl` `3xl` `container` `section` | `gap-md` `p-container` |
| Radius | `xs` `sm` `md` `lg` `xl` `2xl` `full` | `rounded-lg` |
| Type | `caption` `sm` `body` `body-lg` `h4` `h3` `h2` `h1` `display` | `text-body` `text-h1` |
| Shadow | `sm` `md` `lg` | `shadow-md` |

As CSS custom properties these are prefixed `--nn-`: `--nn-color-surface-2`,
`--nn-space-md`, `--nn-radius-lg`, `--nn-text-body`, `--nn-shadow-md`.

## Theming

Three token sets resolve automatically:

- `<Root theme="system">` — follows the OS `prefers-color-scheme` (default)
- `<Root theme="light">` — forces light, even when the OS is dark
- `<Root theme="dark">` — forces dark

Because the Tailwind preset is declared `@theme inline`, utilities emit
`var(--nn-color-*)` rather than a frozen value — so `bg-surface-1` follows the
active theme just like component internals do.

Only the semantic tokens change between themes. The raw ramps
(`--nn-indigo-500`, `--nn-neutral-200`, …) stay fixed, so reaching for one gives
the same hue in both.

## Components

**Primitives** — `Root` `Box` `Stack` `Container` `Grid` `Text` `Heading`
`Divider` `Link`

**Forms** — `Button` `Input` `Select` `Checkbox` `Radio` `Switch`

**Feedback** — `Alert` `Badge` `Spinner` `Tooltip` `Modal`

**Data display** — `Card` `Table` `Tabs` `Accordion` `Dropdown` `Avatar`

**Motion** — `Reveal`, plus the `useInView` hook

Every component exports its props type (`ButtonProps`, `TableColumn<T>`, …).

### Notes on a few

`Stack` is the layout workhorse — nest a `column` for vertical rhythm and `row`
stacks for toolbars and form rows. `Container` centres page content at a
readable width; `Grid` handles card layouts. Note that a column `Stack`
stretches its children, so pass `align="start"` when you want a `Badge` or
`Button` to keep its intrinsic width.

`Modal` is built on the native `<dialog>` element, so focus trapping, page
inertness and Escape-to-close come for free. It is controlled and never closes
itself — `open` must flip in your state.

`Table` is driven by column definitions and renders a plain semantic `<table>`.
It does not sort, paginate or virtualise; do that to `data` first.

`Input` and `Select` wire up `aria-invalid` and `aria-describedby` from the
`error` and `hint` props — don't set those attributes by hand.

`Dropdown` is positioned with CSS relative to its trigger, so an ancestor with
`overflow: hidden` can clip it.

## Page blocks

Full sections, configured with props rather than composed by hand:

| Block | What it is |
|---|---|
| `Section` | The shell the others are built from — tone, spacing, width, heading group |
| `Header` | Site header with responsive nav that collapses to a hamburger |
| `Hero` | Opening section — `centered`, `split` or `gradient` |
| `Features` | Feature list — `grid`, `cards` or `alternating` rows with media |
| `Stats` | A row of headline figures |
| `Pricing` | Pricing tiers with a featured plan |
| `Testimonials` | Customer quotes — `grid` or `feature` |
| `LogoCloud` | Customer logos, optionally as an infinite marquee |
| `FAQ` | Accordion-backed questions |
| `Newsletter` | Email capture with its own submitting/success/error states |
| `CTA` | Closing ask — `plain`, `boxed` or `split` |
| `Footer` | Site footer — `columns` sitemap or `simple` |

Every block accepts the `Section` props (`tone`, `spacing`, `size`, `eyebrow`,
`title`, `description`, `align`), so they stack consistently down a page.

## Motion

`Reveal` animates content in on scroll using `IntersectionObserver` plus a CSS
transition — no animation library, no runtime dependency.

```tsx
<Reveal animation="slide-up">
  <Heading level={2}>Built for teams</Heading>
</Reveal>

<Reveal stagger>
  {features.map((f) => <Card key={f.id} title={f.title} />)}
</Reveal>
```

Animations: `fade` `slide-up` `slide-down` `slide-left` `slide-right` `scale`
`blur`. Motion is suppressed entirely under `prefers-reduced-motion`, where
content simply appears. If `IntersectionObserver` is unavailable the content is
shown immediately, so nothing is ever stranded hidden.

## Development

```bash
npm install
npm run storybook      # component workshop at :6006
npm run build          # dist/index.js + index.d.ts + styles.css
npm run typecheck
```

Storybook has a Theme switch in the toolbar that drives `Root`'s `theme` prop,
so light and dark are exercised through the same code path an app uses.
Tailwind runs in Storybook only — that's what verifies the preset really
generates the documented utilities.

Under **Examples** you'll find five complete pages — Landing, Pricing,
Dashboard, Settings and Sign in — assembled from the library. They are meant to
be read and copied; they are not part of the published package.

## Publishing

### To npm

Releases are driven by the `version` field in `package.json`. To ship one:

```bash
npm version patch          # or minor / major — bumps package.json
git push
```

Merging that to `main` runs `.github/workflows/release.yml`, which publishes to
npm with [provenance](https://docs.npmjs.com/generating-provenance-statements).

Merges that don't change the version are a no-op: the workflow checks npm
first and skips, because npm permanently refuses to republish an existing
version. So ordinary commits don't need any special handling.

**One-time setup:** add an npm **automation** token (npmjs.com → Access Tokens
→ Generate New Token → Automation) as a repository secret named `NPM_TOKEN`,
under Settings → Secrets and variables → Actions. A classic *publish* token is
blocked by 2FA in CI and will fail.

### To GitHub Pages

`.github/workflows/pages.yml` builds Storybook and deploys it on every push to
`main`. To turn it on:

1. Push the repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main`, or run the workflow manually from the Actions tab.

Step 2 has to happen before the first run, otherwise `configure-pages` fails
with *"Get Pages site failed"* — a workflow cannot deploy to a Pages site that
does not exist yet. The workflow passes `enablement: true`, which tries to
create the site over the API, but that needs Pages to be permitted for the
repository in the first place; the settings toggle is the reliable route.

Storybook builds with relative asset paths, so it works from the project
subpath (`https://<user>.github.io/nn-design/`) with no extra configuration.

## What ships

| File | Contents |
|---|---|
| `dist/index.js` | ESM bundle, React external (~58 kB) |
| `dist/index.d.ts` | TypeScript declarations |
| `dist/styles.css` | Tokens, base layer, components and blocks, flattened (~93 kB) |
| `dist/tokens.css` | Just the token layer, if you want it standalone |

Styles are deliberately not imported from the JS, so importing one component
never drags the whole stylesheet into your bundle.

## License

MIT
