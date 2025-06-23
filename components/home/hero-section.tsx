import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col justify-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            La Plateforme de Trading Crypto de Premier Plan
          </h1>
          <p className="mb-8 text-xl text-gray-400">Achetez Bitcoin, Ethereum et plus de 400+ cryptomonnaies</p>
          <div className="mb-8 space-y-4">
            <div className="flex items-start">
              <CheckCircle2 className="mr-2 h-5 w-5 text-blue-500" />
              <p>
                Échangez avec <span className="text-blue-500">plus de 20 devises</span> et Apple/Google Pay
              </p>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="mr-2 h-5 w-5 text-blue-500" />
              <p>
                Leader en <span className="text-blue-500">conformité réglementaire</span> et{" "}
                <span className="text-blue-500">certifications de sécurité</span>
              </p>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="mr-2 h-5 w-5 text-blue-500" />
              <p>
                Approuvé par <span className="text-blue-500">plus de 140 millions d'utilisateurs</span> dans le monde
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Commencer maintenant</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/compare">Comparer les cryptos</Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative h-[500px] w-[250px]">
            <Image
              src="/placeholder.svg?height=500&width=250"
              alt="Application mobile crypto.com"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
