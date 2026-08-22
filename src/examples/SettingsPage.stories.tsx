import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header } from '../blocks/Header/Header'
import { Container } from '../components/Container/Container'
import { Stack } from '../components/Stack/Stack'
import { Grid } from '../components/Grid/Grid'
import { Card } from '../components/Card/Card'
import { Heading } from '../components/Heading/Heading'
import { Text } from '../components/Text/Text'
import { Input } from '../components/Input/Input'
import { Select } from '../components/Select/Select'
import { Switch } from '../components/Switch/Switch'
import { Radio } from '../components/Radio/Radio'
import { Checkbox } from '../components/Checkbox/Checkbox'
import { Button } from '../components/Button/Button'
import { Avatar } from '../components/Avatar/Avatar'
import { Badge } from '../components/Badge/Badge'
import { Tabs } from '../components/Tabs/Tabs'
import { Modal } from '../components/Modal/Modal'
import { Divider } from '../components/Divider/Divider'
import { Logo } from './demo-data'

const meta = {
  title: 'Examples/Settings',
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          'A form-heavy account page: profile fields, notification switches, a plan picker and a destructive-action confirmation. Shows the form components working together with real labels, hints and validation states.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function ProfilePanel() {
  return (
    <Stack gap="lg">
      <Card title="Profile" description="This is how you appear to your teammates.">
        <Stack gap="lg">
          <Stack direction="row" gap="md" align="center" wrap>
            <Avatar name="Ada Lovelace" size="xl" />
            <Stack gap="2xs">
              <Stack direction="row" gap="xs">
                <Button size="sm">Upload new</Button>
                <Button size="sm" variant="ghost">
                  Remove
                </Button>
              </Stack>
              <Text size="caption" tone="subtle">
                JPG or PNG, up to 2 MB.
              </Text>
            </Stack>
          </Stack>

          <Divider />

          <Grid columns={2} gap="md">
            <Input label="First name" defaultValue="Ada" required />
            <Input label="Last name" defaultValue="Lovelace" required />
          </Grid>

          <Input
            label="Work email"
            type="email"
            defaultValue="ada@northwind.com"
            hint="Used for sign-in and billing receipts."
          />

          <Input
            label="Job title"
            defaultValue="Staff Engineer"
            hint="Shown next to your name in comments."
          />

          <Select
            label="Timezone"
            defaultValue="gmt"
            options={[
              { label: '(GMT+00:00) London', value: 'gmt' },
              { label: '(GMT+05:30) Mumbai', value: 'ist' },
              { label: '(GMT−05:00) New York', value: 'est' },
              { label: '(GMT−08:00) Los Angeles', value: 'pst' },
            ]}
          />
        </Stack>
      </Card>

      <Stack direction="row" gap="xs" justify="end">
        <Button>Cancel</Button>
        <Button variant="primary">Save changes</Button>
      </Stack>
    </Stack>
  )
}

function NotificationsPanel() {
  const [state, setState] = useState({
    digest: true,
    mentions: true,
    deploys: false,
    marketing: false,
  })

  const toggle = (key: keyof typeof state) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setState((s) => ({ ...s, [key]: e.target.checked }))

  return (
    <Stack gap="lg">
      <Card title="Email" description="Choose what lands in your inbox.">
        <Stack gap="md">
          <Switch
            label="Weekly digest"
            description="A summary of activity across your projects, every Monday."
            checked={state.digest}
            onChange={toggle('digest')}
          />
          <Switch
            label="Mentions"
            description="When someone @mentions you in a comment or review."
            checked={state.mentions}
            onChange={toggle('mentions')}
          />
          <Switch
            label="Deployment results"
            description="Every time a build finishes, pass or fail."
            checked={state.deploys}
            onChange={toggle('deploys')}
          />
          <Switch
            label="Product news"
            description="Occasional updates about new features."
            checked={state.marketing}
            onChange={toggle('marketing')}
          />
        </Stack>
      </Card>

      <Card title="Delivery" description="How urgent alerts reach you.">
        <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
          <legend style={{ padding: 0, marginBottom: 'var(--nn-space-sm)' }}>
            <Text weight="medium">Alert channel</Text>
          </legend>
          <Stack gap="sm">
            <Radio name="channel" value="email" label="Email only" defaultChecked />
            <Radio
              name="channel"
              value="slack"
              label="Slack"
              description="Posts to #deploys in your workspace."
            />
            <Radio
              name="channel"
              value="both"
              label="Both"
              description="Recommended for on-call rotations."
            />
          </Stack>
        </fieldset>
      </Card>
    </Stack>
  )
}

function DangerPanel() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [acknowledged, setAcknowledged] = useState(false)

  return (
    <>
      <Card
        title="Danger zone"
        description="These actions are permanent and cannot be undone."
        variant="outlined"
      >
        <Stack gap="md">
          <Stack direction="row" justify="between" align="center" gap="md" wrap>
            <Stack gap="3xs" style={{ minWidth: 0 }}>
              <Text weight="medium">Transfer ownership</Text>
              <Text size="sm" tone="muted">
                Move this workspace to another member.
              </Text>
            </Stack>
            <Button size="sm">Transfer</Button>
          </Stack>

          <Divider />

          <Stack direction="row" justify="between" align="center" gap="md" wrap>
            <Stack gap="3xs" style={{ minWidth: 0 }}>
              <Text weight="medium">Delete account</Text>
              <Text size="sm" tone="muted">
                Removes your profile and every project you own.
              </Text>
            </Stack>
            <Button size="sm" variant="danger" onClick={() => setConfirmOpen(true)}>
              Delete account
            </Button>
          </Stack>
        </Stack>
      </Card>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        size="sm"
        title="Delete your account?"
        description="This cannot be undone."
        footer={
          <>
            <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button variant="danger" disabled={!acknowledged} onClick={() => setConfirmOpen(false)}>
              Delete permanently
            </Button>
          </>
        }
      >
        <Stack gap="md">
          <Text size="sm">
            Every project, deployment and log you own will be removed immediately. Teammates will
            lose access to anything you created.
          </Text>
          <Checkbox
            label="I understand this is permanent"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
          />
        </Stack>
      </Modal>
    </>
  )
}

export const Page: Story = {
  render: () => (
    <>
      <Header
        sticky
        variant="minimal"
        logo={<Logo />}
        actions={<Avatar name="Ada Lovelace" size="sm" />}
      />

      <Container size="md">
        <Stack gap="lg" style={{ paddingBlock: 'var(--nn-space-xl)' }}>
          <Stack direction="row" gap="sm" align="center" justify="between" wrap>
            <Stack gap="3xs">
              <Heading level={1} size="h2">
                Settings
              </Heading>
              <Text tone="muted" size="sm">
                Manage your profile, notifications and account.
              </Text>
            </Stack>
            <Badge tone="primary" variant="subtle">
              Free plan
            </Badge>
          </Stack>

          <Tabs
            aria-label="Settings sections"
            items={[
              { id: 'profile', label: 'Profile', content: <ProfilePanel /> },
              { id: 'notifications', label: 'Notifications', content: <NotificationsPanel /> },
              { id: 'danger', label: 'Danger zone', content: <DangerPanel /> },
            ]}
          />
        </Stack>
      </Container>
    </>
  ),
}
