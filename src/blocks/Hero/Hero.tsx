import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Container } from '../../components/Container/Container'
import type { ContainerSize } from '../../components/Container/Container'
import { Reveal } from '../../components/Reveal/Reveal'

export type HeroVariant = 'centered' | 'split' | 'gradient'
export type HeroHeight = 'auto' | 'tall' | 'screen'

// `title` is omitted from the HTML attributes because the DOM's own `title`
// is a string tooltip, while ours is the rich headline.
export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Pill above the headline — a launch note, a version, an award. */
  badge?: ReactNode
  /** Small uppercase label above the headline. */
  eyebrow?: ReactNode
  /** The headline. Rendered as the page `h1`. */
  title?: ReactNode
  /** Supporting paragraph. */
  description?: ReactNode
  /** Call-to-action buttons. */
  actions?: ReactNode
  /** Fine print under the actions — "No credit card required". */
  note?: ReactNode
  /**
   * Screenshot, illustration or embed.
   * `split` puts it beside the copy; `centered` and `gradient` put it below.
   */
  media?: ReactNode
  /** Layout. Defaults to `centered`. */
  variant?: HeroVariant
  /** Minimum height. Defaults to `auto`. */
  height?: HeroHeight
  /** Put the media before the copy in `split`. */
  mediaFirst?: boolean
  /** Content width. Defaults to `lg`. */
  size?: ContainerSize
  /** Animate content in on mount. Defaults to `true`. */
  animate?: boolean
}

/**
 * The opening section of a landing page.
 *
 * `centered` stacks everything down the middle with optional media underneath.
 * `split` sets copy beside media in two columns. `gradient` is `centered` on a
 * brand gradient, for a bolder opening.
 *
 * The title renders as `h1`, so use one `Hero` per page.
 *
 * @example
 * <Hero
 *   badge={<Badge tone="primary">v2.0 is out</Badge>}
 *   title="Ship your design system in an afternoon"
 *   description="Components, tokens and page blocks that work together out of the box."
 *   actions={<>
 *     <Button variant="primary" size="lg">Get started</Button>
 *     <Button size="lg">Read the docs</Button>
 *   </>}
 *   note="Free forever for open source."
 * />
 */
export function Hero({
  badge,
  eyebrow,
  title,
  description,
  actions,
  note,
  media,
  variant = 'centered',
  height = 'auto',
  mediaFirst = false,
  size = 'lg',
  animate = true,
  className,
  ...rest
}: HeroProps) {
  const copy = (
    <div className="nn-hero__copy">
      {badge ? <div className="nn-hero__badge">{badge}</div> : null}
      {eyebrow ? <p className="nn-hero__eyebrow">{eyebrow}</p> : null}
      {title ? <h1 className="nn-hero__title">{title}</h1> : null}
      {description ? <p className="nn-hero__description">{description}</p> : null}
      {actions ? <div className="nn-hero__actions">{actions}</div> : null}
      {note ? <p className="nn-hero__note">{note}</p> : null}
    </div>
  )

  const wrappedCopy = animate ? (
    <Reveal animation="slide-up" threshold={0}>
      {copy}
    </Reveal>
  ) : (
    copy
  )

  const wrappedMedia = media ? (
    <div className="nn-hero__media">
      {animate ? (
        <Reveal animation="scale" delay={150} threshold={0}>
          {media}
        </Reveal>
      ) : (
        media
      )}
    </div>
  ) : null

  return (
    <section
      className={cx(
        'nn-hero',
        `nn-hero--${variant}`,
        `nn-hero--height-${height}`,
        mediaFirst && 'nn-hero--media-first',
        className,
      )}
      {...rest}
    >
      {variant === 'gradient' ? <div className="nn-hero__glow" aria-hidden="true" /> : null}
      <Container size={size}>
        <div className="nn-hero__inner">
          {wrappedCopy}
          {wrappedMedia}
        </div>
      </Container>
    </section>
  )
}
