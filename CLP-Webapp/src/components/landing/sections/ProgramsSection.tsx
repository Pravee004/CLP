import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Container from '@/shared/components/ui/Container'
import ProgramCard from './ProgramCard'
import type { ProgramCardData } from './ProgramCard'

/**
 * "Two Paths. One Strong Foundation." — the programs section.
 *
 * One deep-blue panel holding the heading and three program cards. Card data
 * is local: it is used only here, and the accent classes are chosen to match
 * each illustration.
 */
const PROGRAM_CARDS: ProgramCardData[] = [
  {
    index: '01',
    title: 'Math Learning',
    description:
      'Build strong mathematical foundations through engaging lessons, practice and challenges.',
    image: '/images/landing/impact/math-learning.png',
    href: '#math-program',
    arrowClassName: 'bg-brand-primary text-white',
    glowClassName: 'bg-brand-primary/20',
  },
  {
    index: '02',
    title: 'Abacus Learning',
    description: 'Build speed, concentration, visualization and strong mental math skills.',
    image: '/images/landing/impact/abacus-learning.png',
    href: '#abacus-program',
    arrowClassName: 'bg-accent-mint text-accent-green',
    glowClassName: 'bg-accent-mint/60',
  },
  {
    index: '03',
    title: 'Personalized Learning',
    description: "Adaptive learning paths that match each child's pace and strengths.",
    image: '/images/landing/impact/personalized-learning.png',
    href: '#personalized-learning',
    arrowClassName: 'bg-accent-violet/20 text-accent-violet',
    glowClassName: 'bg-accent-violet/20',
  },
]

const JOURNEY = ['Learn', 'Practice', 'Grow', 'Succeed']

const EASE = [0.22, 1, 0.36, 1] as const

function ProgramsSection() {
  const reduceMotion = useReducedMotion()
  const rise = reduceMotion ? 0 : 28

  const group: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: rise },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  // scroll-mt clears the fixed header when the section is linked to
  return (
    <section id="programs" className="scroll-mt-20 bg-page pb-24 sm:pb-32">
      <Container>
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2C6BD4] via-brand-primary to-[#1A4E9E] p-8 shadow-card sm:rounded-[2.5rem] sm:p-10 lg:p-11"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <motion.div variants={item} className="min-w-0 lg:flex-1">
              {/* Lettered label with a rule rather than the Badge pill used
                  elsewhere — this section's own treatment. */}
              <div className="flex items-center gap-5">
                <span className="text-[0.72rem] font-semibold tracking-[0.3em] text-white/85 uppercase">
                  Our Programs
                </span>
                <span className="h-px w-24 bg-white/30 sm:w-32" />
              </div>

              <h2 className="mt-7 font-display text-[clamp(1.85rem,3.2vw,2.9rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance text-white">
                Two Paths. One <span className="text-white/60">Strong Foundation.</span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-white/75">
                Explore engaging Math and Abacus programs designed to help children learn with
                confidence and grow at their own pace.
              </p>
            </motion.div>

            <motion.div
              variants={item}
              className="flex shrink-0 items-center lg:self-stretch lg:border-l lg:border-white/20 lg:pl-10"
            >
              <ul className="flex flex-col gap-1.5">
                {JOURNEY.map((step) => (
                  <li
                    key={step}
                    className="text-[0.68rem] font-semibold tracking-[0.22em] text-white/70 uppercase"
                  >
                    {step}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
            {PROGRAM_CARDS.map((card) => (
              <ProgramCard key={card.title} card={card} variants={item} />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default ProgramsSection
