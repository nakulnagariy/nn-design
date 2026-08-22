import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'

const TONES = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const

const meta = {
  title: 'Feedback/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A compact status or category label. Decoration around text — not interactive. If it needs to be clicked or dismissed, use a `Button`.',
      },
    },
  },
  argTypes: {
    tone: { control: 'select', options: TONES },
    variant: { control: 'inline-radio', options: ['subtle', 'solid', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    dot: { control: 'boolean' },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { tone: 'success', children: 'Active' },
}

export const Variants: Story = {
  args: {},
  render: () => (
    <Stack gap="md">
      {(['subtle', 'solid', 'outline'] as const).map((variant) => (
        <Stack key={variant} gap="2xs">
          <Text size="caption" tone="subtle" mono>
            variant="{variant}"
          </Text>
          <Stack direction="row" gap="xs" wrap>
            {TONES.map((tone) => (
              <Badge key={tone} tone={tone} variant={variant}>
                {tone}
              </Badge>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  ),
}

export const WithDot: Story = {
  name: 'With status dot',
  args: {},
  render: () => (
    <Stack direction="row" gap="xs" wrap>
      <Badge tone="success" dot>
        Live
      </Badge>
      <Badge tone="warning" dot>
        Degraded
      </Badge>
      <Badge tone="danger" dot>
        Down
      </Badge>
      <Badge tone="neutral" dot>
        Paused
      </Badge>
    </Stack>
  ),
}

export const Sizes: Story = {
  args: {},
  render: () => (
    <Stack direction="row" gap="xs" align="center">
      <Badge tone="primary" size="sm">
        Small
      </Badge>
      <Badge tone="primary" size="md">
        Medium
      </Badge>
    </Stack>
  ),
}
