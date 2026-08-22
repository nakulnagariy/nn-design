import { forwardRef } from 'react'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export type RootTheme = 'light' | 'dark' | 'system'

export interface RootProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `div`. */
  as?: ElementType
  /**
   * Which theme the subtree renders in.
   * `system` (default) follows the OS `prefers-color-scheme` setting.
   */
  theme?: RootTheme
  children?: ReactNode
}

/**
 * The design system's root wrapper.
 *
 * Every NN Design tree must be wrapped in a `Root` — it applies the `.nn-root`
 * class that carries the base typography, surface colour and box-sizing that
 * all other components inherit. Components rendered outside a `Root` still
 * pick up their own component CSS, but sit on unstyled page defaults for font
 * and background, which usually reads as "broken".
 *
 * @example
 * <Root theme="system">
 *   <Stack gap="md">
 *     <Heading level={1}>Dashboard</Heading>
 *     <Button variant="primary">New report</Button>
 *   </Stack>
 * </Root>
 */
export const Root = forwardRef<HTMLElement, RootProps>(function Root(
  { as: Component = 'div', theme = 'system', className, children, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cx('nn-root', className)}
      data-nn-theme={theme === 'system' ? undefined : theme}
      {...rest}
    >
      {children}
    </Component>
  )
})
