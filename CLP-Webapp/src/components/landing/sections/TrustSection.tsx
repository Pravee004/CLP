import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ChartColumn, Pin, ShieldCheck, Sparkles, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import Container from '@/shared/components/ui/Container'
import SectionHeading from '@/shared/components/ui/SectionHeading'
import { useScrollProgress } from '@/shared/hooks/useScrollProgress'
import { cn } from '@/shared/utils/cn'
import './TrustSection.css'

/**
 * "Why Parents Can Feel Confident" — the trust section.
 *
 * From `lg` this is a scroll-driven journey: a tall stage pins its scene,
 * and the card track — taller than the viewport — slides up through it, so
 * roughly two cards hold focus at a time rather than all four sitting in a
 * grid. It reuses the hero's mechanism: `useScrollProgress` writes one custom
 * property and CSS derives the transform, keeping scroll off React's render
 * path.
 *
 * Below `lg` the pinning is dropped entirely and the cards become a plain
 * vertical sequence that reveals on entry — a phone has neither the height
 * nor the width for the zig-zag.
 *
 * Connector curves are measured from the rendered cards rather than
 * hard-coded, so one implementation serves both layouts.
 */
interface TrustCard {
  index: string
  title: string
  description: string
  badge: string
  icon: LucideIcon
  accentText: string
  accentStroke: string
  iconClass: string
  badgeClass: string
  glowClass: string
  /** Tint + hairline for the panel inset inside the white mount. */
  panelClass: string
  /** Absolute placement inside the track, desktop only. */
  place: string
  tilt: string
}

const TRUST_CARDS: TrustCard[] = [
  {
    index: '01',
    title: 'Proven Results',
    description:
      'Clear progress and meaningful learning outcomes that help children build real skills over time.',
    badge: 'Real learning progress',
    icon: ChartColumn,
    accentText: 'text-accent-coral',
    accentStroke: 'var(--color-accent-coral)',
    iconClass: 'bg-accent-coral/12 text-accent-coral',
    badgeClass: 'bg-accent-coral/10 text-[#B4483A]',
    glowClass: 'bg-accent-coral/25',
    panelClass: 'border-accent-coral/20 bg-accent-coral/[0.07]',
    place: 'lg:absolute lg:top-[16vh] lg:left-[8%]',
    tilt: 'lg:-rotate-[2.6deg]',
  },
  {
    index: '02',
    title: 'Safe & Secure',
    description:
      'A child-friendly learning environment designed with privacy, safety, and responsible digital learning in mind.',
    badge: 'Safe learning environment',
    icon: ShieldCheck,
    accentText: 'text-brand-primary',
    accentStroke: 'var(--color-brand-primary)',
    iconClass: 'bg-brand-primary/10 text-brand-primary',
    badgeClass: 'bg-brand-primary/10 text-brand-primary',
    glowClass: 'bg-brand-primary/22',
    panelClass: 'border-brand-primary/18 bg-brand-primary/[0.06]',
    place: 'lg:absolute lg:top-[34vh] lg:right-[8%]',
    tilt: 'lg:rotate-[2.2deg]',
  },
  {
    index: '03',
    title: 'Parent In Control',
    description:
      "Parents can stay informed about their child's learning journey, progress, and development.",
    badge: 'Stay informed',
    icon: Users,
    accentText: 'text-accent-violet',
    accentStroke: 'var(--color-accent-violet)',
    iconClass: 'bg-accent-violet/10 text-accent-violet',
    badgeClass: 'bg-accent-violet/10 text-accent-violet',
    glowClass: 'bg-accent-violet/22',
    panelClass: 'border-accent-violet/18 bg-accent-violet/[0.06]',
    place: 'lg:absolute lg:top-[83vh] lg:left-[8%]',
    tilt: 'lg:-rotate-[2.4deg]',
  },
  {
    index: '04',
    title: 'A Brighter Future',
    description:
      'Build strong learning habits, confidence, and problem-solving skills that support long-term growth.',
    badge: 'Built for brighter futures',
    icon: Sparkles,
    accentText: 'text-accent-green',
    accentStroke: 'var(--color-accent-green)',
    iconClass: 'bg-accent-green/10 text-accent-green',
    badgeClass: 'bg-accent-green/10 text-accent-green',
    glowClass: 'bg-accent-green/20',
    panelClass: 'border-accent-green/18 bg-accent-green/[0.06]',
    place: 'lg:absolute lg:top-[101vh] lg:right-[8%]',
    tilt: 'lg:rotate-[2.8deg]',
  },
]

