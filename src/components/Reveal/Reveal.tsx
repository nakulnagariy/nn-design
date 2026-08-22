import { Children, useRef } from 'react'
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { useInView } from '../../hooks/useInView'

export type RevealAnimation =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'blur'

export interface RevealProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `div`. */
  as?: ElementType
  /** Entrance effect. Defaults to `slide-up`. */
  animation?: RevealAnimation
  /** Delay before the animation starts, in milliseconds. */
  delay?: number
  /** Animation length in milliseconds. Defaults to `600`. */
  duration?: number
  /**
   * Animate each direct child in sequence rather than the container as a whole.
   * The number is the gap between children in milliseconds; `true` uses 80ms.
   */
  stagger?: boolean | number
  /** Replay the animation every time the element re-enters view. */
  repeat?: boolean
  /** Fraction of the element that must be visible to trigger. Defaults to `0.15`. */
  threshold?: number
  children?: ReactNode
}

const DEFAULT_STAGGER_MS = 80

/**
 * Animates its contents into view on scroll.
 *
 * Uses `IntersectionObserver` plus a CSS transition — no animation library.
 * Motion is suppressed entirely under `prefers-reduced-motion`, where content
 * simply appears.
 *
 * @example
 * <Reveal animation="slide-up">
 *   <Heading level={2}>Built for teams</Heading>
 * </Reveal>
 *
 * @example
 * <Reveal stagger>
 *   {features.map((f) => <Card key={f.id} title={f.title} />)}
 * </Reveal>
 */
export function Reveal({
  as: Component = 'div',
  animation = 'slide-up',
  delay = 0,
  duration = 600,
  stagger = false,
  repeat = false,
  threshold = 0.15,
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { threshold, once: !repeat })

  const baseStyle = {
    '--nn-reveal-duration': `${duration}ms`,
    '--nn-reveal-delay': `${delay}ms`,
    ...style,
  } as CSSProperties

  if (!stagger) {
    return (
      <Component
        ref={ref}
        className={cx('nn-reveal', `nn-reveal--${animation}`, inView && 'is-visible', className)}
        style={baseStyle}
        {...rest}
      >
        {children}
      </Component>
    )
  }

  const step = typeof stagger === 'number' ? stagger : DEFAULT_STAGGER_MS

  return (
    <Component ref={ref} className={cx('nn-reveal-group', className)} style={style} {...rest}>
      {Children.map(children, (child, index) => (
        <div
          className={cx('nn-reveal', `nn-reveal--${animation}`, inView && 'is-visible')}
          style={
            {
              '--nn-reveal-duration': `${duration}ms`,
              '--nn-reveal-delay': `${delay + index * step}ms`,
            } as CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </Component>
  )
}
