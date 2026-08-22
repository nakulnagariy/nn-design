import type { Meta, StoryObj } from '@storybook/react-vite'
import { Features } from './Features'
import { Link } from '../../components/Link/Link'
import { FEATURES, ScreenshotFrame } from '../../examples/demo-data'

const meta = {
  title: 'Blocks/Features',
  component: Features,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          '`grid` and `cards` suit short blurbs; `alternating` gives each feature a full row with its own media, which suits three or four substantial features.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['grid', 'cards', 'alternating'] },
    columns: { control: 'inline-radio', options: [2, 3, 4] },
    tone: { control: 'select', options: ['default', 'muted', 'inverted', 'primary', 'gradient'] },
  },
} satisfies Meta<typeof Features>

export default meta
type Story = StoryObj<typeof meta>

export const Grid: Story = {
  args: {
    eyebrow: 'Features',
    title: 'Everything you need, nothing you don’t',
    description: 'A small library that covers the whole surface of a real product.',
    items: FEATURES,
  },
}

export const Cards: Story = {
  args: {
    ...Grid.args,
    variant: 'cards',
    tone: 'muted',
  },
}

export const TwoColumns: Story = {
  name: 'Two columns',
  args: {
    ...Grid.args,
    variant: 'cards',
    columns: 2,
    items: FEATURES.slice(0, 4),
  },
}

export const WithLinks: Story = {
  name: 'With learn-more links',
  args: {
    ...Grid.args,
    variant: 'cards',
    items: FEATURES.slice(0, 3).map((item) => ({
      ...item,
      link: <Link href="#learn-more">Learn more →</Link>,
    })),
  },
}

export const Alternating: Story = {
  args: {
    eyebrow: 'How it works',
    title: 'Three steps from tokens to production',
    variant: 'alternating',
    align: 'center',
    items: [
      {
        icon: '1',
        title: 'Define your tokens once',
        description:
          'Colour, spacing, type and elevation live in a single CSS layer that every component reads from.',
        media: <ScreenshotFrame label="tokens.css" />,
      },
      {
        icon: '2',
        title: 'Compose with primitives',
        description:
          'Stack, Grid and Container handle layout so components never need bespoke wrapper CSS.',
        media: <ScreenshotFrame label="Layout" />,
      },
      {
        icon: '3',
        title: 'Assemble pages from blocks',
        description:
          'Hero, Features, Pricing and Footer are configured with props — a landing page is a dozen lines.',
        media: <ScreenshotFrame label="Landing page" />,
      },
    ],
  },
}
