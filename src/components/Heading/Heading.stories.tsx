import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading } from './Heading'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'

const meta = {
  title: 'Primitives/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`level` sets the rendered tag and the document outline; `size` sets how big it looks. Keep them in sync unless a design needs them to differ.',
      },
    },
  },
  argTypes: {
    level: { control: 'inline-radio', options: [1, 2, 3, 4] },
    size: { control: 'select', options: [undefined, 'display', 'h1', 'h2', 'h3', 'h4'] },
    tone: { control: 'select', options: ['default', 'muted', 'primary'] },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { level: 2, children: 'Recent activity' },
}

export const Scale: Story = {
  args: {},
  render: () => (
    <Stack gap="md">
      {(['display', 'h1', 'h2', 'h3', 'h4'] as const).map((size) => (
        <Stack key={size} gap="3xs">
          <Text size="caption" tone="subtle" mono>
            size="{size}"
          </Text>
          <Heading level={2} size={size}>
            Design that ships
          </Heading>
        </Stack>
      ))}
    </Stack>
  ),
}

export const WithBody: Story = {
  name: 'In context',
  args: {},
  render: () => (
    <Stack gap="xs" style={{ maxWidth: '32rem' }}>
      <Heading level={1}>Billing</Heading>
      <Text tone="muted">
        Manage your plan, payment method and invoices. Changes take effect on your next billing
        cycle.
      </Text>
    </Stack>
  ),
}
