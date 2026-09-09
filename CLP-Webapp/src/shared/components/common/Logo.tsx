import { useId } from 'react'
import { cn } from '@/shared/utils/cn'

interface LogoProps {
  className?: string
  /** Hide the "CLP" wordmark and render the mark on its own. */
  showWordmark?: boolean
  markClassName?: string
}

/**
 * CLP brand lockup: an open-book mark plus the wordmark.
 * The gradient id is generated per instance so the logo can render more than
 * once on a page without duplicate DOM ids.
 */
function Logo({ className, showWordmark = true, markClassName }: LogoProps) {
  const gradientId = useId()

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 40 40"
        className={cn('size-9 shrink-0', markClassName)}
        role="img"
        aria-label="CLP"
      >
        <rect width="40" height="40" rx="12" fill={`url(#${gradientId})`} />
        <path
          d="M10.5 13.2c3.4-1.7 6.3-1.4 8.6.8v13.9c-2.3-2.2-5.2-2.5-8.6-.8V13.2Z"
          fill="#ffffff"
          opacity="0.95"
        />
        <path
          d="M29.5 13.2c-3.4-1.7-6.3-1.4-8.6.8v13.9c2.3-2.2 5.2-2.5 8.6-.8V13.2Z"
          fill="#ffffff"
          opacity="0.68"
        />
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3480DA" />
            <stop offset="1" stopColor="#163B70" />
          </linearGradient>
        </defs>
      </svg>

      {showWordmark && (
        <span className="font-display text-xl font-extrabold tracking-tight text-brand-dark">
          CLP
        </span>
      )}
    </span>
  )
}

export default Logo
