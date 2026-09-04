import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Tabs, type TabItem } from './Tabs'

const items: TabItem[] = [
  { id: 'profile', label: 'Profile', content: 'Profile panel' },
  { id: 'billing', label: 'Billing', content: 'Billing panel' },
  { id: 'team', label: 'Team', content: 'Team panel', disabled: true },
]

describe('Tabs', () => {
  it('selects the first enabled tab by default and shows its panel', () => {
    render(<Tabs aria-label="Settings" items={items} />)
    expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Profile panel')
  })

  it('uses a roving tabindex — only the selected tab is in the tab order', () => {
    render(<Tabs aria-label="Settings" items={items} />)
    expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveAttribute('tabindex', '-1')
  })

  it('activates on click and calls onChange', async () => {
    const onChange = vi.fn()
    render(<Tabs aria-label="Settings" items={items} onChange={onChange} />)
    await userEvent.click(screen.getByRole('tab', { name: 'Billing' }))
    expect(onChange).toHaveBeenCalledWith('billing')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Billing panel')
  })

  it('moves between tabs with arrow keys and wraps, skipping disabled tabs', async () => {
    render(<Tabs aria-label="Settings" items={items} />)
    const profile = screen.getByRole('tab', { name: 'Profile' })
    profile.focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'true')
    // Team is disabled, so ArrowRight from Billing wraps back to Profile.
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('aria-selected', 'true')
  })

  it('jumps to first/last enabled tab with Home/End', async () => {
    render(<Tabs aria-label="Settings" items={items} />)
    screen.getByRole('tab', { name: 'Profile' }).focus()
    await userEvent.keyboard('{End}')
    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'true')
    await userEvent.keyboard('{Home}')
    expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('aria-selected', 'true')
  })

  it('links each tab to its panel', () => {
    render(<Tabs aria-label="Settings" items={items} />)
    const tab = screen.getByRole('tab', { name: 'Profile' })
    const panel = screen.getByRole('tabpanel')
    expect(tab).toHaveAttribute('aria-controls', panel.id)
    expect(panel).toHaveAttribute('aria-labelledby', tab.id)
  })

  it('has no axe violations', async () => {
    const { container } = render(<Tabs aria-label="Settings" items={items} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
