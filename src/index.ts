/**
 * NN Design System — public API.
 *
 * Styles are shipped separately and are not imported here, so that consuming a
 * single component never drags the whole stylesheet into a JS bundle:
 *
 *   import 'nn-design/styles.css'
 *   import { Root, Button } from 'nn-design'
 */

/* ==========================================================================
   Primitives
   ========================================================================== */
export { Root } from './components/Root/Root'
export type { RootProps, RootTheme } from './components/Root/Root'

export { Box } from './components/Box/Box'
export type { BoxProps, BoxRadius, BoxShadow, BoxSpace, BoxSurface } from './components/Box/Box'

export { Stack } from './components/Stack/Stack'
export type { StackAlign, StackDirection, StackJustify, StackProps } from './components/Stack/Stack'

export { Container } from './components/Container/Container'
export type { ContainerProps, ContainerSize } from './components/Container/Container'

export { Grid } from './components/Grid/Grid'
export type { GridColumns, GridProps } from './components/Grid/Grid'

export { Text } from './components/Text/Text'
export type { TextAlign, TextProps, TextSize, TextTone, TextWeight } from './components/Text/Text'

export { Heading } from './components/Heading/Heading'
export type { HeadingLevel, HeadingProps, HeadingSize } from './components/Heading/Heading'

export { Divider } from './components/Divider/Divider'
export type { DividerOrientation, DividerProps } from './components/Divider/Divider'

export { Link } from './components/Link/Link'
export type { LinkProps, LinkTone, LinkUnderline } from './components/Link/Link'

/* ==========================================================================
   Form controls
   ========================================================================== */
export { Button } from './components/Button/Button'
export type { ButtonProps, ButtonSize, ButtonVariant } from './components/Button/Button'

export { Input } from './components/Input/Input'
export type { InputProps, InputSize } from './components/Input/Input'

export { Select } from './components/Select/Select'
export type { SelectOption, SelectProps, SelectSize } from './components/Select/Select'

export { Checkbox } from './components/Checkbox/Checkbox'
export type { CheckboxProps } from './components/Checkbox/Checkbox'

export { Radio } from './components/Radio/Radio'
export type { RadioProps } from './components/Radio/Radio'

export { Switch } from './components/Switch/Switch'
export type { SwitchProps } from './components/Switch/Switch'

/* ==========================================================================
   Feedback
   ========================================================================== */
export { Alert } from './components/Alert/Alert'
export type { AlertProps, AlertTone } from './components/Alert/Alert'

export { Badge } from './components/Badge/Badge'
export type { BadgeProps, BadgeSize, BadgeTone, BadgeVariant } from './components/Badge/Badge'

export { Spinner } from './components/Spinner/Spinner'
export type { SpinnerProps, SpinnerSize } from './components/Spinner/Spinner'

export { Tooltip } from './components/Tooltip/Tooltip'
export type { TooltipPlacement, TooltipProps } from './components/Tooltip/Tooltip'

export { Modal } from './components/Modal/Modal'
export type { ModalProps, ModalSize } from './components/Modal/Modal'

/* ==========================================================================
   Data display
   ========================================================================== */
export { Card } from './components/Card/Card'
export type { CardPadding, CardProps, CardVariant } from './components/Card/Card'

export { Table } from './components/Table/Table'
export type { TableAlign, TableColumn, TableDensity, TableProps } from './components/Table/Table'

export { Tabs } from './components/Tabs/Tabs'
export type { TabItem, TabsProps, TabsVariant } from './components/Tabs/Tabs'

export { Accordion } from './components/Accordion/Accordion'
export type { AccordionItem, AccordionProps } from './components/Accordion/Accordion'

export { Dropdown } from './components/Dropdown/Dropdown'
export type { DropdownAlign, DropdownItem, DropdownProps } from './components/Dropdown/Dropdown'

export { Avatar } from './components/Avatar/Avatar'
export type { AvatarProps, AvatarShape, AvatarSize } from './components/Avatar/Avatar'

/* ==========================================================================
   Motion
   ========================================================================== */
export { Reveal } from './components/Reveal/Reveal'
export type { RevealAnimation, RevealProps } from './components/Reveal/Reveal'

export { useInView } from './hooks/useInView'
export type { UseInViewOptions } from './hooks/useInView'

/* ==========================================================================
   Page blocks — full sections composed from the components above.
   ========================================================================== */
export { Section } from './blocks/Section/Section'
export type {
  SectionAlign,
  SectionProps,
  SectionSpacing,
  SectionTone,
} from './blocks/Section/Section'

export { Header } from './blocks/Header/Header'
export type { HeaderLink, HeaderProps, HeaderVariant } from './blocks/Header/Header'

export { Hero } from './blocks/Hero/Hero'
export type { HeroHeight, HeroProps, HeroVariant } from './blocks/Hero/Hero'

export { Features } from './blocks/Features/Features'
export type { FeatureItem, FeaturesProps, FeaturesVariant } from './blocks/Features/Features'

export { Stats } from './blocks/Stats/Stats'
export type { StatItem, StatsProps } from './blocks/Stats/Stats'

export { Pricing } from './blocks/Pricing/Pricing'
export type { PricingProps, PricingTier } from './blocks/Pricing/Pricing'

export { Testimonials } from './blocks/Testimonials/Testimonials'
export type {
  Testimonial,
  TestimonialsProps,
  TestimonialsVariant,
} from './blocks/Testimonials/Testimonials'

export { LogoCloud } from './blocks/LogoCloud/LogoCloud'
export type { LogoCloudProps } from './blocks/LogoCloud/LogoCloud'

export { FAQ } from './blocks/FAQ/FAQ'
export type { FAQItem, FAQProps } from './blocks/FAQ/FAQ'

export { Newsletter } from './blocks/Newsletter/Newsletter'
export type { NewsletterProps, NewsletterVariant } from './blocks/Newsletter/Newsletter'

export { CTA } from './blocks/CTA/CTA'
export type { CTAProps, CTATone, CTAVariant } from './blocks/CTA/CTA'

export { Footer } from './blocks/Footer/Footer'
export type {
  FooterColumn,
  FooterLink,
  FooterProps,
  FooterTone,
  FooterVariant,
} from './blocks/Footer/Footer'

/* ==========================================================================
   Utilities
   ========================================================================== */
export { cx } from './utils/cx'
export type { ClassValue } from './utils/cx'
