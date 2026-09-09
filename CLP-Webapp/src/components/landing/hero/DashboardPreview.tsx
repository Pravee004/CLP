import type { ReactNode } from 'react'
import Logo from '@/shared/components/common/Logo'
import { cn } from '@/shared/utils/cn'

/**
 * The CLP learning dashboard revealed as the hero scrolls away.
 *
 * This is a presentational preview, not a real product surface — the data
 * below is local mock content and deliberately stays in this file rather than
 * in shared constants. Styling is intentionally muted so the window reads as
 * secondary to the hero copy.
 */

const SIDEBAR_ITEMS = [
  { label: 'Dashboard', active: true },
  { label: 'My Courses', active: false },
  { label: 'Progress', active: false },
  { label: 'Library', active: false },
]

const STATS = [
  { label: 'Courses in progress', value: '4', fill: 62, tone: 'bg-brand-primary' },
  { label: 'Weekly goal', value: '82%', fill: 82, tone: 'bg-accent-green' },
  { label: 'Skills mastered', value: '12', fill: 45, tone: 'bg-accent-gold' },
]

const COURSES = [
  {
    title: 'Fractions & Decimals',
    meta: 'Lesson 8 of 12 · Mathematics',
    progress: 68,
    tone: 'from-[#2F7BD4] to-[#163B70]',
    resume: true,
  },
  {
    title: 'The Water Cycle',
    meta: 'Lesson 3 of 9 · Science',
    progress: 34,
    tone: 'from-[#3E9C7C] to-[#2F6B57]',
    resume: false,
  },
]

const WEEK = [
  { day: 'M', fill: 52 },
  { day: 'T', fill: 74 },
  { day: 'W', fill: 41 },
  { day: 'T', fill: 88 },
  { day: 'F', fill: 66 },
  { day: 'S', fill: 30 },
  { day: 'S', fill: 58 },
]

const RING_CIRCUMFERENCE = 2 * Math.PI * 34

interface PanelProps {
  children: ReactNode
  className?: string
}

/** Local surface used by every tile in this preview. */
function Panel({ children, className }: PanelProps) {
  return (
    <div className={cn('rounded-2xl border border-line/80 bg-surface/80 p-4', className)}>
      {children}
    </div>
  )
}

function ProgressBar({ fill, tone }: { fill: number; tone: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-pill bg-line">
      <div className={cn('h-full rounded-pill', tone)} style={{ width: `${fill}%` }} />
    </div>
  )
}

function DashboardPreview() {
  return (
    <div className="flex size-full flex-col overflow-hidden rounded-window border border-white/70 bg-surface/85 shadow-window backdrop-blur-2xl">
      {/* window chrome */}
      <div className="grid h-12 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-line/70 bg-surface/70 px-5">
        <div className="flex gap-2">
          <span className="size-3 rounded-full bg-accent-coral/80" />
          <span className="size-3 rounded-full bg-accent-gold/80" />
          <span className="size-3 rounded-full bg-accent-green/70" />
        </div>
        
        <div className="col-start-3 size-7 justify-self-end rounded-full bg-gradient-to-br from-[#3480DA] to-[#163B70]" />
      </div>

      <div className="flex min-h-0 flex-1">
        {/* sidebar */}
        <aside className="hidden w-52 shrink-0 flex-col gap-6 border-r border-line/70 bg-surface-muted/60 p-5 lg:flex">
          <Logo markClassName="size-8" />
          <nav className="flex flex-col gap-1">
            {SIDEBAR_ITEMS.map((item) => (
              <span
                key={item.label}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium',
                  item.active ? 'bg-brand-primary/10 text-brand-primary' : 'text-muted',
                )}
              >
                <span
                  className={cn(
                    'size-4 rounded-md',
                    item.active ? 'bg-brand-primary/70' : 'bg-line',
                  )}
                />
                {item.label}
              </span>
            ))}
          </nav>
        </aside>

        {/* main area */}
        <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
                Welcome back, Aanya
              </h3>
              <p className="mt-1 text-sm text-muted">
                You&rsquo;re 3 lessons away from this week&rsquo;s goal.
              </p>
            </div>
            <span className="hidden shrink-0 items-center gap-2 rounded-pill bg-accent-gold/15 px-3 py-1.5 text-xs font-semibold text-[#8A6416] sm:inline-flex">
              <span className="size-1.5 rounded-full bg-accent-gold" />
              6-day streak
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {STATS.map((stat) => (
              <Panel key={stat.label}>
                <p className="truncate text-[0.7rem] font-medium tracking-wide text-muted uppercase">
                  {stat.label}
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-ink">{stat.value}</p>
                <div className="mt-3">
                  <ProgressBar fill={stat.fill} tone={stat.tone} />
                </div>
              </Panel>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
            {/* continue learning */}
            <Panel className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink">Continue learning</p>
                <span className="text-xs font-medium text-brand-primary">View all</span>
              </div>

              {COURSES.map((course) => (
                <div key={course.title} className="flex items-center gap-4">
                  <div className={cn('size-12 shrink-0 rounded-xl bg-gradient-to-br', course.tone)} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{course.title}</p>
                    <p className="mt-0.5 truncate text-xs text-muted">{course.meta}</p>
                    <div className="mt-2">
                      <ProgressBar fill={course.progress} tone="bg-brand-primary" />
                    </div>
                  </div>
                  {course.resume && (
                    <span className="hidden shrink-0 rounded-pill bg-brand-primary px-4 py-1.5 text-xs font-semibold text-white sm:block">
                      Resume
                    </span>
                  )}
                </div>
              ))}
            </Panel>

            {/* weekly progress */}
            <Panel className="flex flex-col items-center gap-4">
              <p className="self-start text-sm font-semibold text-ink">Weekly progress</p>

              <div className="relative grid place-items-center">
                <svg viewBox="0 0 80 80" className="size-24 -rotate-90">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#E2EAF2" strokeWidth="9" />
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke="#2563B8"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={RING_CIRCUMFERENCE * (1 - 0.74)}
                  />
                </svg>
                <span className="absolute font-display text-xl font-bold text-ink">74%</span>
              </div>

              <div className="flex w-full items-end justify-between gap-1.5">
                {WEEK.map((entry, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex h-16 w-full items-end">
                      <div
                        className="w-full rounded-t-md bg-brand-primary/25"
                        style={{ height: `${entry.fill}%` }}
                      />
                    </div>
                    <span className="text-[0.6rem] text-muted">{entry.day}</span>
                  </div>
                ))}
              </div>

              <div className="w-full border-t border-line/80 pt-4">
                <p className="text-[0.7rem] font-medium tracking-wide text-muted uppercase">
                  Next up
                </p>
                <p className="mt-1.5 text-sm font-semibold text-ink">Comparing Fractions</p>
                <p className="mt-0.5 text-xs text-muted">12 min · with Mr. Rao</p>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPreview
