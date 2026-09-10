import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Badge from '@/shared/components/ui/Badge'
import Container from '@/shared/components/ui/Container'
import SectionHeading from '@/shared/components/ui/SectionHeading'
import ImpactCard from './ImpactCard'
import type { ImpactCardData } from './ImpactCard'

/**
 * "Learning That Builds Confidence" — the impact section.
 *
 * Card content is local to this section rather than in shared constants: it is
 * used in exactly one place, and the tint classes only mean anything here.
 */
const IMPACT_CARDS: ImpactCardData[] = [
  {
    title: 'Math Learning',
    description:
      'Build strong mathematical foundations through engaging lessons, practice and challenges.',
    image: '/images/landing/impact/math-learning.png',
    glowClassName: 'bg-brand-primary/25',
    accentTextClassName: 'group-hover:text-brand-primary',
    href: '#math-program',
  },
  {
    title: 'Abacus Learning',
    description: 'Build speed, concentration, visualization and strong mental math skills.',
    image: '/images/landing/impact/abacus-learning.png',
    glowClassName: 'bg-accent-gold/30',
    accentTextClassName: 'group-hover:text-[#B07E12]',
    href: '#abacus-program',
  },
  {
    title: 'Personalized Progress',
    description: "Adaptive learning paths that match each child's pace and strengths.",
    image: '/images/landing/impact/personalized-progress.png',
    glowClassName: 'bg-accent-green/25',
    accentTextClassName: 'group-hover:text-accent-green',
    href: '#personalized-progress',
  },
  {
    title: 'Track Growth',
    description: 'Get clear insights into learning progress and celebrate every milestone.',
    image: '/images/landing/impact/track-growth.png',
    glowClassName: 'bg-accent-coral/25',
    accentTextClassName: 'group-hover:text-accent-coral',
    href: '#track-growth',
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

function ImpactSection() {
  const reduceMotion = useReducedMotion()
  const rise = reduceMotion ? 0 : 24

  const group: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: rise },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  }

  // scroll-mt clears the fixed header when the section is linked to
  return (
    <section id="impact" className="scroll-mt-20 bg-page py-24 sm:py-32">
      <Container>
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center text-center"
        >
          {/* Rendered here rather than via SectionHeading's `eyebrow` so the
              badge can lead the sequence on its own. */}
          <motion.div variants={item}>
            <Badge>Our Impact</Badge>
          </motion.div>

          <motion.div variants={item} className="mt-6 flex flex-col items-center">
            <SectionHeading
              title={
                <>
                  Learning That Builds <span className="text-brand-primary">Confidence</span>
                </>
              }
              description="CLP helps children build strong mathematical foundations through engaging Math and Abacus learning experiences."
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={group}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7"
        >
          {IMPACT_CARDS.map((card) => (
            <ImpactCard key={card.title} card={card} variants={item} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default ImpactSection
