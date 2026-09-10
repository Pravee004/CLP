/**
 * The hero's illustrated scene, composed from the supplied artwork in
 * `public/landing/hero/`.
 *
 * Two depth planes — background and monster — each carrying a `.hero-layer`
 * class so they parallax independently against scroll. The movement amounts
 * and the monster's idle drift live in HeroSection.css.
 */
const BACKGROUND_SRC = '/images/landing/hero/hero-background.png'
const MONSTER_SRC = '/images/landing/hero/hero-monster.png'

function HeroScene() {
  return (
    <>
      {/* Layer 1 — landscape. The artwork is portrait, so at `cover` it is far
          taller than the viewport, leaving headroom to pan through the scene.
          Element height and offsets are aspect-dependent and live in
          HeroSection.css alongside the pan they're paired with. */}
      <img
        src={BACKGROUND_SRC}
        alt="Illustrated valley with mountains, a lake and a wildflower meadow"
        fetchPriority="high"
        decoding="async"
        className="hero-layer hero-layer--bg absolute inset-x-0 top-0 w-full object-cover object-bottom"
      />

      {/* Layer 3 — monster, LEFT. The outer element carries the scroll motion,
          the inner one the idle drift, so the two transforms don't overwrite
          each other. Side placement lives in HeroSection.css. */}
      <div className="hero-layer hero-layer--monster absolute w-[15vw] max-w-[265px] min-w-[92px]">
        <img
          src={MONSTER_SRC}
          alt=""
          aria-hidden="true"
          className="hero-monster-float w-full drop-shadow-[0_10px_16px_rgba(22,59,112,0.16)]"
        />
      </div>
    </>
  )
}

export default HeroScene
