import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pricing } from './Pricing'
import { Button } from '../../components/Button/Button'
import { Tabs } from '../../components/Tabs/Tabs'
import { TIERS } from '../../examples/demo-data'

const withActions = TIERS.map((tier) => ({
  ...tier,
  action: (
    <Button variant={tier.featured ? 'primary' : 'secondary'} fullWidth>
      {tier.price === 'Custom' ? 'Contact sales' : 'Get started'}
    </Button>
  ),
}))

const meta = {
  title: 'Blocks/Pricing',
  component: Pricing,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          'Mark exactly one tier `featured` — it gets the accent border, a lift and room for a badge. Prices are formatted strings, so currency and locale stay yours to decide.',
      },
    },
  },
  argTypes: {
    tone: { control: 'select', options: ['default', 'muted', 'inverted', 'primary', 'gradient'] },
  },
} satisfies Meta<typeof Pricing>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    eyebrow: 'Pricing',
    title: 'Simple, predictable pricing',
    description: 'Start free. Upgrade when your team outgrows it.',
    tiers: withActions,
    note: 'All prices in USD, excluding tax. Cancel any time.',
  },
}

export const Muted: Story = {
  args: { ...Default.args, tone: 'muted' },
}

export const TwoTiers: Story = {
  name: 'Two tiers',
  args: {
    title: 'Two plans, no surprises',
    tiers: withActions.slice(0, 2),
  },
}

export const WithBillingToggle: Story = {
  name: 'With a billing toggle',
  args: { tiers: withActions },
  render: function ToggleStory(args) {
    const [period, setPeriod] = useState('monthly')
    const annual = period === 'annual'

    // `PricingTier.price` is a ReactNode so callers control formatting, which
    // means the numbers have to live here rather than being parsed back out.
    const monthly: (number | null)[] = [0, 29, null]

    const tiers = TIERS.map((tier, index) => {
      const amount = monthly[index]
      const custom = amount === null || amount === undefined

      return {
        ...tier,
        price: custom ? 'Custom' : `$${annual ? amount * 10 : amount}`,
        period: custom ? undefined : annual ? '/yr' : '/mo',
        action: (
          <Button variant={tier.featured ? 'primary' : 'secondary'} fullWidth>
            {custom ? 'Contact sales' : 'Get started'}
          </Button>
        ),
      }
    })

    return (
      <Pricing
        {...args}
        title="Simple, predictable pricing"
        description="Save two months by paying annually."
        tiers={tiers}
        note={annual ? 'Billed once a year.' : 'Billed monthly.'}
        toggle={
          <Tabs
            variant="pill"
            aria-label="Billing period"
            value={period}
            onChange={setPeriod}
            items={[
              { id: 'monthly', label: 'Monthly' },
              { id: 'annual', label: 'Annual — save 17%' },
            ]}
          />
        }
      />
    )
  },
}
