import { forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import type { TextTone } from '../Text/Text'

export type HeadingLevel = 1 | 2 | 3 | 4
export type HeadingSize = 'display' | 'h1' | 'h2' | 'h3' | 'h4'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Semantic heading level — renders `h1`…`h4`. Defaults to `2`.
   * Choose this for document structure, then use `size` if the visual weight
   * needs to differ from the semantic level.
   */
  level?: HeadingLevel
  /** Visual size override. Defaults to matching `level`. */
  size?: HeadingSize
  /** Semantic colour. Defaults to `default`. */
  tone?: TextTone
  /** Clamp to a single line with an ellipsis. */
  truncate?: boolean
  children?: ReactNode
}

const SIZE_FOR_LEVEL: Record<HeadingLevel, HeadingSize> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
}

/**
 * Section titles.
 *
 * `level` controls the rendered tag (and therefore the document outline);
 * `size` controls how big it looks. Keep them in sync unless a design calls
 * for a visually small `h1` or an oversized `h3`.
 *
 * @example
 * <Heading level={1} size="display">Welcome back</Heading>
 * <Heading level={2}>Recent activity</Heading>
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level = 2, size, tone = 'default', truncate = false, className, children, ...rest },
  ref,
) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4'
  const resolvedSize = size ?? SIZE_FOR_LEVEL[level]

  return (
    <Tag
      ref={ref}
      className={cx(
        'nn-heading',
        `nn-heading--${resolvedSize}`,
        `nn-text--tone-${tone}`,
        truncate && 'nn-text--truncate',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
})
