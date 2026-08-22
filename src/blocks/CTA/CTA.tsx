import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Container } from '../../components/Container/Container'
import type { ContainerSize } from '../../components/Container/Container'
import { Reveal } from '../../components/Reveal/Reveal'

export type CTAVariant = 'plain' | 'boxed' | 'split'
export type CTATone = 'default' | 'muted' | 'primary' | 'inverted' | 'gradient'

// `title` is omitted from the HTML attributes because the DOM's own `title`
// is a string tooltip, while ours is rich heading content.
export interface CTAProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Small label above the title. */
  eyebrow?: ReactNode
  /** The ask. */
  title?: ReactNode
  /** Supporting line under the title. */
  description?: ReactNode
  /** The buttons. */
  actions?: ReactNode
  /** Fine print under the actions. */
  note?: ReactNode
  /**
   * `plain` is a full-width band, `boxed` floats a rounded panel inside the
   * section, and `split` puts the copy and actions on one row.
   * Defaults to `boxed`.
   */
  variant?: CTAVariant
  /** Colour treatment. Defaults to `gradient`. */
  tone?: CTATone
  /** Content width. Defaults to `lg`. */
  size?: ContainerSize
  /** Animate in on scroll. Defaults to `true`. */
  animate?: boolean
}

/**
 * The closing ask on a page.
 *
 * `boxed` on a `gradient` tone is the standard end-of-landing-page treatment;
 * `split` is the quieter inline version for the bottom of a docs or pricing
 * page.
 *
 * @example
 * <CTA
 *   title="Start building today"
 *   description="Free for open source. No credit card required."
 *   actions={<Button variant="secondary" size="lg">Get started</Button>}
 * />
 */
export function CTA({
  eyebrow,
  title,
  description,
  actions,
  note,
  variant = 'boxed',
  tone = 'gradient',
  size = 'lg',
  animate = true,
  className,
  ...rest
}: CTAProps) {
  const panel = (
    <div className={cx('nn-cta__panel', `nn-cta__panel--${tone}`)}>
      <div className="nn-cta__copy">
        {eyebrow ? <p className="nn-cta__eyebrow">{eyebrow}</p> : null}
        {title ? <h2 className="nn-cta__title">{title}</h2> : null}
        {description ? <p className="nn-cta__description">{description}</p> : null}
      </div>
      {actions || note ? (
        <div className="nn-cta__tail">
          {actions ? <div className="nn-cta__actions">{actions}</div> : null}
          {note ? <p className="nn-cta__note">{note}</p> : null}
        </div>
      ) : null}
    </div>
  )

  return (
    <section className={cx('nn-cta', `nn-cta--${variant}`, className)} {...rest}>
      <Container size={size}>
        {animate ? <Reveal animation="scale">{panel}</Reveal> : panel}
      </Container>
    </section>
  )
}
