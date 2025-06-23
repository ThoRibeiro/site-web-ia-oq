"use client"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { ArrowDown, ArrowUp, Share2, Star } from "lucide-react"
import Image from "next/image"
import { useWatchlist } from "@/hooks/use-watchlist"
import { useCurrency } from "@/hooks/use-currency"

interface CryptoHeaderProps {
  crypto: any
}

export function CryptoHeader({ crypto }: CryptoHeaderProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist()
  const { currency, currencySymbol } = useCurrency()
  const isWatched = isInWatchlist(crypto.id)

  const priceChangeClass = crypto.market_data.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${crypto.name} (${crypto.symbol.toUpperCase()}) sur Crypto.com`,
        text: `Consultez les données de ${crypto.name} sur Crypto.com`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Lien copié dans le presse-papier !")
    }
  }

  return (
    <div className="mb-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image src={crypto.image || "/placeholder.svg"} alt={crypto.name} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {crypto.name} <span className="text-xl text-gray-400">{crypto.symbol.toUpperCase()}</span>
            </h1>
            <p className="text-sm text-gray-400">Rang #{crypto.market_cap_rank}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant={isWatched ? "default" : "outline"} onClick={() => toggleWatchlist(crypto)}>
            <Star className={`mr-2 h-4 w-4 ${isWatched ? "fill-current" : ""}`} />
            {isWatched ? "Suivi" : "Suivre"}
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Partager
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <p className="text-sm text-gray-400">Prix actuel</p>
          <h2 className="text-4xl font-bold">
            {currencySymbol}
            {formatCurrency(crypto.market_data.current_price[currency.toLowerCase()])}
          </h2>
        </div>
        <div className={`flex items-center rounded-md px-2 py-1 ${priceChangeClass}`}>
          {crypto.market_data.price_change_percentage_24h >= 0 ? (
            <ArrowUp className="mr-1 h-4 w-4" />
          ) : (
            <ArrowDown className="mr-1 h-4 w-4" />
          )}
          <span className="font-medium">{Math.abs(crypto.market_data.price_change_percentage_24h).toFixed(2)}%</span>
          <span className="ml-1 text-sm">(24h)</span>
        </div>
      </div>
    </div>
  )
}
