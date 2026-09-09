import HeroSection from '@/components/landing/hero/HeroSection'
import Header from '@/shared/components/layout/Header'

/**
 * Home page — the CLP landing page.
 *
 * This page stays a thin composition of section components from
 * `src/components/landing/*`. Add new sections by importing them here, not by
 * implementing markup in this file.
 */
function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
      </main>
    </>
  )
}

export default Home
