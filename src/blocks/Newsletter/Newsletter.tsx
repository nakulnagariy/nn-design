import { useId, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Section } from '../Section/Section'
import type { SectionProps } from '../Section/Section'
import { Button } from '../../components/Button/Button'
import { Reveal } from '../../components/Reveal/Reveal'

export type NewsletterVariant = 'inline' | 'card'

export interface NewsletterProps extends Omit<SectionProps, 'children' | 'onSubmit'> {
  /** Placeholder for the email field. Defaults to `"you@company.com"`. */
  placeholder?: string
  /** Submit button label. Defaults to `"Subscribe"`. */
  action?: ReactNode
  /** Fine print under the form — consent, frequency, unsubscribe note. */
  note?: ReactNode
  /**
   * Called with the entered address on submit. Return a promise and the button
   * shows a spinner until it settles; throw and the message is shown as an error.
   */
  onSubmit?: (email: string) => void | Promise<void>
  /** Message shown after a successful submit. */
  successMessage?: ReactNode
  /** `card` floats the form on a panel. Defaults to `inline`. */
  variant?: NewsletterVariant
  /** Accessible label for the email field. Defaults to `"Email address"`. */
  fieldLabel?: string
}

/**
 * An email capture form.
 *
 * Handles its own submitting / success / error states, so a parent only
 * supplies `onSubmit`. The field is labelled for screen readers even though the
 * label is visually hidden, and status changes are announced politely.
 *
 * @example
 * <Newsletter
 *   title="Stay in the loop"
 *   description="Product updates, roughly monthly."
 *   onSubmit={async (email) => { await subscribe(email) }}
 *   note="Unsubscribe any time."
 * />
 */
export function Newsletter({
  placeholder = 'you@company.com',
  action = 'Subscribe',
  note,
  onSubmit,
  successMessage = "You're on the list — check your inbox to confirm.",
  variant = 'inline',
  fieldLabel = 'Email address',
  size = 'md',
  ...sectionProps
}: NewsletterProps) {
  const inputId = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')
    setError(null)

    try {
      await onSubmit?.(email)
      setStatus('done')
      setEmail('')
    } catch (cause) {
      setStatus('error')
      setError(cause instanceof Error ? cause.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <Section size={size} {...sectionProps}>
      <Reveal>
        <div className={cx('nn-newsletter', `nn-newsletter--${variant}`)}>
          {status === 'done' ? (
            <p className="nn-newsletter__success" role="status">
              {successMessage}
            </p>
          ) : (
            <form className="nn-newsletter__form" onSubmit={handleSubmit} noValidate>
              <label className="nn-sr-only" htmlFor={inputId}>
                {fieldLabel}
              </label>
              <input
                id={inputId}
                type="email"
                required
                autoComplete="email"
                className="nn-control nn-control--md nn-newsletter__input"
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={status === 'error' ? true : undefined}
                aria-describedby={error ? `${inputId}-error` : undefined}
              />
              <Button type="submit" variant="primary" loading={status === 'submitting'}>
                {action}
              </Button>
            </form>
          )}

          {error ? (
            <p className="nn-newsletter__error" id={`${inputId}-error`} role="alert">
              {error}
            </p>
          ) : null}

          {note && status !== 'done' ? <p className="nn-newsletter__note">{note}</p> : null}
        </div>
      </Reveal>
    </Section>
  )
}
