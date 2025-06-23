"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, calculateRiskScore } from "@/lib/utils"
import { useCurrency } from "@/hooks/use-currency"

interface CompareTableProps {
  cryptos: any[]
}

export function CompareTable({ cryptos }: CompareTableProps) {
  const { currency, currencySymbol } = useCurrency()

  const metrics = [
    {
      label: "Prix actuel",
      getValue: (crypto: any) => `${currencySymbol}${formatCurrency(crypto.current_price)}`,
    },
    {
      label: "Variation 24h",
      getValue: (crypto: any) => {
        const value = crypto.price_change_percentage_24h
        const className = value >= 0 ? "text-green-500" : "text-red-500"
        return <span className={className}>{value?.toFixed(2)}%</span>
      },
    },
    {
      label: "Variation 7j",
      getValue: (crypto: any) => {
        const value = crypto.price_change_percentage_7d_in_currency
        if (!value) return "N/A"
        const className = value >= 0 ? "text-green-500" : "text-red-500"
        return <span className={className}>{value?.toFixed(2)}%</span>
      },
    },
    {
      label: "Cap. Marché",
      getValue: (crypto: any) => `${currencySymbol}${formatCurrency(crypto.market_cap, true)}`,
    },
    {
      label: "Volume 24h",
      getValue: (crypto: any) => `${currencySymbol}${formatCurrency(crypto.total_volume, true)}`,
    },
    {
      label: "Offre en circulation",
      getValue: (crypto: any) => `${formatCurrency(crypto.circulating_supply, true)} ${crypto.symbol.toUpperCase()}`,
    },
    {
      label: "Offre maximale",
      getValue: (crypto: any) =>
        crypto.max_supply ? `${formatCurrency(crypto.max_supply, true)} ${crypto.symbol.toUpperCase()}` : "∞",
    },
    {
      label: "Rang",
      getValue: (crypto: any) => `#${crypto.market_cap_rank}`,
    },
    {
      label: "Score de risque",
      getValue: (crypto: any) => {
        const score = calculateRiskScore(crypto)
        let className = "text-green-500"
        if (score >= 30 && score < 70) className = "text-yellow-500"
        if (score >= 70) className = "text-red-500"
        return <span className={className}>{score}/100</span>
      },
    },
  ]

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 z-10 bg-gray-900">Métrique</TableHead>
            {cryptos.map((crypto) => (
              <TableHead key={crypto.id} className="text-center">
                <div className="flex flex-col items-center">
                  <img
                    src={crypto.image || "/placeholder.svg"}
                    alt={crypto.name}
                    className="mb-2 h-8 w-8 rounded-full"
                  />
                  <div className="font-medium">{crypto.name}</div>
                  <div className="text-xs uppercase text-gray-400">{crypto.symbol}</div>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric, index) => (
            <TableRow key={index}>
              <TableCell className="sticky left-0 z-10 bg-gray-900 font-medium">{metric.label}</TableCell>
              {cryptos.map((crypto) => (
                <TableCell key={crypto.id} className="text-center">
                  {metric.getValue(crypto)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
