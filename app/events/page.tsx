"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EventsList } from "@/components/events/events-list"
import { EventsTimeline } from "@/components/events/events-timeline"
import { EventsCalendar } from "@/components/events/events-calendar"
import { fetchEvents } from "@/lib/api/events"
import { Skeleton } from "@/components/ui/skeleton"
import { mockCryptoData } from "@/lib/mock-data"
import { fetchCoinMarketCalEvents } from "@/lib/api/coinmarketcal"

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [filteredEvents, setFilteredEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"list" | "timeline" | "calendar">("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCrypto, setSelectedCrypto] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true)
      try {
        // Try to fetch from CoinMarketCal API first
        const data = await fetchCoinMarketCalEvents()
        setEvents(data)
        setFilteredEvents(data)
      } catch (error) {
        console.error("Erreur lors du chargement des événements:", error)
        // Fallback to mock data
        const mockData = await fetchEvents()
        setEvents(mockData)
        setFilteredEvents(mockData)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  useEffect(() => {
    let filtered = [...events]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by crypto
    if (selectedCrypto !== "all") {
      filtered = filtered.filter((event) => event.coins.includes(selectedCrypto))
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }

    setFilteredEvents(filtered)
  }, [searchTerm, selectedCrypto, selectedCategory, events])

  const handleViewChange = (value: string) => {
    setView(value as "list" | "timeline" | "calendar")
  }

  const categories = [
    { value: "all", label: "Toutes les catégories" },
    { value: "conference", label: "Conférences" },
    { value: "release", label: "Lancements" },
    { value: "fork", label: "Forks" },
    { value: "halving", label: "Halvings" },
    { value: "listing", label: "Listings" },
    { value: "partnership", label: "Partenariats" },
    { value: "airdrop", label: "Airdrops" },
  ]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Événements Crypto</h1>
        <Skeleton className="mb-6 h-[100px] w-full rounded-xl" />
        <Skeleton className="h-[500px] w-full rounded-xl" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Événements Crypto</h1>

      <Card className="mb-8 border-gray-800 bg-gray-900/50">
        <CardHeader>
          <CardTitle>Filtrer les événements</CardTitle>
          <CardDescription>Trouvez les événements qui vous intéressent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Input
                placeholder="Rechercher un événement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                <SelectTrigger className="bg-gray-800">
                  <SelectValue placeholder="Toutes les cryptos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les cryptos</SelectItem>
                  {mockCryptoData.map((crypto) => (
                    <SelectItem key={crypto.id} value={crypto.id}>
                      {crypto.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-gray-800">
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={view} onValueChange={handleViewChange} className="w-full">
        <div className="mb-6 flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="list">Liste</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          </TabsList>
          <div className="text-sm text-gray-400">{filteredEvents.length} événements trouvés</div>
        </div>

        <TabsContent value="list" className="mt-0">
          <EventsList events={filteredEvents} />
        </TabsContent>

        <TabsContent value="timeline" className="mt-0">
          <EventsTimeline events={filteredEvents} />
        </TabsContent>

        <TabsContent value="calendar" className="mt-0">
          <EventsCalendar events={filteredEvents} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
