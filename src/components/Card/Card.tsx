import { forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export type CardPadding = 'none' | 'sm' | 'md' | 'lg'
export type CardVariant = 'outlined' | 'elevated' | 'filled'

// `title` is omitted from the HTML attributes because the DOM's own `title`
// is a string tooltip, while ours is rich heading content.
export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Surface treatment. Defaults to `outlined`. */
  variant?: CardVariant
  /** Inner padding. Defaults to `md`. Use `none` when the body is a table or image. */
  padding?: CardPadding
  /** Bold heading at the top of the card. */
  title?: ReactNode
  /** Secondary line under the title. */
  description?: ReactNode
  /** Content aligned to the top-right — typically a `Badge` or an icon button. */
  action?: ReactNode
  /** Content in a bottom section, separated by a rule. */
  footer?: ReactNode
  /**
   * Adds hover and focus affordances for cards that act as a link or button.
   * Purely visual — you still supply the click handling and semantics
   * (`as="a"` with an `href`, or a nested link).
   */
  interactive?: boolean
  /** Card body. */
  children?: ReactNode
}

/**
 * A surface that groups related content.
 *
 * The `title` / `description` / `action` / `footer` props build the standard
 * card anatomy so most cards need no internal layout markup; `children` is the
 * free-form body between the header and footer.
 *
 * @example
 * <Card title="Monthly revenue" description="Compared to last month" action={<Badge tone="success">+12%</Badge>}>
 *   <Heading level={3} size="h1">$48,290</Heading>
 * </Card>
 *
 * @example
 * <Card padding="none" title="Recent signups">
 *   <Table columns={columns} data={rows} />
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = 'outlined',
    padding = 'md',
    title,
    description,
    action,
    footer,
    interactive = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const hasHeader = Boolean(title || description || action)

  return (
    <div
      ref={ref}
      className={cx(
        'nn-card',
        `nn-card--${variant}`,
        `nn-card--pad-${padding}`,
        interactive && 'nn-card--interactive',
        className,
      )}
      {...rest}
    >
      {hasHeader ? (
        <div className="nn-card__header">
          <div className="nn-card__heading">
            {title ? <h3 className="nn-card__title">{title}</h3> : null}
            {description ? <p className="nn-card__description">{description}</p> : null}
          </div>
          {action ? <div className="nn-card__action">{action}</div> : null}
        </div>
      ) : null}

      {children ? <div className="nn-card__body">{children}</div> : null}
      {footer ? <div className="nn-card__footer">{footer}</div> : null}
    </div>
  )
})
