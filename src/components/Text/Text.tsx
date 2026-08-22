import { forwardRef } from 'react'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export type TextSize = 'caption' | 'sm' | 'body' | 'body-lg'
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold'
export type TextTone =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'inverted'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
export type TextAlign = 'start' | 'center' | 'end'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `p`. Use `span` for inline text. */
  as?: ElementType
  /** Type scale step. Defaults to `body`. */
  size?: TextSize
  /** Font weight. Defaults to `regular`. */
  weight?: TextWeight
  /** Semantic colour. Defaults to `default`. */
  tone?: TextTone
  /** Text alignment. */
  align?: TextAlign
  /** Render in the monospace family. */
  mono?: boolean
  /** Clamp to a single line with an ellipsis. */
  truncate?: boolean
  children?: ReactNode
}

/**
 * Body copy at a fixed step on the type scale.
 *
 * Use `Text` for everything that is not a section title — paragraphs, labels,
 * captions, helper copy. Titles belong in `Heading`.
 *
 * @example
 * <Text tone="muted" size="sm">Last synced 3 minutes ago</Text>
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  {
    as: Component = 'p',
    size = 'body',
    weight = 'regular',
    tone = 'default',
    align,
    mono = false,
    truncate = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cx(
        'nn-text',
        `nn-text--${size}`,
        `nn-text--weight-${weight}`,
        `nn-text--tone-${tone}`,
        align && `nn-text--align-${align}`,
        mono && 'nn-text--mono',
        truncate && 'nn-text--truncate',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  )
})
