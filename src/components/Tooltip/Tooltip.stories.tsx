import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip } from './Tooltip'
import { Stack } from '../Stack/Stack'
import { Button } from '../Button/Button'
import { Text } from '../Text/Text'

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A short hint shown on hover and on keyboard focus. Tooltips supplement an already-labelled control — never put essential information or interactive elements inside one.',
      },
    },
  },
  argTypes: {
    placement: { control: 'inline-radio', options: ['top', 'bottom', 'start', 'end'] },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--nn-space-2xl)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: 'Export as CSV',
    children: (
      <Button variant="ghost" size="sm" aria-label="Export">
        ↓
      </Button>
    ),
  },
}

export const Placements: Story = {
  args: { content: '', children: null },
  render: () => (
    <Stack direction="row" gap="xl" justify="center" wrap>
      {(['top', 'bottom', 'start', 'end'] as const).map((placement) => (
        <Tooltip key={placement} placement={placement} content={`Placed ${placement}`}>
          <Button size="sm">{placement}</Button>
        </Tooltip>
      ))}
    </Stack>
  ),
}

export const OnText: Story = {
  name: 'On an abbreviation',
  args: { content: '', children: null },
  render: () => (
    <Text>
      Deploys run on{' '}
      <Tooltip content="Coordinated Universal Time">
        <span tabIndex={0} style={{ textDecoration: 'underline dotted', cursor: 'help' }}>
          UTC
        </span>
      </Tooltip>{' '}
      regardless of your local timezone.
    </Text>
  ),
}
