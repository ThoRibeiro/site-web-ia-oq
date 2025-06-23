"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Image from "next/image"

interface EventsCalendarProps {
  events: any[]
}

export function EventsCalendar({ events }: EventsCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDate(null)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDate(null)
  }

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(year, month, day))
  }

  // Get events for the selected date
  const getEventsForDate = (day: number) => {
    const date = new Date(year, month, day)
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  // Check if a date has events
  const hasEvents = (day: number) => {
    return getEventsForDate(day).length > 0
  }

  // Get events for the selected date
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate.getDate()) : []

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

  const weekdays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]

  return (
    <div>
      <Card className="mb-6 border-gray-800 bg-gray-900/50">
        <CardContent className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold">
              {monthNames[month]} {year}
            </h2>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekdays.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
                {day}
              </div>
            ))}

            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="p-2"></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const isToday =
                day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
              const isSelected = selectedDate && day === selectedDate.getDate()
              const dayHasEvents = hasEvents(day)

              return (
                <div
                  key={day}
                  className={`relative cursor-pointer p-2 text-center hover:bg-gray-800 ${
                    isSelected ? "bg-blue-500/20" : ""
                  } ${isToday ? "font-bold text-blue-500" : ""}`}
                  onClick={() => handleDateClick(day)}
                >
                  <span>{day}</span>
                  {dayHasEvents && (
                    <div className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-500"></div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <div>
          <h3 className="mb-4 text-lg font-bold">
            Événements du{" "}
            {selectedDate.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h3>

          {selectedDateEvents.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/30">
              <p className="text-gray-400">Aucun événement pour cette date</p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDateEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden border-gray-800 bg-gray-900/50 hover:border-gray-700">
                  <CardContent className="p-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge className={getCategoryColor(event.category)}>{getCategoryLabel(event.category)}</Badge>
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
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
