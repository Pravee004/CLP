import { useEffect } from 'react'
import type { RefObject } from 'react'
import { clamp } from '@/shared/utils/math'

/**
 * Reports how far a tall element has scrolled through the viewport, as a
 * 0 → 1 progress value.
 *
 * Progress is 0 while the element's top edge is at the top of the viewport
 * and 1 once its bottom edge reaches the bottom — the range a `sticky` child
 * stays pinned for. Updates are throttled to one animation frame.
 *
 * `onProgress` should be a stable callback (wrap it in `useCallback`). Prefer
 * writing the value to a CSS custom property inside the callback rather than
 * to React state, so scroll-linked animation stays off the render path.
 */
export function useScrollProgress(
  targetRef: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
): void {
  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    let frame = 0
    let previous = -1

    const measure = () => {
      frame = 0
      const rect = target.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      const progress = scrollableDistance <= 0 ? 0 : clamp(-rect.top / scrollableDistance)

      if (progress !== previous) {
        previous = progress
        onProgress(progress)
      }
    }

    const requestMeasure = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', requestMeasure, { passive: true })
    window.addEventListener('resize', requestMeasure)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestMeasure)
      window.removeEventListener('resize', requestMeasure)
    }
  }, [targetRef, onProgress])
}
