import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type BadgeVariant = 'subtle' | 'solid' | 'outline'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic colour. Defaults to `neutral`. */
  tone?: BadgeTone
  /** Fill style. Defaults to `subtle`. */
  variant?: BadgeVariant
  /** Defaults to `md`. */
  size?: BadgeSize
  /** Shows a small filled dot before the label. */
  dot?: boolean
  children?: ReactNode
}

/**
 * A compact status or category label.
 *
 * `Badge` is decoration around text — it is not interactive. If a user needs
 * to click or dismiss it, use a `Button` instead.
 *
 * @example
 * <Badge tone="success" dot>Active</Badge>
 * <Badge tone="danger" variant="solid">Failed</Badge>
 */
export function Badge({
  tone = 'neutral',
  variant = 'subtle',
  size = 'md',
  dot = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cx(
        'nn-badge',
        `nn-badge--${variant}`,
        `nn-badge--tone-${tone}`,
        `nn-badge--${size}`,
        className,
      )}
      {...rest}
    >
      {dot ? <span className="nn-badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  )
}
