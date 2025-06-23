"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTimeAgo } from "@/lib/utils"
import { TrendingDown, TrendingUp } from "lucide-react"

interface AnalysisCardProps {
  analysis: any
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-gray-800 bg-gray-900/50 transition-all hover:border-gray-700 hover:bg-gray-900/80">
      <div
        className="h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${analysis.image || "/placeholder.svg?height=200&width=400"})`,
        }}
      ></div>
      <CardContent className="flex-1 p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline" className="border-purple-500 text-purple-500">
            Analyse
          </Badge>
          <span className="text-xs text-gray-400">{getTimeAgo(analysis.date)}</span>
        </div>
        <h3 className="mb-2 text-lg font-bold">{analysis.title}</h3>
        <p className="mb-4 text-sm text-gray-400">{analysis.excerpt}</p>
        <div className="mb-2 flex items-center">
          {analysis.sentiment === "bullish" ? (
            <Badge className="flex items-center gap-1 bg-green-500">
              <TrendingUp className="h-3 w-3" />
              Haussier
            </Badge>
          ) : (
            <Badge className="flex items-center gap-1 bg-red-500">
              <TrendingDown className="h-3 w-3" />
              Baissier
            </Badge>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {analysis.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-800 p-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-gray-400">Par {analysis.author}</span>
          <Button variant="outline" size="sm">
            Lire l'analyse
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
