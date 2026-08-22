import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container } from '../components/Container/Container'
import { Stack } from '../components/Stack/Stack'
import { Box } from '../components/Box/Box'
import { Heading } from '../components/Heading/Heading'
import { Text } from '../components/Text/Text'
import { Input } from '../components/Input/Input'
import { Button } from '../components/Button/Button'
import { Checkbox } from '../components/Checkbox/Checkbox'
import { Divider } from '../components/Divider/Divider'
import { Link } from '../components/Link/Link'
import { Alert } from '../components/Alert/Alert'
import { Reveal } from '../components/Reveal/Reveal'
import { BRAND, Logo, TESTIMONIALS } from './demo-data'

const meta = {
  title: 'Examples/Sign in',
  parameters: {
    layout: 'fullscreen',
    fullBleed: true,
    docs: {
      description: {
        component:
          'A split sign-in page: form on one side, brand panel with a testimonial on the other. The form demonstrates real validation — submit it empty to see the error states wire up.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {
  render: function SignInStory() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const [submitting, setSubmitting] = useState(false)
    const [failed, setFailed] = useState(false)

    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault()

      const next: typeof errors = {}
      if (!email) next.email = 'Enter your email address.'
      else if (!email.includes('@')) next.email = 'That does not look like an email address.'
      if (!password) next.password = 'Enter your password.'
      else if (password.length < 8) next.password = 'Passwords are at least 8 characters.'

      setErrors(next)
      setFailed(false)
      if (Object.keys(next).length > 0) return

      setSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 900))
      setSubmitting(false)
      // Demo only — always rejects so the error path is visible.
      setFailed(true)
    }

    return (
      <div className="nn-auth">
        {/* Form side */}
        <Box className="nn-auth__form" padding="lg">
          <Container size="sm" flush>
            <Stack gap="xl" style={{ maxWidth: '24rem', marginInline: 'auto' }}>
              <Logo />

              <Stack gap="2xs">
                <Heading level={1} size="h2">
                  Welcome back
                </Heading>
                <Text tone="muted">Sign in to your {BRAND} account.</Text>
              </Stack>

              {failed ? (
                <Alert tone="danger" title="Could not sign you in">
                  That email and password combination did not match an account.
                </Alert>
              ) : null}

              <Stack gap="sm">
                <Button fullWidth iconStart={<span aria-hidden="true">⌘</span>}>
                  Continue with GitHub
                </Button>
                <Button fullWidth iconStart={<span aria-hidden="true">◈</span>}>
                  Continue with Google
                </Button>
              </Stack>

              <Divider>or sign in with email</Divider>

              <form onSubmit={handleSubmit} noValidate>
                <Stack gap="md">
                  <Input
                    label="Work email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    required
                  />

                  <Stack gap="2xs">
                    <Input
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={errors.password}
                      required
                    />
                    <Box style={{ textAlign: 'end' }}>
                      <Link href="#reset" tone="muted">
                        <Text as="span" size="caption">
                          Forgot password?
                        </Text>
                      </Link>
                    </Box>
                  </Stack>

                  <Checkbox label="Keep me signed in for 30 days" defaultChecked />

                  <Button type="submit" variant="primary" size="lg" fullWidth loading={submitting}>
                    Sign in
                  </Button>
                </Stack>
              </form>

              <Text size="sm" tone="muted" align="center">
                New here? <Link href="#signup">Create an account</Link>
              </Text>
            </Stack>
          </Container>
        </Box>

        {/* Brand side */}
        <div className="nn-auth__aside">
          <Reveal animation="fade" threshold={0}>
            <Stack gap="xl" style={{ maxWidth: '30rem' }}>
              <Heading level={2} size="h1" style={{ color: 'inherit' }}>
                The design system that ships with your product, not after it.
              </Heading>

              <Stack gap="md">
                <Text size="body-lg" style={{ color: 'inherit', opacity: 0.9 }}>
                  “{TESTIMONIALS[0]!.quote}”
                </Text>
                <Stack gap="3xs">
                  <Text weight="semibold" style={{ color: 'inherit' }}>
                    {TESTIMONIALS[0]!.author}
                  </Text>
                  <Text size="sm" style={{ color: 'inherit', opacity: 0.75 }}>
                    {TESTIMONIALS[0]!.role}, {TESTIMONIALS[0]!.company}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Reveal>
        </div>

        <style>{`
          .nn-auth { display: grid; grid-template-columns: 1fr; min-height: 100vh; }
          .nn-auth__form { display: grid; align-items: center; }
          .nn-auth__aside {
            display: none;
            padding: var(--nn-space-3xl);
            place-content: center;
            color: #fff;
            background-image: linear-gradient(135deg, var(--nn-indigo-700), var(--nn-indigo-500) 55%, var(--nn-sky-500));
          }
          @media (min-width: 64rem) {
            .nn-auth { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .nn-auth__aside { display: grid; }
          }
        `}</style>
      </div>
    )
  },
}
