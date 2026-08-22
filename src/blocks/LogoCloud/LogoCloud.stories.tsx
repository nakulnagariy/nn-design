import type { Meta, StoryObj } from '@storybook/react-vite'
import { LogoCloud } from './LogoCloud'
import { LOGOS } from '../../examples/demo-data'

const meta = {
  title: 'Blocks/LogoCloud',
  component: LogoCloud,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          'Logos are dimmed and desaturated so they read as texture rather than competing with the page. The marquee duplicates the list to loop seamlessly, hides the copy from assistive tech, and stops entirely under `prefers-reduced-motion`.',
      },
    },
  },
  argTypes: {
    marquee: { control: 'boolean' },
    vivid: { control: 'boolean' },
    speed: { control: { type: 'number', step: 5 } },
    tone: { control: 'select', options: ['default', 'muted', 'inverted'] },
  },
} satisfies Meta<typeof LogoCloud>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    description: 'Trusted by teams at',
    logos: LOGOS,
  },
}

export const Marquee: Story = {
  args: {
    description: 'Trusted by teams at',
    logos: LOGOS,
    marquee: true,
    speed: 25,
  },
}

export const Vivid: Story = {
  name: 'Full colour',
  args: {
    title: 'Our partners',
    logos: LOGOS,
    vivid: true,
    tone: 'muted',
  },
}

export const Bare: Story = {
  name: 'Without a heading',
  args: { logos: LOGOS },
}
