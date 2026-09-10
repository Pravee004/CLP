import { AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import MobileNavPanel from '@/shared/components/layout/MobileNavPanel'
import ParentMegaMenu from '@/shared/components/layout/ParentMegaMenu'
import Logo from '@/shared/components/common/Logo'
import Button from '@/shared/components/ui/Button'
import Container from '@/shared/components/ui/Container'
import { NAV_LINKS } from '@/shared/constants/navigation'
import { useScrolled } from '@/shared/hooks/useScrolled'
import { cn } from '@/shared/utils/cn'

/**
 * Fixed site header. Transparent over the hero, settling into a soft glass
 * surface once the page scrolls.
 *
 * The Parent item opens a mega menu on hover. Closing is deferred by a short
 * timeout so the pointer can travel the gap between the trigger and the panel
 * without the menu flickering shut; the whole nav shares one hover region so
 * moving between them never re-triggers.
 */
const CLOSE_DELAY_MS = 120

function Header() {
  const scrolled = useScrolled(24)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)

  const openMega = () => {
    window.clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }

  const scheduleCloseMega = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), CLOSE_DELAY_MS)
  }

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  // Escape closes whichever menu is open — expected of any overlay.
  useEffect(() => {
    if (!megaOpen && !mobileOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMegaOpen(false)
      setMobileOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [megaOpen, mobileOpen])

  const solidChrome = scrolled || megaOpen || mobileOpen

  return (
    <header
      onMouseLeave={scheduleCloseMega}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out',
        solidChrome
          ? 'border-b border-line/70 bg-surface/80 shadow-soft backdrop-blur-xl'
          : 'border-b border-white/25 bg-white/10 backdrop-blur-md',
      )}
    >
      <Container>
        {/* equal 1fr side columns keep the centre nav aligned to the page axis */}
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-6">
          <a
            href="#home"
            className="justify-self-start rounded-pill outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60"
          >
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden justify-center md:flex">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {link.hasMegaMenu ? (
                    <a
                      href={link.href}
                      onMouseEnter={openMega}
                      onFocus={openMega}
                      aria-expanded={megaOpen}
                      className={cn(
                        'flex items-center gap-1.5 text-sm font-medium transition-colors',
                        megaOpen ? 'text-brand-primary' : 'text-body hover:text-brand-primary',
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          'size-4 transition-transform duration-200',
                          megaOpen && 'rotate-180',
                        )}
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      onMouseEnter={scheduleCloseMega}
                      className="text-sm font-medium text-body transition-colors hover:text-brand-primary"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-4">
            {/* Responsive display lives on this wrapper, not on the Buttons:
                `hidden` on a Button would collide with its own base
                `inline-flex`, and which one wins is decided by stylesheet
                order rather than by the class string. */}
            <div className="hidden items-center gap-2 sm:flex sm:gap-4">
              <Button href="#login" variant="ghost" size="sm" onClick={scheduleCloseMega}>
                Log In
              </Button>
              <Button
                href="#get-started"
                size="sm"
                className="sm:h-10 sm:px-5"
                onClick={scheduleCloseMega}
              >
                Get Started
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-brand-primary/60 focus-visible:outline-none md:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {megaOpen && <ParentMegaMenu key="mega" />}
        {mobileOpen && <MobileNavPanel key="mobile" onNavigate={closeMobile} />}
      </AnimatePresence>
    </header>
  )
}

export default Header
