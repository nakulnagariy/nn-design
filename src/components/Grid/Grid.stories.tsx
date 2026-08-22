import type { Meta, StoryObj } from '@storybook/react-vite'
import { Grid } from './Grid'
import { Box } from '../Box/Box'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'

const Cell = ({ children }: { children: React.ReactNode }) => (
  <Box background="primary-subtle" padding="md" radius="md">
    <Text size="sm" weight="medium" align="center">
      {children}
    </Text>
  </Box>
)

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Two modes: a fixed `columns` count that steps down at narrow widths, or `minItemWidth` for a grid whose column count follows the available space. Resize the preview to see either respond.',
      },
    },
  },
  argTypes: {
    columns: { control: 'inline-radio', options: [1, 2, 3, 4, 6] },
    gap: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns: 3,
    gap: 'md',
    children: Array.from({ length: 6 }, (_, i) => <Cell key={i}>{i + 1}</Cell>),
  },
}

export const ColumnCounts: Story = {
  name: 'Column counts',
  args: {},
  render: () => (
    <Stack gap="lg">
      {([2, 3, 4] as const).map((columns) => (
        <Stack key={columns} gap="2xs">
          <Text size="caption" tone="subtle" mono>
            columns={'{'}
            {columns}
            {'}'}
          </Text>
          <Grid columns={columns} gap="sm">
            {Array.from({ length: columns * 2 }, (_, i) => (
              <Cell key={i}>{i + 1}</Cell>
            ))}
          </Grid>
        </Stack>
      ))}
    </Stack>
  ),
}

export const ContentDriven: Story = {
  name: 'Driven by item width',
  args: {},
  render: () => (
    <Stack gap="2xs">
      <Text size="caption" tone="subtle" mono>
        minItemWidth="14rem"
      </Text>
      <Grid minItemWidth="14rem" gap="md">
        {Array.from({ length: 7 }, (_, i) => (
          <Cell key={i}>Card {i + 1}</Cell>
        ))}
      </Grid>
    </Stack>
  ),
}
