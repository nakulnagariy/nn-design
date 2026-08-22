import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label rendered beside the dot. */
  label?: ReactNode
  /** Secondary line under the label. */
  description?: ReactNode
}

/**
 * A single radio button.
 *
 * Radios only make sense in a group: give every option in the group the same
 * `name`, and wrap them in a `fieldset` with a `legend` so the group is
 * announced as one question.
 *
 * @example
 * <fieldset>
 *   <legend>Billing period</legend>
 *   <Stack gap="xs">
 *     <Radio name="period" value="monthly" label="Monthly" defaultChecked />
 *     <Radio name="period" value="annual" label="Annual" description="Save 20%" />
 *   </Stack>
 * </fieldset>
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, description, id, className, disabled, ...rest },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={cx('nn-toggle', disabled && 'is-disabled')}>
      <div className="nn-toggle__row">
        <input
          ref={ref}
          id={inputId}
          type="radio"
          disabled={disabled}
          aria-describedby={description ? `${inputId}-desc` : undefined}
          className={cx('nn-radio', 'nn-focusable', className)}
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
