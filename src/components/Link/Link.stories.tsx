import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from './Link'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'

const meta = {
  title: 'Primitives/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A text link. Pass your router\'s link component as `as` to keep client-side navigation. `external` adds the arrow, `target="_blank"` and the `rel` pair that closes the reverse-tabnabbing hole.',
      },
    },
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['primary', 'inherit', 'muted'] },
    underline: { control: 'inline-radio', options: ['always', 'hover', 'none'] },
    external: { control: 'boolean' },
  },
  args: { href: '#example', children: 'Read the documentation' },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tones: Story = {
  args: {},
  render: () => (
    <Stack gap="xs">
      <Link href="#a">Primary link</Link>
      <Text tone="muted">
        An <Link href="#b" tone="inherit">inherit link</Link> inside muted body copy.
      </Text>
      <Link href="#c" tone="muted">
        Muted link
      </Link>
    </Stack>
  ),
}

export const External: Story = {
  args: {},
  render: () => (
    <Text>
      Check the{' '}
      <Link href="https://example.com" external>
        status page
      </Link>{' '}
      before filing a report.
    </Text>
  ),
}

export const InProse: Story = {
  name: 'In prose',
  args: {},
  render: () => (
    <Text style={{ maxWidth: '32rem' }}>
      Start with the <Link href="#quickstart">quickstart</Link>, then browse the{' '}
      <Link href="#components">component reference</Link>. If something looks wrong, our{' '}
      <Link href="https://example.com" external>
        issue tracker
      </Link>{' '}
      is the fastest route to a fix.
    </Text>
  ),
}
