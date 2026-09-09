import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  /** Renders an anchor instead of a button when provided. */
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  'aria-label'?: string
}

const BASE_CLASSES =
  'group inline-flex items-center justify-center gap-2 rounded-pill font-semibold whitespace-nowrap transition-all duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-page'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-primary text-white shadow-cta hover:bg-brand-dark hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-surface/70 text-ink ring-1 ring-line backdrop-blur-md hover:bg-surface hover:ring-brand-primary/30',
  ghost: 'text-body hover:text-brand-primary',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
}

/**
 * The single button primitive for the app. Extend it with a new variant or
 * size rather than re-declaring button class strings elsewhere.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  onClick,
  className,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  )
}

export default Button
