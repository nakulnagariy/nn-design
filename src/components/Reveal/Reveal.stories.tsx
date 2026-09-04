import type { Meta, StoryObj } from '@storybook/react-vite'
import { Reveal } from './Reveal'
import { Stack } from '../Stack/Stack'
import { Grid } from '../Grid/Grid'
import { Box } from '../Box/Box'
import { Text } from '../Text/Text'
import { Heading } from '../Heading/Heading'
import { Card } from '../Card/Card'

const meta = {
  title: 'Motion/Reveal',
  component: Reveal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Animates its contents into view on scroll using `IntersectionObserver` plus a CSS transition — no animation library. Motion is suppressed entirely under `prefers-reduced-motion`, where content simply appears. **Scroll the preview** to trigger each example.',
      },
    },
  },
  argTypes: {
    animation: {
      control: 'select',
      options: ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale', 'blur'],
    },
    delay: { control: { type: 'number', step: 50 } },
    duration: { control: { type: 'number', step: 100 } },
    repeat: { control: 'boolean' },
  },
} satisfies Meta<typeof Reveal>

export default meta
type Story = StoryObj<typeof meta>

const Spacer = () => (
  <Box padding="2xl">
    <Text tone="subtle" align="center" size="sm">
      ↓ keep scrolling ↓
    </Text>
  </Box>
)

export const Default: Story = {
  args: { animation: 'slide-up', repeat: true },
  render: (args) => (
    <Stack gap="lg">
      <Text tone="muted" size="sm">
        `repeat` is on here so the animation replays every time you scroll it back into view.
      </Text>
      <Spacer />
      <Reveal {...args}>
        <Box background="primary-subtle" padding="xl" radius="xl">
          <Heading level={3}>Now you see me</Heading>
        </Box>
      </Reveal>
      <Spacer />
    </Stack>
  ),
}

export const Animations: Story = {
  args: {},
  render: () => (
    <Stack gap="xl">
      <Text tone="muted" size="sm">
        Each block uses a different `animation`. Scroll slowly to compare.
      </Text>
      {(['fade', 'slide-up', 'slide-left', 'slide-right', 'scale', 'blur'] as const).map(
        (animation) => (
          <Reveal key={animation} animation={animation} repeat>
            <Box background="surface-2" padding="lg" radius="lg" border>
              <Text mono weight="medium">
                {animation}
              </Text>
            </Box>
          </Reveal>
        ),
      )}
      <Spacer />
    </Stack>
  ),
}

export const Staggered: Story = {
  args: {},
  render: () => (
    <Stack gap="lg">
      <Text tone="muted" size="sm">
        `stagger` animates each direct child in sequence. Children keep their grid placement — the
        wrapper is `display: contents`.
      </Text>
      <Spacer />
      <Grid columns={3} gap="md">
        <Reveal stagger repeat>
          {Array.from({ length: 6 }, (_, i) => (
            <Card key={i} title={`Card ${i + 1}`}>
              <Text size="sm" tone="muted">
                Arrives {i * 80}ms after the first.
              </Text>
            </Card>
          ))}
        </Reveal>
      </Grid>
      <Spacer />
    </Stack>
  ),
}

export const CustomTiming: Story = {
  name: 'Delay and duration',
  args: {},
  render: () => (
    <Stack gap="md">
      <Spacer />
      {[
        { delay: 0, duration: 300 },
        { delay: 150, duration: 600 },
        { delay: 300, duration: 1000 },
      ].map((timing) => (
        <Reveal key={timing.delay} animation="slide-right" repeat {...timing}>
          <Box background="surface-3" padding="md" radius="md">
            <Text size="sm" mono>
              delay={timing.delay}ms duration={timing.duration}ms
            </Text>
          </Box>
        </Reveal>
      ))}
      <Spacer />
    </Stack>
  ),
}
