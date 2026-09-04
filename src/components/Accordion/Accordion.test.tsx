import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Accordion, type AccordionItem } from './Accordion'

const items: AccordionItem[] = [
  { id: 'a', title: 'First', content: 'First body' },
  { id: 'b', title: 'Second', content: 'Second body' },
  { id: 'c', title: 'Third', content: 'Third body', disabled: true },
]

describe('Accordion', () => {
  it('starts collapsed with aria-expanded=false and hidden panels', () => {
    render(<Accordion items={items} />)
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('First body').closest('[role="region"]')).not.toBeVisible()
  })

  it('opens a panel on click and wires aria-controls to the panel id', async () => {
    render(<Accordion items={items} />)
    const trigger = screen.getByRole('button', { name: 'First' })
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    const panel = screen.getByRole('region', { name: 'First' })
    expect(panel).toBeVisible()
    expect(trigger).toHaveAttribute('aria-controls', panel.id)
  })

  it('closes the previous panel when single (default)', async () => {
    render(<Accordion items={items} />)
    await userEvent.click(screen.getByRole('button', { name: 'First' }))
    await userEvent.click(screen.getByRole('button', { name: 'Second' }))
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('keeps multiple panels open when multiple', async () => {
    render(<Accordion items={items} multiple />)
    await userEvent.click(screen.getByRole('button', { name: 'First' }))
    await userEvent.click(screen.getByRole('button', { name: 'Second' }))
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('reports open ids through onChange and respects the controlled prop', async () => {
    const onChange = vi.fn()
    render(<Accordion items={items} open={['a']} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Second' }))
    expect(onChange).toHaveBeenCalledWith(['b'])
    // Controlled: still shows only 'a' until the parent updates `open`.
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('does not toggle a disabled item', async () => {
    render(<Accordion items={items} />)
    const trigger = screen.getByRole('button', { name: 'Third' })
    expect(trigger).toBeDisabled()
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('has no axe violations open or closed', async () => {
    const { container } = render(<Accordion items={items} />)
    expect(await axe(container)).toHaveNoViolations()
    await userEvent.click(screen.getByRole('button', { name: 'First' }))
    expect(await axe(container)).toHaveNoViolations()
  })
})
