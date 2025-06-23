"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { useCurrency } from "@/hooks/use-currency"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface CryptoChartProps {
  data: [number, number][]
  type: "price" | "market_cap" | "volume"
  timeframe: string
}

export function CryptoChart({ data, type, timeframe }: CryptoChartProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const { currencySymbol } = useCurrency()

  useEffect(() => {
    if (!data) return

    const formattedData = data.map(([timestamp, value]) => ({
      date: new Date(timestamp),
      value,
    }))

    setChartData(formattedData)
  }, [data])

  if (!data || chartData.length === 0) {
    return (
      <Card className="border-gray-800 bg-gray-900/50">
        <CardContent className="p-6">
          <div className="flex h-[300px] items-center justify-center">
            <p>Chargement des données...</p>
          </div>
        </CardContent>
      </Card>
    )
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

  const formatTooltipValue = (value: number) => {
    if (type === "price") {
      return `${currencySymbol}${formatCurrency(value)}`
    }
    return `${currencySymbol}${formatCurrency(value, true)}`
  }

  const getChartColor = () => {
    const firstValue = chartData[0]?.value || 0
    const lastValue = chartData[chartData.length - 1]?.value || 0
    return lastValue >= firstValue ? "#22c55e" : "#ef4444"
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
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : label}
          </p>
          <p className="font-bold text-white">{formatTooltipValue(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              tick={{ fill: "#9ca3af" }}
              axisLine={{ stroke: "#374151" }}
              tickLine={{ stroke: "#374151" }}
            />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fill: "#9ca3af" }}
              axisLine={{ stroke: "#374151" }}
              tickLine={{ stroke: "#374151" }}
              tickFormatter={(value) =>
                type === "price" ? `${currencySymbol}${formatCurrency(value)}` : `${formatCurrency(value, true)}`
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke={getChartColor()} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
