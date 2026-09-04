import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Modal } from './Modal'

const noop = () => {}

describe('Modal', () => {
  it('is not visible while open is false', () => {
    const { container } = render(
      <Modal open={false} onClose={noop} title="Delete project">
        Body
      </Modal>,
    )
    // A <dialog> without [open] is not visible.
    expect(container.querySelector('dialog')).not.toBeVisible()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows content and wires the accessible name and description when open', () => {
    render(
      <Modal open onClose={noop} title="Delete project" description="This cannot be undone.">
        Everything will be removed.
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeVisible()
    expect(dialog).toHaveAccessibleName('Delete project')
    expect(dialog).toHaveAccessibleDescription('This cannot be undone.')
  })

  it('calls onClose from the close button', async () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} title="Delete project">
        Body
      </Modal>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('closes on a backdrop click but not on a click inside the panel', async () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} title="Delete project">
        <button type="button">Inside</button>
      </Modal>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Inside' }))
    expect(onClose).not.toHaveBeenCalled()

    await userEvent.click(screen.getByRole('dialog')) // lands on the <dialog> itself = backdrop
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('ignores backdrop clicks when disableBackdropClose', async () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} disableBackdropClose title="Delete project">
        Body
      </Modal>,
    )
    await userEvent.click(screen.getByRole('dialog'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('calls onClose when the native cancel event fires (Escape)', () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} title="Delete project">
        Body
      </Modal>,
    )
    screen.getByRole('dialog').dispatchEvent(new Event('cancel', { cancelable: true }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('can hide the close button', () => {
    render(
      <Modal open onClose={noop} hideCloseButton title="Delete project">
        Body
      </Modal>,
    )
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
  })

  it('has no axe violations when open', async () => {
    const { container } = render(
      <Modal open onClose={noop} title="Delete project" description="This cannot be undone.">
        Everything will be removed.
      </Modal>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
