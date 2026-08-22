import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'
import { Stack } from '../Stack/Stack'

const REGIONS = [
  { label: 'US East (N. Virginia)', value: 'us-east-1' },
  { label: 'US West (Oregon)', value: 'us-west-2' },
  { label: 'Europe (Frankfurt)', value: 'eu-central-1' },
  { label: 'Asia Pacific (Mumbai)', value: 'ap-south-1' },
  { label: 'South America (São Paulo)', value: 'sa-east-1', disabled: true },
]

const meta = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A native `select` styled to match `Input`. Native on purpose — it inherits correct keyboard behaviour and renders as the platform picker on mobile.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '22rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Region',
    placeholder: 'Choose a region',
    options: REGIONS,
  },
}

export const WithHint: Story = {
  name: 'With hint',
  args: {
    label: 'Region',
    options: REGIONS,
    defaultValue: 'eu-central-1',
    hint: 'Latency is lowest closest to your users.',
  },
}

export const WithError: Story = {
  name: 'With error',
  args: {
    label: 'Region',
    placeholder: 'Choose a region',
    options: REGIONS,
    error: 'Pick a region to continue.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Region',
    options: REGIONS,
    defaultValue: 'us-east-1',
    disabled: true,
  },
}

export const Sizes: Story = {
  args: {},
  render: () => (
    <Stack gap="md">
      <Select size="sm" label="Small" options={REGIONS} defaultValue="us-east-1" />
      <Select size="md" label="Medium" options={REGIONS} defaultValue="us-east-1" />
      <Select size="lg" label="Large" options={REGIONS} defaultValue="us-east-1" />
    </Stack>
  ),
}
