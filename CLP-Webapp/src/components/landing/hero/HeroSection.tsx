import { useCallback, useRef, useState } from 'react'
import Button from '@/shared/components/ui/Button'
import Container from '@/shared/components/ui/Container'
import SectionHeading from '@/shared/components/ui/SectionHeading'
import { ArrowRightIcon, ChevronDownIcon } from '@/shared/components/ui/icons'
import { useScrollProgress } from '@/shared/hooks/useScrollProgress'
import { cn } from '@/shared/utils/cn'
import HeroScene from './HeroScene'
import HeroVideoWindow from './HeroVideoWindow'
import './HeroSection.css'

/** Progress point past which the hero copy has faded out entirely. */
const COPY_FADED_AT = 0.45

/**
 * The CLP hero.
 *
 * A tall stage pins its scene for the length of one extra viewport, and the
 * scroll position through that stage drives one custom property (`--hero-p`).
 * The copy lifts away, the landscape parallaxes, and the dashboard window
 * rises into place — all in the same continuous scene, all in CSS, so scroll
 * never touches React's render path. See HeroSection.css for the mapping.
 */
function HeroSection() {
  const stageRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [copyHidden, setCopyHidden] = useState(false)

  const handleProgress = useCallback((progress: number) => {
    sceneRef.current?.style.setProperty('--hero-p', progress.toFixed(4))
    setCopyHidden(progress > COPY_FADED_AT)
  }, [])

  useScrollProgress(stageRef, handleProgress)

  return (
    <section id="home" ref={stageRef} className="relative h-[220vh]">
      {/* The scene is backed in the meadow green rather than the page colour:
          the artwork drifts upward on scroll, and this is what shows beneath
          it at the very bottom edge. */}
      <div
        ref={sceneRef}
        className="hero-scene sticky top-0 h-screen overflow-hidden bg-accent-green"
      >
        <div className="hero-landscape absolute inset-0 bg-accent-green">
          <HeroScene />
        </div>

        {/* Layer 2 — a light radial scrim, only as strong as the copy needs. */}
        <div
          className="hero-veil hero-copy-veil pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_48%_at_50%_39%,rgba(244,248,252,0.82),rgba(244,248,252,0.34)_54%,rgba(244,248,252,0)_78%)]"
          aria-hidden="true"
        />
        <div className="hero-veil hero-scrim pointer-events-none absolute inset-0 bg-page" />

        {/* Layer 3 — hero copy */}
        <div className="hero-content-layer absolute inset-0 flex flex-col items-center justify-center pb-[22vh]">
          <div
            className={cn('hero-content w-full', copyHidden && 'pointer-events-none')}
            aria-hidden={copyHidden}
          >
            <Container className="flex flex-col items-center">
              <SectionHeading
                as="h1"
                size="hero"
                eyebrow="Learning Made Personal"
                title="A Smarter Way to Learn"
                /* wraps to two lines on wide screens, as in the reference */
                titleClassName="max-w-[14ch]"
                description="CLP brings together engaging learning experiences, personalized guidance, and real progress for every learner, everywhere."
              />
              <Button href="#get-started" size="lg" className="mt-10">
                Get Started
                <ArrowRightIcon className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Container>
          </div>
        </div>

        {/* Scroll affordance. The meadow behind it is bright and busy, so the
            label sits on a light glass chip rather than relying on a shadow. */}
        <div className="hero-scroll-hint hero-content-layer pointer-events-none absolute inset-x-0 bottom-[23vh] flex flex-col items-center gap-2.5">
          <span className="rounded-pill bg-white/60 px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.2em] text-brand-dark uppercase shadow-soft ring-1 ring-white/70 backdrop-blur-md">
            Scroll to explore
          </span>
          <ChevronDownIcon className="hero-scroll-arrow size-4 text-brand-dark [filter:drop-shadow(0_1px_4px_rgb(255_255_255_/_0.9))]" />
        </div>

        {/* Layer 2 — the product window rising from below, part of the same
            scene. Centred by the flex parent rather than
            `left:50% / translateX(-50%)` so the element's own transform is free
            to carry the scroll rise on a single axis. Height is intrinsic (16:9
            plus chrome), so the frame never stretches the video. */}
        <div className="hero-window-layer absolute inset-x-0 top-[16%] flex justify-center px-4 sm:px-6">
          <div className="relative w-full max-w-[1120px]">
            <div
              className="hero-window-glow pointer-events-none absolute -inset-x-16 top-0 h-1/2 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(37,99,184,0.28),rgba(37,99,184,0)_70%)] blur-2xl"
              aria-hidden="true"
            />
            <div className="hero-window w-full">
              <HeroVideoWindow />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
