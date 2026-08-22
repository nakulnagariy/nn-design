import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A single checkbox with its label. For a group, render several in a `Stack` inside a `fieldset` with a `legend` so the group has an accessible name.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Email me about product updates' },
}

export const Checked: Story = {
  args: { label: 'Enable two-factor authentication', defaultChecked: true },
}

export const WithDescription: Story = {
  name: 'With description',
  args: {
    label: 'Share anonymous usage data',
    description: 'Helps us find slow screens. Never includes personal content.',
    defaultChecked: true,
  },
}

export const WithError: Story = {
  name: 'With error',
  args: {
    label: 'I accept the terms of service',
    error: 'You must accept the terms to continue.',
  },
}

export const Disabled: Story = {
  args: {},
  render: () => (
    <Stack gap="xs">
      <Checkbox label="Unavailable on your plan" disabled />
      <Checkbox label="Always on for your plan" defaultChecked disabled />
    </Stack>
  ),
}

export const Group: Story = {
  name: 'Group with select-all',
  args: {},
  render: function GroupStory() {
    const scopes = ['Read repositories', 'Write repositories', 'Manage webhooks']
    const [checked, setChecked] = useState<boolean[]>([true, false, false])

    const all = checked.every(Boolean)
    const some = checked.some(Boolean)

    return (
      <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
        <legend style={{ padding: 0 }}>
          <Text weight="medium">Access scopes</Text>
        </legend>
        <Stack gap="xs" style={{ marginTop: 'var(--nn-space-xs)' }}>
          <Checkbox
            label="Select all"
            checked={all}
            indeterminate={some && !all}
            onChange={(e) => setChecked(scopes.map(() => e.target.checked))}
          />
          <Stack gap="xs" style={{ paddingInlineStart: 'var(--nn-space-lg)' }}>
            {scopes.map((scope, i) => (
              <Checkbox
                key={scope}
                label={scope}
                checked={checked[i]}
                onChange={(e) =>
                  setChecked((prev) => prev.map((v, j) => (i === j ? e.target.checked : v)))
                }
              />
            ))}
          </Stack>
        </Stack>
      </fieldset>
    )
  },
}
