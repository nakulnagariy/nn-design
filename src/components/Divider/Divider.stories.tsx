import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from './Divider'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'
import { Button } from '../Button/Button'

const meta = {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A plain divider is decorative and hidden from assistive tech. Give it children and it becomes a labelled separator.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => (
    <Stack gap="md">
      <Text>Above the rule.</Text>
      <Divider />
      <Text>Below the rule.</Text>
    </Stack>
  ),
}

export const Labelled: Story = {
  args: {},
  render: () => (
    <Stack gap="md" style={{ maxWidth: '22rem' }}>
      <Button fullWidth>Continue with GitHub</Button>
      <Divider>or</Divider>
      <Button variant="primary" fullWidth>
        Sign in with email
      </Button>
    </Stack>
  ),
}

export const Vertical: Story = {
  args: {},
  render: () => (
    <Stack direction="row" gap="md" align="center" style={{ height: '2rem' }}>
      <Text size="sm">Drafts</Text>
      <Divider orientation="vertical" />
      <Text size="sm">Published</Text>
      <Divider orientation="vertical" />
      <Text size="sm">Archived</Text>
    </Stack>
  ),
}
