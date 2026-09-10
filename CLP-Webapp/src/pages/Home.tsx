import HeroSection from '@/components/landing/hero/HeroSection'
import ImpactSection from '@/components/landing/sections/ImpactSection'
import DownloadAppSection from '@/components/landing/sections/DownloadAppSection'
import LearningGrowsSection from '@/components/landing/sections/LearningGrowsSection'
import ProgramsSection from '@/components/landing/sections/ProgramsSection'
import ProgressReportsSection from '@/components/landing/sections/ProgressReportsSection'
import TrustSection from '@/components/landing/sections/TrustSection'
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
        <ImpactSection />
        <ProgramsSection />
        <LearningGrowsSection />
        <ProgressReportsSection />
         <TrustSection />
        <DownloadAppSection />

      </main>
    </>
  )
}

export default Home
