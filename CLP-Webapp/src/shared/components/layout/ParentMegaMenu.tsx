import { motion } from 'framer-motion'
import Container from '@/shared/components/ui/Container'
import { PARENT_MENU_COLUMNS } from '@/shared/constants/navigation'
import { cn } from '@/shared/utils/cn'

/**
 * The Parent mega menu panel.
 *
 * Rendered by `Header` inside an `AnimatePresence`, so this component owns the
 * panel's own animation but not its mount/unmount timing. It is absolutely
 * positioned under the header bar and overlays the page — it never displaces
 * the hero.
 */
function ParentMegaMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute inset-x-0 top-full origin-top rounded-b-2xl border-b border-line/70 bg-surface shadow-card"
    >
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-10 lg:grid-cols-4 lg:gap-x-10">
          {PARENT_MENU_COLUMNS.map((column) => {
            const Icon = column.icon

            return (
              <div key={column.heading}>
                <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.14em] text-muted uppercase">
                  <Icon className={cn('size-4 shrink-0', column.iconClassName)} aria-hidden="true" />
                  {column.heading}
                </p>

                <ul className="mt-5 flex flex-col gap-1">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-[0.95rem] font-medium text-body transition-all duration-150 hover:translate-x-1 hover:bg-surface-muted hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:outline-none"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </Container>
    </motion.div>
  )
}

export default ParentMegaMenu
