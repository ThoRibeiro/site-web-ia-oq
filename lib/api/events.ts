// Simulated API calls to CoinMarketCal
// In a real app, you would use the actual CoinMarketCal API

export async function fetchEvents() {
  // In a real app, you would use:
  // const response = await fetch(`https://api.coinmarketcal.com/v1/events`, {
  //   headers: {
  //     'x-api-key': process.env.COINMARKETCAL_API_KEY
  //   }
  // });
  // return await response.json();

  // For demo purposes, we'll use mock data
  return mockEvents
}

// Mock events data
const mockEvents = [
  {
    id: "1",
    title: "Bitcoin Halving",
    description:
      "Le quatrième halving de Bitcoin réduira de moitié la récompense des mineurs, passant de 6,25 à 3,125 BTC par bloc.",
    date: "2024-04-20T00:00:00Z",
    category: "halving",
    coins: ["bitcoin"],
    image: "/placeholder.svg?height=300&width=300",
    isUpcoming: false,
    created_at: "2023-10-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Ethereum Cancun-Deneb Upgrade",
    description:
      "La mise à jour Cancun-Deneb d'Ethereum apportera des améliorations significatives en termes d'évolutivité et d'efficacité.",
    date: "2024-05-21T00:00:00Z",
    category: "fork",
    coins: ["ethereum"],
    image: "/placeholder.svg?height=300&width=300",
    isUpcoming: false,
    created_at: "2023-12-10T14:15:00Z",
  },
  {
    id: "3",
    title: "Solana Breakpoint Conference",
    description:
      "La conférence annuelle Breakpoint de Solana réunira des développeurs, des investisseurs et des passionnés du monde entier.",
    date: "2024-06-15T00:00:00Z",
    category: "conference",
    coins: ["solana"],
    image: "/placeholder.svg?height=300&width=300",
    isUpcoming: true,
    created_at: "2024-01-05T09:45:00Z",
  },
  {
    id: "4",
    title: "Cardano Vasil Hard Fork",
    description:
      "Le hard fork Vasil de Cardano vise à améliorer les performances du réseau et à introduire de nouvelles fonctionnalités pour les développeurs.",
    date: "2024-07-10T00:00:00Z",
    category: "fork",
    coins: ["cardano"],
    image: "/placeholder.svg?height=300&width=300",
    isUpcoming: true,
    created_at: "2024-02-20T16:20:00Z",
  },
  {
    id: "5",
    title: "Binance Coin Burn",
    description:
      "Binance procédera à son burn trimestriel de BNB, réduisant l'offre totale et potentiellement augmentant la valeur du token.",
    date: "2024-07-15T00:00:00Z",
    category: "release",
    coins: ["binancecoin"],
    image: "/placeholder.svg?height=300&width=300",
    isUpcoming: true,
    created_at: "2024-03-01T11:05:00Z",
  },
  {
    id: "6",
    title: "Polkadot Parachain Auctions",
    description:
      "Nouvelle série d'enchères de parachains sur Polkadot, permettant à de nouveaux projets de sécuriser un slot sur le réseau.",
    date: "2024-08-01T00:00:00Z",
    category: "release",
    coins: ["polkadot"],
    image: "/placeholder.svg?height=300&width=300",
    isUpcoming: true,
    created_at: "2024-03-15T13:40:00Z",
  },
  {
    id: "7",
    title: "Chainlink Staking v0.2",
    description:
      "Lancement de la version 0.2 du staking Chainlink, permettant aux détenteurs de LINK de participer à la sécurisation du réseau.",
    date: "2024-08-15T00:00:00Z",
    category: "release",
    coins: ["chainlink"],
    image: "/placeholder.svg?height=300&width=300",
    isUpcoming: true,
    created_at: "2024-04-05T08:25:00Z",
  },
  {
    id: "8",
    title: "Litecoin Listed on Major Exchange",
    description:
      "Litecoin sera listé sur une nouvelle grande bourse d'échange, augmentant sa liquidité et son accessibilité.",
    date: "2024-09-01T00:00:00Z",
    category: "listing",
    coins: ["litecoin"],
    image: "/placeholder.svg?height=300&width=300",
    isUpcoming: true,
    created_at: "2024-04-20T15:10:00Z",
  },
  {
    id: "9",
    title: "Ripple Partnership Announcement",
    description:
      "Ripple annoncera un nouveau partenariat majeur avec une institution financière internationale pour l'utilisation de XRP.",
    date: "2024-09-15T00:00:00Z",
    category: "partnership",
    coins: ["ripple"],
    image: "/placeholder.svg?height=300&width=300",
    isUpcoming: true,
    created_at: "2024-05-01T10:55:00Z",
  },
  {
    id: "10",
    title: "Dogecoin Community Airdrop",
    description:
      "La communauté Dogecoin organisera un airdrop pour célébrer l'anniversaire de la création de la cryptomonnaie mème.",
    date: "2024-12-06T00:00:00Z",
    category: "airdrop",
    coins: ["dogecoin"],
    image: "/placeholder.svg?height=300&width=300",
    isUpcoming: true,
    created_at: "2024-05-10T12:30:00Z",
  },
]
