import type { Meta, StoryObj } from '@storybook/react-vite'
import { FAQ } from './FAQ'
import { Link } from '../../components/Link/Link'
import { FAQS } from '../../examples/demo-data'

const meta = {
  title: 'Blocks/FAQ',
  component: FAQ,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          'Wraps `Accordion` with section chrome and a narrower content width, since question text reads better at a shorter measure than a full-width section.',
      },
    },
  },
  argTypes: {
    multiple: { control: 'boolean' },
    tone: { control: 'select', options: ['default', 'muted'] },
  },
} satisfies Meta<typeof FAQ>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: FAQS,
    defaultOpenIndex: 0,
  },
}

export const WithFooter: Story = {
  name: 'With a support prompt',
  args: {
    title: 'Frequently asked questions',
    tone: 'muted',
    items: FAQS,
    footer: (
      <>
        Still stuck? <Link href="#support">Talk to support</Link> — we answer within a day.
      </>
    ),
  },
}

export const MultipleOpen: Story = {
  name: 'Several open at once',
  args: {
    title: 'Questions, answered',
    items: FAQS,
    multiple: true,
    defaultOpenIndex: 0,
  },
}
