import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Button from '@/shared/components/ui/Button'
import Container from '@/shared/components/ui/Container'
import { NAV_LINKS, PARENT_MENU_COLUMNS } from '@/shared/constants/navigation'
import { cn } from '@/shared/utils/cn'

interface MobileNavPanelProps {
  onNavigate: () => void
}

/**
 * Navigation for viewports without hover. Every top-level item is reachable,
 * and Parent expands in place as an accordion rather than trying to render a
 * four-column mega menu on a phone.
 */
function MobileNavPanel({ onNavigate }: MobileNavPanelProps) {
  const [parentOpen, setParentOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute inset-x-0 top-full max-h-[calc(100vh-5rem)] overflow-y-auto rounded-b-2xl border-b border-line/70 bg-surface shadow-card"
    >
      <Container>
        <nav aria-label="Primary" className="flex flex-col gap-1 py-6">
          {NAV_LINKS.map((link) =>
            link.hasMegaMenu ? (
              <div key={link.href}>
                <button
                  type="button"
                  onClick={() => setParentOpen((open) => !open)}
                  aria-expanded={parentOpen}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-semibold text-ink transition-colors hover:bg-surface-muted"
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      'size-4 text-muted transition-transform duration-200',
                      parentOpen && 'rotate-180',
                    )}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {parentOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-6 px-3 pt-2 pb-4">
                        {PARENT_MENU_COLUMNS.map((column) => {
                          const Icon = column.icon

                          return (
                            <div key={column.heading}>
                              <p className="flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                                <Icon
                                  className={cn('size-4 shrink-0', column.iconClassName)}
                                  aria-hidden="true"
                                />
                                {column.heading}
                              </p>
                              <ul className="mt-2 flex flex-col">
                                {column.items.map((item) => (
                                  <li key={item.href}>
                                    <a
                                      href={item.href}
                                      onClick={onNavigate}
                                      className="block rounded-lg py-2 text-[0.95rem] font-medium text-body transition-colors hover:text-brand-primary"
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={onNavigate}
                className="rounded-xl px-3 py-3 text-base font-semibold text-ink transition-colors hover:bg-surface-muted"
              >
                {link.label}
              </a>
            ),
          )}

          <div className="mt-4 flex flex-col gap-3 border-t border-line/70 pt-5">
            <Button href="#login" variant="secondary" size="md" onClick={onNavigate}>
              Log In
            </Button>
            <Button href="#get-started" size="md" onClick={onNavigate}>
              Get Started
            </Button>
          </div>
        </nav>
      </Container>
    </motion.div>
  )
}

export default MobileNavPanel
