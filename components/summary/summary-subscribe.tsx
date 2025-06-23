"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Mail } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { isSupabaseConfigured } from "@/lib/supabase"

export function SummarySubscribe() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [preferences, setPreferences] = useState({
    watchlist: true,
    portfolio: true,
    news: true,
    alerts: true,
  })
  const { toast } = useToast()
  const { user } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!isSupabaseConfigured()) {
      toast({
        title: "Configuration requise",
        description: "Veuillez configurer Supabase pour utiliser cette fonctionnalité",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Abonnement réussi",
        description: "Vous recevrez désormais votre résumé hebdomadaire par email",
      })
      setLoading(false)
    }, 1000)
  }

  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardHeader>
        <CardTitle>Recevez votre résumé par email</CardTitle>
        <CardDescription>Restez informé avec un résumé hebdomadaire personnalisé</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder={user ? user.email : "votre@email.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={!user}
              disabled={!!user}
              className="bg-gray-800"
            />
            {user && <p className="text-xs text-gray-400">Nous utiliserons votre email de connexion</p>}
          </div>

          <div className="space-y-3">
            <Label>Contenu du résumé</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="watchlist"
                  checked={preferences.watchlist}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, watchlist: !!checked })}
                />
                <Label htmlFor="watchlist" className="text-sm font-normal">
                  Performance de ma watchlist
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="portfolio"
                  checked={preferences.portfolio}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, portfolio: !!checked })}
                />
                <Label htmlFor="portfolio" className="text-sm font-normal">
                  Évolution de mon portefeuille
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="news"
                  checked={preferences.news}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, news: !!checked })}
                />
                <Label htmlFor="news" className="text-sm font-normal">
                  Actualités importantes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="alerts"
                  checked={preferences.alerts}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, alerts: !!checked })}
                />
                <Label htmlFor="alerts" className="text-sm font-normal">
                  Alertes de prix déclenchées
                </Label>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit} disabled={loading}>
          <Mail className="mr-2 h-4 w-4" />
          {loading ? "Inscription en cours..." : "S'abonner au résumé hebdomadaire"}
        </Button>
      </CardFooter>
    </Card>
  )
}
