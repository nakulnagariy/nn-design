import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Section } from '../Section/Section'
import type { SectionProps } from '../Section/Section'
import { Reveal } from '../../components/Reveal/Reveal'

export interface LogoCloudProps extends Omit<SectionProps, 'children'> {
  /** The logos — inline SVGs, `img` elements, or plain wordmarks. */
  logos: ReactNode[]
  /**
   * Scroll the logos horizontally in a continuous loop instead of laying them
   * out in a static row. The list is duplicated to make the loop seamless, so
   * keep it to a handful of items.
   */
  marquee?: boolean
  /** Marquee lap time in seconds. Defaults to `30`. */
  speed?: number
  /** Render logos at full opacity instead of dimmed until hover. */
  vivid?: boolean
}

/**
 * A row of customer or partner logos.
 *
 * Logos are dimmed and desaturated by default so they read as texture rather
 * than competing with the page's own colour; they come up to full strength on
 * hover.
 *
 * The marquee duplicates the list to loop seamlessly — the copy is hidden from
 * assistive tech, and the animation stops entirely under
 * `prefers-reduced-motion`.
 *
 * @example
 * <LogoCloud title="Trusted by" logos={[<AcmeLogo />, <GlobexLogo />]} />
 * <LogoCloud marquee logos={logos} />
 */
export function LogoCloud({
  logos,
  marquee = false,
  speed = 30,
  vivid = false,
  spacing = 'sm',
  ...sectionProps
}: LogoCloudProps) {
  const row = (duplicate = false) => (
    <div className="nn-logos__row" aria-hidden={duplicate ? 'true' : undefined}>
      {logos.map((logo, index) => (
        <div key={index} className="nn-logos__logo">
          {logo}
        </div>
      ))}
    </div>
  )

  return (
    <Section spacing={spacing} {...sectionProps}>
      {marquee ? (
        <div
          className={cx('nn-logos', 'nn-logos--marquee', vivid && 'nn-logos--vivid')}
          style={{ ['--nn-marquee-duration' as string]: `${speed}s` }}
        >
          <div className="nn-logos__track">
            {row()}
            {row(true)}
          </div>
        </div>
      ) : (
        <Reveal>
          <div className={cx('nn-logos', vivid && 'nn-logos--vivid')}>{row()}</div>
        </Reveal>
      )}
    </Section>
  )
}
