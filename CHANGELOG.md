# Changelog

All notable changes to `nn-design` are documented here.
This project follows [semantic versioning](https://semver.org/) — while it is
`0.x`, breaking changes land in a minor bump.

## 0.2.0

### Fixed

- **Width utilities collapsed to a few pixels.** The spacing scale was exported
  into Tailwind's `--spacing-*` namespace with t-shirt keys (`sm`…`3xl`). In
  Tailwind v4 that namespace also backs `w-*` / `min-w-*` / `max-w-*` and wins
  over `--container-*`, so `max-w-2xl` resolved to `3rem` instead of `42rem` and
  any content constrained with it shrank to a narrow strip.
  `max-w-sm … max-w-7xl` now keep their stock Tailwind values.

### Changed (breaking)

- **Spacing is no longer exported as named Tailwind utilities.** `gap-md`,
  `p-lg`, `px-sm`, `p-container`, … no longer exist.
  Migration:
  - use Tailwind's numeric scale (1 step = 0.25rem): `gap-md` → `gap-4`,
    `p-lg` → `p-6`, `p-container` (2rem) → `p-8`, `p-section` (4rem) → `p-16`;
  - or reference an exact token step: `gap-[var(--nn-space-md)]`.
  - Component props are unchanged — `<Stack gap="md">`, `<Box padding="lg">`
    still work.
- **`<Box padding>` / `<Stack gap>` / `<Grid gap>` no longer accept
  `"container"` or `"section"`.** Those tokens were mis-scaled padding values
  masquerading as layout widths. Use a real step (`"xl"`, `"3xl"`) or a width
  token.
- Removed the `--nn-space-container` and `--nn-space-section` custom properties.

### Added

- **Layout width tokens**, kept separate from the spacing scale:
  `--nn-width-prose` (65ch), `--nn-width-sm|md|lg|xl` (40 / 56 / 72 / 90rem,
  mirroring the `<Container>` `size` prop).
- Tailwind utilities for them via dedicated `--container-*` keys that don't
  collide with Tailwind's built-ins: `max-w-prose`, `max-w-narrow`,
  `max-w-content`, `max-w-page`, `max-w-wide`.
- `CLAUDE.md` / `AGENTS.md` with the token-layer rules for AI assistants.

## 0.1.0

- Initial release: 27 components, 12 page blocks, the token layer, and the
  Tailwind v4 preset.
