import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box } from './Box'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'

const meta = {
  title: 'Primitives/Box',
  component: Box,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Generic container wired to the token scales. Use it for themed surfaces, padding and borders; use `Stack` to arrange children.',
      },
    },
  },
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'container'],
    },
    background: {
      control: 'select',
      options: ['none', 'surface-1', 'surface-2', 'surface-3', 'primary-subtle'],
    },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'] },
    shadow: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
    border: { control: 'boolean' },
  },
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    background: 'surface-2',
    padding: 'lg',
    radius: 'lg',
    border: true,
    children: <Text>A padded, bordered surface.</Text>,
  },
}

export const Surfaces: Story = {
  args: {},
  render: () => (
    <Stack gap="sm">
      {(['surface-1', 'surface-2', 'surface-3', 'primary-subtle'] as const).map((background) => (
        <Box key={background} background={background} padding="md" radius="md" border>
          <Text size="sm" mono>
            {background}
          </Text>
        </Box>
      ))}
    </Stack>
  ),
}

export const Elevation: Story = {
  args: {},
  render: () => (
    <Stack direction="row" gap="lg" wrap>
      {(['sm', 'md', 'lg'] as const).map((shadow) => (
        <Box key={shadow} background="surface-1" padding="lg" radius="lg" shadow={shadow}>
          <Text size="sm" mono>
            shadow="{shadow}"
          </Text>
        </Box>
      ))}
    </Stack>
  ),
}
