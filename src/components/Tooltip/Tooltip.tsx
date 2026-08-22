import { useId } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export type TooltipPlacement = 'top' | 'bottom' | 'start' | 'end'

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  /** The tooltip text. Keep it to a short phrase. */
  content: ReactNode
  /** Which side the bubble sits on. Defaults to `top`. */
  placement?: TooltipPlacement
  /** The element the tooltip describes. Must be focusable to be reachable by keyboard. */
  children: ReactNode
}

/**
 * A short hint shown on hover and on keyboard focus.
 *
 * Tooltips supplement a control that is already labelled — they are not a
 * substitute for a label, and their content is unreachable on touch devices.
 * Never put essential information or interactive elements inside one.
 *
 * @example
 * <Tooltip content="Export as CSV">
 *   <Button variant="ghost" size="sm" aria-label="Export">↓</Button>
 * </Tooltip>
 */
export function Tooltip({
  content,
  placement = 'top',
  className,
  children,
  ...rest
}: TooltipProps) {
  const tooltipId = useId()

  return (
    <span className={cx('nn-tooltip', `nn-tooltip--${placement}`, className)} {...rest}>
      <span className="nn-tooltip__trigger" aria-describedby={tooltipId}>
        {children}
      </span>
      <span className="nn-tooltip__bubble" id={tooltipId} role="tooltip">
        {content}
      </span>
    </span>
  )
}
