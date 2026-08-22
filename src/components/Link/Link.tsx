import { forwardRef } from 'react'
import type { AnchorHTMLAttributes, ElementType, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export type LinkTone = 'primary' | 'inherit' | 'muted'
export type LinkUnderline = 'always' | 'hover' | 'none'

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Render as a different element — pass your router's link component here
   * (e.g. `as={NextLink}`) to keep client-side navigation.
   */
  as?: ElementType
  /** Colour. Defaults to `primary`. */
  tone?: LinkTone
  /** Underline behaviour. Defaults to `hover`. */
  underline?: LinkUnderline
  /**
   * Marks the link as leaving the site: adds an arrow, `target="_blank"` and
   * the `rel` pair that closes the reverse-tabnabbing hole.
   */
  external?: boolean
  children?: ReactNode
}

/**
 * A text link.
 *
 * `tone="inherit"` is for links inside a coloured block (a footer, a dark
 * hero) where the surrounding text colour should win.
 *
 * @example
 * <Link href="/pricing">See pricing</Link>
 * <Link href="https://status.acme.com" external>Status page</Link>
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    as: Component = 'a',
    tone = 'primary',
    underline = 'hover',
    external = false,
    className,
    children,
    target,
    rel,
    ...rest
  },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cx(
        'nn-link',
        'nn-focusable',
        `nn-link--${tone}`,
        `nn-link--underline-${underline}`,
        className,
      )}
      target={external ? (target ?? '_blank') : target}
      rel={external ? (rel ?? 'noopener noreferrer') : rel}
      {...rest}
    >
      {children}
      {external ? (
        <span className="nn-link__external" aria-hidden="true">
          ↗
        </span>
      ) : null}
    </Component>
  )
})
