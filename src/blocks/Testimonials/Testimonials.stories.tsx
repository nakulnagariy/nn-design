import type { Meta, StoryObj } from '@storybook/react-vite'
import { Testimonials } from './Testimonials'
import { TESTIMONIALS } from '../../examples/demo-data'

const meta = {
  title: 'Blocks/Testimonials',
  component: Testimonials,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          'Each quote renders as a `figure` with its attribution in a `figcaption`, so the pairing survives for screen readers. Ratings are announced as text rather than as a row of star glyphs.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['grid', 'feature'] },
    columns: { control: 'inline-radio', options: [2, 3] },
    tone: { control: 'select', options: ['default', 'muted', 'inverted', 'primary', 'gradient'] },
  },
} satisfies Meta<typeof Testimonials>

export default meta
type Story = StoryObj<typeof meta>

export const Grid: Story = {
  args: {
    eyebrow: 'Testimonials',
    title: 'Teams that stopped rebuilding their UI',
    items: TESTIMONIALS,
    tone: 'muted',
  },
}

export const Feature: Story = {
  args: {
    title: 'What people say',
    variant: 'feature',
    items: TESTIMONIALS,
  },
}

export const SingleQuote: Story = {
  name: 'Single quote',
  args: {
    variant: 'feature',
    items: [TESTIMONIALS[0]!],
  },
}

export const TwoColumns: Story = {
  name: 'Two columns',
  args: {
    title: 'Loved by builders',
    columns: 2,
    items: TESTIMONIALS.slice(0, 2),
  },
}
