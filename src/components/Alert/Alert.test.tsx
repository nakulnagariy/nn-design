import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Alert } from './Alert'

describe('Alert', () => {
  it('announces politely for info/success', () => {
    render(<Alert tone="success">Saved</Alert>)
    const alert = screen.getByRole('status')
    expect(alert).toHaveAttribute('aria-live', 'polite')
  })

  it('announces assertively for warning/danger', () => {
    render(<Alert tone="danger">Failed</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveAttribute('aria-live', 'assertive')
  })

  it('hides the decorative glyph from assistive tech', () => {
    render(
      <Alert tone="info" title="Heads up">
        Body
      </Alert>,
    )
    expect(screen.getByText('i')).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders a labelled dismiss button that calls onDismiss', async () => {
    const onDismiss = vi.fn()
    render(
      <Alert tone="success" onDismiss={onDismiss}>
        Saved
      </Alert>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Alert tone="warning" title="Billing" onDismiss={() => {}}>
        Your card expires soon.
      </Alert>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
