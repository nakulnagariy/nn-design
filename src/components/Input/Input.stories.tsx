import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'
import { Stack } from '../Stack/Stack'

const meta = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single-line text field with label, hint and error built in. Passing `error` wires up `aria-invalid` and `aria-describedby` for you.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '22rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Work email',
    type: 'email',
    placeholder: 'you@company.com',
  },
}

export const WithHint: Story = {
  name: 'With hint',
  args: {
    label: 'Workspace URL',
    placeholder: 'acme',
    hint: "This becomes acme.nn.app — you can't change it later.",
  },
}

export const WithError: Story = {
  name: 'With error',
  args: {
    label: 'Work email',
    type: 'email',
    defaultValue: 'not-an-email',
    error: 'Enter a valid email address.',
  },
}

export const Required: Story = {
  args: {
    label: 'Full name',
    required: true,
    placeholder: 'Ada Lovelace',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Account ID',
    defaultValue: 'acct_8Hq2Lm',
    disabled: true,
    hint: 'Assigned automatically.',
  },
}

export const Sizes: Story = {
  args: {},
  render: () => (
    <Stack gap="md">
      <Input size="sm" label="Small" placeholder="sm" />
      <Input size="md" label="Medium" placeholder="md" />
      <Input size="lg" label="Large" placeholder="lg" />
    </Stack>
  ),
}

export const FormRow: Story = {
  name: 'In a form',
  args: {},
  render: () => (
    <Stack gap="md">
      <Input label="Full name" placeholder="Ada Lovelace" required />
      <Input label="Work email" type="email" placeholder="you@company.com" required />
      <Input label="Team size" type="number" defaultValue={12} hint="Used to suggest a plan." />
    </Stack>
  ),
}
