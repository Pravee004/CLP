import { useEffect, useState } from 'react'

/**
 * Returns true once the window has scrolled past `threshold` pixels.
 * Used for chrome that changes appearance off the top of the page
 * (e.g. the header switching from transparent to a glass surface).
 */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      setScrolled(window.scrollY > threshold)
    }

    const requestMeasure = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', requestMeasure, { passive: true })

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestMeasure)
    }
  }, [threshold])

  return scrolled
}
