import { useCallback, useId, useState } from 'react'
import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'

export interface AccordionItem {
  /** Stable identifier. */
  id: string
  /** Always-visible summary row. */
  title: ReactNode
  /** Revealed when the item is open. */
  content: ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  /** Items, in display order. */
  items: AccordionItem[]
  /**
   * Allow several items to be open at once. Defaults to `false`, which closes
   * the previously open item whenever a new one is opened.
   */
  multiple?: boolean
  /** Ids open on first render. */
  defaultOpen?: string[]
  /** Open item ids for controlled use. Pair with `onChange`. */
  open?: string[]
  /** Called with the full list of open ids after every toggle. */
  onChange?: (openIds: string[]) => void
  /** Draws a border and dividers around the group. Defaults to `true`. */
  bordered?: boolean
  className?: string
}

/**
 * A vertical list of expandable sections.
 *
 * Built from real `button` headers with `aria-expanded` and `aria-controls`,
 * so the whole group is keyboard- and screen-reader-navigable. The usual home
 * for this is an FAQ.
 *
 * @example
 * <Accordion
 *   items={[
 *     { id: 'refund', title: 'Can I get a refund?', content: <Text>Within 30 days, yes.</Text> },
 *     { id: 'seats', title: 'How are seats counted?', content: <Text>Per active user.</Text> },
 *   ]}
 * />
 */
export function Accordion({
  items,
  multiple = false,
  defaultOpen,
  open,
  onChange,
  bordered = true,
  className,
}: AccordionProps) {
  const baseId = useId()
  const [internal, setInternal] = useState<string[]>(defaultOpen ?? [])

  const openIds = open ?? internal

  const toggle = useCallback(
    (id: string) => {
      const isOpen = openIds.includes(id)
      const next = isOpen
        ? openIds.filter((openId) => openId !== id)
        : multiple
          ? [...openIds, id]
          : [id]

      if (open === undefined) setInternal(next)
      onChange?.(next)
    },
    [multiple, onChange, open, openIds],
  )

  return (
    <div className={cx('nn-accordion', bordered && 'nn-accordion--bordered', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id)
        return (
          <div key={item.id} className={cx('nn-accordion__item', isOpen && 'is-open')}>
            <h3 className="nn-accordion__heading">
              <button
                type="button"
                id={`${baseId}-trigger-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${item.id}`}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
                className="nn-accordion__trigger nn-focusable"
              >
                <span className="nn-accordion__title">{item.title}</span>
                <span className="nn-accordion__chevron" aria-hidden="true" />
              </button>
            </h3>
            <div
              role="region"
              id={`${baseId}-panel-${item.id}`}
              aria-labelledby={`${baseId}-trigger-${item.id}`}
              className="nn-accordion__panel"
              hidden={!isOpen}
            >
              <div className="nn-accordion__content">{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
