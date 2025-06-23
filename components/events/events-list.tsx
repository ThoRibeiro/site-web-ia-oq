"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"
import { getTimeAgo } from "@/lib/utils"

interface EventsListProps {
  events: any[]
}

export function EventsList({ events }: EventsListProps) {
  if (events.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/30">
        <p className="text-gray-400">Aucun événement trouvé</p>
      </div>
    )
  }

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
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden border-gray-800 bg-gray-900/50 hover:border-gray-700">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="relative flex h-40 w-full items-center justify-center bg-gray-800 p-6 md:w-64">
                {event.image ? (
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-700">
                    <Calendar className="h-10 w-10 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge className={getCategoryColor(event.category)}>{getCategoryLabel(event.category)}</Badge>
                    <div className="text-sm text-gray-400">
                      {new Date(event.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    {event.isUpcoming && (
                      <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                        À venir
                      </Badge>
                    )}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{event.title}</h3>
                  <p className="mb-4 text-gray-400">{event.description}</p>
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
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">Ajouté {getTimeAgo(event.created_at)}</div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <span className="hidden sm:inline">Voir les détails</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
