"use client"

import { useState, useEffect } from "react"
import { fetchCryptoChart } from "@/lib/api/coingecko"
import { useCurrency } from "@/hooks/use-currency"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

interface CompareChartProps {
  cryptos: any[]
}

export function CompareChart({ cryptos }: CompareChartProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const [timeframe, setTimeframe] = useState("7")
  const [loading, setLoading] = useState(true)
  const { currency, currencySymbol } = useCurrency()

  useEffect(() => {
    const loadChartData = async () => {
      if (cryptos.length === 0) return

      setLoading(true)
      try {
        const chartPromises = cryptos.map((crypto) => fetchCryptoChart(crypto.id, Number.parseInt(timeframe), currency))
        const chartsData = await Promise.all(chartPromises)

        // Process and combine the data
        const combinedData: any[] = []

        // Get the shortest array length to ensure all data points align
        const minLength = Math.min(...chartsData.map((chart) => chart.prices.length))

        for (let i = 0; i < minLength; i++) {
          const dataPoint: any = {
            date: new Date(chartsData[0].prices[i][0]),
          }

          cryptos.forEach((crypto, index) => {
            // Normalize the values relative to the first data point for percentage comparison
            const firstValue = chartsData[index].prices[0][1]
            const currentValue = chartsData[index].prices[i][1]
            const percentChange = ((currentValue - firstValue) / firstValue) * 100

            dataPoint[crypto.id] = percentChange
          })

          combinedData.push(dataPoint)
        }

        setChartData(combinedData)
      } catch (error) {
        console.error("Erreur lors du chargement des données du graphique:", error)
      } finally {
        setLoading(false)
      }
    }

    loadChartData()
  }, [cryptos, timeframe, currency])

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value)
  }

  const formatXAxis = (timestamp: Date) => {
    if (timeframe === "1") {
      return timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    }
    return timestamp.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    })
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-md bg-gray-800 p-3 shadow-md">
          <p className="text-sm text-gray-300">
            {label instanceof Date
              ? label.toLocaleDateString([], {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-medium" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(2)}%
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const getRandomColor = (index: number) => {
    const colors = ["#22c55e", "#3b82f6", "#ec4899", "#f59e0b", "#8b5cf6"]
    return colors[index % colors.length]
  }

  if (loading || chartData.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p>Chargement des données...</p>
      </div>
    )
  }

  return (
    <div>
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

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            tick={{ fill: "#9ca3af" }}
            axisLine={{ stroke: "#374151" }}
            tickLine={{ stroke: "#374151" }}
          />
          <YAxis
            tick={{ fill: "#9ca3af" }}
            axisLine={{ stroke: "#374151" }}
            tickLine={{ stroke: "#374151" }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {cryptos.map((crypto, index) => (
            <Line
              key={crypto.id}
              type="monotone"
              dataKey={crypto.id}
              name={crypto.name}
              stroke={getRandomColor(index)}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
