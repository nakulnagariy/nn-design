import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export type DropdownAlign = 'start' | 'end'

export interface DropdownItem {
  /** Stable identifier. */
  id: string
  /** Row content. */
  label: ReactNode
  /** Leading element, typically an icon. */
  icon?: ReactNode
  /** Renders as a link instead of a button. */
  href?: string
  /** Called when the row is activated. The menu closes first. */
  onSelect?: () => void
  /** Draws a rule above this row. */
  separated?: boolean
  /** Tints the row for destructive actions. */
  destructive?: boolean
  disabled?: boolean
}

export interface DropdownProps {
  /** The element that opens the menu. Must be focusable. */
  trigger: ReactNode
  /** Menu rows. */
  items: DropdownItem[]
  /** Which edge the menu aligns to. Defaults to `end`. */
  align?: DropdownAlign
  /** Accessible name for the menu. */
  label?: string
  className?: string
}

/**
 * A menu anchored to a trigger.
 *
 * Closes on outside click, on Escape, and after a row is selected. Arrow keys
 * move between rows once the menu is open.
 *
 * Positioned with plain CSS relative to the trigger, so it can be clipped by an
 * ancestor with `overflow: hidden` — the usual fix is to not clip the header
 * that contains it.
 *
 * @example
 * <Dropdown
 *   label="Account"
 *   trigger={<Avatar name="Ada Lovelace" size="sm" />}
 *   items={[
 *     { id: 'settings', label: 'Settings', href: '/settings' },
 *     { id: 'signout', label: 'Sign out', destructive: true, separated: true, onSelect: signOut },
 *   ]}
 * />
 */
export function Dropdown({ trigger, items, align = 'end', label, className }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([])
  const menuId = useId()

  const close = useCallback(
    (returnFocus = true) => {
      setOpen(false)
      if (returnFocus) triggerRef.current?.focus()
    },
    [],
  )

  // Outside click. Bound on the document only while open, so a page full of
  // dropdowns does not accumulate listeners.
  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  const focusItem = useCallback(
    (index: number) => {
      const enabled = items
        .map((item, i) => (item.disabled ? null : i))
        .filter((i): i is number => i !== null)
      if (enabled.length === 0) return
      const target = enabled[((index % enabled.length) + enabled.length) % enabled.length]
      if (target !== undefined) itemRefs.current[target]?.focus()
    },
    [items],
  )

  const handleMenuKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }

      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
      event.preventDefault()

      const current = itemRefs.current.findIndex((node) => node === document.activeElement)
      const enabled = items
        .map((item, i) => (item.disabled ? null : i))
        .filter((i): i is number => i !== null)
      const position = enabled.indexOf(current)

      focusItem(position + (event.key === 'ArrowDown' ? 1 : -1))
    },
    [close, focusItem, items],
  )

  const handleTriggerKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setOpen(true)
        // Wait for the menu to mount before moving focus into it.
        requestAnimationFrame(() => focusItem(0))
      }
    },
    [focusItem],
  )

  return (
    <div ref={rootRef} className={cx('nn-dropdown', className)}>
      <button
        ref={triggerRef}
        type="button"
        className="nn-dropdown__trigger nn-focusable"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleTriggerKeyDown}
      >
        {trigger}
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className={cx('nn-dropdown__menu', `nn-dropdown__menu--${align}`)}
          onKeyDown={handleMenuKeyDown}
        >
          {items.map((item, index) => {
            const className = cx(
              'nn-dropdown__item',
              'nn-focusable',
              item.destructive && 'nn-dropdown__item--destructive',
              item.separated && 'nn-dropdown__item--separated',
            )

            const content = (
              <>
                {item.icon ? (
                  <span className="nn-dropdown__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                ) : null}
                <span className="nn-dropdown__label">{item.label}</span>
              </>
            )

            const activate = () => {
              close(false)
              item.onSelect?.()
            }

            return item.href && !item.disabled ? (
              <a
                key={item.id}
                ref={(node) => {
                  itemRefs.current[index] = node
                }}
                role="menuitem"
                href={item.href}
                className={className}
                onClick={activate}
              >
                {content}
              </a>
            ) : (
              <button
                key={item.id}
                ref={(node) => {
                  itemRefs.current[index] = node
                }}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={className}
                onClick={activate}
              >
                {content}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
