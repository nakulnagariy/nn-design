import type { ReactNode } from 'react'
import { Section } from '../Section/Section'
import type { SectionProps } from '../Section/Section'
import { Accordion } from '../../components/Accordion/Accordion'
import { Reveal } from '../../components/Reveal/Reveal'

export interface FAQItem {
  question: ReactNode
  answer: ReactNode
}

export interface FAQProps extends Omit<SectionProps, 'children'> {
  /** The questions and answers. */
  items: FAQItem[]
  /** Allow several answers open at once. */
  multiple?: boolean
  /** Index of the answer open on first render. Defaults to none. */
  defaultOpenIndex?: number
  /** Rendered under the list — a link to support, a contact prompt. */
  footer?: ReactNode
}

/**
 * A frequently-asked-questions section.
 *
 * Wraps `Accordion` with the section chrome and a narrower content width, since
 * question text reads better at a shorter measure than a full-width section.
 *
 * @example
 * <FAQ
 *   title="Questions"
 *   items={[
 *     { question: 'Can I cancel anytime?', answer: 'Yes — your plan runs to the end of the period.' },
 *   ]}
 * />
 */
export function FAQ({
  items,
  multiple = false,
  defaultOpenIndex,
  footer,
  size = 'md',
  ...sectionProps
}: FAQProps) {
  return (
    <Section size={size} {...sectionProps}>
      <Reveal>
        <Accordion
          multiple={multiple}
          defaultOpen={defaultOpenIndex === undefined ? undefined : [`faq-${defaultOpenIndex}`]}
          items={items.map((item, index) => ({
            id: `faq-${index}`,
            title: item.question,
            content: item.answer,
          }))}
        />
      </Reveal>
      {footer ? <div className="nn-faq__footer">{footer}</div> : null}
    </Section>
  )
}
