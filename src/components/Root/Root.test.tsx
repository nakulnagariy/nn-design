import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Root } from './Root'

describe('Root', () => {
  it('carries the .nn-root class', () => {
    render(<Root data-testid="root">content</Root>)
    expect(screen.getByTestId('root')).toHaveClass('nn-root')
  })

  it('omits data-nn-theme for the system theme so prefers-color-scheme wins', () => {
    render(<Root data-testid="root">content</Root>)
    expect(screen.getByTestId('root')).not.toHaveAttribute('data-nn-theme')
  })

  it.each(['light', 'dark'] as const)('sets data-nn-theme="%s" for an explicit theme', (theme) => {
    render(
      <Root theme={theme} data-testid="root">
        content
      </Root>,
    )
    expect(screen.getByTestId('root')).toHaveAttribute('data-nn-theme', theme)
  })

  it('renders as the element named by `as`', () => {
    render(
      <Root as="main" data-testid="root">
        content
      </Root>,
    )
    expect(screen.getByTestId('root').tagName).toBe('MAIN')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Root>content</Root>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
