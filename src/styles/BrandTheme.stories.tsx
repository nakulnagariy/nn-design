import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stack } from '../components/Stack/Stack'
import { Heading } from '../components/Heading/Heading'
import { Text } from '../components/Text/Text'
import { Button } from '../components/Button/Button'
import { Badge } from '../components/Badge/Badge'
import { Card } from '../components/Card/Card'
import { Alert } from '../components/Alert/Alert'
import { Switch } from '../components/Switch/Switch'

/**
 * Every component reads its colour from the semantic `--nn-color-*` tokens, so
 * re-branding is a matter of reassigning a handful of custom properties on any
 * ancestor — no build step, no config, no component overrides.
 *
 * The panels below are identical markup. The right one sets six tokens.
 */
const meta = {
  title: 'Foundations/Theming',
  parameters: {
    docs: {
      description: {
        component:
          'Reassign `--nn-color-primary`, `--nn-color-primary-hover`, `--nn-color-focus` and the subtle pair on a wrapper element and the whole subtree follows. See `docs/theming.md` for the full recipe, including dark mode and Tailwind.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const emerald: CSSProperties = {
  // Raw ramp values are theme-independent; point the semantic tokens at them.
  ['--nn-color-primary' as string]: '#059669',
  ['--nn-color-primary-hover' as string]: '#047857',
  ['--nn-color-primary-active' as string]: '#065f46',
  ['--nn-color-primary-fg' as string]: '#ffffff',
  ['--nn-color-primary-subtle' as string]: '#ecfdf5',
  ['--nn-color-primary-subtle-fg' as string]: '#065f46',
  ['--nn-color-focus' as string]: '#10b981',
}

function Panel({ label }: { label: string }) {
  return (
    <Card title={label} description="Same markup, different tokens.">
      <Stack gap="md">
        <Stack direction="row" gap="sm" wrap>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Badge tone="primary">New</Badge>
        </Stack>
        <Alert tone="info" title="Heads up">
          Alerts keep their status colours; only the brand hue moves.
        </Alert>
        <Switch label="Email notifications" defaultChecked />
      </Stack>
    </Card>
  )
}

export const Rebrand: Story = {
  render: () => (
    <Stack gap="lg">
      <Stack gap="2xs">
        <Heading level={2}>Rebrand by token override</Heading>
        <Text tone="muted">The right panel sets seven custom properties on its wrapper.</Text>
      </Stack>
      <div
        style={{
          display: 'grid',
          gap: 'var(--nn-space-lg)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',
        }}
      >
        <div>
          <Panel label="Default (indigo)" />
        </div>
        <div style={emerald}>
          <Panel label="Emerald brand" />
        </div>
      </div>
    </Stack>
  ),
}
