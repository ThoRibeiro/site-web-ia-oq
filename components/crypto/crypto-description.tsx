"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CryptoDescriptionProps {
  crypto: any
}

export function CryptoDescription({ crypto }: CryptoDescriptionProps) {
  const [expanded, setExpanded] = useState(false)

  // Sanitize HTML content (in a real app, use a proper sanitizer like DOMPurify)
  const createMarkup = () => {
    return { __html: crypto.description.en || "Aucune description disponible." }
  }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardHeader>
        <CardTitle>À propos de {crypto.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`prose prose-invert max-w-none ${!expanded ? "line-clamp-4" : ""}`}
          dangerouslySetInnerHTML={createMarkup()}
        />
        <Button variant="ghost" className="mt-2" onClick={toggleExpanded}>
          {expanded ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Voir moins
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Voir plus
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
