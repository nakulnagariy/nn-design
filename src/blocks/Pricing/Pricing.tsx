import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Section } from '../Section/Section'
import type { SectionProps } from '../Section/Section'
import { Reveal } from '../../components/Reveal/Reveal'

export interface PricingTier {
  /** Plan name — "Starter", "Pro", "Enterprise". */
  name: ReactNode
  /** Headline price. Pass a string so you control currency and formatting. */
  price: ReactNode
  /** Billing unit shown next to the price — "/mo", "per seat". */
  period?: ReactNode
  /** One line on who the plan is for. */
  description?: ReactNode
  /** What the plan includes. Rendered as a ticked list. */
  features?: ReactNode[]
  /** The plan's button. */
  action?: ReactNode
  /** Lifts the tier visually as the recommended plan. */
  featured?: boolean
  /** Pill on a featured tier — "Most popular". */
  badge?: ReactNode
}

export interface PricingProps extends Omit<SectionProps, 'children'> {
  /** The plans, cheapest first. */
  tiers: PricingTier[]
  /** Rendered between the heading and the tiers — a monthly/annual switch. */
  toggle?: ReactNode
  /** Small print under the tiers. */
  note?: ReactNode
}

/**
 * A pricing table.
 *
 * Mark exactly one tier `featured` — it gets the accent border, a subtle lift
 * and room for a "Most popular" badge. Prices are passed as formatted strings
 * so currency, locale and billing period stay yours to decide.
 *
 * @example
 * <Pricing
 *   title="Simple pricing"
 *   tiers={[
 *     { name: 'Starter', price: '$0', period: '/mo', features: ['3 projects'], action: <Button fullWidth>Start</Button> },
 *     { name: 'Pro', price: '$29', period: '/mo', featured: true, badge: 'Most popular',
 *       features: ['Unlimited projects', 'SSO'], action: <Button variant="primary" fullWidth>Upgrade</Button> },
 *   ]}
 * />
 */
export function Pricing({ tiers, toggle, note, ...sectionProps }: PricingProps) {
  return (
    <Section {...sectionProps}>
      {toggle ? <div className="nn-pricing__toggle">{toggle}</div> : null}

      <div className="nn-pricing__grid" data-count={tiers.length}>
        <Reveal stagger>
          {tiers.map((tier, index) => (
            <div key={index} className={cx('nn-pricing__tier', tier.featured && 'is-featured')}>
              {tier.badge ? <div className="nn-pricing__badge">{tier.badge}</div> : null}

              <div className="nn-pricing__head">
                <h3 className="nn-pricing__name">{tier.name}</h3>
                {tier.description ? (
                  <p className="nn-pricing__description">{tier.description}</p>
                ) : null}
              </div>

              <p className="nn-pricing__price">
                <span className="nn-pricing__amount">{tier.price}</span>
                {tier.period ? <span className="nn-pricing__period">{tier.period}</span> : null}
              </p>

              {tier.action ? <div className="nn-pricing__action">{tier.action}</div> : null}

              {tier.features && tier.features.length > 0 ? (
                <ul className="nn-pricing__features">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="nn-pricing__feature">
                      <span className="nn-pricing__check" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </Reveal>
      </div>

      {note ? <p className="nn-pricing__note">{note}</p> : null}
    </Section>
  )
}
