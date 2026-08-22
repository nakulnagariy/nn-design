import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export type DividerOrientation = 'horizontal' | 'vertical'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Defaults to `horizontal`. */
  orientation?: DividerOrientation
  /**
   * Optional label rendered in the middle of the rule, e.g. "or".
   * Horizontal dividers only.
   */
  children?: ReactNode
}

/**
 * A rule separating content.
 *
 * A plain divider is decorative and hidden from assistive tech. Give it
 * `children` and it becomes a labelled separator — the pattern used between
 * social sign-in and email sign-in.
 *
 * @example
 * <Divider />
 * <Divider>or</Divider>
 * <Divider orientation="vertical" />
 */
export function Divider({
  orientation = 'horizontal',
  className,
  children,
  ...rest
}: DividerProps) {
  const labelled = orientation === 'horizontal' && children != null

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      aria-hidden={labelled ? undefined : 'true'}
      className={cx('nn-divider', `nn-divider--${orientation}`, labelled && 'nn-divider--labelled', className)}
      {...rest}
    >
      {labelled ? <span className="nn-divider__label">{children}</span> : null}
    </div>
  )
}
