import { forwardRef } from 'react'
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import type { BoxSpace } from '../Box/Box'

export type StackDirection = 'row' | 'column'
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around'

export interface StackProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `div`. */
  as?: ElementType
  /** Main axis. Defaults to `column`. */
  direction?: StackDirection
  /** Space between children, from the spacing scale. Defaults to `md`. */
  gap?: BoxSpace
  /** Cross-axis alignment (`align-items`). */
  align?: StackAlign
  /** Main-axis distribution (`justify-content`). */
  justify?: StackJustify
  /** Allow children to wrap onto multiple lines. */
  wrap?: boolean
  /** Stretch to fill the parent's cross axis. */
  fill?: boolean
  children?: ReactNode
}

const ALIGN: Record<StackAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
}

const JUSTIFY: Record<StackJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
}

/**
 * The primary layout primitive — a flex container with token-scaled spacing.
 *
 * `Stack` is how almost all NN Design layouts are built: nest a `column` stack
 * for vertical rhythm and `row` stacks for toolbars, button groups and form
 * rows.
 *
 * @example
 * <Stack direction="row" gap="sm" justify="between" align="center">
 *   <Heading level={3}>Team members</Heading>
 *   <Button variant="primary" size="sm">Invite</Button>
 * </Stack>
 */
export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  {
    as: Component = 'div',
    direction = 'column',
    gap = 'md',
    align,
    justify,
    wrap = false,
    fill = false,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const resolved: CSSProperties = {
    flexDirection: direction,
    gap: gap === 'none' ? '0' : `var(--nn-space-${gap})`,
    alignItems: align ? ALIGN[align] : undefined,
    justifyContent: justify ? JUSTIFY[justify] : undefined,
    flexWrap: wrap ? 'wrap' : undefined,
    width: fill ? '100%' : undefined,
    ...style,
  }

  return (
    <Component ref={ref} className={cx('nn-stack', className)} style={resolved} {...rest}>
      {children}
    </Component>
  )
})
