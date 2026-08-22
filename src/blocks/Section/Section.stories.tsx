import type { Meta, StoryObj } from '@storybook/react-vite'
import { Section } from './Section'
import { Grid } from '../../components/Grid/Grid'
import { Card } from '../../components/Card/Card'
import { Text } from '../../components/Text/Text'

const meta = {
  title: 'Blocks/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          'The shell every page block is built from. Owns vertical rhythm, background tone and content width, and renders the standard eyebrow / title / description heading group. Use it directly for sections the library does not already cover.',
      },
    },
  },
  argTypes: {
    tone: { control: 'select', options: ['default', 'muted', 'inverted', 'primary', 'gradient'] },
    spacing: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
    align: { control: 'inline-radio', options: ['start', 'center'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
  },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

const Body = (
  <Grid columns={3} gap="lg">
    {['Discovery', 'Design', 'Delivery'].map((title) => (
      <Card key={title} title={title}>
        <Text size="sm" tone="muted">
          Whatever content the section is wrapping.
        </Text>
      </Card>
    ))}
  </Grid>
)

export const Default: Story = {
  args: {
    eyebrow: 'Process',
    title: 'How we work',
    description: 'Three phases, each with a clear hand-off.',
    children: Body,
  },
}

export const LeftAligned: Story = {
  name: 'Left aligned',
  args: { ...Default.args, align: 'start' },
}

export const Tones: Story = {
  args: { children: null },
  render: () => (
    <>
      {(['default', 'muted', 'primary', 'inverted', 'gradient'] as const).map((tone) => (
        <Section
          key={tone}
          tone={tone}
          spacing="md"
          eyebrow={`tone="${tone}"`}
          title="A section heading"
          description="Body copy and eyebrow adapt to the tone automatically."
        />
      ))}
    </>
  ),
}

export const HeadingOnly: Story = {
  name: 'Heading only',
  args: {
    title: 'A section with no body',
    description: 'Useful as a divider between denser parts of a page.',
    tone: 'muted',
  },
}
