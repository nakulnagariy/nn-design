import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header } from '../blocks/Header/Header'
import { Hero } from '../blocks/Hero/Hero'
import { LogoCloud } from '../blocks/LogoCloud/LogoCloud'
import { Features } from '../blocks/Features/Features'
import { Stats } from '../blocks/Stats/Stats'
import { Testimonials } from '../blocks/Testimonials/Testimonials'
import { Pricing } from '../blocks/Pricing/Pricing'
import { FAQ } from '../blocks/FAQ/FAQ'
import { CTA } from '../blocks/CTA/CTA'
import { Footer } from '../blocks/Footer/Footer'
import { Button } from '../components/Button/Button'
import { Badge } from '../components/Badge/Badge'
import { Link } from '../components/Link/Link'
import { Stack } from '../components/Stack/Stack'
import {
  BRAND,
  FAQS,
  FEATURES,
  FOOTER_COLUMNS,
  LOGOS,
  Logo,
  NAV_LINKS,
  ScreenshotFrame,
  STATS,
  TESTIMONIALS,
  TIERS,
} from './demo-data'

/**
 * A complete marketing page assembled entirely from blocks.
 *
 * Nothing here is bespoke — every section is a library block configured with
 * props. Copy this file into a project and swap the content.
 */
const meta = {
  title: 'Examples/Landing page',
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          'A full marketing page built only from library blocks — Header, Hero, LogoCloud, Features, Stats, Testimonials, Pricing, FAQ, CTA and Footer. No custom section CSS. Scroll to see the reveal animations fire.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {
  render: () => (
    <>
      <Header
        sticky
        logo={<Logo />}
        links={NAV_LINKS}
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

      <Hero
        badge={<Badge tone="primary">v2.0 — now with page blocks</Badge>}
        title="Ship your design system in an afternoon"
        description="Components, tokens and full page sections that already work together — so you spend your time on the product, not the primitives."
        actions={
          <>
            <Button variant="primary" size="lg">
              Start building
            </Button>
            <Button size="lg">Read the docs</Button>
          </>
        }
        note="Free forever for open source. No credit card required."
        media={<ScreenshotFrame />}
      />

      <LogoCloud description="Trusted by teams at" logos={LOGOS} spacing="sm" />

      <Features
        eyebrow="Features"
        title="Everything you need, nothing you don’t"
        description="A small library that still covers the whole surface of a real product."
        variant="cards"
        tone="muted"
        items={FEATURES}
      />

      <Stats items={STATS} />

      <Features
        eyebrow="How it works"
        title="Three steps from tokens to production"
        variant="alternating"
        tone="muted"
        items={[
          {
            icon: '1',
            title: 'Define your tokens once',
            description:
              'Colour, spacing, type and elevation live in a single CSS layer that every component reads from — and that Tailwind re-exports as utilities.',
            media: <ScreenshotFrame label="tokens.css" />,
          },
          {
            icon: '2',
            title: 'Compose with primitives',
            description:
              'Stack, Grid and Container handle layout, so components never need bespoke wrapper CSS and pages stay consistent.',
            media: <ScreenshotFrame label="Layout" />,
          },
          {
            icon: '3',
            title: 'Assemble pages from blocks',
            description:
              'Hero, Features, Pricing and Footer are configured with props. The page you are reading is a dozen lines of JSX.',
            media: <ScreenshotFrame label="Landing page" />,
          },
        ]}
      />

      <Testimonials
        eyebrow="Testimonials"
        title="Teams that stopped rebuilding their UI"
        variant="feature"
        items={TESTIMONIALS}
      />

      <Pricing
        eyebrow="Pricing"
        title="Simple, predictable pricing"
        description="Start free. Upgrade when your team outgrows it."
        tone="muted"
        tiers={TIERS.map((tier) => ({
          ...tier,
          action: (
            <Button variant={tier.featured ? 'primary' : 'secondary'} fullWidth>
              {tier.price === 'Custom' ? 'Contact sales' : 'Get started'}
            </Button>
          ),
        }))}
        note="All prices in USD, excluding tax. Cancel any time."
      />

      <FAQ
        eyebrow="FAQ"
        title="Questions, answered"
        items={FAQS}
        defaultOpenIndex={0}
        footer={
          <>
            Still stuck? <Link href="#support">Talk to support</Link> — we answer within a day.
          </>
        }
      />

      <CTA
        title="Start building today"
        description="Free for open source, and free to try for everyone else."
        actions={
          <>
            <Button variant="secondary" size="lg">
              Get started
            </Button>
            <Button variant="ghost" size="lg" style={{ color: '#fff' }}>
              Book a demo
            </Button>
          </>
        }
        note="No credit card required."
      />

      <Footer
        logo={<Logo />}
        description="The design system that ships with your product, not after it."
        columns={FOOTER_COLUMNS}
        aside={
          <Stack direction="row" gap="sm">
            {['GitHub', 'X', 'LinkedIn'].map((name) => (
              <Link key={name} href="#social" tone="muted" underline="none">
                {name}
              </Link>
            ))}
          </Stack>
        }
        copyright={`© ${new Date().getFullYear()} ${BRAND} Inc.`}
        legal={[
          { label: 'Privacy', href: '#privacy' },
          { label: 'Terms', href: '#terms' },
          { label: 'Status', href: '#status', external: true },
        ]}
      />
    </>
  ),
}
