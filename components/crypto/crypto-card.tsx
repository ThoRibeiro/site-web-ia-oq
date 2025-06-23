"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useWatchlist } from "@/hooks/use-watchlist"
import { useCurrency } from "@/hooks/use-currency"

interface CryptoCardProps {
  crypto: any
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist()
  const { currency, currencySymbol } = useCurrency()
  const isWatched = isInWatchlist(crypto.id)

  const priceChangeClass = crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"

  return (
    <Card className="overflow-hidden border-gray-800 bg-gray-900/50 transition-all hover:border-gray-700 hover:bg-gray-900/80">
      <Link href={`/crypto/${crypto.id}`}>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-3 h-8 w-8">
                <Image
                  src={crypto.image || "/placeholder.svg"}
                  alt={crypto.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold">{crypto.name}</h3>
                <p className="text-xs uppercase text-gray-400">{crypto.symbol}</p>
              </div>
            </div>
            <div className={`rounded-full px-2 py-1 text-xs font-semibold ${priceChangeClass}`}>
              {crypto.price_change_percentage_24h?.toFixed(2)}%
            </div>
          </div>
          <div className="mb-2 text-2xl font-bold">
            {currencySymbol}
            {formatCurrency(crypto.current_price)}
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
            <div>
              <p>Cap. Marché</p>
              <p className="font-medium text-white">
                {currencySymbol}
                {formatCurrency(crypto.market_cap, true)}
              </p>
            </div>
            <div>
              <p>Vol. 24h</p>
              <p className="font-medium text-white">
                {currencySymbol}
                {formatCurrency(crypto.total_volume, true)}
              </p>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="border-t border-gray-800 bg-gray-900 p-4">
        <Button
          variant={isWatched ? "default" : "outline"}
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.preventDefault()
            toggleWatchlist(crypto)
          }}
        >
          <Star className={`mr-2 h-4 w-4 ${isWatched ? "fill-current" : ""}`} />
          {isWatched ? "Suivi" : "Suivre"}
        </Button>
      </CardFooter>
    </Card>
  )
}
