import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header } from './Header'
import { Button } from '../../components/Button/Button'
import { Avatar } from '../../components/Avatar/Avatar'
import { Dropdown } from '../../components/Dropdown/Dropdown'
import { Box } from '../../components/Box/Box'
import { Text } from '../../components/Text/Text'
import { Logo, NAV_LINKS } from '../../examples/demo-data'

const meta = {
  title: 'Blocks/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          'Below 64rem the links collapse behind a hamburger that expands to a panel; above it they sit inline. **Narrow the preview** to see the mobile behaviour.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'centered', 'minimal'] },
    sticky: { control: 'boolean' },
    transparent: { control: 'boolean' },
    bordered: { control: 'boolean' },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

const SignedOut = (
  <>
    <Button variant="ghost" size="sm">
      Sign in
    </Button>
    <Button variant="primary" size="sm">
      Get started
    </Button>
  </>
)

export const Default: Story = {
  args: {
    logo: <Logo />,
    links: NAV_LINKS,
    actions: SignedOut,
  },
}

export const Centered: Story = {
  args: {
    variant: 'centered',
    logo: <Logo />,
    links: NAV_LINKS,
    actions: SignedOut,
  },
}

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    logo: <Logo />,
    actions: (
      <Button variant="primary" size="sm">
        Get started
      </Button>
    ),
  },
}

export const SignedIn: Story = {
  name: 'With an account menu',
  args: {
    logo: <Logo />,
    links: NAV_LINKS,
    actions: (
      <Dropdown
        label="Account"
        trigger={<Avatar name="Ada Lovelace" size="sm" />}
        items={[
          { id: 'profile', label: 'Your profile', href: '#profile' },
          { id: 'settings', label: 'Settings', href: '#settings' },
          { id: 'signout', label: 'Sign out', separated: true, destructive: true },
        ]}
      />
    ),
  },
}

export const StickyOnScroll: Story = {
  name: 'Sticky',
  args: { logo: <Logo />, links: NAV_LINKS, actions: SignedOut, sticky: true },
  render: (args) => (
    <>
      <Header {...args} />
      <Box padding="xl">
        {Array.from({ length: 24 }, (_, i) => (
          <Text key={i} tone="muted" style={{ marginBottom: '1rem' }}>
            {i + 1}. Scroll — the header stays pinned to the top of the viewport.
          </Text>
        ))}
      </Box>
    </>
  ),
}

export const TransparentOverHero: Story = {
  name: 'Transparent over a hero',
  args: { logo: <Logo />, links: NAV_LINKS, actions: SignedOut, transparent: true },
  render: (args) => (
    <>
      <Header {...args} />
      <div
        style={{
          minHeight: '70vh',
          display: 'grid',
          placeItems: 'center',
          marginTop: '-4rem',
          paddingTop: '4rem',
          background: 'linear-gradient(135deg, var(--nn-indigo-600), var(--nn-sky-500))',
          color: '#fff',
        }}
      >
        <Text style={{ color: 'inherit' }}>
          The header starts transparent and fades in a solid background once you scroll.
        </Text>
      </div>
      <Box padding="xl">
        {Array.from({ length: 16 }, (_, i) => (
          <Text key={i} tone="muted" style={{ marginBottom: '1rem' }}>
            {i + 1}. Keep scrolling.
          </Text>
        ))}
      </Box>
    </>
  ),
}
