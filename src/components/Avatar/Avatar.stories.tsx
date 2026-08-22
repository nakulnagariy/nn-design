import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "A person or entity's picture with an initials fallback. Always pass `name` — it supplies the alt text when an image is present and the initials when it is not.",
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'inline-radio', options: ['circle', 'square'] },
    status: { control: 'inline-radio', options: [undefined, 'online', 'busy', 'offline'] },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { name: 'Ada Lovelace' },
}

export const Sizes: Story = {
  args: {},
  render: () => (
    <Stack direction="row" gap="md" align="center">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Stack key={size} gap="2xs" align="center">
          <Avatar name="Ada Lovelace" size={size} />
          <Text size="caption" tone="subtle" mono>
            {size}
          </Text>
        </Stack>
      ))}
    </Stack>
  ),
}

export const Shapes: Story = {
  args: {},
  render: () => (
    <Stack direction="row" gap="md" align="center">
      <Avatar name="Ada Lovelace" size="lg" shape="circle" />
      <Avatar name="Acme Corp" size="lg" shape="square" />
    </Stack>
  ),
}

export const WithStatus: Story = {
  name: 'With status',
  args: {},
  render: () => (
    <Stack direction="row" gap="md" align="center">
      {(['online', 'busy', 'offline'] as const).map((status) => (
        <Stack key={status} gap="2xs" align="center">
          <Avatar name="Grace Hopper" size="lg" status={status} />
          <Text size="caption" tone="subtle" mono>
            {status}
          </Text>
        </Stack>
      ))}
    </Stack>
  ),
}

export const Initials: Story = {
  name: 'Initials fallback',
  args: {},
  render: () => (
    <Stack direction="row" gap="sm" align="center">
      {['Ada Lovelace', 'Grace Hopper', 'Cher', 'Katherine G Johnson'].map((name) => (
        <Stack key={name} gap="2xs" align="center">
          <Avatar name={name} />
          <Text size="caption" tone="subtle">
            {name}
          </Text>
        </Stack>
      ))}
    </Stack>
  ),
}

export const Group: Story = {
  name: 'Stacked group',
  args: {},
  render: () => (
    <Stack direction="row" gap="none" align="center">
      {['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Katherine Johnson'].map((name, i) => (
        <Avatar
          key={name}
          name={name}
          style={{
            marginInlineStart: i === 0 ? 0 : '-0.6rem',
            border: '2px solid var(--nn-color-surface-1)',
          }}
        />
      ))}
    </Stack>
  ),
}
