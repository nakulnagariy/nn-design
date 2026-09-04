import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from './Tabs'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'
import { Badge } from '../Badge/Badge'
import { Box } from '../Box/Box'

const Panel = ({ children }: { children: React.ReactNode }) => (
  <Box background="surface-2" padding="md" radius="lg">
    <Text size="sm">{children}</Text>
  </Box>
)

const ITEMS = [
  { id: 'profile', label: 'Profile', content: <Panel>Name, avatar and public handle.</Panel> },
  {
    id: 'billing',
    label: 'Billing',
    badge: (
      <Badge tone="danger" size="sm">
        1
      </Badge>
    ),
    content: <Panel>Payment method, invoices and plan.</Panel>,
  },
  { id: 'security', label: 'Security', content: <Panel>Password, 2FA and active sessions.</Panel> },
  { id: 'api', label: 'API keys', content: <Panel>Create and revoke keys.</Panel>, disabled: true },
]

const meta = {
  title: 'Data Display/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Implements the ARIA tabs pattern including arrow-key navigation plus Home/End. Works controlled (`value` + `onChange`) or uncontrolled (`defaultValue`).',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['underline', 'pill'] },
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { items: ITEMS, 'aria-label': 'Account settings' },
}

export const Pill: Story = {
  args: { items: ITEMS, variant: 'pill', 'aria-label': 'Account settings' },
}

export const FullWidth: Story = {
  name: 'Full width',
  args: {
    items: ITEMS.slice(0, 3),
    fullWidth: true,
    variant: 'pill',
    'aria-label': 'Account settings',
  },
}

export const Controlled: Story = {
  args: { items: ITEMS },
  render: function ControlledStory() {
    const [tab, setTab] = useState('billing')

    return (
      <Stack gap="md">
        <Text size="sm" tone="muted">
          Selected:{' '}
          <Text as="span" mono weight="medium">
            {tab}
          </Text>
        </Text>
        <Tabs items={ITEMS} value={tab} onChange={setTab} aria-label="Account settings" />
      </Stack>
    )
  },
}
