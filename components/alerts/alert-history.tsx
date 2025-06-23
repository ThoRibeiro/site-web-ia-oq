"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { Bell, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getTimeAgo } from "@/lib/utils"
import { useCurrency } from "@/hooks/use-currency"

interface AlertHistoryProps {
  alerts: any[]
}

export function AlertHistory({ alerts }: AlertHistoryProps) {
  const { currencySymbol } = useCurrency()

  if (alerts.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/30">
        <div className="text-center">
          <Bell className="mx-auto mb-2 h-8 w-8 text-gray-400" />
          <p className="text-gray-400">Aucune alerte déclenchée récemment</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Card key={alert.id} className="overflow-hidden border-gray-800 bg-gray-900/50 hover:border-gray-700">
          <CardContent className="p-4">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
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
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-green-500">Déclenchée</Badge>
                <div className="flex items-center gap-2">
                  {alert.notifications.includes("email") && (
                    <Badge variant="outline" className="border-blue-500 text-blue-500">
                      Email
                    </Badge>
                  )}
                  {alert.notifications.includes("push") && (
                    <Badge variant="outline" className="border-purple-500 text-purple-500">
                      Push
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  {getTimeAgo(alert.triggered_at || "")} (
                  {new Date(alert.triggered_at || "").toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  )
                </p>
              </div>
              <div>
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/crypto/${alert.crypto.id}`}>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
