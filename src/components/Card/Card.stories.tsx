import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'
import { Heading } from '../Heading/Heading'
import { Badge } from '../Badge/Badge'
import { Button } from '../Button/Button'
import { Avatar } from '../Avatar/Avatar'

const meta = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A surface that groups related content. The `title` / `description` / `action` / `footer` props build the standard anatomy, so most cards need no internal layout markup.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['outlined', 'elevated', 'filled'] },
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
    interactive: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '26rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Monthly revenue',
    description: 'Compared to last month',
    action: <Badge tone="success">+12%</Badge>,
    children: (
      <Heading level={3} size="h1">
        $48,290
      </Heading>
    ),
  },
}

export const Variants: Story = {
  args: {},
  render: () => (
    <Stack gap="md">
      {(['outlined', 'elevated', 'filled'] as const).map((variant) => (
        <Card key={variant} variant={variant} title={variant}>
          <Text size="sm" tone="muted">
            The {variant} surface treatment.
          </Text>
        </Card>
      ))}
    </Stack>
  ),
}

export const WithFooter: Story = {
  name: 'With footer',
  args: {
    title: 'Pro plan',
    description: '$29 per user, per month',
    children: (
      <Stack gap="2xs">
        <Text size="sm">Unlimited projects</Text>
        <Text size="sm">Priority support</Text>
        <Text size="sm">SSO and audit logs</Text>
      </Stack>
    ),
    footer: (
      <Stack direction="row" gap="xs" justify="end" fill>
        <Button size="sm">Compare</Button>
        <Button size="sm" variant="primary">
          Upgrade
        </Button>
      </Stack>
    ),
  },
}

export const Interactive: Story = {
  args: {},
  render: () => (
    <Stack gap="sm">
      <Text size="sm" tone="muted">
        Hover or tab to a card to see the affordance.
      </Text>
      {['acme-web', 'acme-api'].map((name) => (
        <Card key={name} interactive>
          <Stack direction="row" gap="sm" align="center">
            <Avatar name={name} shape="square" />
            <Stack gap="3xs" style={{ flex: 1, minWidth: 0 }}>
              <Text weight="medium">
                <a href="#repo" style={{ color: 'inherit' }}>
                  {name}
                </a>
              </Text>
              <Text size="caption" tone="subtle">
                Updated 2 hours ago
              </Text>
            </Stack>
            <Badge tone="success" dot>
              Live
            </Badge>
          </Stack>
        </Card>
      ))}
    </Stack>
  ),
}

export const NoPadding: Story = {
  name: 'Full-bleed body',
  args: {},
  render: () => (
    <Card padding="none">
      <div
        style={{
          height: '8rem',
          background: 'linear-gradient(135deg, var(--nn-indigo-500), var(--nn-sky-500))',
        }}
      />
      <div style={{ padding: 'var(--nn-space-md)' }}>
        <Stack gap="2xs">
          <Text weight="semibold">Release 2.4</Text>
          <Text size="sm" tone="muted">
            `padding="none"` lets media sit flush to the card edge while the corners stay rounded.
          </Text>
        </Stack>
      </div>
    </Card>
  ),
}
