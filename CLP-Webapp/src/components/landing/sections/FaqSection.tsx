import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { House, ShieldCheck, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useId, useState } from 'react'
import Container from '@/shared/components/ui/Container'
import SectionHeading from '@/shared/components/ui/SectionHeading'
import { cn } from '@/shared/utils/cn'

/**
 * "Frequently Asked Questions" — the FAQ section.
 *
 * Category rail on the left, accordion on the right. Items are separated by
 * hairlines rather than boxed as cards, so an open answer reads as the
 * question expanding rather than a panel appearing.
 *
 * Two pieces of state, deliberately: the active category, and the single open
 * question. Holding one id rather than a set makes "only one open" true by
 * construction instead of by convention.
 */
interface FaqItem {
  id: string
  question: string
  answer: string
}

interface FaqCategory {
  id: string
  label: string
  icon: LucideIcon
  items: FaqItem[]
}

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'general',
    label: 'General',
    icon: House,
    items: [
      {
        id: 'what-is-clp',
        question: 'What is CLP?',
        answer:
          'CLP is a child-friendly learning platform designed to make learning engaging, interactive, and enjoyable while helping children build important skills and confidence.',
      },
      {
        id: 'what-can-learn',
        question: 'What can my child learn with CLP?',
        answer:
          'CLP provides engaging learning experiences that help children develop important skills, strengthen understanding, build confidence, and enjoy the learning process.',
      },
    ],
  },
  {
    id: 'safety',
    label: 'Safety & Trust',
    icon: ShieldCheck,
    items: [
      {
        id: 'is-clp-safe',
        question: 'Is CLP safe for children?',
        answer:
          'Yes. CLP is designed with a child-friendly learning environment in mind, with a strong focus on privacy, safety, and responsible digital learning.',
      },
    ],
  },
  {
    id: 'progress',
    label: 'Learning & Progress',
    icon: TrendingUp,
    items: [
      {
        id: 'track-progress',
        question: "How can parents track their child's progress?",
        answer:
          "Parents can stay informed about their child's learning journey, progress, and development, helping them better understand how their child is growing and learning.",
      },
      {
        id: 'mobile-access',
        question: 'Can CLP be accessed on mobile devices?',
        answer:
          'Yes. CLP is designed to provide a flexible learning experience and can be accessed across supported devices, making learning easier to continue wherever appropriate.',
      },
    ],
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

function FaqSection() {
  const reduceMotion = useReducedMotion()
  const baseId = useId()

  const [categoryId, setCategoryId] = useState(FAQ_CATEGORIES[0].id)
  const [openId, setOpenId] = useState<string | null>(FAQ_CATEGORIES[0].items[0].id)

  const category = FAQ_CATEGORIES.find((c) => c.id === categoryId) ?? FAQ_CATEGORIES[0]

  const selectCategory = (next: FaqCategory) => {
    setCategoryId(next.id)
    // Open the first question of the new category so the panel is never blank.
    setOpenId(next.items[0].id)
  }

  const reveal: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  }

  // scroll-mt clears the fixed header when the section is linked to
  return (
    <section id="faq" className="relative scroll-mt-20 overflow-hidden bg-page py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-20 left-[12%] size-80 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="absolute right-[8%] bottom-[10%] size-96 rounded-full bg-accent-violet/5 blur-3xl" />
      </div>

      <Container className="relative">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <SectionHeading
            align="center"
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Everything parents need to know about CLP and how it helps children learn, grow, and build confidence."
          />
        </motion.div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto mt-16 grid max-w-4xl gap-10 lg:mt-20 lg:grid-cols-[210px_1fr] lg:gap-14"
        >
          {/* Category rail — a horizontal strip on small screens */}
          <nav aria-label="FAQ categories">
            <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0">
              {FAQ_CATEGORIES.map((cat) => {
                const Icon = cat.icon
                const isActive = cat.id === category.id

                return (
                  <li key={cat.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => selectCategory(cat)}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-xl px-3.5 py-3 text-left text-[0.92rem] font-medium whitespace-nowrap transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:outline-none',
                        isActive
                          ? 'bg-brand-primary/8 text-brand-primary'
                          : 'text-body hover:bg-surface-muted hover:text-ink',
                      )}
                    >
                      <Icon
                        className={cn(
                          'size-[18px] shrink-0 transition-colors duration-300',
                          isActive ? 'text-brand-primary' : 'text-muted',
                        )}
                        aria-hidden="true"
                      />
                      {cat.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Questions — hairline separated, never boxed */}
          <div className="lg:border-l lg:border-line lg:pl-14">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE }}
              >
                {category.items.map((faq, index) => {
                  const isOpen = openId === faq.id
                  const buttonId = `${baseId}-${faq.id}-button`
                  const panelId = `${baseId}-${faq.id}-panel`

                  return (
                    <div
                      key={faq.id}
                      className={cn('border-b border-line', index === 0 && 'border-t')}
                    >
                      <h3>
                        <button
                          type="button"
                          id={buttonId}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpenId(isOpen ? null : faq.id)}
                          className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:outline-none"
                        >
                          <span
                            className={cn(
                              'font-display text-[1.02rem] leading-snug font-bold text-balance transition-colors duration-300 sm:text-[1.08rem]',
                              isOpen ? 'text-brand-primary' : 'text-ink',
                            )}
                          >
                            {faq.question}
                          </span>

                          {/* Two bars rather than swapping icons: the vertical
                              one collapses, so + becomes − without popping. */}
                          <span
                            className={cn(
                              'relative grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-300',
                              isOpen ? 'text-brand-primary' : 'text-muted',
                            )}
                            aria-hidden="true"
                          >
                            <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
                            <span
                              className={cn(
                                'absolute h-3.5 w-[1.5px] rounded-full bg-current transition-transform duration-300 ease-out',
                                isOpen && 'scale-y-0',
                              )}
                            />
                          </span>
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-[62ch] pr-10 pb-7 text-[0.94rem] leading-[1.8] text-pretty text-body">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default FaqSection
