import { useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Decorator, Preview } from '@storybook/react-vite'
import { Root } from '../src/components/Root/Root'
import './storybook.css'

/**
 * Every story renders inside a `Root`, mirroring how consumers are expected to
 * mount the design system. The toolbar switches drive `Root`'s `theme` prop and
 * the document `dir`, so light/dark and LTR/RTL are exercised by the same code
 * path an app uses.
 */
function StoryFrame({
  theme,
  direction,
  fullBleed,
  children,
}: {
  theme: 'light' | 'dark' | 'system'
  direction: 'ltr' | 'rtl'
  fullBleed: boolean
  children: ReactNode
}) {
  useEffect(() => {
    document.documentElement.dir = direction
    return () => {
      document.documentElement.dir = 'ltr'
    }
  }, [direction])

  return (
    <Root
      dir={direction}
      theme={theme}
      style={{ padding: fullBleed ? 0 : 'var(--nn-space-lg)', minHeight: '100vh' }}
    >
      {children}
    </Root>
  )
}

const withRoot: Decorator = (Story, context) => (
  <StoryFrame
    theme={(context.globals.theme as 'light' | 'dark' | 'system') ?? 'light'}
    direction={(context.globals.direction as 'ltr' | 'rtl') ?? 'ltr'}
    // Page blocks paint their own full-bleed backgrounds and manage their own
    // vertical rhythm, so the decorator's padding would misrepresent them.
    fullBleed={context.parameters.fullBleed === true}
  >
    <Story />
  </StoryFrame>
)

const preview: Preview = {
  decorators: [withRoot],
  globalTypes: {
    theme: {
      description: 'Design system theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'system', title: 'System' },
        ],
        dynamicTitle: true,
      },
    },
    direction: {
      description: 'Writing direction',
      toolbar: {
        title: 'Direction',
        icon: 'transfer',
        items: [
          { value: 'ltr', title: 'LTR' },
          { value: 'rtl', title: 'RTL' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    direction: 'ltr',
  },
  parameters: {
    a11y: {
      // Surface violations in the Accessibility panel; don't fail the build yet.
      test: 'todo',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Foundations', 'Primitives', 'Forms', 'Feedback', 'Data Display'],
      },
    },
  },
}

export default preview
