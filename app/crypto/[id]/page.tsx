"use client"

import { useEffect, useState } from "react"
import { fetchCryptoDetail, fetchCryptoChart } from "@/lib/api/coingecko"
import { CryptoHeader } from "@/components/crypto/crypto-header"
import { CryptoChart } from "@/components/crypto/crypto-chart"
import { CryptoStats } from "@/components/crypto/crypto-stats"
import { CryptoDescription } from "@/components/crypto/crypto-description"
import { CryptoRiskAnalysis } from "@/components/crypto/crypto-risk-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrency } from "@/hooks/use-currency"

export default function CryptoDetailPage({ params }: { params: { id: string } }) {
  const [crypto, setCrypto] = useState<any>(null)
  const [chartData, setChartData] = useState<any>(null)
  const [timeframe, setTimeframe] = useState("7")
  const [loading, setLoading] = useState(true)
  const { currency } = useCurrency()

  useEffect(() => {
    const loadCryptoData = async () => {
      setLoading(true)
      try {
        const data = await fetchCryptoDetail(params.id, currency)
        setCrypto(data)

        const chart = await fetchCryptoChart(params.id, Number.parseInt(timeframe), currency)
        setChartData(chart)
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCryptoData()
  }, [params.id, currency, timeframe])

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value)
  }

  if (loading || !crypto) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-12 w-64" />
          <div className="mt-4 flex items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div>
              <Skeleton className="mb-2 h-8 w-48" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        </div>
        <Skeleton className="mb-8 h-[400px] w-full rounded-xl" />
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="h-[300px] rounded-xl" />
          <Skeleton className="h-[300px] rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CryptoHeader crypto={crypto} />

      <div className="mb-8">
        <Tabs defaultValue="price" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="price">Prix</TabsTrigger>
            <TabsTrigger value="market_cap">Cap. Marché</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
          </TabsList>
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={() => handleTimeframeChange("1")}
              className={`rounded-full px-3 py-1 text-sm ${
                timeframe === "1" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              24h
            </button>
            <button
              onClick={() => handleTimeframeChange("7")}
              className={`rounded-full px-3 py-1 text-sm ${
                timeframe === "7" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              7j
            </button>
            <button
              onClick={() => handleTimeframeChange("30")}
              className={`rounded-full px-3 py-1 text-sm ${
                timeframe === "30" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              30j
            </button>
            <button
              onClick={() => handleTimeframeChange("90")}
              className={`rounded-full px-3 py-1 text-sm ${
                timeframe === "90" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              90j
            </button>
            <button
              onClick={() => handleTimeframeChange("365")}
              className={`rounded-full px-3 py-1 text-sm ${
                timeframe === "365" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              1a
            </button>
          </div>
          <TabsContent value="price">
            <CryptoChart data={chartData?.prices} type="price" timeframe={timeframe} />
          </TabsContent>
          <TabsContent value="market_cap">
            <CryptoChart data={chartData?.market_caps} type="market_cap" timeframe={timeframe} />
          </TabsContent>
          <TabsContent value="volume">
            <CryptoChart data={chartData?.volumes} type="volume" timeframe={timeframe} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <CryptoStats crypto={crypto} />
        <CryptoRiskAnalysis crypto={crypto} />
      </div>

      <div className="mt-8">
        <CryptoDescription crypto={crypto} />
      </div>
    </div>
  )
}
