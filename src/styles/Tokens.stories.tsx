import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stack } from '../components/Stack/Stack'
import { Box } from '../components/Box/Box'
import { Text } from '../components/Text/Text'
import { Heading } from '../components/Heading/Heading'

/**
 * Foundations page. Every swatch reads its value from the same custom property
 * a component would, so if a token is renamed or dropped this page shows it.
 */
const meta = {
  title: 'Foundations/Tokens',
  parameters: {
    docs: {
      description: {
        component:
          'The token layer. Components reference these as `var(--nn-*)`; the Tailwind preset re-exports the same values as utilities (`bg-surface-1`, `gap-md`, `rounded-lg`, `text-body`).',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const Row = ({ name, children }: { name: string; children: React.ReactNode }) => (
  <Stack direction="row" gap="md" align="center">
    <div style={{ width: '16rem', flexShrink: 0 }}>
      <Text size="caption" mono tone="muted">
        {name}
      </Text>
    </div>
    {children}
  </Stack>
)

const Swatch = ({ token }: { token: string }) => (
  <Row name={token}>
    <div
      style={{
        width: '3rem',
        height: '1.75rem',
        borderRadius: 'var(--nn-radius-sm)',
        backgroundColor: `var(${token})`,
        border: '1px solid var(--nn-color-border)',
        flexShrink: 0,
      }}
    />
  </Row>
)

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Stack gap="sm">
    <Heading level={3}>{title}</Heading>
    <Stack gap="2xs">{children}</Stack>
  </Stack>
)

export const Colours: Story = {
  render: () => (
    <Stack gap="xl">
      <Section title="Surfaces & lines">
        {[
          '--nn-color-surface-1',
          '--nn-color-surface-2',
          '--nn-color-surface-3',
          '--nn-color-border',
          '--nn-color-border-strong',
        ].map((token) => (
          <Swatch key={token} token={token} />
        ))}
      </Section>

      <Section title="Text">
        {['--nn-color-text', '--nn-color-text-muted', '--nn-color-text-subtle'].map((token) => (
          <Row key={token} name={token}>
            <Text style={{ color: `var(${token})` }}>The quick brown fox</Text>
          </Row>
        ))}
      </Section>

      <Section title="Primary">
        {[
          '--nn-color-primary',
          '--nn-color-primary-hover',
          '--nn-color-primary-active',
          '--nn-color-primary-subtle',
        ].map((token) => (
          <Swatch key={token} token={token} />
        ))}
      </Section>

      <Section title="Status">
        {['--nn-color-success', '--nn-color-warning', '--nn-color-danger', '--nn-color-info'].map(
          (token) => (
            <Swatch key={token} token={token} />
          ),
        )}
      </Section>
    </Stack>
  ),
}

export const Spacing: Story = {
  render: () => (
    <Stack gap="2xs">
      {['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].map((step) => (
        <Row key={step} name={`--nn-space-${step}`}>
          <div
            style={{
              height: '1rem',
              width: `var(--nn-space-${step})`,
              backgroundColor: 'var(--nn-color-primary)',
              borderRadius: 'var(--nn-radius-xs)',
            }}
          />
        </Row>
      ))}
    </Stack>
  ),
}

export const Width: Story = {
  render: () => (
    <Stack gap="sm">
      {['prose', 'narrow', 'content', 'page', 'wide'].map((step) => (
        <Row key={step} name={`--nn-width-${step}`}>
          <div
            style={{
              height: '0.75rem',
              width: `min(100%, var(--nn-width-${step}))`,
              backgroundColor: 'var(--nn-color-primary-subtle)',
              border: '1px solid var(--nn-color-primary)',
              borderRadius: 'var(--nn-radius-xs)',
            }}
          />
        </Row>
      ))}
    </Stack>
  ),
}

export const Radius: Story = {
  render: () => (
    <Stack direction="row" gap="md" wrap>
      {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((step) => (
        <Stack key={step} gap="2xs" align="center">
          <div
            style={{
              width: '4rem',
              height: '4rem',
              backgroundColor: 'var(--nn-color-primary-subtle)',
              border: '1px solid var(--nn-color-primary)',
              borderRadius: `var(--nn-radius-${step})`,
            }}
          />
          <Text size="caption" mono tone="muted">
            {step}
          </Text>
        </Stack>
      ))}
    </Stack>
  ),
}

export const Typography: Story = {
  render: () => (
    <Stack gap="lg">
      <Section title="Headings">
        {(['display', 'h1', 'h2', 'h3', 'h4'] as const).map((size) => (
          <Row key={size} name={`--nn-text-${size}`}>
            <Heading level={2} size={size}>
              Design that ships
            </Heading>
          </Row>
        ))}
      </Section>
      <Section title="Body">
        {(['body-lg', 'body', 'sm', 'caption'] as const).map((size) => (
          <Row key={size} name={`--nn-text-${size}`}>
            <Text size={size}>The quick brown fox jumps over the lazy dog.</Text>
          </Row>
        ))}
      </Section>
    </Stack>
  ),
}

export const Elevation: Story = {
  render: () => (
    <Stack direction="row" gap="xl" wrap>
      {(['sm', 'md', 'lg'] as const).map((step) => (
        <Stack key={step} gap="2xs" align="center">
          <Box background="surface-1" padding="lg" radius="lg" shadow={step} />
          <Text size="caption" mono tone="muted">
            --nn-shadow-{step}
          </Text>
        </Stack>
      ))}
    </Stack>
  ),
}
