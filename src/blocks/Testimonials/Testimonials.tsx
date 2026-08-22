import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Section } from '../Section/Section'
import type { SectionProps } from '../Section/Section'
import { Grid } from '../../components/Grid/Grid'
import { Reveal } from '../../components/Reveal/Reveal'
import { Avatar } from '../../components/Avatar/Avatar'

export type TestimonialsVariant = 'grid' | 'feature'

export interface Testimonial {
  /** The quote itself, without surrounding quotation marks. */
  quote: ReactNode
  /** Who said it. */
  author: string
  /** Their job title. */
  role?: ReactNode
  /** Their company. */
  company?: ReactNode
  /** Avatar image URL. Falls back to the author's initials. */
  avatarSrc?: string
  /** Optional star rating, 1–5. */
  rating?: number
}

export interface TestimonialsProps extends Omit<SectionProps, 'children'> {
  /** The quotes. */
  items: Testimonial[]
  /**
   * `grid` shows every quote as a card. `feature` renders the first quote large
   * and the rest beneath it. Defaults to `grid`.
   */
  variant?: TestimonialsVariant
  /** Columns for `grid`. Defaults to `3`. */
  columns?: 2 | 3
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <div className="nn-testimonial__rating" aria-label={`${rounded} out of 5 stars`}>
      <span aria-hidden="true">{'★'.repeat(rounded)}</span>
      <span aria-hidden="true" className="nn-testimonial__rating-empty">
        {'★'.repeat(5 - rounded)}
      </span>
    </div>
  )
}

function Attribution({ item }: { item: Testimonial }) {
  return (
    <figcaption className="nn-testimonial__author">
      <Avatar name={item.author} src={item.avatarSrc} size="sm" />
      <div className="nn-testimonial__author-text">
        <span className="nn-testimonial__author-name">{item.author}</span>
        {item.role || item.company ? (
          <span className="nn-testimonial__author-meta">
            {item.role}
            {item.role && item.company ? ', ' : null}
            {item.company}
          </span>
        ) : null}
      </div>
    </figcaption>
  )
}

/**
 * Customer quotes.
 *
 * Each quote renders as a `figure` with its attribution in a `figcaption`, so
 * the pairing survives for screen readers. Ratings are announced as text
 * rather than as a row of star glyphs.
 *
 * @example
 * <Testimonials
 *   title="Loved by teams"
 *   items={[{ quote: 'It replaced three tools.', author: 'Ada Lovelace', role: 'CTO', company: 'Acme', rating: 5 }]}
 * />
 */
export function Testimonials({
  items,
  variant = 'grid',
  columns = 3,
  ...sectionProps
}: TestimonialsProps) {
  if (variant === 'feature' && items.length > 0) {
    const [lead, ...rest] = items
    return (
      <Section {...sectionProps}>
        <Reveal>
          <figure className="nn-testimonial nn-testimonial--lead">
            {lead!.rating ? <Stars rating={lead!.rating} /> : null}
            <blockquote className="nn-testimonial__quote">{lead!.quote}</blockquote>
            <Attribution item={lead!} />
          </figure>
        </Reveal>

        {rest.length > 0 ? (
          <Grid columns={rest.length >= 3 ? 3 : 2} gap="lg" className="nn-testimonials__rest">
            <Reveal stagger>
              {rest.map((item, index) => (
                <figure key={index} className="nn-testimonial">
                  {item.rating ? <Stars rating={item.rating} /> : null}
                  <blockquote className="nn-testimonial__quote">{item.quote}</blockquote>
                  <Attribution item={item} />
                </figure>
              ))}
            </Reveal>
          </Grid>
        ) : null}
      </Section>
    )
  }

  return (
    <Section {...sectionProps}>
      <Grid columns={columns} gap="lg">
        <Reveal stagger>
          {items.map((item, index) => (
            <figure key={index} className={cx('nn-testimonial')}>
              {item.rating ? <Stars rating={item.rating} /> : null}
              <blockquote className="nn-testimonial__quote">{item.quote}</blockquote>
              <Attribution item={item} />
            </figure>
          ))}
        </Reveal>
      </Grid>
    </Section>
  )
}
