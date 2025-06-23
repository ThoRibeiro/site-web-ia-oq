"use client"

import { useEffect, useState } from "react"
import { useWatchlist } from "@/hooks/use-watchlist"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { ArrowDown, ArrowUp, Star, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { fetchCryptos } from "@/lib/api/coingecko"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrency } from "@/hooks/use-currency"

export default function WatchlistPage() {
  const { watchlist, loading: watchlistLoading, toggleWatchlist } = useWatchlist()
  const [cryptos, setCryptos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { currency, currencySymbol } = useCurrency()

  useEffect(() => {
    const loadCryptos = async () => {
      if (watchlistLoading) return

      if (watchlist.length === 0) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        // In a real app, we would fetch the latest data for the watchlist items
        const allCryptos = await fetchCryptos(currency)
        const watchlistCryptos = allCryptos.filter((crypto) => watchlist.some((item) => item.id === crypto.id))
        setCryptos(watchlistCryptos)
      } catch (error) {
        console.error("Erreur lors du chargement des cryptos:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCryptos()
  }, [watchlist, watchlistLoading, currency])

  if (loading || watchlistLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Ma Watchlist</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Ma Watchlist</h1>

      {watchlist.length === 0 ? (
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <Star className="mb-4 h-16 w-16 text-gray-600" />
            <CardTitle className="mb-2 text-xl">Votre watchlist est vide</CardTitle>
            <CardDescription className="mb-6 text-center">
              Ajoutez des cryptomonnaies à votre watchlist pour les suivre facilement
            </CardDescription>
            <Button asChild>
              <Link href="/">Explorer les cryptomonnaies</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cryptos.map((crypto) => {
            const priceChangeClass = crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"

            return (
              <Card
                key={crypto.id}
                className="overflow-hidden border-gray-800 bg-gray-900/50 transition-all hover:border-gray-700 hover:bg-gray-900/80"
              >
                <CardHeader className="flex flex-row items-center justify-between p-4">
                  <div className="flex items-center">
                    <div className="relative mr-3 h-10 w-10">
                      <Image
                        src={crypto.image || "/placeholder.svg"}
                        alt={crypto.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{crypto.name}</CardTitle>
                      <CardDescription className="uppercase">{crypto.symbol}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => toggleWatchlist(crypto)}>
                    <Trash2 className="h-5 w-5 text-gray-400 hover:text-red-500" />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-2xl font-bold">
                      {currencySymbol}
                      {formatCurrency(crypto.current_price)}
                    </div>
                    <div className={`flex items-center rounded-full px-2 py-1 text-sm font-medium ${priceChangeClass}`}>
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <ArrowUp className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="mr-1 h-4 w-4" />
                      )}
                      {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/crypto/${crypto.id}`}>Voir détails</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
