import type { HTMLAttributes } from 'react'
import { cx } from '../../utils/cx'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Diameter step. Defaults to `md`. */
  size?: SpinnerSize
  /**
   * Accessible label announced while the spinner is visible.
   * Defaults to `"Loading"`. Pass an empty string when the spinner sits inside
   * a control that already announces its own busy state (as `Button` does).
   */
  label?: string
}

/**
 * An indeterminate loading indicator.
 *
 * Inherits `currentColor`, so it takes on the colour of whatever it sits in —
 * no variant prop needed.
 *
 * @example
 * <Spinner />
 * <Stack direction="row" gap="xs" align="center">
 *   <Spinner size="sm" label="" />
 *   <Text tone="muted" size="sm">Fetching results…</Text>
 * </Stack>
 */
export function Spinner({ size = 'md', label = 'Loading', className, ...rest }: SpinnerProps) {
  return (
    <span
      className={cx('nn-spinner', `nn-spinner--${size}`, className)}
      role={label ? 'status' : undefined}
      aria-hidden={label ? undefined : 'true'}
      {...rest}
    >
      <span className="nn-spinner__circle" />
      {label ? <span className="nn-sr-only">{label}</span> : null}
    </span>
  )
}
