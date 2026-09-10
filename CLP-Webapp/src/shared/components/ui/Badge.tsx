import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

interface BadgeProps {
  children: ReactNode
  className?: string
}

/**
 * The small uppercase pill used above section headings.
 *
 * `SectionHeading` renders one for its `eyebrow`; import it directly only when
 * a section needs to animate the badge separately from its heading.
 */
function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-pill bg-surface/70 px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.18em] text-brand-primary uppercase shadow-soft ring-1 ring-white/80 backdrop-blur-md',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-accent-gold" />
      {children}
    </span>
  )
}

export default Badge
