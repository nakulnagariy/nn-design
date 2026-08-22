import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stack } from './Stack'
import { Box } from '../Box/Box'
import { Text } from '../Text/Text'

const meta = {
  title: 'Primitives/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Flex container with token-scaled spacing. The workhorse for nearly every layout in the system.',
      },
    },
  },
  argTypes: {
    direction: { control: 'inline-radio', options: ['row', 'column'] },
    gap: {
      control: 'select',
      options: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    align: { control: 'select', options: [undefined, 'start', 'center', 'end', 'stretch'] },
    justify: {
      control: 'select',
      options: [undefined, 'start', 'center', 'end', 'between', 'around'],
    },
  },
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

const Demo = ({ children }: { children: React.ReactNode }) => (
  <Box background="primary-subtle" padding="sm" radius="md">
    <Text size="sm" weight="medium">
      {children}
    </Text>
  </Box>
)

export const Column: Story = {
  args: { direction: 'column', gap: 'md' },
  render: (args) => (
    <Stack {...args}>
      <Demo>First</Demo>
      <Demo>Second</Demo>
      <Demo>Third</Demo>
    </Stack>
  ),
}

export const Row: Story = {
  args: { direction: 'row', gap: 'sm' },
  render: (args) => (
    <Stack {...args}>
      <Demo>One</Demo>
      <Demo>Two</Demo>
      <Demo>Three</Demo>
    </Stack>
  ),
}

export const SpaceBetween: Story = {
  name: 'Row, space between',
  args: { direction: 'row', justify: 'between', align: 'center' },
  render: (args) => (
    <Stack {...args}>
      <Demo>Leading</Demo>
      <Demo>Trailing</Demo>
    </Stack>
  ),
}

export const GapScale: Story = {
  name: 'Gap scale',
  args: {},
  render: () => (
    <Stack gap="lg">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <Stack key={gap} gap="2xs">
          <Text size="caption" tone="subtle" mono>
            gap="{gap}"
          </Text>
          <Stack direction="row" gap={gap}>
            <Demo>A</Demo>
            <Demo>B</Demo>
            <Demo>C</Demo>
          </Stack>
        </Stack>
      ))}
    </Stack>
  ),
}
