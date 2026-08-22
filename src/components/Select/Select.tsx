import { forwardRef, useId } from 'react'
import type { ReactNode, SelectHTMLAttributes } from 'react'
import { cx } from '../../utils/cx'
import { FieldShell, describedBy } from '../../internal/Field'

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Field label. Strongly recommended — without it, pass `aria-label`. */
  label?: ReactNode
  /** Helper text below the field. Hidden while `error` is set. */
  hint?: ReactNode
  /** Error message below the field. Its presence puts the field in an invalid state. */
  error?: ReactNode
  /** Control height. Defaults to `md`. */
  size?: SelectSize
  /** Stretch to the full width of the parent. Defaults to `true`. */
  fullWidth?: boolean
  /**
   * Options to render. Alternatively pass `<option>` elements as children —
   * use one or the other, not both.
   */
  options?: SelectOption[]
  /** Placeholder shown as a disabled first option when no value is selected. */
  placeholder?: string
  children?: ReactNode
}

/**
 * A native `select`, styled to match `Input`.
 *
 * Native on purpose: it inherits correct keyboard behaviour and renders as the
 * platform picker on mobile. For multi-select or search-as-you-type, build on
 * top of this rather than expecting those here.
 *
 * @example
 * <Select
 *   label="Environment"
 *   placeholder="Choose one"
 *   options={[
 *     { label: 'Production', value: 'prod' },
 *     { label: 'Staging', value: 'staging' },
 *   ]}
 * />
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    hint,
    error,
    size = 'md',
    fullWidth = true,
    options,
    placeholder,
    required,
    id,
    className,
    children,
    defaultValue,
    value,
    ...rest
  },
  ref,
) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  // Only force the placeholder to be the initial selection when the caller has
  // not supplied a value of their own — otherwise we would fight a controlled
  // component for control of the selection.
  const uncontrolledDefault =
    value === undefined && defaultValue === undefined && placeholder ? '' : defaultValue

  return (
    <FieldShell
      id={selectId}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={cx(!fullWidth && 'nn-field--auto')}
    >
      <div className="nn-select">
        <select
          ref={ref}
          id={selectId}
          required={required}
          value={value}
          defaultValue={uncontrolledDefault}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(selectId, hint, error)}
          className={cx('nn-control', `nn-control--${size}`, 'nn-select__control', className)}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options?.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
        <span className="nn-select__arrow" aria-hidden="true" />
      </div>
    </FieldShell>
  )
})
