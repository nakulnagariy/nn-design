import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container } from './Container'
import { Box } from '../Box/Box'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'

const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Centres content at a readable max width with a responsive gutter. Every page block wraps its content in one, which is what keeps headers, heroes and footers optically aligned down a page.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    flush: { control: 'boolean' },
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'lg',
    children: (
      <Box background="primary-subtle" padding="lg" radius="lg">
        <Text>Content sits inside the container's max width.</Text>
      </Box>
    ),
  },
}

export const Sizes: Story = {
  args: {},
  render: () => (
    <Stack gap="sm">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Container key={size} size={size} flush>
          <Box background="surface-3" padding="sm" radius="md">
            <Text size="sm" mono>
              size="{size}"
            </Text>
          </Box>
        </Container>
      ))}
    </Stack>
  ),
}
