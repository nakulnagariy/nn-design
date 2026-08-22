import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio } from './Radio'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'

const meta = {
  title: 'Forms/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A single radio button. Radios only make sense in a group: give every option the same `name` and wrap them in a `fieldset` with a `legend`.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Monthly', name: 'demo', defaultChecked: true },
}

export const Group: Story = {
  args: {},
  render: () => (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend style={{ padding: 0 }}>
        <Text weight="medium">Billing period</Text>
      </legend>
      <Stack gap="sm" style={{ marginTop: 'var(--nn-space-xs)' }}>
        <Radio name="period" value="monthly" label="Monthly" defaultChecked />
        <Radio
          name="period"
          value="annual"
          label="Annual"
          description="Save 20% — billed as one payment."
        />
        <Radio
          name="period"
          value="enterprise"
          label="Custom"
          description="Talk to sales about volume pricing."
        />
      </Stack>
    </fieldset>
  ),
}

export const Disabled: Story = {
  args: {},
  render: () => (
    <Stack gap="xs">
      <Radio name="plan" label="Available" defaultChecked />
      <Radio name="plan" label="Not available on your plan" disabled />
    </Stack>
  ),
}
