import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

export interface UseInViewOptions {
  /** Fraction of the element that must be visible to trigger. Defaults to `0.15`. */
  threshold?: number
  /**
   * Margin around the viewport when computing intersection, in CSS units.
   * A negative bottom margin delays the trigger until the element is properly
   * on screen. Defaults to `'0px 0px -10% 0px'`.
   */
  rootMargin?: string
  /** Stop observing after the first intersection. Defaults to `true`. */
  once?: boolean
  /** Skip observation entirely and report visible immediately. */
  disabled?: boolean
}

/**
 * Reports whether the referenced element has scrolled into view.
 *
 * Degrades safely: if `IntersectionObserver` is unavailable the element is
 * reported visible immediately, so content is never left hidden by a missing
 * browser API.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null)
 * const inView = useInView(ref)
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true, disabled = false }: UseInViewOptions = {},
): boolean {
  const [inView, setInView] = useState(false)
  // Held in a ref so a re-render mid-animation cannot re-arm an element that
  // has already been revealed under `once`.
  const settled = useRef(false)

  useEffect(() => {
    if (disabled || settled.current) {
      setInView(true)
      return
    }

    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      settled.current = true
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) {
              settled.current = true
              observer.disconnect()
            }
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, threshold, rootMargin, once, disabled])

  return inView
}
