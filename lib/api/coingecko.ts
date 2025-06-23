// Simulated API calls to CoinGecko
// In a real app, you would use the actual CoinGecko API

import { mockCryptoData } from "@/lib/mock-data"

export async function fetchCryptos(currency = "USD", page = 1, perPage = 100) {
  // In a real app, you would use:
  // const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h,7d`);
  // return await response.json();

  // For demo purposes, we'll use mock data
  return mockCryptoData.map((crypto) => ({
    ...crypto,
    // Adjust prices based on currency
    current_price: adjustPrice(crypto.current_price, currency),
    market_cap: adjustPrice(crypto.market_cap, currency),
    total_volume: adjustPrice(crypto.total_volume, currency),
  }))
}

export async function fetchCryptoDetail(id: string, currency = "USD") {
  // In a real app, you would use:
  // const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`);
  // return await response.json();

  // For demo purposes, we'll find the crypto in our mock data
  const crypto = mockCryptoData.find((c) => c.id === id)

  if (!crypto) {
    throw new Error("Crypto not found")
  }

  return {
    ...crypto,
    current_price: adjustPrice(crypto.current_price, currency),
    market_cap: adjustPrice(crypto.market_cap, currency),
    total_volume: adjustPrice(crypto.total_volume, currency),
    description: {
      en: "This is a mock description for the cryptocurrency. In a real app, this would contain detailed information about the project, its technology, team, and goals.",
    },
    market_data: {
      current_price: {
        [currency.toLowerCase()]: adjustPrice(crypto.current_price, currency),
      },
      price_change_percentage_24h: crypto.price_change_percentage_24h,
      price_change_percentage_7d: crypto.price_change_percentage_7d_in_currency,
      price_change_percentage_30d: crypto.price_change_percentage_24h * 0.8, // Mock data
      market_cap: {
        [currency.toLowerCase()]: adjustPrice(crypto.market_cap, currency),
      },
      total_volume: {
        [currency.toLowerCase()]: adjustPrice(crypto.total_volume, currency),
      },
      circulating_supply: crypto.circulating_supply,
      total_supply: crypto.total_supply,
      max_supply: crypto.max_supply,
    },
    community_data: {
      twitter_followers: Math.floor(Math.random() * 1000000),
      reddit_subscribers: Math.floor(Math.random() * 500000),
    },
  }
}

export async function fetchCryptoChart(id: string, days = 7, currency = "USD") {
  // In a real app, you would use:
  // const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
  // return await response.json();

  // For demo purposes, we'll generate mock chart data
  const prices = []
  const volumes = []
  const market_caps = []

  const now = Date.now()
  const oneDayMs = 24 * 60 * 60 * 1000
  const crypto = mockCryptoData.find((c) => c.id === id)

  if (!crypto) {
    throw new Error("Crypto not found")
  }

  let price = adjustPrice(crypto.current_price, currency)
  const volatility = 0.05 // 5% price movement

  for (let i = days; i >= 0; i--) {
    const timestamp = now - i * oneDayMs

    // Random price movement
    const change = (Math.random() - 0.5) * 2 * volatility
    price = price * (1 + change)

    prices.push([timestamp, adjustPrice(price, currency)])
    volumes.push([timestamp, adjustPrice(crypto.total_volume * (0.8 + Math.random() * 0.4), currency)])
    market_caps.push([timestamp, adjustPrice(crypto.market_cap * (0.9 + Math.random() * 0.2), currency)])
  }

  return { prices, volumes, market_caps }
}

export async function searchCryptos(query: string) {
  // In a real app, you would use:
  // const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
  // return await response.json();

  // For demo purposes, we'll filter our mock data
  const filteredCoins = mockCryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(query.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(query.toLowerCase()),
  )

  return {
    coins: filteredCoins.map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      market_cap_rank: coin.market_cap_rank,
      thumb: coin.image,
      large: coin.image,
    })),
  }
}

// Helper function to adjust price based on currency
function adjustPrice(price: number, currency: string) {
  switch (currency) {
    case "EUR":
      return price * 0.93 // Approximate EUR/USD rate
    case "GBP":
      return price * 0.79 // Approximate GBP/USD rate
    case "BTC":
      return price / 50000 // Approximate BTC/USD rate
    case "ETH":
      return price / 3000 // Approximate ETH/USD rate
    default:
      return price // USD
  }
}
