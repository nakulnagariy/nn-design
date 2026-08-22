import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header } from '../blocks/Header/Header'
import { Container } from '../components/Container/Container'
import { Grid } from '../components/Grid/Grid'
import { Stack } from '../components/Stack/Stack'
import { Box } from '../components/Box/Box'
import { Card } from '../components/Card/Card'
import { Heading } from '../components/Heading/Heading'
import { Text } from '../components/Text/Text'
import { Badge } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Avatar } from '../components/Avatar/Avatar'
import { Dropdown } from '../components/Dropdown/Dropdown'
import { Table } from '../components/Table/Table'
import type { TableColumn } from '../components/Table/Table'
import { Tabs } from '../components/Tabs/Tabs'
import { Alert } from '../components/Alert/Alert'
import { Divider } from '../components/Divider/Divider'
import { Reveal } from '../components/Reveal/Reveal'
import { Logo } from './demo-data'

interface Deploy {
  id: string
  project: string
  branch: string
  author: string
  status: 'Ready' | 'Building' | 'Failed'
  duration: string
}

const DEPLOYS: Deploy[] = [
  { id: '1', project: 'northwind-web', branch: 'main', author: 'Ada Lovelace', status: 'Ready', duration: '52s' },
  { id: '2', project: 'northwind-api', branch: 'feat/billing', author: 'Grace Hopper', status: 'Building', duration: '—' },
  { id: '3', project: 'northwind-docs', branch: 'main', author: 'Alan Turing', status: 'Ready', duration: '31s' },
  { id: '4', project: 'northwind-web', branch: 'fix/nav', author: 'Katherine Johnson', status: 'Failed', duration: '18s' },
  { id: '5', project: 'northwind-api', branch: 'main', author: 'Ada Lovelace', status: 'Ready', duration: '1m 04s' },
]

const STATUS_TONE = { Ready: 'success', Building: 'info', Failed: 'danger' } as const

