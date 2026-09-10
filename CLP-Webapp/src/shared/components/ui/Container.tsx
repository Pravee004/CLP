import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Constrains content to the page width with consistent gutters.
 * Use this instead of repeating `max-w-page mx-auto px-6` across sections.
 * The gutter steps up to 100px at `lg`, which is what sets the side spacing on
 * desktop; mobile and tablet stay on the tighter 24/32px gutters.
 */
function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-page px-6 sm:px-8 lg:px-25', className)}>
      {children}
    </div>
  )
}

export default Container
