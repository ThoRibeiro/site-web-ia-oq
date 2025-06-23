"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, ExternalLink } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useWatchlist } from "@/hooks/use-watchlist"
import { useCurrency } from "@/hooks/use-currency"

export function SummaryWatchlist() {
  const { watchlist, loading } = useWatchlist()
  const { currencySymbol } = useCurrency()

  // Mock data for performance
  const mockPerformance = {
    bestPerformer: {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      price_change_percentage_24h: 5.2,
    },
    worstPerformer: {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
      price_change_percentage_24h: -3.8,
    },
  }

  if (loading) {
    return <div className="text-center">Chargement de votre watchlist...</div>
  }

  if (watchlist.length === 0) {
    return (
      <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-6 text-center">
        <p className="mb-4 text-gray-400">Votre watchlist est vide</p>
        <Button asChild>
          <Link href="/">Explorer les cryptomonnaies</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <h3 className="mb-4 text-lg font-medium">Meilleure performance</h3>
            <div className="flex items-center">
              <div className="relative mr-3 h-10 w-10">
                <Image
                  src={mockPerformance.bestPerformer.image || "/placeholder.svg"}
                  alt={mockPerformance.bestPerformer.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{mockPerformance.bestPerformer.name}</p>
                    <p className="text-xs uppercase text-gray-400">{mockPerformance.bestPerformer.symbol}</p>
                  </div>
                  <div className="flex items-center text-green-500">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    <span>{mockPerformance.bestPerformer.price_change_percentage_24h.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <h3 className="mb-4 text-lg font-medium">Pire performance</h3>
            <div className="flex items-center">
              <div className="relative mr-3 h-10 w-10">
                <Image
                  src={mockPerformance.worstPerformer.image || "/placeholder.svg"}
                  alt={mockPerformance.worstPerformer.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{mockPerformance.worstPerformer.name}</p>
                    <p className="text-xs uppercase text-gray-400">{mockPerformance.worstPerformer.symbol}</p>
                  </div>
                  <div className="flex items-center text-red-500">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    <span>{Math.abs(mockPerformance.worstPerformer.price_change_percentage_24h).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h3 className="mb-4 text-lg font-medium">Votre watchlist cette semaine</h3>
      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Crypto</th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-medium">Prix actuel</th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-medium">24h %</th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-medium">7j %</th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {watchlist.map((crypto) => {
              // Mock data for 7d change
              const sevenDayChange = Math.random() * 20 - 10
              const priceChangeClass24h = crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
              const priceChangeClass7d = sevenDayChange >= 0 ? "text-green-500" : "text-red-500"

              return (
                <tr key={crypto.id} className="hover:bg-gray-900/50">
                  <td className="whitespace-nowrap px-4 py-3">
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
                        <p className="font-medium">{crypto.name}</p>
                        <p className="text-xs uppercase text-gray-400">{crypto.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-medium">
                    {currencySymbol}
                    {formatCurrency(crypto.current_price)}
                  </td>
                  <td className={`whitespace-nowrap px-4 py-3 text-right font-medium ${priceChangeClass24h}`}>
                    {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
                    {crypto.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                  <td className={`whitespace-nowrap px-4 py-3 text-right font-medium ${priceChangeClass7d}`}>
                    {sevenDayChange >= 0 ? "+" : ""}
                    {sevenDayChange.toFixed(2)}%
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/crypto/${crypto.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
