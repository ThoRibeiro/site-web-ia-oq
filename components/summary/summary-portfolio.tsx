"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, DollarSign, TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { useCurrency } from "@/hooks/use-currency"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

export function SummaryPortfolio() {
  const { currencySymbol } = useCurrency()

  // Mock portfolio data
  const mockPortfolio = {
    totalValue: 15790,
    totalChange: 508,
    totalChangePercentage: 3.28,
    assets: [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        amount: 0.12,
        value: 6000,
        price: 50000,
        allocation: 38,
        change: 4.2,
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        amount: 1.5,
        value: 4500,
        price: 3000,
        allocation: 28.5,
        change: 2.8,
      },
      {
        id: "solana",
        name: "Solana",
        symbol: "SOL",
        amount: 20,
        value: 2000,
        price: 100,
        allocation: 12.7,
        change: 8.5,
      },
      {
        id: "cardano",
        name: "Cardano",
        symbol: "ADA",
        amount: 5000,
        value: 2000,
        price: 0.4,
        allocation: 12.7,
        change: -3.2,
      },
      {
        id: "polkadot",
        name: "Polkadot",
        symbol: "DOT",
        amount: 200,
        value: 1290,
        price: 6.45,
        allocation: 8.1,
        change: 1.7,
      },
    ],
  }

  // Chart data
  const chartData = {
    labels: mockPortfolio.assets.map((asset) => asset.name),
    datasets: [
      {
        data: mockPortfolio.assets.map((asset) => asset.value),
        backgroundColor: ["#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "70%",
  }

  return (
    <div>
      <div className="mb-6 grid gap-6 md:grid-cols-3">
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-gray-400">Valeur totale</h3>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </div>
            <p className="mt-2 text-2xl font-bold">
              {currencySymbol}
              {formatCurrency(mockPortfolio.totalValue)}
            </p>
            <div className="mt-1 flex items-center text-green-500">
              <ArrowUp className="mr-1 h-4 w-4" />
              <span>
                {currencySymbol}
                {formatCurrency(mockPortfolio.totalChange)} ({mockPortfolio.totalChangePercentage.toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50 md:col-span-2">
          <CardContent className="p-4">
            <h3 className="mb-4 text-sm text-gray-400">Répartition du portefeuille</h3>
            <div className="flex items-center">
              <div className="h-32 w-32">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
              <div className="ml-4 flex-1">
                <div className="space-y-2">
                  {mockPortfolio.assets.slice(0, 3).map((asset, index) => (
                    <div key={asset.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="mr-2 h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: chartData.datasets[0].backgroundColor[index],
                          }}
                        ></div>
                        <span className="text-sm">
                          {asset.name} ({asset.allocation.toFixed(1)}%)
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {currencySymbol}
                        {formatCurrency(asset.value)}
                      </span>
                    </div>
                  ))}
                  {mockPortfolio.assets.length > 3 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 rounded-full bg-gray-500"></div>
                        <span className="text-sm">Autres</span>
                      </div>
                      <span className="text-sm font-medium">
                        {currencySymbol}
                        {formatCurrency(mockPortfolio.assets.slice(3).reduce((total, asset) => total + asset.value, 0))}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h3 className="mb-4 text-lg font-medium">Performance de vos actifs</h3>
      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Actif</th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-medium">Quantité</th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-medium">Prix</th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-medium">Valeur</th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-medium">Variation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {mockPortfolio.assets.map((asset) => {
              const changeClass = asset.change >= 0 ? "text-green-500" : "text-red-500"

              return (
                <tr key={asset.id} className="hover:bg-gray-900/50">
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex items-center">
                      <div>
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-xs uppercase text-gray-400">{asset.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    {asset.amount} {asset.symbol}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    {currencySymbol}
                    {formatCurrency(asset.price)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-medium">
                    {currencySymbol}
                    {formatCurrency(asset.value)}
                  </td>
                  <td className={`whitespace-nowrap px-4 py-3 text-right font-medium ${changeClass}`}>
                    <div className="flex items-center justify-end">
                      {asset.change >= 0 ? (
                        <ArrowUp className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="mr-1 h-4 w-4" />
                      )}
                      {Math.abs(asset.change).toFixed(2)}%
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <Button asChild>
          <Link href="/portfolio">
            <TrendingUp className="mr-2 h-4 w-4" />
            Voir le portefeuille complet
          </Link>
        </Button>
      </div>
    </div>
  )
}
