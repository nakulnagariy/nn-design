import { useCallback, useId, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export type TabsVariant = 'underline' | 'pill'

export interface TabItem {
  /** Stable identifier, used as the selected value. */
  id: string
  /** Tab label. */
  label: ReactNode
  /** Panel content shown when this tab is selected. */
  content?: ReactNode
  /** Trailing element in the tab, typically a `Badge` with a count. */
  badge?: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  /** Tabs, in display order. */
  items: TabItem[]
  /** Selected tab id for controlled use. Pair with `onChange`. */
  value?: string
  /** Initially selected tab id for uncontrolled use. Defaults to the first enabled tab. */
  defaultValue?: string
  /** Called with the newly selected tab id. */
  onChange?: (id: string) => void
  /** Visual style. Defaults to `underline`. */
  variant?: TabsVariant
  /** Stretch tabs to fill the available width. */
  fullWidth?: boolean
  /** Accessible name for the tab list. */
  'aria-label'?: string
  className?: string
}

/**
 * Tabbed navigation between panels of related content.
 *
 * Works controlled (`value` + `onChange`) or uncontrolled (`defaultValue`).
 * Implements the ARIA tabs pattern including arrow-key navigation, plus
 * Home/End to jump to the first or last tab.
 *
 * @example
 * <Tabs
 *   aria-label="Account settings"
 *   items={[
 *     { id: 'profile', label: 'Profile', content: <ProfileForm /> },
 *     { id: 'billing', label: 'Billing', badge: <Badge tone="danger" size="sm">1</Badge>, content: <Billing /> },
 *   ]}
 * />
 */
export function Tabs({
  items,
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  fullWidth = false,
  className,
  'aria-label': ariaLabel,
}: TabsProps) {
  const baseId = useId()
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const firstEnabled = items.find((item) => !item.disabled)?.id ?? items[0]?.id ?? ''
  const [internal, setInternal] = useState(defaultValue ?? firstEnabled)

  const selected = value ?? internal

  const select = useCallback(
    (id: string) => {
      if (value === undefined) setInternal(id)
      onChange?.(id)
    },
    [onChange, value],
  )

  // Roving focus: arrows move between enabled tabs and activate as they go.
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      const enabled = items.filter((item) => !item.disabled)
      if (enabled.length === 0) return

      const currentIndex = enabled.findIndex((item) => item.id === selected)
      let nextIndex: number | null = null

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          nextIndex = (currentIndex + 1) % enabled.length
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          nextIndex = (currentIndex - 1 + enabled.length) % enabled.length
          break
        case 'Home':
          nextIndex = 0
          break
        case 'End':
          nextIndex = enabled.length - 1
          break
        default:
          return
      }

      event.preventDefault()
      const next = enabled[nextIndex]
      if (!next) return
      select(next.id)
      tabRefs.current[next.id]?.focus()
    },
    [items, select, selected],
  )

  const activePanel = items.find((item) => item.id === selected)

  return (
    <div className={cx('nn-tabs', `nn-tabs--${variant}`, className)}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={cx('nn-tabs__list', fullWidth && 'nn-tabs__list--full')}
      >
        {items.map((item) => {
          const isSelected = item.id === selected
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[item.id] = node
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-controls={`${baseId}-panel-${item.id}`}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              className={cx('nn-tabs__tab', 'nn-focusable', isSelected && 'is-selected')}
              onClick={() => select(item.id)}
              onKeyDown={handleKeyDown}
            >
              <span className="nn-tabs__label">{item.label}</span>
              {item.badge ? <span className="nn-tabs__badge">{item.badge}</span> : null}
            </button>
          )
        })}
      </div>

      {activePanel?.content ? (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${activePanel.id}`}
          aria-labelledby={`${baseId}-tab-${activePanel.id}`}
          tabIndex={0}
          className="nn-tabs__panel nn-focusable"
        >
          {activePanel.content}
        </div>
      ) : null}
    </div>
  )
}
