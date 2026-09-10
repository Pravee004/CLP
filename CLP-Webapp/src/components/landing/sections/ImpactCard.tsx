import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@/shared/components/ui/icons'
import { cn } from '@/shared/utils/cn'

export interface ImpactCardData {
  title: string
  description: string
  image: string
  /** Tint classes derived from the card's illustration. */
  glowClassName: string
  accentTextClassName: string
  href: string
}

interface ImpactCardProps {
  card: ImpactCardData
  /** Supplied by the parent's stagger container. */
  variants: Parameters<typeof motion.article>[0]['variants']
}

function ImpactCard({ card, variants }: ImpactCardProps) {
  return (
    <motion.article
      variants={variants}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line/80 bg-gradient-to-b from-white to-surface-muted p-7 shadow-soft transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-card"
    >
      {/* soft tint behind the illustration, warming slightly on hover */}
      <div
        className={cn(
          'pointer-events-none absolute -top-12 left-1/2 size-48 -translate-x-1/2 rounded-full opacity-55 blur-3xl transition-opacity duration-300 group-hover:opacity-90',
          card.glowClassName,
        )}
        aria-hidden="true"
      />

      <div className="relative flex h-36 items-center justify-center sm:h-40">
        <img
          src={card.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-auto max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <h3 className="relative mt-7 font-display text-lg font-bold text-ink">{card.title}</h3>
      <p className="relative mt-2.5 flex-1 text-sm leading-relaxed text-body">{card.description}</p>

      {/* The pseudo-element makes the whole card the click target while the
          link itself stays the only focusable, labelled control. */}
      <a
        href={card.href}
        className={cn(
          'relative mt-7 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-muted transition-colors duration-200 after:absolute after:inset-0 after:rounded-[1.75rem] after:content-[""] focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:outline-none',
          card.accentTextClassName,
        )}
      >
        Learn More
        <ArrowRightIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
      </a>
    </motion.article>
  )
}

export default ImpactCard
