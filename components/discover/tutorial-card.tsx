"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star } from "lucide-react"

interface TutorialCardProps {
  tutorial: any
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-gray-800 bg-gray-900/50 transition-all hover:border-gray-700 hover:bg-gray-900/80">
      <div
        className="h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${tutorial.image || "/placeholder.svg?height=200&width=400"})`,
        }}
      ></div>
      <CardContent className="flex-1 p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline" className="border-green-500 text-green-500">
            Tutoriel
          </Badge>
          <div className="flex items-center text-yellow-500">
            <Star className="mr-1 h-4 w-4 fill-current" />
            <span>{tutorial.rating}</span>
          </div>
        </div>
        <h3 className="mb-2 text-lg font-bold">{tutorial.title}</h3>
        <p className="mb-4 text-sm text-gray-400">{tutorial.description}</p>
        <div className="flex items-center text-sm text-gray-400">
          <Clock className="mr-1 h-4 w-4" />
          <span>{tutorial.duration} min de lecture</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tutorial.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-800 p-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-gray-400">Niveau: {tutorial.level}</span>
          <Button variant="outline" size="sm">
            Voir le tutoriel
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
