import type { Meta, StoryObj } from '@storybook/react-vite'
import { Newsletter } from './Newsletter'

const meta = {
  title: 'Blocks/Newsletter',
  component: Newsletter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          'Handles its own submitting / success / error states, so a parent only supplies `onSubmit`. Return a promise and the button shows a spinner until it settles; throw and the message renders as an error.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['inline', 'card'] },
    tone: { control: 'select', options: ['default', 'muted', 'inverted', 'primary', 'gradient'] },
  },
} satisfies Meta<typeof Newsletter>

export default meta
type Story = StoryObj<typeof meta>

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const Default: Story = {
  args: {
    title: 'Stay in the loop',
    description: 'Product updates and engineering notes, roughly monthly.',
    note: 'Unsubscribe any time. We never share your address.',
    onSubmit: async () => {
      await wait(900)
    },
  },
}

export const Card: Story = {
  args: {
    ...Default.args,
    variant: 'card',
    tone: 'muted',
  },
}

export const OnGradient: Story = {
  name: 'On a gradient',
  args: {
    ...Default.args,
    tone: 'gradient',
  },
}

export const FailingSubmit: Story = {
  name: 'Error state',
  args: {
    title: 'Stay in the loop',
    description: 'Submit this one to see how a rejected promise surfaces.',
    onSubmit: async () => {
      await wait(700)
      throw new Error('That address is already subscribed.')
    },
  },
}
