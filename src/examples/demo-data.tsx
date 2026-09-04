/**
 * Sample content shared by the block stories and the page examples.
 *
 * Not part of the published API — this file exists so the showcase reads like
 * a real product rather than "Lorem ipsum", and so every example tells the
 * same story about the same fictional company.
 */
import type { ReactNode } from 'react'
import type { FAQItem } from '../blocks/FAQ/FAQ'
import type { FeatureItem } from '../blocks/Features/Features'
import type { HeaderLink } from '../blocks/Header/Header'
import type { PricingTier } from '../blocks/Pricing/Pricing'
import type { StatItem } from '../blocks/Stats/Stats'
import type { Testimonial } from '../blocks/Testimonials/Testimonials'
import type { FooterColumn } from '../blocks/Footer/Footer'

export const BRAND = 'Northwind'

export const Logo = ({ inverted = false }: { inverted?: boolean }) => (
  <a href="#home" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
    <span
      aria-hidden="true"
      style={{
        display: 'grid',
        placeItems: 'center',
        width: '1.75rem',
        height: '1.75rem',
        borderRadius: 'var(--nn-radius-md)',
        background: 'linear-gradient(135deg, var(--nn-indigo-500), var(--nn-sky-500))',
        color: '#fff',
        fontSize: '0.875rem',
        fontWeight: 700,
      }}
    >
      N
    </span>
    <span style={{ color: inverted ? 'var(--nn-neutral-50)' : undefined }}>{BRAND}</span>
  </a>
)

export const NAV_LINKS: HeaderLink[] = [
  { label: 'Product', href: '#product', active: true },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
]

export const FEATURES: FeatureItem[] = [
  {
    icon: '⚡',
    title: 'Fast by default',
    description:
      'Ships as a single ESM bundle with no runtime dependencies. Nothing to configure before your first render.',
  },
  {
    icon: '🎨',
    title: 'Themed end to end',
    description:
      'One token layer drives every component, so light and dark modes stay consistent without a second stylesheet.',
  },
  {
    icon: '🧩',
    title: 'Composable blocks',
    description:
      'Full page sections built from the same primitives, so a landing page is a dozen lines rather than a rewrite.',
  },
  {
    icon: '♿',
    title: 'Accessible out of the box',
    description:
      'Keyboard navigation, focus management and ARIA wiring are part of each component, not an afterthought.',
  },
  {
    icon: '📐',
    title: 'Typed props',
    description:
      'Every component exports its props type, so autocomplete tells you the variants before the docs do.',
  },
  {
    icon: '🌗',
    title: 'Respects preferences',
    description:
      'Colour scheme and reduced-motion settings are honoured automatically across every animation and surface.',
  },
]

export const STATS: StatItem[] = [
  { value: '99.99%', label: 'Uptime', description: 'Rolling 90 days' },
  { value: '12k+', label: 'Teams building' },
  { value: '<40ms', label: 'p95 latency', description: 'Global edge' },
  { value: '4.9/5', label: 'Support rating' },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'We replaced three separate UI libraries with this and deleted about four thousand lines of glue code in the process.',
    author: 'Ada Lovelace',
    role: 'Staff Engineer',
    company: 'Globex',
    rating: 5,
  },
  {
    quote: 'The token layer meant our dark mode shipped the same afternoon we decided to build it.',
    author: 'Grace Hopper',
    role: 'Design Lead',
    company: 'Initech',
    rating: 5,
  },
  {
    quote:
      'Blocks were the surprise. A marketing page that used to take a sprint now takes an afternoon.',
    author: 'Alan Turing',
    role: 'Head of Product',
    company: 'Umbrella',
    rating: 4,
  },
]

export const TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    description: 'For side projects and prototypes.',
    features: ['3 projects', 'Community support', '1 GB bandwidth'],
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For teams shipping to production.',
    featured: true,
    badge: 'Most popular',
    features: [
      'Unlimited projects',
      'Priority support',
      '100 GB bandwidth',
      'Custom domains',
      'Audit log',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For organisations with compliance needs.',
    features: ['Everything in Pro', 'SSO and SCIM', 'SLA and DPA', 'Dedicated support'],
  },
]

export const FAQS: FAQItem[] = [
  {
    question: 'Can I cancel at any time?',
    answer:
      'Yes. Your plan stays active until the end of the current billing period, and you keep access to everything you created.',
  },
  {
    question: 'How are seats counted?',
    answer:
      'A seat is any user who signs in during a billing period. Invited users who never sign in are not charged.',
  },
  {
    question: 'Do you offer discounts for open source?',
    answer:
      'We do — public repositories get the Pro plan free. Send us a link to the project and we will switch it over.',
  },
  {
    question: 'What happens to my data if I downgrade?',
    answer:
      'Nothing is deleted. Projects beyond your new plan limit become read-only until you remove some or upgrade again.',
  },
]

export const LOGOS: ReactNode[] = [
  'Globex',
  'Initech',
  'Umbrella',
  'Soylent',
  'Hooli',
  'Vehement',
].map((name) => <span key={name}>{name}</span>)

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#changelog' },
      { label: 'Roadmap', href: '#roadmap' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Documentation', href: '#docs' },
      { label: 'API reference', href: '#api' },
      { label: 'Status', href: '#status', external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Blog', href: '#blog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
      { label: 'Security', href: '#security' },
    ],
  },
]

/** A stand-in for a product screenshot, so examples need no image assets. */
export const ScreenshotFrame = ({ label = 'Dashboard' }: { label?: string }) => (
  <div
    aria-hidden="true"
    style={{
      borderRadius: 'var(--nn-radius-xl)',
      border: '1px solid var(--nn-color-border)',
      background: 'var(--nn-color-surface-1)',
      boxShadow: 'var(--nn-shadow-lg)',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.625rem 0.75rem',
        borderBottom: '1px solid var(--nn-color-border)',
        background: 'var(--nn-color-surface-2)',
      }}
    >
      {['#ef4444', '#f59e0b', '#10b981'].map((c) => (
        <span
          key={c}
          style={{ width: '0.5rem', height: '0.5rem', borderRadius: '9999px', background: c }}
        />
      ))}
      <span
        style={{
          marginInlineStart: '0.5rem',
          fontSize: 'var(--nn-text-caption)',
          color: 'var(--nn-color-text-subtle)',
        }}
      >
        {label}
      </span>
    </div>
    <div style={{ display: 'grid', gap: '0.75rem', padding: '1rem' }}>
      <div
        style={{
          height: '0.75rem',
          width: '40%',
          borderRadius: '9999px',
          background: 'var(--nn-color-primary-subtle)',
        }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              height: '3.5rem',
              borderRadius: 'var(--nn-radius-md)',
              background: 'var(--nn-color-surface-3)',
            }}
          />
        ))}
      </div>
      <div
        style={{
          height: '6rem',
          borderRadius: 'var(--nn-radius-md)',
          background: 'var(--nn-color-surface-2)',
          border: '1px solid var(--nn-color-border)',
        }}
      />
    </div>
  </div>
)
