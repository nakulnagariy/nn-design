import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Section } from '../Section/Section'
import type { SectionProps } from '../Section/Section'
import { Grid } from '../../components/Grid/Grid'
import { Reveal } from '../../components/Reveal/Reveal'

export type FeaturesVariant = 'grid' | 'cards' | 'alternating'

export interface FeatureItem {
  /** Leading glyph — an icon component, an emoji, an image. */
  icon?: ReactNode
  title: ReactNode
  description: ReactNode
  /** Optional "Learn more" affordance under the copy. */
  link?: ReactNode
  /** `alternating` only: the screenshot or illustration for this row. */
  media?: ReactNode
}

export interface FeaturesProps extends Omit<SectionProps, 'children'> {
  /** The features to render. */
  items: FeatureItem[]
  /**
   * `grid` is plain columns, `cards` puts each on its own surface, and
   * `alternating` stacks full-width rows flipping media side to side.
   * Defaults to `grid`.
   */
  variant?: FeaturesVariant
  /** Columns for `grid` and `cards`. Defaults to `3`. */
  columns?: 2 | 3 | 4
}

/**
 * A feature list — the "what you get" section of a landing page.
 *
 * `grid` and `cards` suit short blurbs; `alternating` gives each feature a full
 * row with its own media, which suits three or four substantial features.
 *
 * @example
 * <Features
 *   eyebrow="Features"
 *   title="Everything you need"
 *   variant="cards"
 *   items={[
 *     { icon: '⚡', title: 'Fast', description: 'Ships in milliseconds.' },
 *     { icon: '🔒', title: 'Secure', description: 'SOC 2 Type II certified.' },
 *   ]}
 * />
 */
export function Features({ items, variant = 'grid', columns = 3, ...sectionProps }: FeaturesProps) {
  if (variant === 'alternating') {
    return (
      <Section {...sectionProps}>
        <div className="nn-features__rows">
          {items.map((item, index) => (
            <Reveal key={index} animation={index % 2 === 0 ? 'slide-right' : 'slide-left'}>
              <div className={cx('nn-features__row', index % 2 === 1 && 'is-flipped')}>
                <div className="nn-features__row-copy">
                  {item.icon ? <div className="nn-features__icon">{item.icon}</div> : null}
                  <h3 className="nn-features__title">{item.title}</h3>
                  <p className="nn-features__description">{item.description}</p>
                  {item.link ? <div className="nn-features__link">{item.link}</div> : null}
                </div>
                {item.media ? <div className="nn-features__row-media">{item.media}</div> : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    )
  }

  return (
    <Section {...sectionProps}>
      <Grid columns={columns} gap="lg">
        <Reveal stagger>
          {items.map((item, index) => (
            <div key={index} className={cx('nn-features__item', variant === 'cards' && 'nn-features__item--card')}>
              {item.icon ? <div className="nn-features__icon">{item.icon}</div> : null}
              <h3 className="nn-features__title">{item.title}</h3>
              <p className="nn-features__description">{item.description}</p>
              {item.link ? <div className="nn-features__link">{item.link}</div> : null}
            </div>
          ))}
        </Reveal>
      </Grid>
    </Section>
  )
}
