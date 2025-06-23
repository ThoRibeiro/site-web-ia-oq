"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { useCurrency } from "@/hooks/use-currency"

interface CryptoStatsProps {
  crypto: any
}

export function CryptoStats({ crypto }: CryptoStatsProps) {
  const { currency, currencySymbol } = useCurrency()

  const stats = [
    {
      label: "Capitalisation boursière",
      value: `${currencySymbol}${formatCurrency(crypto.market_data.market_cap[currency.toLowerCase()], true)}`,
    },
    {
      label: "Volume (24h)",
      value: `${currencySymbol}${formatCurrency(crypto.market_data.total_volume[currency.toLowerCase()], true)}`,
    },
    {
      label: "Offre en circulation",
      value: `${formatCurrency(crypto.market_data.circulating_supply, true)} ${crypto.symbol.toUpperCase()}`,
    },
    {
      label: "Offre totale",
      value: crypto.market_data.total_supply
        ? `${formatCurrency(crypto.market_data.total_supply, true)} ${crypto.symbol.toUpperCase()}`
        : "∞",
    },
    {
      label: "Offre maximale",
      value: crypto.market_data.max_supply
        ? `${formatCurrency(crypto.market_data.max_supply, true)} ${crypto.symbol.toUpperCase()}`
        : "∞",
    },
    {
      label: "ATH (All-Time High)",
      value: `${currencySymbol}${formatCurrency(crypto.market_data.ath[currency.toLowerCase()])}`,
    },
    {
      label: "Variation depuis ATH",
      value: `${crypto.market_data.ath_change_percentage[currency.toLowerCase()].toFixed(2)}%`,
      isNegative: true,
    },
    {
      label: "Date ATH",
      value: new Date(crypto.market_data.ath_date[currency.toLowerCase()]).toLocaleDateString(),
    },
    {
      label: "Abonnés Twitter",
      value: formatCurrency(crypto.community_data.twitter_followers, true),
    },
    {
      label: "Abonnés Reddit",
      value: formatCurrency(crypto.community_data.reddit_subscribers, true),
    },
  ]

  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardHeader>
        <CardTitle>Statistiques</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-400">{stat.label}</span>
              <span className={stat.isNegative ? "text-red-500" : "font-medium text-white"}>{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
