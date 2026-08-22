import { forwardRef } from 'react'
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import type { BoxSpace } from '../Box/Box'

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12

export interface GridProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `div`. */
  as?: ElementType
  /**
   * Column count at the widest breakpoint. Defaults to `3`.
   * The grid steps down automatically on smaller screens — see `minItemWidth`
   * if you want the columns to be driven by content width instead.
   */
  columns?: GridColumns
  /** Gap between cells. Defaults to `md`. */
  gap?: BoxSpace
  /**
   * When set, columns are derived from this minimum cell width via `auto-fit`
   * and the `columns` prop is ignored. Useful for card grids that should
   * reflow purely on available space, e.g. `"16rem"`.
   */
  minItemWidth?: string
  /** Vertically centre cell contents. */
  alignCenter?: boolean
  children?: ReactNode
}

/**
 * A responsive CSS grid.
 *
 * Two modes: a fixed `columns` count that steps down at narrow widths, or
 * `minItemWidth` for a grid whose column count follows the available space.
 *
 * @example
 * <Grid columns={3} gap="lg">
 *   {features.map((f) => <Card key={f.id} title={f.title}>{f.body}</Card>)}
 * </Grid>
 *
 * @example
 * <Grid minItemWidth="16rem" gap="md">…</Grid>
 */
export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  {
    as: Component = 'div',
    columns = 3,
    gap = 'md',
    minItemWidth,
    alignCenter = false,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const resolved: CSSProperties = {
    gap: gap === 'none' ? '0' : `var(--nn-space-${gap})`,
    alignItems: alignCenter ? 'center' : undefined,
    ...(minItemWidth
      ? { gridTemplateColumns: `repeat(auto-fit, minmax(min(${minItemWidth}, 100%), 1fr))` }
      : null),
    ...style,
  }

  return (
    <Component
      ref={ref}
      className={cx('nn-grid', !minItemWidth && `nn-grid--${columns}`, className)}
      style={resolved}
      {...rest}
    >
      {children}
    </Component>
  )
})
