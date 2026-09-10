import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Container from '@/shared/components/ui/Container'
import SectionHeading from '@/shared/components/ui/SectionHeading'

/**
 * "The most comprehensive progress reports ever." — the reports section.
 *
 * Three editorial cards on a light ground. Copy sits at the top of each card
 * and the artwork anchors the lower portion, so the three read as a row even
 * though the illustrations differ in aspect.
 */
interface ReportCard {
  title: string
  description: string
  image: string
}

const REPORT_CARDS: ReportCard[] = [
  {
    title: 'Weekly reports',
    description: 'Straight to your inbox',
    image: '/images/landing/progress-report/weekly-report-asset.svg',
  },
  {
    title: 'Detailed progress',
    description: 'Broken down by subject, topic, skill and more',
    image: '/images/landing/progress-report/detailed-progress-asset.svg',
  },
  {
    title: 'Personalized practice goals & reminders',
    description: 'To build a learning routine',
    image: '/images/landing/progress-report/personalized-practice-asset.svg',
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

function ProgressReportsSection() {
  const reduceMotion = useReducedMotion()
  const rise = reduceMotion ? 0 : 26

  const group: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: rise },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  }

  // scroll-mt clears the fixed header when the section is linked to
  return (
    <section
      id="reports"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#153F79] via-brand-dark to-[#0B2447] py-24 sm:py-32"
    >
      {/* soft light pooling behind the heading, kept faint */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgba(88,150,224,0.28),rgba(88,150,224,0)_70%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={item}>
            <SectionHeading
              align="center"
              tone="onDark"
              title={
                <>
                  The most comprehensive progress reports ever.{' '}
                  <span className="text-white/45">Period.</span>
                </>
              }
              titleClassName="max-w-[22ch]"
            />
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3 lg:mt-18 lg:gap-7">
            {REPORT_CARDS.map((card) => (
              <motion.article
                key={card.title}
                variants={item}
                className="group flex flex-col rounded-[1.75rem] border border-line bg-surface p-8 shadow-soft transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-card lg:p-9"
              >
                <h3 className="font-display text-[1.35rem] leading-snug font-bold text-balance text-ink">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-pretty text-body">
                  {card.description}
                </p>

                {/* A fixed box with object-contain: the three illustrations
                    differ in aspect, and this keeps their baselines aligned
                    across the row without scaling any of them. */}
                <div className="mt-auto flex aspect-[6/5] items-end justify-center pt-6">
                  <img
                    src={card.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="size-full object-contain object-bottom transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default ProgressReportsSection
