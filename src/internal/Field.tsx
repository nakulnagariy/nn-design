import type { ReactNode } from 'react'
import { cx } from '../utils/cx'

/**
 * Shared label / hint / error scaffolding for form controls.
 * Internal — not part of the public API; `Input` and `Select` render it.
 */
export interface FieldShellProps {
  id: string
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  required?: boolean
  className?: string
  children: ReactNode
}

/**
 * Builds the `aria-describedby` value for a control.
 *
 * The `!error` guard on the hint is load-bearing: `FieldShell` hides the hint
 * while an error is showing, so listing its id here would point the control at
 * an element that is not in the DOM.
 */
export function describedBy(id: string, hint: unknown, error: unknown): string | undefined {
  const ids = [hint && !error ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean)
  return ids.length > 0 ? ids.join(' ') : undefined
}

export function FieldShell({
  id,
  label,
  hint,
  error,
  required = false,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cx('nn-field', error && 'nn-field--invalid', className)}>
      {label ? (
        <label className="nn-field__label" htmlFor={id}>
          {label}
          {required ? (
            <span className="nn-field__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}
      {children}
      {hint && !error ? (
        <span className="nn-field__hint" id={`${id}-hint`}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span className="nn-field__error" id={`${id}-error`}>
          {error}
        </span>
      ) : null}
    </div>
  )
}
