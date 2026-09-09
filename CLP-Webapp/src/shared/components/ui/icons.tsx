import type { SVGProps } from 'react'

/**
 * Shared inline icons. Keep this set small — add an icon here only when it is
 * used in more than one place, otherwise draw it inline in the component.
 */

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 10h11" />
      <path d="m10.5 5.5 4.5 4.5-4.5 4.5" />
    </svg>
  )
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m5 8 5 5 5-5" />
    </svg>
  )
}
