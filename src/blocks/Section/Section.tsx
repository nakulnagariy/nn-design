import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Container } from '../../components/Container/Container'
import type { ContainerSize } from '../../components/Container/Container'
import { Reveal } from '../../components/Reveal/Reveal'

export type SectionTone = 'default' | 'muted' | 'inverted' | 'primary' | 'gradient'
export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg'
export type SectionAlign = 'start' | 'center'

// `title` is omitted from the HTML attributes because the DOM's own `title`
// is a string tooltip, while ours is rich heading content.
export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Element to render. Defaults to `section`. */
  as?: ElementType
  /** Background treatment. Defaults to `default`. */
  tone?: SectionTone
  /** Vertical padding. Defaults to `lg`. */
  spacing?: SectionSpacing
  /** Content width. Defaults to `lg`. */
  size?: ContainerSize
  /** Small label above the title. */
  eyebrow?: ReactNode
  /** Section title. */
  title?: ReactNode
  /** Supporting copy under the title. */
  description?: ReactNode
  /** Alignment of the heading group. Defaults to `center`. */
  align?: SectionAlign
  /** Content rendered under the heading group. */
  children?: ReactNode
  /** Animate the heading group in on scroll. Defaults to `true`. */
  animate?: boolean
}

/**
 * The shell every page section is built from.
 *
 * Owns the vertical rhythm, background tone and content width so sections stack
 * consistently down a page, and renders the standard eyebrow / title /
 * description heading group. Every other block in this library composes it.
 *
 * @example
 * <Section
 *   eyebrow="Why us"
 *   title="Built for teams that ship"
 *   description="Everything you need, nothing you don't."
 *   tone="muted"
 * >
 *   <Grid columns={3}>…</Grid>
 * </Section>
 */
export function Section({
  as: Component = 'section',
  tone = 'default',
  spacing = 'lg',
  size = 'lg',
  eyebrow,
  title,
  description,
  align = 'center',
  animate = true,
  className,
  children,
  ...rest
}: SectionProps) {
  const hasHeading = Boolean(eyebrow || title || description)

  const heading = hasHeading ? (
    <div className={cx('nn-section__heading', `nn-section__heading--${align}`)}>
      {eyebrow ? <p className="nn-section__eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="nn-section__title">{title}</h2> : null}
      {description ? <p className="nn-section__description">{description}</p> : null}
    </div>
  ) : null

  return (
    <Component
      className={cx('nn-section', `nn-section--${tone}`, `nn-section--space-${spacing}`, className)}
      {...rest}
    >
      <Container size={size}>
        {heading ? animate ? <Reveal>{heading}</Reveal> : heading : null}
        {children ? (
          <div className={cx('nn-section__body', hasHeading && 'has-heading')}>{children}</div>
        ) : null}
      </Container>
    </Component>
  )
}
