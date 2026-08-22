import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './Switch'
import { Stack } from '../Stack/Stack'
import { Card } from '../Card/Card'

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An on/off toggle that applies immediately. Use `Checkbox` instead when the value is only committed on form submit.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Weekly digest', defaultChecked: true },
}

export const WithDescription: Story = {
  name: 'With description',
  args: {
    label: 'Weekly digest',
    description: 'A summary of activity every Monday morning.',
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {},
  render: () => (
    <Stack gap="sm">
      <Switch label="Locked off by your admin" disabled />
      <Switch label="Locked on by your admin" defaultChecked disabled />
    </Stack>
  ),
}

export const SettingsList: Story = {
  name: 'Settings list',
  args: {},
  render: function SettingsStory() {
    const [state, setState] = useState({ digest: true, mentions: true, marketing: false })

    return (
      <Card title="Notifications" description="Choose what lands in your inbox.">
        <Stack gap="md">
          <Switch
            label="Weekly digest"
            description="A summary of activity every Monday."
            checked={state.digest}
            onChange={(e) => setState((s) => ({ ...s, digest: e.target.checked }))}
          />
          <Switch
            label="Mentions"
            description="When someone @mentions you in a comment."
            checked={state.mentions}
            onChange={(e) => setState((s) => ({ ...s, mentions: e.target.checked }))}
          />
          <Switch
            label="Product news"
            description="Occasional updates about new features."
            checked={state.marketing}
            onChange={(e) => setState((s) => ({ ...s, marketing: e.target.checked }))}
          />
        </Stack>
      </Card>
    )
  },
}
