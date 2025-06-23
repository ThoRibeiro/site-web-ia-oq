"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useWatchlist } from "@/hooks/use-watchlist"
import { useCurrency } from "@/hooks/use-currency"

interface CryptoTableProps {
  cryptos: any[]
}

export function CryptoTable({ cryptos }: CryptoTableProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist()
  const { currency, currencySymbol } = useCurrency()

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <Table>
        <TableHeader className="bg-gray-900">
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead className="text-right">Prix</TableHead>
            <TableHead className="text-right">24h %</TableHead>
            <TableHead className="text-right">7j %</TableHead>
            <TableHead className="text-right">Cap. Marché</TableHead>
            <TableHead className="text-right">Volume (24h)</TableHead>
            <TableHead className="text-right">Offre en circulation</TableHead>
            <TableHead className="w-[100px] text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cryptos.map((crypto) => {
            const isWatched = isInWatchlist(crypto.id)
            const priceChangeClass24h = crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
            const priceChangeClass7d =
              crypto.price_change_percentage_7d_in_currency >= 0 ? "text-green-500" : "text-red-500"

            return (
              <TableRow key={crypto.id} className="border-gray-800 hover:bg-gray-900/50">
                <TableCell className="font-medium">{crypto.market_cap_rank}</TableCell>
                <TableCell>
                  <Link href={`/crypto/${crypto.id}`} className="flex items-center">
                    <div className="relative mr-3 h-8 w-8">
                      <Image
                        src={crypto.image || "/placeholder.svg"}
                        alt={crypto.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-xs uppercase text-gray-400">{crypto.symbol}</div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {currencySymbol}
                  {formatCurrency(crypto.current_price)}
                </TableCell>
                <TableCell className={`text-right font-medium ${priceChangeClass24h}`}>
                  {crypto.price_change_percentage_24h?.toFixed(2)}%
                </TableCell>
                <TableCell className={`text-right font-medium ${priceChangeClass7d}`}>
                  {crypto.price_change_percentage_7d_in_currency?.toFixed(2) || "N/A"}%
                </TableCell>
                <TableCell className="text-right">
                  {currencySymbol}
                  {formatCurrency(crypto.market_cap, true)}
                </TableCell>
                <TableCell className="text-right">
                  {currencySymbol}
                  {formatCurrency(crypto.total_volume, true)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(crypto.circulating_supply, true)} {crypto.symbol.toUpperCase()}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => toggleWatchlist(crypto)}>
                    <Star className={`h-5 w-5 ${isWatched ? "fill-yellow-500 text-yellow-500" : ""}`} />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
