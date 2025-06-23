// API calls to CoinMarketCal
// Documentation: https://coinmarketcal.com/en/doc/redoc

import { mockEvents } from "./events"

// Cache mechanism to avoid hitting the API too often
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds
let cachedEvents: any[] | null = null
let lastFetchTime: number | null = null

export async function fetchCoinMarketCalEvents() {
  // Check if we have cached data that's still valid
  if (cachedEvents && lastFetchTime && Date.now() - lastFetchTime < CACHE_DURATION) {
    return cachedEvents
  }

  // If COINMARKETCAL_API_KEY is not available, return mock data
  if (!process.env.COINMARKETCAL_API_KEY) {
    console.warn("COINMARKETCAL_API_KEY not found, using mock data")
    cachedEvents = mockEvents
    lastFetchTime = Date.now()
    return mockEvents
  }

  try {
    const response = await fetch("https://api.coinmarketcal.com/v1/events", {
      headers: {
        "x-api-key": process.env.COINMARKETCAL_API_KEY,
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    // Transform the API response to match our expected format
    const formattedEvents = data.body.map((event: any) => ({
      id: event.id.toString(),
      title: event.title.en,
      description: event.description?.en || "No description available",
      date: event.date_event,
      category: mapCategoryFromTags(event.categories),
      coins: event.coins.map((coin: any) => coin.slug),
      image: event.proof || "/placeholder.svg?height=300&width=300",
      isUpcoming: new Date(event.date_event) > new Date(),
      created_at: event.created_date,
    }))

    // Update cache
    cachedEvents = formattedEvents
    lastFetchTime = Date.now()

    return formattedEvents
  } catch (error) {
    console.error("Error fetching events from CoinMarketCal:", error)

    // Fallback to mock data in case of error
    cachedEvents = mockEvents
    lastFetchTime = Date.now()
    return mockEvents
  }
}

// Helper function to map CoinMarketCal categories to our internal categories
function mapCategoryFromTags(categories: string[]) {
  if (!categories || categories.length === 0) return "release"

  const categoryMap: Record<string, string> = {
    "hard fork": "fork",
    "soft fork": "fork",
    conference: "conference",
    meetup: "conference",
    listing: "listing",
    exchange: "listing",
    partnership: "partnership",
    collaboration: "partnership",
    airdrop: "airdrop",
    distribution: "airdrop",
    halving: "halving",
    release: "release",
    update: "release",
    mainnet: "release",
  }

  // Check if any of the categories match our mapping
  for (const category of categories) {
    const lowerCategory = category.toLowerCase()
    for (const [key, value] of Object.entries(categoryMap)) {
      if (lowerCategory.includes(key)) {
        return value
      }
    }
  }

  // Default category
  return "release"
}