const COLUMNS: TableColumn<Deploy>[] = [
  {
    key: 'project',
    header: 'Project',
    cell: (row) => (
      <Stack gap="3xs" style={{ minWidth: 0 }}>
        <Text size="sm" weight="medium">
          {row.project}
        </Text>
        <Text size="caption" tone="subtle" mono>
          {row.branch}
        </Text>
      </Stack>
    ),
  },
  {
    key: 'author',
    header: 'Author',
    cell: (row) => (
      <Stack direction="row" gap="xs" align="center">
        <Avatar name={row.author} size="xs" />
        <Text size="sm">{row.author}</Text>
      </Stack>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => (
      <Badge tone={STATUS_TONE[row.status]} dot>
        {row.status}
      </Badge>
    ),
  },
  { key: 'duration', header: 'Duration', align: 'end', width: '7rem' },
]

const NAV = [
  { label: 'Overview', icon: '◫', active: true },
  { label: 'Deployments', icon: '↑' },
  { label: 'Analytics', icon: '◷' },
  { label: 'Logs', icon: '≡' },
  { label: 'Settings', icon: '⚙' },
]

const KPIS = [
  { label: 'Deployments', value: '1,284', delta: '+12%', tone: 'success' as const },
  { label: 'Success rate', value: '98.2%', delta: '+0.4%', tone: 'success' as const },
  { label: 'Avg build time', value: '47s', delta: '−6s', tone: 'success' as const },
  { label: 'Failed builds', value: '23', delta: '+3', tone: 'danger' as const },
]

const meta = {
  title: 'Examples/Dashboard',
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          'An application shell rather than a marketing page — sidebar, KPI row, tabs and a data table. The sidebar is composed from `Stack` and `Box` rather than a block, showing how to build app chrome the block library deliberately does not cover.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {
  render: () => (
    <Stack gap="none" style={{ minHeight: '100vh' }}>
      <Header
        sticky
        variant="minimal"
        logo={<Logo />}
        actions={
          <Stack direction="row" gap="sm" align="center">
            <Button variant="secondary" size="sm">
              Invite
            </Button>
            <Button variant="primary" size="sm">
              New project
            </Button>
            <Dropdown
              label="Account"
              trigger={<Avatar name="Ada Lovelace" size="sm" status="online" />}
              items={[
                { id: 'profile', label: 'Your profile', href: '#profile' },
                { id: 'team', label: 'Team settings', href: '#team' },
                { id: 'signout', label: 'Sign out', separated: true, destructive: true },
              ]}
            />
          </Stack>
        }
      />

      <div className="nn-dash">
        {/* Sidebar — plain primitives, no dedicated block. */}
        <Box as="aside" background="surface-2" padding="md" className="nn-dash__aside">
          <Stack gap="2xs">
            <Text size="caption" tone="subtle" weight="semibold" style={{ padding: '0 0.5rem 0.25rem' }}>
              WORKSPACE
            </Text>
            {NAV.map((item) => (
              <a
                key={item.label}
                href="#nav"
                className="nn-focusable"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--nn-space-xs)',
                  padding: 'var(--nn-space-xs) var(--nn-space-sm)',
                  borderRadius: 'var(--nn-radius-md)',
                  fontSize: 'var(--nn-text-sm)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: item.active ? 'var(--nn-color-primary)' : 'var(--nn-color-text-muted)',
                  background: item.active ? 'var(--nn-color-primary-subtle)' : undefined,
                }}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </Stack>

          <Divider style={{ margin: 'var(--nn-space-md) 0' }} />

          <Card variant="filled" padding="sm">
            <Stack gap="xs">
              <Text size="caption" weight="semibold">
                Free plan
              </Text>
              <Text size="caption" tone="subtle">
                72 of 100 builds used this month.
              </Text>
              <Button size="sm" variant="primary" fullWidth>
                Upgrade
              </Button>
            </Stack>
          </Card>
        </Box>

        {/* Main column */}
        <Box as="main" padding="lg" className="nn-dash__main">
          <Container size="full" flush>
            <Stack gap="lg">
              <Stack direction="row" justify="between" align="center" gap="md" wrap>
                <Stack gap="3xs">
                  <Heading level={1} size="h2">
                    Overview
                  </Heading>
                  <Text tone="muted" size="sm">
                    Everything that happened across your projects this week.
                  </Text>
                </Stack>
                <Button size="sm">Export CSV</Button>
              </Stack>

              <Alert tone="warning" title="Build minutes running low">
                You have used 72% of this month's allowance. Upgrade to avoid queued builds.
              </Alert>

              <Grid columns={4} gap="md">
                <Reveal stagger>
                  {KPIS.map((kpi) => (
                    <Card key={kpi.label} variant="outlined">
                      {/* align="start" so the Badge keeps its intrinsic width —
                          a column Stack stretches children by default. */}
                      <Stack gap="2xs" align="start">
                        <Text size="caption" tone="subtle" weight="medium">
                          {kpi.label}
                        </Text>
                        <Heading level={2} size="h2">
                          {kpi.value}
                        </Heading>
                        <Badge tone={kpi.tone} size="sm" variant="subtle">
                          {kpi.delta} vs last week
                        </Badge>
                      </Stack>
                    </Card>
                  ))}
                </Reveal>
              </Grid>

              <Card
                padding="none"
                title="Recent deployments"
                description="Across all projects"
                action={<Button size="sm">View all</Button>}
              >
                <Tabs
                  aria-label="Deployment filter"
                  items={[
                    {
                      id: 'all',
                      label: 'All',
                      content: <Table columns={COLUMNS} data={DEPLOYS} rowKey={(r) => r.id} hoverable />,
                    },
                    {
                      id: 'failed',
                      label: 'Failed',
                      badge: (
                        <Badge tone="danger" size="sm">
                          1
                        </Badge>
                      ),
                      content: (
                        <Table
                          columns={COLUMNS}
                          data={DEPLOYS.filter((d) => d.status === 'Failed')}
                          rowKey={(r) => r.id}
                          hoverable
                        />
                      ),
                    },
                    {
                      id: 'building',
                      label: 'Building',
                      content: (
                        <Table
                          columns={COLUMNS}
                          data={DEPLOYS.filter((d) => d.status === 'Building')}
                          rowKey={(r) => r.id}
                          hoverable
                        />
                      ),
                    },
                  ]}
                />
              </Card>
            </Stack>
          </Container>
        </Box>
      </div>

      {/* Layout for the shell. In a real app this would live in your CSS. */}
      <style>{`
        .nn-dash { display: grid; grid-template-columns: 1fr; flex: 1; }
        .nn-dash__aside { display: none; border-inline-end: 1px solid var(--nn-color-border); }
        @media (min-width: 64rem) {
          .nn-dash { grid-template-columns: 16rem minmax(0, 1fr); }
          .nn-dash__aside { display: block; }
        }
        .nn-dash__main { min-width: 0; }
        /* The tabs inside a padding="none" card need their own gutter. */
        .nn-dash__main .nn-tabs__list { padding-inline: var(--nn-space-md); }
        .nn-dash__main .nn-tabs__panel { padding-top: 0; }
      `}</style>
    </Stack>
  ),
}
