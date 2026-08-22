import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stats } from './Stats'
import { STATS } from '../../examples/demo-data'

const meta = {
  title: 'Blocks/Stats',
  component: Stats,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          'Values render large and tabular so digits line up between columns. Keep the set to three or four — a stats row is a claim, not a report.',
      },
    },
  },
  argTypes: {
    bordered: { control: 'boolean' },
    tone: { control: 'select', options: ['default', 'muted', 'inverted', 'primary', 'gradient'] },
  },
} satisfies Meta<typeof Stats>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { items: STATS },
}

export const WithHeading: Story = {
  name: 'With a heading',
  args: {
    eyebrow: 'By the numbers',
    title: 'Trusted at scale',
    tone: 'muted',
    items: STATS,
  },
}

export const Bordered: Story = {
  args: { items: STATS, bordered: true, tone: 'muted' },
}

export const OnGradient: Story = {
  name: 'On a gradient',
  args: {
    title: 'Built for production',
    tone: 'gradient',
    items: STATS.slice(0, 3),
  },
}
