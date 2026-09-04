import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Dropdown, type DropdownItem } from './Dropdown'

const items: DropdownItem[] = [
  { id: 'settings', label: 'Settings' },
  { id: 'billing', label: 'Billing' },
  { id: 'signout', label: 'Sign out', destructive: true, separated: true },
]

describe('Dropdown', () => {
  it('is collapsed initially with aria-expanded=false', () => {
    render(<Dropdown label="Account" trigger="Open" items={items} />)
    expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens on trigger click and exposes a labelled menu', async () => {
    render(<Dropdown label="Account" trigger="Open" items={items} />)
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    const menu = screen.getByRole('menu', { name: 'Account' })
    expect(menu).toBeInTheDocument()
    expect(screen.getAllByRole('menuitem')).toHaveLength(3)
  })

  it('runs onSelect and closes after a row is chosen', async () => {
    const onSelect = vi.fn()
    render(
      <Dropdown
        label="Account"
        trigger="Open"
        items={[{ id: 'settings', label: 'Settings', onSelect }]}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await userEvent.click(screen.getByRole('menuitem', { name: 'Settings' }))
    expect(onSelect).toHaveBeenCalledOnce()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens with ArrowDown, moving focus into the menu, and closes on Escape', async () => {
    render(<Dropdown label="Account" trigger="Open" items={items} />)
    screen.getByRole('button', { name: 'Open' }).focus()
    await userEvent.keyboard('{ArrowDown}')
    await waitFor(() => expect(screen.getAllByRole('menuitem')[0]).toHaveFocus())
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open' })).toHaveFocus()
  })

  it('closes on an outside click', async () => {
    render(
      <div>
        <Dropdown label="Account" trigger="Open" items={items} />
        <button type="button">Outside</button>
      </div>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await userEvent.click(screen.getByRole('button', { name: 'Outside' }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('has no axe violations when open', async () => {
    const { container } = render(<Dropdown label="Account" trigger="Open" items={items} />)
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(await axe(container)).toHaveNoViolations()
  })
})
