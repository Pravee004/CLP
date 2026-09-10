import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

export type BadgeTone = 'onLight' | 'onDark'

interface BadgeProps {
  children: ReactNode
  /** Swaps the surface and text colours for use on a dark background. */
  tone?: BadgeTone
  className?: string
}

/* Selected rather than appended: overriding these through `className` would
   pit three utilities against their defaults at equal specificity, where
   stylesheet order decides the winner. */
const TONE_CLASSES: Record<BadgeTone, string> = {
  onLight: 'bg-surface/70 text-brand-primary ring-white/80',
  onDark: 'bg-white/10 text-white ring-white/25',
}

/**
 * The small uppercase pill used above section headings.
 *
 * `SectionHeading` renders one for its `eyebrow`; import it directly only when
 * a section needs to animate the badge separately from its heading.
 */
function Badge({ children, tone = 'onLight', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.18em] uppercase shadow-soft ring-1 backdrop-blur-md',
        TONE_CLASSES[tone],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-accent-gold" />
      {children}
    </span>
  )
}

export default Badge
