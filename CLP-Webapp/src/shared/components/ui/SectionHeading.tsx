import type { ReactNode } from 'react'
import Badge from '@/shared/components/ui/Badge'
import { cn } from '@/shared/utils/cn'

export type HeadingSize = 'hero' | 'section'
export type HeadingAlign = 'left' | 'center'
export type HeadingTone = 'onLight' | 'onDark'

interface SectionHeadingProps {
  title: ReactNode
  eyebrow?: string
  description?: ReactNode
  size?: HeadingSize
  align?: HeadingAlign
  /** Renders the title as an `h1` for the page's primary heading. */
  as?: 'h1' | 'h2'
  className?: string
  /** Swaps the text colours for use on a dark background. */
  tone?: HeadingTone
  /** Constrain or restyle the title itself, e.g. to control where it wraps. */
  titleClassName?: string
}

const TITLE_SIZE_CLASSES: Record<HeadingSize, string> = {
  hero: 'text-[clamp(2.75rem,6.4vw,6.5rem)] leading-[1.02] tracking-[-0.035em]',
  section: 'text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.025em]',
}

/* Selected rather than appended: a `text-white` passed through
   `titleClassName` would collide with a hardcoded `text-brand-dark` at equal
   specificity, and stylesheet order — not the class string — would decide. */
const TITLE_TONE_CLASSES: Record<HeadingTone, string> = {
  onLight: 'text-brand-dark',
  onDark: 'text-white',
}

const DESCRIPTION_TONE_CLASSES: Record<HeadingTone, string> = {
  onLight: 'text-body',
  onDark: 'text-white/70',
}

const DESCRIPTION_SIZE_CLASSES: Record<HeadingSize, string> = {
  hero: 'mt-6 text-base sm:text-lg',
  section: 'mt-4 text-base',
}

/**
 * The shared eyebrow + heading + description stack used by the hero and by
 * every content section. Reach for a new `size` variant here rather than
 * hand-rolling heading typography in a section component.
 */
function SectionHeading({
  title,
  eyebrow,
  description,
  size = 'section',
  align = 'center',
  as = 'h2',
  className,
  tone = 'onLight',
  titleClassName,
}: SectionHeadingProps) {
  const centered = align === 'center'
  const Title = as

  return (
    <div className={cn('flex flex-col', centered ? 'items-center text-center' : 'items-start', className)}>
      {eyebrow && <Badge tone={tone}>{eyebrow}</Badge>}

      <Title
        className={cn(
          'font-display font-extrabold text-balance',
          TITLE_TONE_CLASSES[tone],
          eyebrow && 'mt-6',
          TITLE_SIZE_CLASSES[size],
          titleClassName,
        )}
      >
        {title}
      </Title>

      {description && (
        <p
          className={cn(
            'max-w-2xl leading-relaxed text-pretty',
            DESCRIPTION_TONE_CLASSES[tone],
            DESCRIPTION_SIZE_CLASSES[size],
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
