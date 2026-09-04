import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Switch } from './Switch'

describe('Switch', () => {
  it('exposes role="switch" and toggles on click', async () => {
    render(<Switch label="Weekly digest" />)
    const toggle = screen.getByRole('switch', { name: 'Weekly digest' })
    expect(toggle).not.toBeChecked()
    await userEvent.click(toggle)
    expect(toggle).toBeChecked()
  })

  it('associates the label so clicking the text toggles it', async () => {
    render(<Switch label="Weekly digest" />)
    await userEvent.click(screen.getByText('Weekly digest'))
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('wires the description via aria-describedby', () => {
    render(<Switch label="Weekly digest" description="Every Monday." />)
    expect(screen.getByRole('switch')).toHaveAccessibleDescription('Every Monday.')
  })

  it('does not toggle when disabled', async () => {
    const onChange = vi.fn()
    render(<Switch label="Weekly digest" disabled onChange={onChange} />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Switch label="Weekly digest" description="Every Monday." />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
