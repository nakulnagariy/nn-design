import type { Decorator, Preview } from '@storybook/react-vite'
import { Root } from '../src/components/Root/Root'
import './storybook.css'

/**
 * Every story renders inside a `Root`, mirroring how consumers are expected to
 * mount the design system. The toolbar switch drives `Root`'s `theme` prop, so
 * the light/dark token sets are exercised by the same code path an app uses.
 */
const withRoot: Decorator = (Story, context) => {
  const theme = (context.globals.theme as 'light' | 'dark' | 'system') ?? 'light'
  // Page blocks paint their own full-bleed backgrounds and manage their own
  // vertical rhythm, so the decorator's padding would misrepresent them.
  const fullBleed = context.parameters.fullBleed === true

  return (
    <Root
      theme={theme}
      style={{ padding: fullBleed ? 0 : 'var(--nn-space-lg)', minHeight: '100vh' }}
    >
      <Story />
    </Root>
  )
}

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
  },
  initialGlobals: {
    theme: 'light',
  },
  parameters: {
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
