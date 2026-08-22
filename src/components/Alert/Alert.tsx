import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export type AlertTone = 'info' | 'success' | 'warning' | 'danger'

// `title` is omitted from the HTML attributes because the DOM's own `title`
// is a string tooltip, while ours is rich heading content.
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Semantic colour and default icon. Defaults to `info`. */
  tone?: AlertTone
  /** Bold first line. */
  title?: ReactNode
  /** Replaces the default glyph for the tone. Pass `null` to hide it. */
  icon?: ReactNode
  /** Renders a close button and calls this when it is activated. */
  onDismiss?: () => void
  /** Accessible label for the dismiss button. Defaults to `"Dismiss"`. */
  dismissLabel?: string
  /** Body copy. */
  children?: ReactNode
}

const DEFAULT_ICON: Record<AlertTone, string> = {
  info: 'i',
  success: '✓',
  warning: '!',
  danger: '!',
}

/**
 * An inline message calling out the status of the surrounding content.
 *
 * `danger` and `warning` alerts announce themselves assertively to screen
 * readers; `info` and `success` announce politely. Reach for `Alert` for
 * messages tied to a region of the page — not for transient toasts.
 *
 * @example
 * <Alert tone="warning" title="Billing needs attention">
 *   Your card ending 4242 expires next month.
 * </Alert>
 *
 * @example
 * <Alert tone="success" onDismiss={() => setShown(false)}>
 *   Settings saved.
 * </Alert>
 */
export function Alert({
  tone = 'info',
  title,
  icon,
  onDismiss,
  dismissLabel = 'Dismiss',
  className,
  children,
  ...rest
}: AlertProps) {
  const assertive = tone === 'danger' || tone === 'warning'
  const glyph = icon === undefined ? DEFAULT_ICON[tone] : icon

  return (
    <div
      role={assertive ? 'alert' : 'status'}
      aria-live={assertive ? 'assertive' : 'polite'}
      className={cx('nn-alert', `nn-alert--${tone}`, className)}
      {...rest}
    >
      {glyph !== null ? (
        <span className="nn-alert__icon" aria-hidden="true">
          {glyph}
        </span>
      ) : null}
      <div className="nn-alert__body">
        {title ? <p className="nn-alert__title">{title}</p> : null}
        {children ? <div className="nn-alert__content">{children}</div> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          className="nn-alert__dismiss nn-focusable"
          onClick={onDismiss}
          aria-label={dismissLabel}
        >
          <span aria-hidden="true">×</span>
        </button>
      ) : null}
    </div>
  )
}
