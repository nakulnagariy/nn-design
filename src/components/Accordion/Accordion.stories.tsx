import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion } from './Accordion'
import { Text } from '../Text/Text'
import { FAQS } from '../../examples/demo-data'

const meta = {
  title: 'Data Display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Built from real `button` headers with `aria-expanded` and `aria-controls`, so the group is keyboard- and screen-reader-navigable.',
      },
    },
  },
  argTypes: {
    multiple: { control: 'boolean' },
    bordered: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '38rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const items = FAQS.map((faq, index) => ({
  id: `q${index}`,
  title: faq.question,
  content: <Text size="sm">{faq.answer}</Text>,
}))

export const Default: Story = {
  args: { items, defaultOpen: ['q0'] },
}

export const Multiple: Story = {
  name: 'Several open at once',
  args: { items, multiple: true, defaultOpen: ['q0', 'q1'] },
}

export const Borderless: Story = {
  args: { items, bordered: false },
}

export const WithDisabled: Story = {
  name: 'With a disabled row',
  args: {
    items: [
      ...items.slice(0, 2),
      { id: 'locked', title: 'Enterprise terms (contact sales)', content: null, disabled: true },
    ],
  },
}
