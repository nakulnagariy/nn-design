import type { HTMLAttributes } from 'react'
import { cx } from '../../utils/cx'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarShape = 'circle' | 'square'

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image URL. Falls back to initials when absent or when the image fails to load. */
  src?: string
  /**
   * The person or entity's name. Used for the image's alt text and to derive
   * the initials fallback, so pass it even when `src` is set.
   */
  name?: string
  /** Diameter step. Defaults to `md`. */
  size?: AvatarSize
  /** Defaults to `circle`. */
  shape?: AvatarShape
  /** Status ring colour shown as a small dot in the corner. */
  status?: 'online' | 'busy' | 'offline'
}

/** "Ada Lovelace" -> "AL"; "cher" -> "C". */
function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase()
  return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase()
}

/**
 * A person or entity's picture, with an initials fallback.
 *
 * Always pass `name` — it supplies the alt text when an image is present and
 * the initials when it is not.
 *
 * @example
 * <Avatar name="Ada Lovelace" src="/team/ada.jpg" status="online" />
 * <Avatar name="Grace Hopper" size="sm" />
 */
export function Avatar({
  src,
  name,
  size = 'md',
  shape = 'circle',
  status,
  className,
  ...rest
}: AvatarProps) {
  const initials = name ? initialsFrom(name) : ''

  return (
    <span
      className={cx('nn-avatar', `nn-avatar--${size}`, `nn-avatar--${shape}`, className)}
      {...rest}
    >
      {src ? (
        <img className="nn-avatar__image" src={src} alt={name ?? ''} />
      ) : (
        <span className="nn-avatar__initials" aria-hidden={initials ? undefined : 'true'}>
          {initials}
        </span>
      )}
      {status ? (
        <span
          className={cx('nn-avatar__status', `nn-avatar__status--${status}`)}
          role="img"
          aria-label={status}
        />
      ) : null}
      {/* Initials are decorative once a name is announced here. */}
      {!src && name ? <span className="nn-sr-only">{name}</span> : null}
    </span>
  )
}
