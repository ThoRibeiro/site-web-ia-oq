"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { getTimeAgo } from "@/lib/utils"

export function SummaryNews() {
  // Mock news data
  const mockNews = [
    {
      id: "1",
      title: "Bitcoin atteint un nouveau sommet historique à 69 000 $",
      excerpt:
        "Le Bitcoin a atteint un nouveau sommet historique, dépassant les 69 000 $ pour la première fois de son histoire, porté par l'adoption institutionnelle croissante.",
      source: "CoinDesk",
      date: "2024-05-22T10:30:00Z",
      category: "Marché",
      url: "#",
    },
    {
      id: "2",
      title: "Ethereum finalise sa mise à jour majeure 'Cancun-Deneb'",
      excerpt:
        "La mise à jour tant attendue d'Ethereum, 'Cancun-Deneb', a été déployée avec succès, apportant des améliorations significatives en termes d'évolutivité et d'efficacité.",
      source: "The Block",
      date: "2024-05-21T14:15:00Z",
      category: "Technologie",
      url: "#",
    },
    {
      id: "3",
      title: "La SEC approuve enfin les ETF Ethereum spot",
      excerpt:
        "La Securities and Exchange Commission (SEC) des États-Unis a approuvé les premiers ETF Ethereum spot, ouvrant la voie à une adoption plus large de la deuxième plus grande cryptomonnaie.",
      source: "Bloomberg",
      date: "2024-05-20T09:45:00Z",
      category: "Régulation",
      url: "#",
    },
    {
      id: "4",
      title: "Solana dépasse Binance Coin en capitalisation boursière",
      excerpt:
        "Solana (SOL) a dépassé Binance Coin (BNB) en termes de capitalisation boursière, devenant ainsi la quatrième plus grande cryptomonnaie du marché.",
      source: "CryptoNews",
      date: "2024-05-19T16:20:00Z",
      category: "Marché",
      url: "#",
    },
    {
      id: "5",
      title: "La France adopte un cadre réglementaire favorable aux cryptomonnaies",
      excerpt:
        "Le gouvernement français a adopté un nouveau cadre réglementaire visant à favoriser l'innovation dans le secteur des cryptomonnaies tout en assurant la protection des investisseurs.",
      source: "Le Monde",
      date: "2024-05-18T11:05:00Z",
      category: "Régulation",
      url: "#",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Marché":
        return "bg-blue-500"
      case "Technologie":
        return "bg-green-500"
      case "Régulation":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">Actualités importantes de la semaine</h3>
      <div className="space-y-4">
        {mockNews.map((news) => (
          <Card key={news.id} className="overflow-hidden border-gray-800 bg-gray-900/50 hover:border-gray-700">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <Badge className={getCategoryColor(news.category)}>{news.category}</Badge>
                <span className="text-sm text-gray-400">{getTimeAgo(news.date)}</span>
              </div>
              <h4 className="mb-2 text-lg font-bold">{news.title}</h4>
              <p className="mb-4 text-sm text-gray-400">{news.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Source: {news.source}</span>
                <Button variant="outline" size="sm" className="gap-1">
                  <ExternalLink className="h-4 w-4" />
                  <span>Lire l'article</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
