import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label rendered beside the box. */
  label?: ReactNode
  /** Secondary line under the label. */
  description?: ReactNode
  /** Error message rendered under the control. Marks the control invalid. */
  error?: ReactNode
  /**
   * Renders the mixed/partial state. Purely visual plus `aria-checked="mixed"`;
   * the underlying `checked` value is unaffected.
   */
  indeterminate?: boolean
}

/**
 * A single checkbox with its label.
 *
 * For a group of related checkboxes, render several inside a `Stack` and wrap
 * them in a `fieldset` with a `legend` so the group has an accessible name.
 *
 * @example
 * <Checkbox label="Email me about product updates" defaultChecked />
 *
 * @example
 * <Checkbox
 *   label="Select all"
 *   indeterminate={someSelected && !allSelected}
 *   checked={allSelected}
 *   onChange={toggleAll}
 * />
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, error, indeterminate = false, id, className, disabled, ...rest },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const describedIds = [description ? `${inputId}-desc` : null, error ? `${inputId}-error` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cx('nn-toggle', disabled && 'is-disabled', error && 'nn-toggle--invalid')}>
      <div className="nn-toggle__row">
        <input
          ref={(node) => {
            if (node) node.indeterminate = indeterminate
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          aria-checked={indeterminate ? 'mixed' : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedIds || undefined}
          className={cx('nn-checkbox', 'nn-focusable', className)}
          {...rest}
        />
        {label ? (
          <label className="nn-toggle__label" htmlFor={inputId}>
            {label}
          </label>
        ) : null}
      </div>
      {description ? (
        <span className="nn-toggle__description" id={`${inputId}-desc`}>
          {description}
        </span>
      ) : null}
      {error ? (
        <span className="nn-toggle__error" id={`${inputId}-error`}>
          {error}
        </span>
      ) : null}
    </div>
  )
})
