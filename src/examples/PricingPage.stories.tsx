import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header } from '../blocks/Header/Header'
import { Section } from '../blocks/Section/Section'
import { Pricing } from '../blocks/Pricing/Pricing'
import { FAQ } from '../blocks/FAQ/FAQ'
import { CTA } from '../blocks/CTA/CTA'
import { Footer } from '../blocks/Footer/Footer'
import { LogoCloud } from '../blocks/LogoCloud/LogoCloud'
import { Button } from '../components/Button/Button'
import { Tabs } from '../components/Tabs/Tabs'
import { Table } from '../components/Table/Table'
import type { TableColumn } from '../components/Table/Table'
import { Card } from '../components/Card/Card'
import { Text } from '../components/Text/Text'
import { BRAND, FAQS, FOOTER_COLUMNS, LOGOS, Logo, NAV_LINKS, TIERS } from './demo-data'

interface ComparisonRow {
  feature: string
  starter: string
  pro: string
  enterprise: string
}

const COMPARISON: ComparisonRow[] = [
  { feature: 'Projects', starter: '3', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Bandwidth', starter: '1 GB', pro: '100 GB', enterprise: 'Custom' },
  { feature: 'Custom domains', starter: '—', pro: '✓', enterprise: '✓' },
  { feature: 'Audit log', starter: '—', pro: '✓', enterprise: '✓' },
  { feature: 'SSO and SCIM', starter: '—', pro: '—', enterprise: '✓' },
  { feature: 'SLA', starter: '—', pro: '—', enterprise: '99.99%' },
  { feature: 'Support', starter: 'Community', pro: 'Priority', enterprise: 'Dedicated' },
]

const COLUMNS: TableColumn<ComparisonRow>[] = [
  { key: 'feature', header: 'Feature', width: '40%' },
  { key: 'starter', header: 'Starter', align: 'center' },
  { key: 'pro', header: 'Pro', align: 'center' },
  { key: 'enterprise', header: 'Enterprise', align: 'center' },
]

const meta = {
  title: 'Examples/Pricing page',
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          'A pricing page with a working monthly/annual toggle, a full comparison table built from `Table`, and an FAQ. Shows how a block (`Pricing`) and a plain component (`Table`) sit together inside `Section`.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {
  render: function PricingPageStory() {
    const [period, setPeriod] = useState('monthly')
    const annual = period === 'annual'
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
            {custom ? 'Contact sales' : 'Start free'}
          </Button>
        ),
      }
    })

    return (
      <>
        <Header
          sticky
          logo={<Logo />}
          links={NAV_LINKS.map((link) => ({ ...link, active: link.href === '#pricing' }))}
          actions={
            <>
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
              <Button variant="primary" size="sm">
                Get started
              </Button>
            </>
          }
        />

        <Pricing
          eyebrow="Pricing"
          title="Pay for what you use"
          description="Every plan includes the full component library. You are only paying for scale and support."
          tiers={tiers}
          note={
            annual ? 'Billed once a year. Cancel any time.' : 'Billed monthly. Cancel any time.'
          }
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

        <Section
          title="Compare every plan"
          description="The full breakdown, if you would rather read a table."
          tone="muted"
        >
          <Card padding="none">
            <Table columns={COLUMNS} data={COMPARISON} rowKey={(row) => row.feature} striped />
          </Card>
        </Section>

        <LogoCloud description="Trusted by teams at" logos={LOGOS} marquee spacing="sm" />

        <FAQ title="Billing questions" items={FAQS} defaultOpenIndex={1} />

        <CTA
          variant="split"
          tone="muted"
          title="Not sure which plan fits?"
          description="Tell us about your team and we will point you at the right one."
          actions={
            <Button variant="primary" size="lg">
              Talk to sales
            </Button>
          }
        />

        <Footer
          variant="simple"
          logo={<Logo />}
          columns={[FOOTER_COLUMNS[0]!, FOOTER_COLUMNS[3]!]}
          copyright={`© ${new Date().getFullYear()} ${BRAND} Inc.`}
          legal={[
            { label: 'Privacy', href: '#privacy' },
            { label: 'Terms', href: '#terms' },
          ]}
          aside={
            <Text size="caption" tone="subtle">
              Prices exclude local sales tax.
            </Text>
          }
        />
      </>
    )
  },
}
