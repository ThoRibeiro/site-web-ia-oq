"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateRiskScore } from "@/lib/utils"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"

interface CryptoRiskAnalysisProps {
  crypto: any
}

export function CryptoRiskAnalysis({ crypto }: CryptoRiskAnalysisProps) {
  const riskScore = calculateRiskScore(crypto)

  const getRiskLevel = () => {
    if (riskScore < 30) return { level: "Faible", color: "text-green-500", icon: CheckCircle }
    if (riskScore < 70) return { level: "Moyen", color: "text-yellow-500", icon: Info }
    return { level: "Élevé", color: "text-red-500", icon: AlertTriangle }
  }

  const risk = getRiskLevel()
  const RiskIcon = risk.icon

  const getFactors = () => {
    const factors = []

    // Market cap factor
    if (crypto.market_cap_rank <= 10) {
      factors.push({
        positive: true,
        text: "Capitalisation boursière élevée, parmi les 10 premières cryptomonnaies",
      })
    } else if (crypto.market_cap_rank <= 50) {
      factors.push({
        positive: true,
        text: "Capitalisation boursière moyenne, parmi les 50 premières cryptomonnaies",
      })
    } else {
      factors.push({
        positive: false,
        text: "Capitalisation boursière relativement faible (rang > 50)",
      })
    }

    // Volatility factor
    const volatility = Math.abs(crypto.market_data.price_change_percentage_24h)
    if (volatility < 3) {
      factors.push({
        positive: true,
        text: "Faible volatilité sur 24h (<3%)",
      })
    } else if (volatility < 10) {
      factors.push({
        positive: null,
        text: `Volatilité modérée sur 24h (${volatility.toFixed(1)}%)`,
      })
    } else {
      factors.push({
        positive: false,
        text: `Forte volatilité sur 24h (${volatility.toFixed(1)}%)`,
      })
    }

    // Volume to market cap ratio
    const volumeRatio =
      crypto.market_data.total_volume[Object.keys(crypto.market_data.total_volume)[0]] /
      crypto.market_data.market_cap[Object.keys(crypto.market_data.market_cap)[0]]

    if (volumeRatio > 0.1) {
      factors.push({
        positive: true,
        text: "Bon ratio volume/capitalisation (>10%)",
      })
    } else if (volumeRatio > 0.05) {
      factors.push({
        positive: null,
        text: "Ratio volume/capitalisation moyen",
      })
    } else {
      factors.push({
        positive: false,
        text: "Faible ratio volume/capitalisation (<5%)",
      })
    }

    // Community factor
    if (crypto.community_data.twitter_followers > 500000) {
      factors.push({
        positive: true,
        text: "Large communauté sur Twitter",
      })
    }

    if (crypto.community_data.reddit_subscribers > 100000) {
      factors.push({
        positive: true,
        text: "Large communauté sur Reddit",
      })
    }

    return factors
  }

  const factors = getFactors()

  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardHeader>
        <CardTitle>Analyse de risque</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <RiskIcon className={`mr-2 h-5 w-5 ${risk.color}`} />
            <span className={`text-lg font-medium ${risk.color}`}>Risque {risk.level}</span>
          </div>
          <div className="flex items-center">
            <div className="relative h-10 w-10">
              <svg viewBox="0 0 36 36" className="h-10 w-10">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={riskScore < 30 ? "#22c55e" : riskScore < 70 ? "#eab308" : "#ef4444"}
                  strokeWidth="3"
                  strokeDasharray={`${riskScore}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">{riskScore}</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Facteurs de risque:</h4>
          <ul className="space-y-2">
            {factors.map((factor, index) => (
              <li key={index} className="flex items-start">
                {factor.positive === true && <CheckCircle className="mr-2 h-5 w-5 text-green-500" />}
                {factor.positive === false && <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />}
                {factor.positive === null && <Info className="mr-2 h-5 w-5 text-yellow-500" />}
                <span>{factor.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 text-sm text-gray-400">
          <p>
            Cette analyse est basée sur des données publiques et ne constitue pas un conseil financier. Faites toujours
            vos propres recherches avant d'investir.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
