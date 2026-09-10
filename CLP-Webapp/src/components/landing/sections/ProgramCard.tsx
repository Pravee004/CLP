import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@/shared/components/ui/icons'
import { cn } from '@/shared/utils/cn'

export interface ProgramCardData {
  /** Ordinal shown top-left, e.g. "01". */
  index: string
  title: string
  description: string
  image: string
  href: string
  /** Accent classes taken from the card's illustration. */
  arrowClassName: string
  glowClassName: string
}

interface ProgramCardProps {
  card: ProgramCardData
  variants: Parameters<typeof motion.article>[0]['variants']
}

function ProgramCard({ card, variants }: ProgramCardProps) {
  return (
    <motion.article
      variants={variants}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-white to-[#F2F6FB] p-7 shadow-soft transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-card lg:p-8"
    >
      {/* Illustration sits behind the copy, which is width-capped so the two
          never collide at any card width. */}
      <div
        className="pointer-events-none absolute top-[24%] -right-4 w-[44%] max-w-[250px]"
        aria-hidden="true"
      >
        <div
          className={cn(
            'absolute inset-3 rounded-full opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-90',
            card.glowClassName,
          )}
        />
        <img
          src={card.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="relative w-full object-contain transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.04]"
        />
      </div>

      <div className="relative flex items-center gap-3">
        <span className="font-display text-sm tracking-[0.18em] text-muted">{card.index}</span>
        <span className="h-px w-16 bg-line" />
      </div>

      <h3 className="relative mt-7 max-w-[50%] font-display text-[1.55rem] leading-[1.15] font-bold text-ink">
        {card.title}
      </h3>

      <p className="relative mt-4 max-w-[58%] flex-1 text-sm leading-relaxed text-body">
        {card.description}
      </p>

      <a
        href={card.href}
        className="relative mt-9 flex items-center gap-4 text-sm font-semibold text-ink after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:outline-none"
      >
        Explore Program
        <span
          className={cn(
            'grid size-10 shrink-0 place-items-center rounded-full transition-transform duration-300 ease-out group-hover:translate-x-1',
            card.arrowClassName,
          )}
        >
          <ArrowRightIcon className="size-4" />
        </span>
      </a>
    </motion.article>
  )
}

export default ProgramCard
