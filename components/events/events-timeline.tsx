"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

interface EventsTimelineProps {
  events: any[]
}

export function EventsTimeline({ events }: EventsTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/30">
        <p className="text-gray-400">Aucun événement trouvé</p>
      </div>
    )
  }

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Group events by month
  const groupedEvents: Record<string, any[]> = {}
  sortedEvents.forEach((event) => {
    const date = new Date(event.date)
    const monthYear = date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
    if (!groupedEvents[monthYear]) {
      groupedEvents[monthYear] = []
    }
    groupedEvents[monthYear].push(event)
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "conference":
        return "bg-blue-500"
      case "release":
        return "bg-green-500"
      case "fork":
        return "bg-purple-500"
      case "halving":
        return "bg-yellow-500"
      case "listing":
        return "bg-pink-500"
      case "partnership":
        return "bg-cyan-500"
      case "airdrop":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "conference":
        return "Conférence"
      case "release":
        return "Lancement"
      case "fork":
        return "Fork"
      case "halving":
        return "Halving"
      case "listing":
        return "Listing"
      case "partnership":
        return "Partenariat"
      case "airdrop":
        return "Airdrop"
      default:
        return category
    }
  }

  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:left-9 before:ml-px before:h-full before:w-0.5 before:bg-gray-700">
      {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
        <div key={monthYear}>
          <div className="relative mb-4 flex items-center">
            <div className="absolute left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
              <span className="text-xs font-bold">{monthYear.split(" ")[0].substring(0, 3)}</span>
            </div>
            <h3 className="ml-12 text-xl font-bold">{monthYear}</h3>
          </div>

          <div className="space-y-6">
            {monthEvents.map((event) => (
              <div key={event.id} className="relative">
                <div className="absolute left-0 z-10 mt-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-700 bg-gray-900">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                </div>

                <Card className="ml-12 overflow-hidden border-gray-800 bg-gray-900/50 hover:border-gray-700">
                  <CardContent className="p-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge className={getCategoryColor(event.category)}>{getCategoryLabel(event.category)}</Badge>
                      <div className="text-sm text-gray-400">
                        {new Date(event.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      {event.isUpcoming && (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                          À venir
                        </Badge>
                      )}
                    </div>
                    <h3 className="mb-2 text-lg font-bold">{event.title}</h3>
                    <p className="mb-4 text-sm text-gray-400">{event.description}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {event.coins.map((coinId: string) => {
                        const coin = {
                          id: coinId,
                          name: coinId.charAt(0).toUpperCase() + coinId.slice(1),
                          image: `/placeholder.svg?height=20&width=20`,
                        }
                        return (
                          <div key={coin.id} className="flex items-center rounded-full bg-gray-800 px-3 py-1">
                            <div className="relative mr-2 h-4 w-4">
                              <Image
                                src={coin.image || "/placeholder.svg"}
                                alt={coin.name}
                                fill
                                className="rounded-full"
                              />
                            </div>
                            <span className="text-xs">{coin.name}</span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" className="gap-1">
                        <ExternalLink className="h-4 w-4" />
                        <span>Voir les détails</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
