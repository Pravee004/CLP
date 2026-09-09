import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

export type HeadingSize = 'hero' | 'section'
export type HeadingAlign = 'left' | 'center'

interface SectionHeadingProps {
  title: ReactNode
  eyebrow?: string
  description?: ReactNode
  size?: HeadingSize
  align?: HeadingAlign
  /** Renders the title as an `h1` for the page's primary heading. */
  as?: 'h1' | 'h2'
  className?: string
  /** Constrain or restyle the title itself, e.g. to control where it wraps. */
  titleClassName?: string
}

const TITLE_SIZE_CLASSES: Record<HeadingSize, string> = {
  hero: 'text-[clamp(2.75rem,6.4vw,6.5rem)] leading-[1.02] tracking-[-0.035em]',
  section: 'text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.025em]',
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
  titleClassName,
}: SectionHeadingProps) {
  const centered = align === 'center'
  const Title = as

  return (
    <div className={cn('flex flex-col', centered ? 'items-center text-center' : 'items-start', className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-pill bg-surface/70 px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.18em] text-brand-primary uppercase shadow-soft ring-1 ring-white/80 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-accent-gold" />
          {eyebrow}
        </span>
      )}

      <Title
        className={cn(
          'font-display font-extrabold text-balance text-brand-dark',
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
            'max-w-2xl leading-relaxed text-pretty text-body',
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
