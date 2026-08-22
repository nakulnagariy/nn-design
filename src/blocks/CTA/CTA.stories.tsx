import type { Meta, StoryObj } from '@storybook/react-vite'
import { CTA } from './CTA'
import { Button } from '../../components/Button/Button'

const meta = {
  title: 'Blocks/CTA',
  component: CTA,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          '`boxed` on a `gradient` tone is the standard end-of-landing-page treatment; `split` is the quieter inline version for the bottom of a docs or pricing page.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['plain', 'boxed', 'split'] },
    tone: { control: 'select', options: ['default', 'muted', 'primary', 'inverted', 'gradient'] },
  },
} satisfies Meta<typeof CTA>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Start building today',
    description: 'Free for open source, and free to try for everyone else.',
    actions: (
      <>
        <Button variant="secondary" size="lg">
          Get started
        </Button>
        <Button variant="ghost" size="lg" style={{ color: '#fff' }}>
          Book a demo
        </Button>
      </>
    ),
    note: 'No credit card required.',
  },
}

export const Inverted: Story = {
  args: {
    ...Default.args,
    tone: 'inverted',
  },
}

export const Split: Story = {
  args: {
    variant: 'split',
    tone: 'muted',
    title: 'Ready to try it?',
    description: 'Spin up a project in under a minute.',
    actions: (
      <Button variant="primary" size="lg">
        Get started
      </Button>
    ),
  },
}

export const Plain: Story = {
  args: {
    variant: 'plain',
    tone: 'default',
    eyebrow: 'Get in touch',
    title: 'Let’s talk about your rollout',
    description: 'Our team will help you migrate an existing design system.',
    actions: (
      <>
        <Button variant="primary" size="lg">
          Contact sales
        </Button>
        <Button size="lg">See the docs</Button>
      </>
    ),
  },
}
