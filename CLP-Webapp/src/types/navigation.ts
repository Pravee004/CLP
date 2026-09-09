import type { LucideIcon } from 'lucide-react'

export interface NavLink {
  label: string
  href: string
  /** Marks the item that opens the Parent mega menu. */
  hasMegaMenu?: boolean
}

export interface MegaMenuItem {
  label: string
  href: string
}

export interface MegaMenuColumn {
  heading: string
  icon: LucideIcon
  /** Tailwind classes for the heading icon's tint. */
  iconClassName: string
  items: MegaMenuItem[]
}
