import { CryptoList } from "@/components/crypto/crypto-list"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <StatsSection />
      <section className="py-12">
        <h2 className="mb-6 text-3xl font-bold">Top 100 Cryptomonnaies</h2>
        <CryptoList />
      </section>
    </div>
  )
}
