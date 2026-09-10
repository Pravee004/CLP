import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Check } from 'lucide-react'
import Container from '@/shared/components/ui/Container'
import SectionHeading from '@/shared/components/ui/SectionHeading'

/**
 * "Learn on the go" — the app download section.
 *
 * A navy band with the phone artwork open on the background. The floating
 * progress cards are part of `mobile.png` itself, so nothing is composited
 * around it here.
 */
const PHONE_IMAGE = '/images/landing/download-app/mobile.png'

const STORE_BADGES = [
  {
    src: '/images/landing/download-app/app-store-badge.png',
    alt: 'Download CLP on the App Store',
    href: '#app-store',
  },
  {
    src: '/images/landing/download-app/google-play-badge.png',
    alt: 'Get CLP on Google Play',
    href: '#google-play',
  },
]

const FEATURES = [
  'Learn on any device',
  'Continue from where you left off',
  'Practice anytime, anywhere',
  'Track your learning progress',
]

const EASE = [0.22, 1, 0.36, 1] as const

function DownloadAppSection() {
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
      id="download-app"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-[#173F76] via-brand-dark to-[#0A2142] py-24 sm:py-32"
    >
      {/* ambient glows, kept behind everything and non-interactive */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-[-8%] size-[560px] rounded-full bg-[#2F7BD4]/25 blur-3xl" />
        <div className="absolute right-[-6%] bottom-[-20%] size-[520px] rounded-full bg-accent-violet/20 blur-3xl" />
        <div className="absolute top-1/4 right-1/3 size-72 rounded-full bg-[#5AA9F0]/12 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12 xl:gap-16">
          {/* Phone — open on the background, no plate or frame behind it */}
          <motion.div
            variants={fromLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <img
              src={PHONE_IMAGE}
              alt="The CLP app on a phone, showing today's progress, learning streak and lessons completed"
              loading="lazy"
              decoding="async"
              className="w-full drop-shadow-[0_30px_60px_rgba(6,20,45,0.45)]"
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
              tone="onDark"
              eyebrow="Learn on the Go"
              title={
                <>
                  Your learning journey,{' '}
                  <span className="bg-gradient-to-r from-[#6FB6F5] to-[#AFD8FF] bg-clip-text text-transparent">
                    wherever you go.
                  </span>
                </>
              }
              description="Continue learning anytime, anywhere with CLP. Practice, explore, and build your skills across desktop, tablet, and mobile — all with one connected learning experience."
            />

            <ul className="mt-8 flex flex-col gap-3.5">
              {FEATURES.map((feature) => (
                <motion.li key={feature} variants={item} className="flex items-center gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/12 text-[#8FC8F8]">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-[0.95rem] font-medium text-white/80">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* Supplied badge artwork — never re-created in CSS or text */}
            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              {STORE_BADGES.map((badge) => (
                <a
                  key={badge.href}
                  href={badge.href}
                  className="inline-block rounded-xl transition-transform duration-300 ease-out hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
                >
                  <img
                    src={badge.src}
                    alt={badge.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-[68px] w-auto"
                  />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default DownloadAppSection
