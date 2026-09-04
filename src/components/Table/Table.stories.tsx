import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table } from './Table'
import type { TableColumn, TableProps } from './Table'
import { Badge } from '../Badge/Badge'
import { Avatar } from '../Avatar/Avatar'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'
import { Card } from '../Card/Card'

interface Row {
  id: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Invited' | 'Suspended'
  spend: number
}

const ROWS: Row[] = [
  {
    id: '1',
    name: 'Ada Lovelace',
    email: 'ada@acme.com',
    role: 'Owner',
    status: 'Active',
    spend: 1240,
  },
  {
    id: '2',
    name: 'Grace Hopper',
    email: 'grace@acme.com',
    role: 'Admin',
    status: 'Active',
    spend: 860,
  },
  {
    id: '3',
    name: 'Alan Turing',
    email: 'alan@acme.com',
    role: 'Member',
    status: 'Invited',
    spend: 0,
  },
  {
    id: '4',
    name: 'Katherine Johnson',
    email: 'kj@acme.com',
    role: 'Member',
    status: 'Suspended',
    spend: 320,
  },
]

const STATUS_TONE = {
  Active: 'success',
  Invited: 'info',
  Suspended: 'danger',
} as const

const columns: TableColumn<Row>[] = [
  {
    key: 'name',
    header: 'Member',
    cell: (row) => (
      <Stack direction="row" gap="xs" align="center">
        <Avatar name={row.name} size="sm" />
        <Stack gap="3xs" style={{ minWidth: 0 }}>
          <Text size="sm" weight="medium">
            {row.name}
          </Text>
          <Text size="caption" tone="subtle">
            {row.email}
          </Text>
        </Stack>
      </Stack>
    ),
  },
  { key: 'role', header: 'Role' },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => (
      <Badge tone={STATUS_TONE[row.status]} dot>
        {row.status}
      </Badge>
    ),
  },
  {
    key: 'spend',
    header: 'Spend',
    align: 'end',
    width: '8rem',
    cell: (row) => `$${row.spend.toLocaleString()}`,
  },
]

// Annotated rather than `satisfies Meta<typeof Table>`: `Table` is generic, and
// inferring the meta type from it collapses the row type to `unknown`, which
// makes every `cell` callback in `columns` fail to typecheck.
const meta: Meta<TableProps<Row>> = {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Define the shape once in `columns` and pass rows to `data`. It renders a plain semantic `<table>`, so it does not sort, paginate or virtualise — do that to `data` before it gets here.',
      },
    },
  },
  argTypes: {
    density: { control: 'inline-radio', options: ['compact', 'comfortable'] },
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<TableProps<Row>>

export const Default: Story = {
  args: {
    columns,
    data: ROWS,
    rowKey: (row) => row.id,
    caption: 'Team members and their monthly spend',
  },
}

export const Hoverable: Story = {
  args: { columns, data: ROWS, rowKey: (row) => row.id, hoverable: true },
}

export const Striped: Story = {
  args: { columns, data: ROWS, rowKey: (row) => row.id, striped: true },
}

export const Compact: Story = {
  args: { columns, data: ROWS, rowKey: (row) => row.id, density: 'compact' },
}

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyState: (
      <Stack gap="2xs" align="center">
        <Text weight="medium">No members yet</Text>
        <Text size="sm" tone="subtle">
          Invite someone to get started.
        </Text>
      </Stack>
    ),
  },
}

export const InCard: Story = {
  name: 'Inside a card',
  args: { columns, data: ROWS },
  render: (args) => (
    <Card padding="none" title="Team" description="4 members">
      <Table {...args} rowKey={(row) => row.id} hoverable />
    </Card>
  ),
}
