"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTimeAgo } from "@/lib/utils"

interface ArticleCardProps {
  article: any
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-gray-800 bg-gray-900/50 transition-all hover:border-gray-700 hover:bg-gray-900/80">
      <div
        className="h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${article.image || "/placeholder.svg?height=200&width=400"})`,
        }}
      ></div>
      <CardContent className="flex-1 p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge>{article.category}</Badge>
          <span className="text-xs text-gray-400">{getTimeAgo(article.date)}</span>
        </div>
        <h3 className="mb-2 text-lg font-bold">{article.title}</h3>
        <p className="mb-4 text-sm text-gray-400">{article.excerpt}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {article.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-800 p-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-gray-400">Par {article.author}</span>
          <Button variant="outline" size="sm">
            Lire l'article
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
