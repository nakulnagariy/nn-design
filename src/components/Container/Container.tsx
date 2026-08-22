import { forwardRef } from 'react'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `div`. */
  as?: ElementType
  /** Max content width. Defaults to `lg`. */
  size?: ContainerSize
  /** Remove the horizontal gutter. */
  flush?: boolean
  children?: ReactNode
}

/**
 * Centres content at a readable max width with a responsive gutter.
 *
 * Every page-level block wraps its content in one of these, which is what keeps
 * headers, heroes and footers optically aligned down the page. Sizes are
 * `sm` 40rem, `md` 56rem, `lg` 72rem, `xl` 90rem.
 *
 * @example
 * <Container size="lg">
 *   <Heading level={1}>Pricing</Heading>
 * </Container>
 */
export const Container = forwardRef<HTMLElement, ContainerProps>(function Container(
  { as: Component = 'div', size = 'lg', flush = false, className, children, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cx('nn-container', `nn-container--${size}`, flush && 'nn-container--flush', className)}
      {...rest}
    >
      {children}
    </Component>
  )
})
