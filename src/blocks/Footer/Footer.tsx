import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Container } from '../../components/Container/Container'
import type { ContainerSize } from '../../components/Container/Container'

export type FooterVariant = 'simple' | 'columns'
export type FooterTone = 'default' | 'muted' | 'inverted'

export interface FooterLink {
  label: ReactNode
  href: string
  external?: boolean
}

export interface FooterColumn {
  title: ReactNode
  links: FooterLink[]
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Brand mark. */
  logo?: ReactNode
  /** Short blurb under the logo. */
  description?: ReactNode
  /** Link columns. Ignored when `variant="simple"`. */
  columns?: FooterColumn[]
  /** Rendered in the brand column — social icons, app-store badges, a form. */
  aside?: ReactNode
  /** Copyright line. */
  copyright?: ReactNode
  /** Small links on the bottom row — privacy, terms, status. */
  legal?: FooterLink[]
  /** Defaults to `columns`. */
  variant?: FooterVariant
  /** Background treatment. Defaults to `muted`. */
  tone?: FooterTone
  /** Content width. Defaults to `lg`. */
  size?: ContainerSize
}

/**
 * A site footer.
 *
 * `columns` is the full sitemap layout — brand blurb beside grouped link
 * columns, with a bottom row for copyright and legal links. `simple` drops the
 * columns for a single centred row, which suits small sites and app shells.
 *
 * @example
 * <Footer
 *   logo={<strong>Acme</strong>}
 *   description="Ship faster with fewer meetings."
 *   columns={[
 *     { title: 'Product', links: [{ label: 'Pricing', href: '/pricing' }] },
 *     { title: 'Company', links: [{ label: 'Careers', href: '/careers' }] },
 *   ]}
 *   copyright="© 2026 Acme Inc."
 *   legal={[{ label: 'Privacy', href: '/privacy' }]}
 * />
 */
export function Footer({
  logo,
  description,
  columns = [],
  aside,
  copyright,
  legal = [],
  variant = 'columns',
  tone = 'muted',
  size = 'lg',
  className,
  ...rest
}: FooterProps) {
  const hasBottom = Boolean(copyright || legal.length > 0)

  const renderLink = (link: FooterLink, key: string) => (
    <a
      key={key}
      href={link.href}
      className="nn-footer__link nn-focusable"
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
    >
      {link.label}
    </a>
  )

  return (
    <footer className={cx('nn-footer', `nn-footer--${tone}`, `nn-footer--${variant}`, className)} {...rest}>
      <Container size={size}>
        {variant === 'columns' ? (
          <div className="nn-footer__top">
            <div className="nn-footer__brand">
              {logo ? <div className="nn-footer__logo">{logo}</div> : null}
              {description ? <p className="nn-footer__description">{description}</p> : null}
              {aside ? <div className="nn-footer__aside">{aside}</div> : null}
            </div>

            {columns.length > 0 ? (
              <div className="nn-footer__columns">
                {columns.map((column, columnIndex) => (
                  <div key={columnIndex} className="nn-footer__column">
                    <h3 className="nn-footer__column-title">{column.title}</h3>
                    <div className="nn-footer__column-links">
                      {column.links.map((link, linkIndex) => renderLink(link, `${columnIndex}-${linkIndex}`))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="nn-footer__simple">
            {logo ? <div className="nn-footer__logo">{logo}</div> : null}
            {columns.length > 0 ? (
              <nav className="nn-footer__simple-nav" aria-label="Footer">
                {columns.flatMap((column, columnIndex) =>
                  column.links.map((link, linkIndex) => renderLink(link, `${columnIndex}-${linkIndex}`)),
                )}
              </nav>
            ) : null}
            {aside ? <div className="nn-footer__aside">{aside}</div> : null}
          </div>
        )}

        {hasBottom ? (
          <div className="nn-footer__bottom">
            {copyright ? <p className="nn-footer__copyright">{copyright}</p> : null}
            {legal.length > 0 ? (
              <nav className="nn-footer__legal" aria-label="Legal">
                {legal.map((link, index) => renderLink(link, `legal-${index}`))}
              </nav>
            ) : null}
          </div>
        ) : null}
      </Container>
    </footer>
  )
}
