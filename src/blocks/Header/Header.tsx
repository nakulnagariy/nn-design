import { useEffect, useId, useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Container } from '../../components/Container/Container'
import type { ContainerSize } from '../../components/Container/Container'

export type HeaderVariant = 'default' | 'centered' | 'minimal'

export interface HeaderLink {
  label: ReactNode
  href: string
  /** Marks the current page — styled and exposed as `aria-current="page"`. */
  active?: boolean
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Brand mark, usually a logo or wordmark wrapped in a link to `/`. */
  logo?: ReactNode
  /** Primary navigation. */
  links?: HeaderLink[]
  /** Trailing content — sign-in links, a CTA button, an avatar menu. */
  actions?: ReactNode
  /**
   * `default` puts nav beside the logo, `centered` centres it between logo and
   * actions, `minimal` drops nav entirely. Defaults to `default`.
   */
  variant?: HeaderVariant
  /** Pin to the top of the viewport while the page scrolls. */
  sticky?: boolean
  /**
   * Start transparent and fade in a solid background once the page scrolls —
   * the pattern for a header sitting over a full-bleed hero.
   * Implies `sticky`.
   */
  transparent?: boolean
  /** Draws a bottom border. Defaults to `true`. */
  bordered?: boolean
  /** Content width. Defaults to `lg`. */
  size?: ContainerSize
  /** Accessible name for the nav landmark. Defaults to `"Main"`. */
  navLabel?: string
}

/**
 * A site header with responsive navigation.
 *
 * Below 64rem the links collapse behind a hamburger that expands to a panel;
 * above it they sit inline. The toggle is a real `button` with `aria-expanded`,
 * and the panel closes on Escape.
 *
 * @example
 * <Header
 *   sticky
 *   logo={<strong>Acme</strong>}
 *   links={[
 *     { label: 'Product', href: '/product', active: true },
 *     { label: 'Pricing', href: '/pricing' },
 *   ]}
 *   actions={<Button variant="primary" size="sm">Get started</Button>}
 * />
 */
export function Header({
  logo,
  links = [],
  actions,
  variant = 'default',
  sticky = false,
  transparent = false,
  bordered = true,
  size = 'lg',
  navLabel = 'Main',
  className,
  ...rest
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuId = useId()

  // A transparent header only earns its solid background once the page has
  // actually moved; without this it would sit invisible over light heroes.
  useEffect(() => {
    if (!transparent) return

    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [transparent])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const nav =
    links.length > 0 ? (
      <nav className="nn-header__nav" aria-label={navLabel}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={link.active ? 'page' : undefined}
            className={cx('nn-header__link', 'nn-focusable', link.active && 'is-active')}
          >
            {link.label}
          </a>
        ))}
      </nav>
    ) : null

  return (
    <header
      className={cx(
        'nn-header',
        `nn-header--${variant}`,
        (sticky || transparent) && 'nn-header--sticky',
        transparent && 'nn-header--transparent',
        transparent && scrolled && 'is-scrolled',
        bordered && 'nn-header--bordered',
        menuOpen && 'is-menu-open',
        className,
      )}
      {...rest}
    >
      <Container size={size}>
        <div className="nn-header__bar">
          {logo ? <div className="nn-header__logo">{logo}</div> : null}

          {variant !== 'minimal' ? nav : null}

          <div className="nn-header__actions">
            {actions}
            {variant !== 'minimal' && links.length > 0 ? (
              <button
                type="button"
                className="nn-header__toggle nn-focusable"
                aria-expanded={menuOpen}
                aria-controls={menuId}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="nn-header__bars" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
      </Container>

      {variant !== 'minimal' && links.length > 0 ? (
        <div id={menuId} className="nn-header__panel" hidden={!menuOpen}>
          <Container size={size}>
            <nav className="nn-header__panel-nav" aria-label={`${navLabel} (mobile)`}>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={link.active ? 'page' : undefined}
                  className={cx('nn-header__panel-link', 'nn-focusable', link.active && 'is-active')}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
