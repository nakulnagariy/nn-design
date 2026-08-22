import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from './Spinner'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'
import { Box } from '../Box/Box'

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An indeterminate loading indicator. Inherits `currentColor`, so it takes the colour of whatever it sits in — no variant prop needed.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Sizes: Story = {
  args: {},
  render: () => (
    <Stack direction="row" gap="lg" align="center">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Stack key={size} gap="2xs" align="center">
          <Spinner size={size} />
          <Text size="caption" tone="subtle" mono>
            {size}
          </Text>
        </Stack>
      ))}
    </Stack>
  ),
}

export const InheritsColour: Story = {
  name: 'Inherits colour',
  args: {},
  render: () => (
    <Stack direction="row" gap="md" align="center">
      <Box style={{ color: 'var(--nn-color-primary)' }}>
        <Spinner label="" />
      </Box>
      <Box style={{ color: 'var(--nn-color-danger)' }}>
        <Spinner label="" />
      </Box>
      <Box style={{ color: 'var(--nn-color-text-subtle)' }}>
        <Spinner label="" />
      </Box>
    </Stack>
  ),
}

export const WithLabel: Story = {
  name: 'Beside a label',
  args: {},
  render: () => (
    <Stack direction="row" gap="xs" align="center">
      <Spinner size="sm" label="" />
      <Text tone="muted" size="sm">
        Fetching results…
      </Text>
    </Stack>
  ),
}
