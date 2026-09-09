import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Constrains content to the page width with consistent gutters.
 * Use this instead of repeating `max-w-page mx-auto px-6` across sections.
 */
function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-page px-6 sm:px-8', className)}>{children}</div>
}

export default Container
