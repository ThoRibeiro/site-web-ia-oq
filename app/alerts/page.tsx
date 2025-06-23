"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertsList } from "@/components/alerts/alerts-list"
import { CreateAlertForm } from "@/components/alerts/create-alert-form"
import { AlertHistory } from "@/components/alerts/alert-history"
import { AlertSettings } from "@/components/alerts/alert-settings"
import { Bell, BellOff, Clock, Settings } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { isSupabaseConfigured } from "@/lib/supabase"

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const { user } = useAuth()

  // Mock data for alerts
  const mockActiveAlerts = [
    {
      id: "1",
      crypto: {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      },
      condition: "above",
      price: 55000,
      created_at: "2024-05-20T10:30:00Z",
      notifications: ["email", "push"],
    },
    {
      id: "2",
      crypto: {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      },
      condition: "below",
      price: 2800,
      created_at: "2024-05-21T14:15:00Z",
      notifications: ["push"],
    },
    {
      id: "3",
      crypto: {
        id: "solana",
        name: "Solana",
        symbol: "SOL",
        image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
      },
      condition: "above",
      price: 120,
      created_at: "2024-05-22T09:45:00Z",
      notifications: ["email"],
    },
  ]

  const mockTriggeredAlerts = [
    {
      id: "4",
      crypto: {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      },
      condition: "above",
      price: 52000,
      created_at: "2024-05-15T08:20:00Z",
      triggered_at: "2024-05-18T16:45:00Z",
      notifications: ["email", "push"],
    },
    {
      id: "5",
      crypto: {
        id: "cardano",
        name: "Cardano",
        symbol: "ADA",
        image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
      },
      condition: "below",
      price: 0.35,
      created_at: "2024-05-16T11:10:00Z",
      triggered_at: "2024-05-19T03:30:00Z",
      notifications: ["push"],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Alertes de Prix</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vos alertes</CardTitle>
                  <CardDescription>Gérez vos alertes de prix pour les cryptomonnaies</CardDescription>
                </div>
                <Button>Créer une alerte</Button>
              </div>
            </CardHeader>
            <CardContent>
              {!user || !isSupabaseConfigured() ? (
                <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4 text-center">
                  <BellOff className="mx-auto mb-2 h-8 w-8 text-yellow-500" />
                  <h3 className="mb-2 text-lg font-medium text-yellow-500">Connexion requise</h3>
                  <p className="mb-4 text-sm text-yellow-500/80">
                    Vous devez être connecté pour créer et gérer des alertes de prix
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/20"
                  >
                    <a href="/login">Se connecter</a>
                  </Button>
                </div>
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="active">
                      <Bell className="mr-2 h-4 w-4" />
                      Alertes actives
                    </TabsTrigger>
                    <TabsTrigger value="history">
                      <Clock className="mr-2 h-4 w-4" />
                      Historique
                    </TabsTrigger>
                    <TabsTrigger value="settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Paramètres
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="active" className="mt-0">
                    <AlertsList alerts={mockActiveAlerts} />
                  </TabsContent>

                  <TabsContent value="history" className="mt-0">
                    <AlertHistory alerts={mockTriggeredAlerts} />
                  </TabsContent>

                  <TabsContent value="settings" className="mt-0">
                    <AlertSettings />
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <CreateAlertForm disabled={!user || !isSupabaseConfigured()} />

          <Card className="mt-6 border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle>Comment fonctionnent les alertes ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h3 className="mb-1 font-medium">1. Créez une alerte</h3>
                <p className="text-gray-400">
                  Sélectionnez une cryptomonnaie et définissez un seuil de prix (au-dessus ou en-dessous).
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-medium">2. Choisissez vos notifications</h3>
                <p className="text-gray-400">
                  Recevez des alertes par email, notifications push, ou les deux selon vos préférences.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-medium">3. Restez informé</h3>
                <p className="text-gray-400">
                  Vous serez notifié dès que le prix atteint le seuil défini, vous permettant de réagir rapidement.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-medium">4. Gérez vos alertes</h3>
                <p className="text-gray-400">
                  Modifiez, supprimez ou désactivez vos alertes à tout moment depuis cette page.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
