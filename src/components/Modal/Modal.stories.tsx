import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from './Modal'
import { Button } from '../Button/Button'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'
import { Input } from '../Input/Input'

const meta = {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Built on the native `<dialog>` element, so focus trapping, page inertness and Escape-to-close come for free. The component is controlled — it never closes itself, so `open` must actually flip in your state.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { open: false, onClose: () => {} },
  render: function DefaultStory(args) {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open dialog
        </Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          title="Invite teammates"
          description="They'll get an email with a join link."
          footer={
            <>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Send invites
              </Button>
            </>
          }
        >
          <Stack gap="md">
            <Input label="Email addresses" placeholder="ada@acme.com, grace@acme.com" />
            <Text size="sm" tone="muted">
              Invites expire after 7 days.
            </Text>
          </Stack>
        </Modal>
      </>
    )
  },
}

export const Destructive: Story = {
  args: { open: false, onClose: () => {} },
  render: function DestructiveStory() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete project
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="sm"
          title="Delete project"
          description="This cannot be undone."
          footer={
            <>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </>
          }
        >
          <Text>
            Everything in <strong>acme-web</strong> will be permanently removed, including its
            deployments and logs.
          </Text>
        </Modal>
      </>
    )
  },
}

export const Sizes: Story = {
  args: { open: false, onClose: () => {} },
  render: function SizesStory() {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | null>(null)

    return (
      <>
        <Stack direction="row" gap="xs">
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <Button key={s} onClick={() => setSize(s)}>
              Open {s}
            </Button>
          ))}
        </Stack>
        <Modal
          open={size !== null}
          onClose={() => setSize(null)}
          size={size ?? 'md'}
          title={`Size "${size ?? 'md'}"`}
          footer={<Button onClick={() => setSize(null)}>Close</Button>}
        >
          <Text>The panel width steps with the `size` prop; the backdrop is unchanged.</Text>
        </Modal>
      </>
    )
  },
}

export const ScrollingBody: Story = {
  name: 'Long content',
  args: { open: false, onClose: () => {} },
  render: function ScrollStory() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open terms</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Terms of service"
          footer={
            <Button variant="primary" onClick={() => setOpen(false)}>
              I accept
            </Button>
          }
        >
          <Stack gap="sm">
            {Array.from({ length: 14 }, (_, i) => (
              <Text key={i} size="sm" tone="muted">
                {i + 1}. The body scrolls on its own while the header and footer stay put, so the
                actions are always reachable.
              </Text>
            ))}
          </Stack>
        </Modal>
      </>
    )
  },
}
