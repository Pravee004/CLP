import { BookOpen, GraduationCap, Link2, Sparkles } from 'lucide-react'
import type { MegaMenuColumn, NavLink } from '@/types/navigation'

/** Primary navigation shown in the header. Kept intentionally short. */
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Parent', href: '#parent', hasMegaMenu: true },
  { label: 'About Us', href: '#about' },
  { label: 'Blog', href: '#blog' },
]

/** Columns of the Parent mega menu. */
export const PARENT_MENU_COLUMNS: MegaMenuColumn[] = [
  {
    heading: 'Explore by Grade',
    icon: GraduationCap,
    iconClassName: 'text-brand-primary',
    items: [
      { label: 'Preschool (Age 2–5)', href: '#preschool' },
      { label: 'Kindergarten', href: '#kindergarten' },
      { label: 'Grade 1', href: '#grade-1' },
      { label: 'Grade 2', href: '#grade-2' },
      { label: 'Grade 3', href: '#grade-3' },
      { label: 'Grade 4', href: '#grade-4' },
      { label: 'Grade 5', href: '#grade-5' },
    ],
  },
  {
    heading: 'Explore by Subject',
    icon: BookOpen,
    iconClassName: 'text-accent-green',
    items: [
      { label: 'Math Program', href: '#math-program' },
      { label: 'Abacus Program', href: '#abacus-program' },
    ],
  },
  {
    heading: 'More Programs',
    icon: Sparkles,
    iconClassName: 'text-accent-gold',
    items: [
      { label: 'Homeschool Program', href: '#homeschool-program' },
      { label: 'Summer Program', href: '#summer-program' },
      { label: 'Monthly Mash-up', href: '#monthly-mash-up' },
    ],
  },
  {
    heading: 'Helpful Links',
    icon: Link2,
    iconClassName: 'text-accent-coral',
    items: [
      { label: 'Parenting Blog', href: '#parenting-blog' },
      { label: 'Success Stories', href: '#success-stories' },
      { label: 'Support', href: '#support' },
    ],
  },
]
