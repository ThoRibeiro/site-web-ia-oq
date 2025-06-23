"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SummaryWatchlist } from "@/components/summary/summary-watchlist"
import { SummaryPortfolio } from "@/components/summary/summary-portfolio"
import { SummaryNews } from "@/components/summary/summary-news"
import { SummaryAlerts } from "@/components/summary/summary-alerts"
import { SummarySubscribe } from "@/components/summary/summary-subscribe"
import { Calendar, Download, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { isSupabaseConfigured } from "@/lib/supabase"

export default function WeeklySummaryPage() {
  const [activeTab, setActiveTab] = useState("watchlist")
  const { toast } = useToast()

  const handleDownload = () => {
    toast({
      title: "Téléchargement du résumé",
      description: "Le résumé hebdomadaire a été téléchargé au format PDF",
    })
  }

  const handleSendEmail = () => {
    if (!isSupabaseConfigured()) {
      toast({
        title: "Configuration requise",
        description: "Veuillez configurer Supabase pour utiliser cette fonctionnalité",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Email envoyé",
      description: "Le résumé hebdomadaire a été envoyé à votre adresse email",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Résumé Hebdomadaire</h1>
          <p className="text-gray-400">Semaine du 20 au 26 mai 2024</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
          <Button variant="outline" onClick={handleSendEmail}>
            <Mail className="mr-2 h-4 w-4" />
            Envoyer par email
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle>Aperçu de la semaine</CardTitle>
              <CardDescription>Résumé de votre activité crypto pour la semaine</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="news">Actualités</TabsTrigger>
                  <TabsTrigger value="alerts">Alertes</TabsTrigger>
                </TabsList>

                <TabsContent value="watchlist" className="mt-0">
                  <SummaryWatchlist />
                </TabsContent>

                <TabsContent value="portfolio" className="mt-0">
                  <SummaryPortfolio />
                </TabsContent>

                <TabsContent value="news" className="mt-0">
                  <SummaryNews />
                </TabsContent>

                <TabsContent value="alerts" className="mt-0">
                  <SummaryAlerts />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mt-6 border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle>Résumés précédents</CardTitle>
              <CardDescription>Consultez vos résumés des semaines précédentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => {
                  const date = new Date()
                  date.setDate(date.getDate() - 7 * (i + 1))
                  const startDate = new Date(date)
                  const endDate = new Date(date)
                  endDate.setDate(endDate.getDate() + 6)

                  const formatDate = (d: Date) => {
                    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
                  }

                  return (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
                      <div className="flex items-center">
                        <Calendar className="mr-3 h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">
                            Semaine du {formatDate(startDate)} au {formatDate(endDate)}
                          </p>
                          <p className="text-sm text-gray-400">
                            {Math.floor(Math.random() * 10) + 1} événements marquants
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Voir
                      </Button>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <SummarySubscribe />

          <Card className="mt-6 border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle>Statistiques globales</CardTitle>
              <CardDescription>Aperçu du marché cette semaine</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Capitalisation totale du marché</p>
                  <p className="text-2xl font-bold">$2.45T</p>
                  <p className="text-sm text-green-500">+3.2% cette semaine</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Volume total 24h</p>
                  <p className="text-2xl font-bold">$98.7B</p>
                  <p className="text-sm text-red-500">-5.1% par rapport à la semaine dernière</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Dominance Bitcoin</p>
                  <p className="text-2xl font-bold">52.3%</p>
                  <p className="text-sm text-green-500">+0.8% cette semaine</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Indice de peur et d'avidité</p>
                  <div className="flex items-center">
                    <div className="mr-3 h-10 w-10 rounded-full bg-yellow-500 p-2 text-center font-bold text-black">
                      65
                    </div>
                    <p className="font-medium">Avidité</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-800 pt-4 text-xs text-gray-400">
              Données mises à jour le 26 mai 2024
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
