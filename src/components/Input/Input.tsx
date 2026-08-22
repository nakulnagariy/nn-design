import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { FieldShell, describedBy } from '../../internal/Field'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label. Strongly recommended — without it, pass `aria-label`. */
  label?: ReactNode
  /** Helper text below the field. Hidden while `error` is set. */
  hint?: ReactNode
  /** Error message below the field. Its presence puts the field in an invalid state. */
  error?: ReactNode
  /** Control height. Defaults to `md`. */
  size?: InputSize
  /** Stretch to the full width of the parent. Defaults to `true`. */
  fullWidth?: boolean
  /** Class applied to the wrapping field element rather than the `input`. */
  fieldClassName?: string
}

/**
 * A single-line text field with label, hint and error handling built in.
 *
 * Pass `error` to mark the field invalid — it wires up `aria-invalid` and
 * `aria-describedby` for you, so do not also set them by hand.
 *
 * @example
 * <Input
 *   label="Work email"
 *   type="email"
 *   placeholder="you@company.com"
 *   hint="We'll only use this for sign-in."
 * />
 *
 * @example
 * <Input label="Seats" type="number" error="Must be at least 1" defaultValue={0} />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    error,
    size = 'md',
    fullWidth = true,
    required,
    id,
    className,
    fieldClassName,
    style,
    ...rest
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <FieldShell
      id={inputId}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={cx(!fullWidth && 'nn-field--auto', fieldClassName)}
    >
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(inputId, hint, error)}
        className={cx('nn-control', `nn-control--${size}`, 'nn-input', className)}
        style={fullWidth ? style : { width: 'auto', ...style }}
        {...rest}
      />
    </FieldShell>
  )
})
