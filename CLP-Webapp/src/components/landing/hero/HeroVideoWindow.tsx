import { useEffect, useRef } from 'react'

/**
 * The product preview revealed as the hero scrolls: `hero-video.mp4` inside a
 * browser-window frame.
 *
 * The video is 1920x1080, so the frame is sized by width and takes its height
 * from a 16:9 body plus the chrome bar — it is not stretched to fill an
 * arbitrary container.
 */

const VIDEO_SRC = '/landing/hero/hero-video.mp4'

function HeroVideoWindow() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // An autoplaying loop is exactly what `prefers-reduced-motion` is meant to
  // suppress, and `autoPlay` alone gives no way to opt out.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      if (media.matches) video.pause()
      else void video.play().catch(() => {})
    }

    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-window border border-white/70 bg-surface/85 shadow-window backdrop-blur-2xl">
      {/* window chrome */}
      <div className="grid h-12 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-line/70 bg-surface/70 px-5">
        <div className="flex gap-2">
          <span className="size-3 rounded-full bg-accent-coral/80" />
          <span className="size-3 rounded-full bg-accent-gold/80" />
          <span className="size-3 rounded-full bg-accent-green/70" />
        </div>
        
      </div>

      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="aspect-video w-full bg-surface-muted object-cover"
        autoPlay
        muted
        loop
        playsInline
        /* Decorative: silent, uncaptioned, and duplicating the copy above it. */
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  )
}

export default HeroVideoWindow
