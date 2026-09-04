import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './Text'
import { Stack } from '../Stack/Stack'

const meta = {
  title: 'Primitives/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Body copy at a fixed step on the type scale. Section titles belong in `Heading`.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['caption', 'sm', 'body', 'body-lg'] },
    weight: { control: 'inline-radio', options: ['regular', 'medium', 'semibold', 'bold'] },
    tone: {
      control: 'select',
      options: ['default', 'muted', 'subtle', 'primary', 'success', 'warning', 'danger'],
    },
    mono: { control: 'boolean' },
    truncate: { control: 'boolean' },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
  },
}

export const Sizes: Story = {
  args: {},
  render: () => (
    <Stack gap="sm">
      {(['body-lg', 'body', 'sm', 'caption'] as const).map((size) => (
        <Text key={size} size={size}>
          {size} — The quick brown fox jumps over the lazy dog.
        </Text>
      ))}
    </Stack>
  ),
}

export const Tones: Story = {
  args: {},
  render: () => (
    <Stack gap="xs">
      {(['default', 'muted', 'subtle', 'primary', 'success', 'warning', 'danger'] as const).map(
        (tone) => (
          <Text key={tone} tone={tone}>
            {tone} — status and emphasis colours read from the tokens.
          </Text>
        ),
      )}
    </Stack>
  ),
}

export const Weights: Story = {
  args: {},
  render: () => (
    <Stack gap="xs">
      {(['regular', 'medium', 'semibold', 'bold'] as const).map((weight) => (
        <Text key={weight} weight={weight}>
          {weight} — pricing, labels and emphasis.
        </Text>
      ))}
    </Stack>
  ),
}

export const Truncated: Story = {
  args: {},
  render: () => (
    <div style={{ maxWidth: '18rem' }}>
      <Text truncate>
        A single line of text that is far too long for its container and therefore ends in an
        ellipsis.
      </Text>
    </div>
  ),
}
