import Logo from '@/shared/components/common/Logo'
import Button from '@/shared/components/ui/Button'
import Container from '@/shared/components/ui/Container'
import { NAV_LINKS } from '@/shared/constants/navigation'
import { useScrolled } from '@/shared/hooks/useScrolled'
import { cn } from '@/shared/utils/cn'

/**
 * Fixed site header. Transparent over the hero, settling into a soft glass
 * surface once the page scrolls.
 */
function Header() {
  const scrolled = useScrolled(24)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out',
        scrolled
          ? 'border-b border-line/70 bg-surface/80 shadow-soft backdrop-blur-xl'
          : 'border-b border-white/25 bg-white/10 backdrop-blur-md',
      )}
    >
      <Container>
        {/* equal 1fr side columns keep the centre nav aligned to the page axis */}
        <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-6">
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
                  <a
                    href={link.href}
                    className="text-sm font-medium text-body transition-colors hover:text-brand-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <Button href="#login" variant="ghost" size="sm" className="hidden sm:inline-flex">
              Log In
            </Button>
            <Button href="#get-started" size="sm" className="sm:h-11 sm:px-6">
              Get Started
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
