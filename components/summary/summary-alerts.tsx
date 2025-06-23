"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getTimeAgo } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import { useCurrency } from "@/hooks/use-currency"

export function SummaryAlerts() {
  const { currencySymbol } = useCurrency()

  // Mock alerts data
  const mockAlerts = [
    {
      id: "1",
      crypto: {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      },
      condition: "above",
      price: 55000,
      triggered: true,
      triggered_at: "2024-05-22T16:45:00Z",
      created_at: "2024-05-20T10:30:00Z",
      current_price: 56200,
    },
    {
      id: "2",
      crypto: {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      },
      condition: "below",
      price: 2800,
      triggered: false,
      created_at: "2024-05-21T14:15:00Z",
      current_price: 3050,
    },
    {
      id: "3",
      crypto: {
        id: "solana",
        name: "Solana",
        symbol: "SOL",
        image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
      },
      condition: "above",
      price: 120,
      triggered: true,
      triggered_at: "2024-05-23T09:15:00Z",
      created_at: "2024-05-22T09:45:00Z",
      current_price: 125,
    },
  ]

  const triggeredAlerts = mockAlerts.filter((alert) => alert.triggered)
  const pendingAlerts = mockAlerts.filter((alert) => !alert.triggered)

  return (
    <div>
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-medium">Alertes déclenchées cette semaine</h3>
        {triggeredAlerts.length === 0 ? (
          <Card className="border-gray-800 bg-gray-900/50">
            <CardContent className="p-6 text-center">
              <p className="text-gray-400">Aucune alerte déclenchée cette semaine</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {triggeredAlerts.map((alert) => (
              <Card key={alert.id} className="overflow-hidden border-gray-800 bg-gray-900/50 hover:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative mr-3 h-10 w-10">
                        <Image
                          src={alert.crypto.image || "/placeholder.svg"}
                          alt={alert.crypto.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{alert.crypto.name}</p>
                          <p className="ml-2 text-xs uppercase text-gray-400">{alert.crypto.symbol}</p>
                        </div>
                        <p className="text-sm text-gray-400">
                          Alerte {alert.condition === "above" ? "au-dessus" : "en-dessous"} de{" "}
                          <span className="font-medium">
                            {currencySymbol}
                            {formatCurrency(alert.price)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="mb-1 bg-green-500">Déclenchée</Badge>
                      <p className="text-sm text-gray-400">{getTimeAgo(alert.triggered_at || "")}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-gray-800 pt-3">
                    <p className="text-sm">
                      Prix actuel:{" "}
                      <span className="font-medium">
                        {currencySymbol}
                        {formatCurrency(alert.current_price)}
                      </span>
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/crypto/${alert.crypto.id}`}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Voir détails
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium">Alertes en attente</h3>
        {pendingAlerts.length === 0 ? (
          <Card className="border-gray-800 bg-gray-900/50">
            <CardContent className="p-6 text-center">
              <p className="text-gray-400">Aucune alerte en attente</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {pendingAlerts.map((alert) => (
              <Card key={alert.id} className="overflow-hidden border-gray-800 bg-gray-900/50 hover:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative mr-3 h-10 w-10">
                        <Image
                          src={alert.crypto.image || "/placeholder.svg"}
                          alt={alert.crypto.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{alert.crypto.name}</p>
                          <p className="ml-2 text-xs uppercase text-gray-400">{alert.crypto.symbol}</p>
                        </div>
                        <p className="text-sm text-gray-400">
                          Alerte {alert.condition === "above" ? "au-dessus" : "en-dessous"} de{" "}
                          <span className="font-medium">
                            {currencySymbol}
                            {formatCurrency(alert.price)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1 border-yellow-500 text-yellow-500">
                        En attente
                      </Badge>
                      <p className="text-sm text-gray-400">Créée {getTimeAgo(alert.created_at)}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-gray-800 pt-3">
                    <p className="text-sm">
                      Prix actuel:{" "}
                      <span className="font-medium">
                        {currencySymbol}
                        {formatCurrency(alert.current_price)}
                      </span>
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/crypto/${alert.crypto.id}`}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Voir détails
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <Button asChild>
          <Link href="/alerts">
            <Bell className="mr-2 h-4 w-4" />
            Gérer toutes les alertes
          </Link>
        </Button>
      </div>
    </div>
  )
}
