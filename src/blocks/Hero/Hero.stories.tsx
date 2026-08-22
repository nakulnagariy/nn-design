import type { Meta, StoryObj } from '@storybook/react-vite'
import { Hero } from './Hero'
import { Button } from '../../components/Button/Button'
import { Badge } from '../../components/Badge/Badge'
import { Input } from '../../components/Input/Input'
import { Stack } from '../../components/Stack/Stack'
import { ScreenshotFrame } from '../../examples/demo-data'

const meta = {
  title: 'Blocks/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          'The opening section of a landing page. The title renders as `h1`, so use one `Hero` per page.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['centered', 'split', 'gradient'] },
    height: { control: 'inline-radio', options: ['auto', 'tall', 'screen'] },
    mediaFirst: { control: 'boolean' },
  },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

const Actions = (
  <>
    <Button variant="primary" size="lg">
      Start building
    </Button>
    <Button size="lg">Read the docs</Button>
  </>
)

export const Centered: Story = {
  args: {
    badge: <Badge tone="primary">v2.0 is out</Badge>,
    title: 'Ship your design system in an afternoon',
    description:
      'Components, tokens and page blocks that already work together — so you spend your time on the product, not the primitives.',
    actions: Actions,
    note: 'Free forever for open source.',
  },
}

export const WithScreenshot: Story = {
  name: 'Centered with media',
  args: {
    ...Centered.args,
    media: <ScreenshotFrame />,
  },
}

export const Split: Story = {
  args: {
    variant: 'split',
    eyebrow: 'Design systems',
    title: 'Every component, already on brand',
    description:
      'One token layer drives colour, spacing and type across twenty components and a dozen page blocks.',
    actions: Actions,
    media: <ScreenshotFrame label="Components" />,
  },
}

export const SplitMediaFirst: Story = {
  name: 'Split, media first',
  args: { ...Split.args, mediaFirst: true },
}

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    height: 'tall',
    badge: <Badge tone="neutral" variant="solid">Now in beta</Badge>,
    title: 'Design and code, finally speaking the same language',
    description: 'Tokens in, production components out. No handoff document required.',
    actions: (
      <>
        <Button variant="secondary" size="lg">
          Get early access
        </Button>
        <Button variant="ghost" size="lg" style={{ color: '#fff' }}>
          Watch the demo
        </Button>
      </>
    ),
    note: 'No credit card required.',
  },
}

export const WithSignupForm: Story = {
  name: 'With an inline form',
  args: {
    title: 'Start free, scale when you need to',
    description: 'Create an account in under a minute. No credit card, no sales call.',
    actions: (
      <Stack direction="row" gap="xs" align="start" style={{ width: 'min(28rem, 100%)' }}>
        {/* No visible label here by design — the surrounding copy carries the
            context, so the field is named with aria-label instead. */}
        <Input placeholder="you@company.com" type="email" aria-label="Work email" />
        <Button variant="primary" size="md">
          Get started
        </Button>
      </Stack>
    ),
    note: 'We will never share your address.',
  },
}
