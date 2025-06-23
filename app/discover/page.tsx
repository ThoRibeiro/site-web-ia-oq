"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArticleCard } from "@/components/discover/article-card"
import { TutorialCard } from "@/components/discover/tutorial-card"
import { AnalysisCard } from "@/components/discover/analysis-card"
import { mockArticles, mockTutorials, mockAnalyses } from "@/lib/mock-discover-data"
import { Search } from "lucide-react"

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("articles")

  const filteredArticles = mockArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const filteredTutorials = mockTutorials.filter(
    (tutorial) =>
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const filteredAnalyses = mockAnalyses.filter(
    (analysis) =>
      analysis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const featuredArticle = mockArticles[0]
  const popularTags = ["Bitcoin", "Ethereum", "DeFi", "NFT", "Altcoins", "Staking", "Trading", "Régulation"]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Découvrir</h1>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card className="col-span-full border-gray-800 bg-gray-900/50 md:col-span-2">
          <div className="relative h-64 overflow-hidden rounded-t-lg md:h-80">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${featuredArticle.image || "/placeholder.svg?height=400&width=800"})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-6">
              <Badge className="mb-2">{featuredArticle.category}</Badge>
              <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">{featuredArticle.title}</h2>
              <p className="mb-4 text-gray-200">{featuredArticle.excerpt}</p>
              <Button>Lire l'article</Button>
            </div>
          </div>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50">
          <CardHeader>
            <CardTitle>Rechercher</CardTitle>
            <CardDescription>Trouvez des articles, tutoriels et analyses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 pl-10"
              />
            </div>
            <div className="mt-4">
              <h3 className="mb-2 text-sm font-medium text-gray-400">Tags populaires</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-800"
                    onClick={() => setSearchTerm(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="tutorials">Tutoriels</TabsTrigger>
          <TabsTrigger value="analyses">Analyses</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          {filteredArticles.length === 0 && (
            <div className="flex h-40 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/30">
              <p className="text-gray-400">Aucun article trouvé pour "{searchTerm}"</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="tutorials" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
          {filteredTutorials.length === 0 && (
            <div className="flex h-40 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/30">
              <p className="text-gray-400">Aucun tutoriel trouvé pour "{searchTerm}"</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analyses" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAnalyses.map((analysis) => (
              <AnalysisCard key={analysis.id} analysis={analysis} />
            ))}
          </div>
          {filteredAnalyses.length === 0 && (
            <div className="flex h-40 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/30">
              <p className="text-gray-400">Aucune analyse trouvée pour "{searchTerm}"</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
