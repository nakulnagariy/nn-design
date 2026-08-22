import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label rendered beside the track. */
  label?: ReactNode
  /** Secondary line under the label. */
  description?: ReactNode
}

/**
 * An on/off toggle that applies immediately.
 *
 * Use `Switch` when flipping it takes effect right away (enabling a setting).
 * Use `Checkbox` when the value is only committed once a form is submitted.
 *
 * @example
 * <Switch
 *   label="Weekly digest"
 *   description="A summary of activity every Monday."
 *   checked={enabled}
 *   onChange={(e) => setEnabled(e.target.checked)}
 * />
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, description, id, className, disabled, ...rest },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={cx('nn-toggle', 'nn-toggle--switch', disabled && 'is-disabled')}>
      <div className="nn-toggle__row">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          disabled={disabled}
          aria-describedby={description ? `${inputId}-desc` : undefined}
          className={cx('nn-switch', 'nn-focusable', className)}
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
    </div>
  )
})
