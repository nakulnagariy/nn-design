import type { Meta, StoryObj } from '@storybook/react-vite'
import { Footer } from './Footer'
import { Stack } from '../../components/Stack/Stack'
import { Link } from '../../components/Link/Link'
import { BRAND, FOOTER_COLUMNS, Logo } from '../../examples/demo-data'

const meta = {
  title: 'Blocks/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          '`columns` is the full sitemap layout — brand blurb beside grouped link columns, with a bottom row for copyright and legal links. `simple` drops the columns for a single centred row.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['simple', 'columns'] },
    tone: { control: 'inline-radio', options: ['default', 'muted', 'inverted'] },
  },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

const Social = (
  <Stack direction="row" gap="sm">
    {['GitHub', 'X', 'LinkedIn'].map((name) => (
      <Link key={name} href="#social" tone="muted" underline="none" aria-label={name}>
        {name}
      </Link>
    ))}
  </Stack>
)

export const Columns: Story = {
  args: {
    logo: <Logo />,
    description: 'The design system that ships with your product, not after it.',
    columns: FOOTER_COLUMNS,
    aside: Social,
    copyright: `© ${new Date().getFullYear()} ${BRAND} Inc.`,
    legal: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
      { label: 'Status', href: '#status', external: true },
    ],
  },
}

export const Inverted: Story = {
  args: {
    ...Columns.args,
    tone: 'inverted',
    logo: <Logo inverted />,
  },
}

export const Simple: Story = {
  args: {
    variant: 'simple',
    logo: <Logo />,
    columns: [
      {
        title: 'Links',
        links: [
          { label: 'Product', href: '#product' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Docs', href: '#docs' },
          { label: 'Contact', href: '#contact' },
        ],
      },
    ],
    aside: Social,
    copyright: `© ${new Date().getFullYear()} ${BRAND} Inc.`,
  },
}
