import { forwardRef } from 'react'
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export type BoxSpace =
  | 'none'
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'container'
  | 'section'

export type BoxSurface = 'none' | 'surface-1' | 'surface-2' | 'surface-3' | 'primary-subtle'

export type BoxRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export type BoxShadow = 'none' | 'sm' | 'md' | 'lg'

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `div`. */
  as?: ElementType
  /** Padding on all sides, from the spacing scale. */
  padding?: BoxSpace
  /** Horizontal padding. Overrides `padding` on the inline axis. */
  paddingX?: BoxSpace
  /** Vertical padding. Overrides `padding` on the block axis. */
  paddingY?: BoxSpace
  /** Background from the surface scale. */
  background?: BoxSurface
  /** Corner radius. */
  radius?: BoxRadius
  /** Draws a 1px border in the themed border colour. */
  border?: boolean
  /** Elevation shadow. */
  shadow?: BoxShadow
  children?: ReactNode
}

const space = (v: BoxSpace | undefined) =>
  v === undefined ? undefined : v === 'none' ? '0' : `var(--nn-space-${v})`

const surface = (v: BoxSurface | undefined) =>
  v === undefined || v === 'none'
    ? undefined
    : v === 'primary-subtle'
      ? 'var(--nn-color-primary-subtle)'
      : `var(--nn-color-${v})`

/**
 * The generic layout container — a `div` wired to the token scales.
 *
 * Reach for `Box` when you need a themed surface, padding or a border. For
 * arranging children in a row or column, prefer `Stack`. If you are writing
 * one-off layout glue in an app, the Tailwind utilities (`p-md`,
 * `bg-surface-2`, `rounded-lg`) do the same job with less markup.
 *
 * @example
 * <Box background="surface-2" padding="lg" radius="lg" border>
 *   <Text tone="muted">Nothing selected</Text>
 * </Box>
 */
export const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  {
    as: Component = 'div',
    padding,
    paddingX,
    paddingY,
    background,
    radius,
    border = false,
    shadow,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const resolved: CSSProperties = {
    padding: space(padding),
    paddingInline: space(paddingX),
    paddingBlock: space(paddingY),
    backgroundColor: surface(background),
    borderRadius: radius && radius !== 'none' ? `var(--nn-radius-${radius})` : undefined,
    boxShadow: shadow && shadow !== 'none' ? `var(--nn-shadow-${shadow})` : undefined,
    ...style,
  }

  return (
    <Component
      ref={ref}
      className={cx('nn-box', border && 'nn-box--bordered', className)}
      style={resolved}
      {...rest}
    >
      {children}
    </Component>
  )
})
