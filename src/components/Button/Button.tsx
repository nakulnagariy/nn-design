import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Spinner } from '../Spinner/Spinner'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. Defaults to `secondary`. */
  variant?: ButtonVariant
  /** Control height and padding. Defaults to `md`. */
  size?: ButtonSize
  /** Stretch to the full width of the parent. */
  fullWidth?: boolean
  /**
   * Swap the leading content for a spinner and block interaction.
   * The label stays in place so the button does not change width.
   */
  loading?: boolean
  /** Element rendered before the label — typically an icon. */
  iconStart?: ReactNode
  /** Element rendered after the label — typically an icon. */
  iconEnd?: ReactNode
  children?: ReactNode
}

/**
 * The standard action control.
 *
 * Use exactly one `primary` button per view for the main action; everything
 * else is `secondary` or `ghost`. `danger` is reserved for destructive actions
 * such as deleting a record.
 *
 * @example
 * <Button variant="primary" onClick={save}>Save changes</Button>
 * <Button variant="ghost" size="sm" iconStart={<PlusIcon />}>Add row</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    size = 'md',
    fullWidth = false,
    loading = false,
    iconStart,
    iconEnd,
    type = 'button',
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        'nn-button',
        'nn-focusable',
        `nn-button--${variant}`,
        `nn-button--${size}`,
        fullWidth && 'nn-button--full',
        loading && 'is-loading',
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Spinner size="sm" className="nn-button__spinner" label="" />
      ) : (
        iconStart && (
          <span className="nn-button__icon" aria-hidden="true">
            {iconStart}
          </span>
        )
      )}
      <span className="nn-button__label">{children}</span>
      {!loading && iconEnd && (
        <span className="nn-button__icon" aria-hidden="true">
          {iconEnd}
        </span>
      )}
    </button>
  )
})
