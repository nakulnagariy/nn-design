import type { Meta, StoryObj } from '@storybook/react-vite'
import { Root } from './Root'
import { Stack } from '../Stack/Stack'
import { Heading } from '../Heading/Heading'
import { Text } from '../Text/Text'
import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'

const meta = {
  title: 'Primitives/Root',
  component: Root,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The wrapper every NN Design tree needs. It applies the `.nn-root` class carrying base typography, surface colour and box-sizing, and its `theme` prop selects the light or dark token set. Components rendered outside a `Root` keep their own styles but inherit the page\'s font and background, which usually looks broken.',
      },
    },
  },
  argTypes: {
    theme: { control: 'inline-radio', options: ['light', 'dark', 'system'] },
  },
} satisfies Meta<typeof Root>

export default meta
type Story = StoryObj<typeof meta>

const Sample = () => (
  <Stack gap="md">
    <Stack direction="row" gap="sm" align="center" justify="between">
      <Heading level={3}>Deployment</Heading>
      <Badge tone="success" dot>
        Live
      </Badge>
    </Stack>
    <Text tone="muted">Tokens, surfaces and text colour all follow the active theme.</Text>
    <Stack direction="row" gap="xs">
      <Button variant="primary">Promote</Button>
      <Button>Roll back</Button>
    </Stack>
  </Stack>
)

export const Light: Story = {
  args: { theme: 'light' },
  render: (args) => (
    <Root {...args} style={{ padding: 'var(--nn-space-lg)', borderRadius: 'var(--nn-radius-xl)' }}>
      <Sample />
    </Root>
  ),
}

export const Dark: Story = {
  args: { theme: 'dark' },
  render: (args) => (
    <Root {...args} style={{ padding: 'var(--nn-space-lg)', borderRadius: 'var(--nn-radius-xl)' }}>
      <Sample />
    </Root>
  ),
}

export const SideBySide: Story = {
  name: 'Both themes',
  args: {},
  render: () => (
    <Stack direction="row" gap="md" wrap>
      {(['light', 'dark'] as const).map((theme) => (
        <Root
          key={theme}
          theme={theme}
          style={{
            flex: '1 1 18rem',
            padding: 'var(--nn-space-lg)',
            borderRadius: 'var(--nn-radius-xl)',
            border: '1px solid var(--nn-color-border)',
          }}
        >
          <Sample />
        </Root>
      ))}
    </Stack>
  ),
}
