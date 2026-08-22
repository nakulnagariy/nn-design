import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dropdown } from './Dropdown'
import { Avatar } from '../Avatar/Avatar'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'

const meta = {
  title: 'Data Display/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Closes on outside click, on Escape, and after a row is selected. Arrow keys move between rows once open. Positioned with CSS relative to the trigger, so an ancestor with `overflow: hidden` can clip it.',
      },
    },
  },
  argTypes: {
    align: { control: 'inline-radio', options: ['start', 'end'] },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '16rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Account',
    trigger: <Avatar name="Ada Lovelace" size="sm" />,
    items: [
      { id: 'profile', label: 'Your profile', href: '#profile' },
      { id: 'settings', label: 'Settings', href: '#settings' },
      { id: 'team', label: 'Team', href: '#team' },
      { id: 'signout', label: 'Sign out', separated: true, destructive: true },
    ],
  },
}

export const WithIcons: Story = {
  name: 'With icons',
  args: {
    label: 'Actions',
    align: 'start',
    trigger: <Text weight="medium">Actions ▾</Text>,
    items: [
      { id: 'edit', label: 'Edit', icon: '✎' },
      { id: 'duplicate', label: 'Duplicate', icon: '⧉' },
      { id: 'archive', label: 'Archive', icon: '📦', disabled: true },
      { id: 'delete', label: 'Delete', icon: '🗑', separated: true, destructive: true },
    ],
  },
}

export const Alignment: Story = {
  args: { trigger: null, items: [] },
  render: () => (
    <Stack direction="row" justify="between">
      <Dropdown
        label="Start aligned"
        align="start"
        trigger={<Text weight="medium">Align start ▾</Text>}
        items={[
          { id: 'a', label: 'First option' },
          { id: 'b', label: 'Second option' },
        ]}
      />
      <Dropdown
        label="End aligned"
        align="end"
        trigger={<Text weight="medium">Align end ▾</Text>}
        items={[
          { id: 'a', label: 'First option' },
          { id: 'b', label: 'Second option' },
        ]}
      />
    </Stack>
  ),
}
