import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from './Alert'
import { Stack } from '../Stack/Stack'
import { Button } from '../Button/Button'

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`danger` and `warning` announce assertively to screen readers; `info` and `success` announce politely. Use `Alert` for messages tied to a region of the page.',
      },
    },
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger'] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '34rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tone: 'info',
    title: 'Scheduled maintenance',
    children: 'The API will be read-only on Sunday from 02:00–04:00 UTC.',
  },
}

export const Tones: Story = {
  args: {},
  render: () => (
    <Stack gap="sm">
      <Alert tone="info" title="Heads up">
        A new version of the CLI is available.
      </Alert>
      <Alert tone="success" title="Deployment complete">
        Version 2.4.1 is live in production.
      </Alert>
      <Alert tone="warning" title="Billing needs attention">
        Your card ending 4242 expires next month.
      </Alert>
      <Alert tone="danger" title="Build failed">
        3 tests failed on the main branch.
      </Alert>
    </Stack>
  ),
}

export const TitleOnly: Story = {
  name: 'Title only',
  args: {},
  render: () => (
    <Stack gap="sm">
      <Alert tone="success" title="Settings saved." />
      <Alert tone="danger" title="Could not connect to the database." />
    </Stack>
  ),
}

export const BodyOnly: Story = {
  name: 'Body only',
  args: {},
  render: () => <Alert tone="info">Invites expire after 7 days.</Alert>,
}

export const Dismissible: Story = {
  args: {},
  render: function DismissibleStory() {
    const [shown, setShown] = useState(true)

    return shown ? (
      <Alert tone="success" title="Settings saved" onDismiss={() => setShown(false)}>
        Your notification preferences have been updated.
      </Alert>
    ) : (
      <Button onClick={() => setShown(true)}>Show the alert again</Button>
    )
  },
}
