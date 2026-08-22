import type { ReactNode } from 'react'
import { Section } from '../Section/Section'
import type { SectionProps } from '../Section/Section'
import { Reveal } from '../../components/Reveal/Reveal'

export interface StatItem {
  /** The number itself — "99.99%", "12k", "$4.2M". */
  value: ReactNode
  /** What the number measures. */
  label: ReactNode
  /** Optional clarifying line under the label. */
  description?: ReactNode
}

export interface StatsProps extends Omit<SectionProps, 'children'> {
  /** The figures to display. Three or four reads best. */
  items: StatItem[]
  /** Put each stat on its own card surface. */
  bordered?: boolean
}

/**
 * A row of headline figures.
 *
 * Values render large and tabular so digits line up between columns. Keep the
 * set to three or four — a stats row is a claim, not a report.
 *
 * @example
 * <Stats
 *   tone="muted"
 *   items={[
 *     { value: '99.99%', label: 'Uptime', description: 'Rolling 90 days' },
 *     { value: '12k+', label: 'Teams' },
 *     { value: '<40ms', label: 'p95 latency' },
 *   ]}
 * />
 */
export function Stats({ items, bordered = false, ...sectionProps }: StatsProps) {
  return (
    <Section {...sectionProps}>
      <div className="nn-stats">
        <Reveal stagger>
          {items.map((item, index) => (
            <div
              key={index}
              className={bordered ? 'nn-stats__item nn-stats__item--bordered' : 'nn-stats__item'}
            >
              <div className="nn-stats__value">{item.value}</div>
              <div className="nn-stats__label">{item.label}</div>
              {item.description ? (
                <div className="nn-stats__description">{item.description}</div>
              ) : null}
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}
