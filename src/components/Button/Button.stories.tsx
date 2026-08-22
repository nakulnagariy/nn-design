import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'

const meta = {
  title: 'Forms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'One `primary` button per view for the main action; everything else is `secondary` or `ghost`. `danger` is reserved for destructive actions.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    children: 'Save changes',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Variants: Story = {
  args: {},
  render: () => (
    <Stack direction="row" gap="sm" wrap align="center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </Stack>
  ),
}

export const Sizes: Story = {
  args: {},
  render: () => (
    <Stack direction="row" gap="sm" align="center" wrap>
      <Button variant="primary" size="sm">
        Small
      </Button>
      <Button variant="primary" size="md">
        Medium
      </Button>
      <Button variant="primary" size="lg">
        Large
      </Button>
    </Stack>
  ),
}

export const Loading: Story = {
  args: {},
  render: () => (
    <Stack gap="sm">
      <Text size="sm" tone="muted">
        The label stays in place, so the button keeps its width while busy.
      </Text>
      <Stack direction="row" gap="sm" wrap>
        <Button variant="primary" loading>
          Saving
        </Button>
        <Button loading>Refreshing</Button>
      </Stack>
    </Stack>
  ),
}

export const Disabled: Story = {
  args: {},
  render: () => (
    <Stack direction="row" gap="sm" wrap>
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button disabled>Secondary</Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="danger" disabled>
        Danger
      </Button>
    </Stack>
  ),
}

export const WithIcons: Story = {
  name: 'With icons',
  args: {},
  render: () => (
    <Stack direction="row" gap="sm" wrap align="center">
      <Button variant="primary" iconStart={<span>+</span>}>
        New project
      </Button>
      <Button iconEnd={<span>→</span>}>Continue</Button>
      <Button variant="ghost" size="sm" aria-label="More options">
        ⋯
      </Button>
    </Stack>
  ),
}

export const FullWidth: Story = {
  name: 'Full width',
  args: {},
  render: () => (
    <Stack gap="xs" style={{ maxWidth: '20rem' }}>
      <Button variant="primary" fullWidth>
        Create account
      </Button>
      <Button fullWidth>Sign in instead</Button>
    </Stack>
  ),
}