interface Hop {
  d: string
  from: { x: number; y: number }
  to: { x: number; y: number }
  fromColor: string
  toColor: string
}

const EASE = [0.22, 1, 0.36, 1] as const

function TrustSection() {
  const reduceMotion = useReducedMotion()
  const rise = reduceMotion ? 0 : 24

  const stageRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const [box, setBox] = useState({ w: 0, h: 0 })
  const [hops, setHops] = useState<Hop[]>([])

  const handleProgress = useCallback((progress: number) => {
    sceneRef.current?.style.setProperty('--trust-p', progress.toFixed(4))
  }, [])

  useScrollProgress(stageRef, handleProgress)

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    // Card and track share the track's transform, so it cancels out here and
    // the geometry stays valid at every scroll position.
    const origin = track.getBoundingClientRect()
    setBox({ w: origin.width, h: origin.height })

    const rects = cardRefs.current.map((el) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { x: r.left - origin.left, y: r.top - origin.top, w: r.width, h: r.height }
    })

    const next: Hop[] = []

    for (let i = 0; i < rects.length - 1; i++) {
      const a = rects[i]
      const b = rects[i + 1]
      if (!a || !b) continue

      const aCx = a.x + a.w / 2
      const bCx = b.x + b.w / 2
      const goesRight = bCx > aCx + 40 && b.x > a.x + a.w - 8
      const goesLeft = bCx < aCx - 40

      let from: { x: number; y: number }
      let to: { x: number; y: number }
      let c1: { x: number; y: number }
      let c2: { x: number; y: number }

      if (goesRight) {
        // side by side — leave the right edge, arrive at the left edge
        from = { x: a.x + a.w, y: a.y + a.h * 0.7 }
        to = { x: b.x, y: b.y + b.h * 0.3 }
        const mid = from.x + (to.x - from.x) * 0.5
        c1 = { x: mid, y: from.y }
        c2 = { x: mid, y: to.y }
      } else if (goesLeft) {
        // doubling back across the zig-zag — bow downward so the descent reads
        from = { x: a.x, y: a.y + a.h * 0.66 }
        to = { x: b.x + b.w, y: b.y + b.h * 0.28 }
        const span = from.x - to.x
        c1 = { x: from.x - span * 0.35, y: from.y + 90 }
        c2 = { x: to.x + span * 0.35, y: to.y + 100 }
      } else {
        // stacked — a gentle S from one card to the next
        from = { x: aCx, y: a.y + a.h }
        to = { x: bCx, y: b.y }
        const midY = from.y + (to.y - from.y) * 0.5
        c1 = { x: from.x + 46, y: midY }
        c2 = { x: to.x - 46, y: midY }
      }

      next.push({
        d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${to.x} ${to.y}`,
        from,
        to,
        fromColor: TRUST_CARDS[i].accentStroke,
        toColor: TRUST_CARDS[i + 1].accentStroke,
      })
    }

    setHops(next)
  }, [])

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    measure()

    // Catches breakpoint changes and the reflow when the webfont swaps in.
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    cardRefs.current.forEach((el) => el && observer.observe(el))

    return () => observer.disconnect()
  }, [measure])

  const item: Variants = {
    hidden: { opacity: 0, y: rise },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }

  // scroll-mt clears the fixed header when the section is linked to
  return (
    <section id="trust" className="relative scroll-mt-20 bg-page pt-24 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="trust-rules absolute inset-0" />
        <div className="absolute top-[15%] -left-24 size-[440px] rounded-full bg-accent-coral/6 blur-3xl" />
        <div className="absolute right-[-8%] bottom-[20%] size-[420px] rounded-full bg-accent-green/8 blur-3xl" />
        <div className="absolute top-0 left-1/2 size-96 -translate-x-1/2 rounded-full bg-brand-primary/6 blur-3xl" />
      </div>

      <Container className="relative">
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <SectionHeading
            align="center"
            eyebrow="07. Trust"
            title="Why Parents Can Feel Confident"
            description="CLP gives children a safe, engaging place to learn — and gives parents a transparent view of how that learning is going."
          />
        </motion.div>
      </Container>

      {/* Tall stage: the scroll distance the pinned scene plays out over. */}
      <div ref={stageRef} className="relative mt-14 pb-24 lg:mt-0 lg:h-[220vh] lg:pb-0">
        <div
          ref={sceneRef}
          className="trust-scene lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden"
        >
          <Container className="relative lg:h-full">
            <div
              ref={trackRef}
              className="trust-track relative mx-auto flex max-w-5xl flex-col gap-8 lg:block lg:h-[150vh] lg:max-w-none"
            >
              {/* Journey paths, drawn in the track's own pixel space so the
                  dashes never distort. Sits under the cards. */}
              {box.w > 0 && hops.length > 0 && (
                <svg
                  className="pointer-events-none absolute inset-0 z-0"
                  width={box.w}
                  height={box.h}
                  viewBox={`0 0 ${box.w} ${box.h}`}
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  {hops.map((hop) => (
                    <g key={hop.d}>
                      <path
                        className="trust-path"
                        d={hop.d}
                        stroke="var(--color-line-strong)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx={hop.from.x}
                        cy={hop.from.y}
                        r="4"
                        fill={hop.fromColor}
                        opacity="0.55"
                      />
                      <circle cx={hop.to.x} cy={hop.to.y} r="4.5" fill={hop.toColor} />
                    </g>
                  ))}
                </svg>
              )}

              {TRUST_CARDS.map((card, i) => {
                const Icon = card.icon

                return (
                  <motion.article
                    key={card.index}
                    ref={(el) => {
                      cardRefs.current[i] = el
                    }}
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    className={cn(
                      'group relative z-10 w-full lg:w-[400px] xl:w-[430px]',
                      card.place,
                      card.tilt,
                      'transition-transform duration-500 ease-out lg:hover:rotate-0',
                    )}
                  >
                    <div
                      className={cn(
                        'pointer-events-none absolute -inset-3 rounded-[2.25rem] opacity-45 blur-2xl transition-opacity duration-500 group-hover:opacity-70',
                        card.glowClass,
                      )}
                      aria-hidden="true"
                    />

                    <div
                      className="trust-float relative rounded-[1.75rem] border border-line/70 bg-white px-3 pt-4 pb-3 shadow-[0_18px_44px_-14px_rgba(22,50,79,0.22)] transition-shadow duration-500 group-hover:shadow-[0_26px_60px_-16px_rgba(22,50,79,0.3)]"
                      style={{ animationDelay: `${i * 1.1}s` }}
                    >
                      {/* pin sits in the mount's top margin, above the panel */}
                      <Pin
                        className={cn('mx-auto mb-3 size-[22px] -rotate-45', card.accentText)}
                        fill="currentColor"
                        strokeWidth={1.25}
                        aria-hidden="true"
                      />

                      {/* the inset panel — the detail that makes the card read
                          as something mounted rather than a plain surface */}
                      <div className={cn('rounded-[1.25rem] border p-6', card.panelClass)}>
                        <div className="flex items-start justify-between gap-4">
                          <p
                            className={cn(
                              'font-display text-[2rem] leading-none font-extrabold italic',
                              card.accentText,
                            )}
                          >
                            {card.index}
                          </p>

                          <span
                            className={cn(
                              'grid size-11 shrink-0 place-items-center rounded-full bg-white/70',
                              card.iconClass,
                            )}
                          >
                            <Icon className="size-[18px]" aria-hidden="true" />
                          </span>
                        </div>

                        <h3 className="mt-5 font-display text-[1.3rem] leading-snug font-bold text-ink">
                          {card.title}
                        </h3>
                        <p className="mt-2 text-[0.9rem] leading-relaxed text-pretty text-body">
                          {card.description}
                        </p>

                        <span
                          className={cn(
                            'mt-5 inline-flex w-fit items-center gap-2 rounded-pill bg-white/80 px-3 py-1.5 text-[0.75rem] font-semibold',
                            card.badgeClass,
                          )}
                        >
                          <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                          {card.badge}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
