import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import Container from '@/shared/components/ui/Container'
import SectionHeading from '@/shared/components/ui/SectionHeading'

/**
 * "Learning that grows with every step." — the learning-philosophy section.
 *
 * Two columns on desktop: the device artwork sits open on the background
 * rather than inside a card, with the copy beside it. The artwork leads on
 * mobile too, so no order swap is needed.
 */
const DEVICE_IMAGE = '/images/landing/learning-anywhere/clp-learning-platform-devices.png'

const PARAGRAPHS = [
  'As your child explores new concepts and meets friendly characters, they discover more than one way to solve a problem.',
  'With no timed challenges or overwhelming pressure, our learning environment gives them the freedom to explore, practice and make mistakes — because that’s how real learning happens.',
  'Whether it’s building strong math foundations, improving problem-solving skills, or taking on fun challenges, CLP helps your child build confidence that lasts.',
]

const EASE = [0.22, 1, 0.36, 1] as const

function LearningGrowsSection() {
  const reduceMotion = useReducedMotion()
  const shift = reduceMotion ? 0 : 40
  const rise = reduceMotion ? 0 : 18

  const fromLeft: Variants = {
    hidden: { opacity: 0, x: -shift },
    show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
  }

  const fromRight: Variants = {
    hidden: { opacity: 0, x: shift },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.75, ease: EASE, staggerChildren: 0.1, delayChildren: 0.15 },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: rise },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  }

  // scroll-mt clears the fixed header when the section is linked to
  return (
    <section
      id="learning-grows"
      className="relative scroll-mt-20 overflow-hidden bg-page py-24 sm:py-32"
    >
      {/* soft decorative wash — kept faint so the artwork stays dominant */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-24 -left-32 size-[520px] rounded-full bg-brand-primary/8 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-15%] size-[460px] rounded-full bg-accent-mint/25 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 size-64 rounded-full bg-accent-violet/8 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_1fr] lg:gap-14 xl:gap-20">
          {/* Artwork — open on the background, never boxed or cropped */}
          <motion.div
            variants={fromLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <img
              src={DEVICE_IMAGE}
              alt="The CLP learning experience shown on a desktop monitor, a tablet and a phone"
              loading="lazy"
              decoding="async"
              className="w-full drop-shadow-[0_28px_50px_rgba(22,59,112,0.16)]"
            />
          </motion.div>

          {/* Copy */}
          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <SectionHeading
              align="left"
              eyebrow="A Brighter Way to Learn"
              title={
                <>
                  Learning that{' '}
                  <span className="bg-gradient-to-r from-brand-primary to-[#5AA9F0] bg-clip-text text-transparent">
                    grows
                  </span>{' '}
                  with every step.
                </>
              }
            />

            <div className="mt-6 flex flex-col gap-4">
              {PARAGRAPHS.map((paragraph) => (
                <motion.p
                  key={paragraph}
                  variants={item}
                  className="text-[0.95rem] leading-relaxed text-pretty text-body"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* insight card */}
            <motion.div
              variants={item}
              className="mt-9 flex items-start gap-4 rounded-2xl bg-brand-primary/6 p-5 ring-1 ring-brand-primary/10 sm:p-6"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-primary/12 text-brand-primary">
                <TrendingUp className="size-5" aria-hidden="true" />
              </span>
              <p className="text-[0.95rem] leading-relaxed text-pretty text-body">
                Children who learn on CLP more than 4 times a week show{' '}
                <strong className="font-semibold text-brand-primary">
                  76% higher learning improvement
                </strong>{' '}
                within the first 2 months.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default LearningGrowsSection
