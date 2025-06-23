"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

export function AlertSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    maxAlertsPerDay: 10,
    emailAddress: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSaveSettings = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Paramètres enregistrés",
        description: "Vos paramètres d'alertes ont été mis à jour avec succès",
      })
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configurez comment vous souhaitez recevoir vos alertes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Notifications par email</Label>
              <p className="text-sm text-gray-400">Recevez les alertes de prix par email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />
          </div>
          {settings.emailNotifications && (
            <div className="space-y-2 rounded-md border border-gray-800 bg-gray-900/30 p-4">
              <Label htmlFor="email-address">Adresse email pour les notifications</Label>
              <Input
                id="email-address"
                type="email"
                placeholder="votre@email.com"
                value={settings.emailAddress}
                onChange={(e) => setSettings({ ...settings, emailAddress: e.target.value })}
                className="bg-gray-800"
              />
              <p className="text-xs text-gray-400">Laissez vide pour utiliser l'adresse email de votre compte</p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Notifications push</Label>
              <p className="text-sm text-gray-400">Recevez les alertes de prix par notification push</p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader>
          <CardTitle>Limites</CardTitle>
          <CardDescription>Configurez les limites pour vos alertes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="max-alerts">Nombre maximum d'alertes par jour</Label>
            <Input
              id="max-alerts"
              type="number"
              min="1"
              max="50"
              value={settings.maxAlertsPerDay}
              onChange={(e) => setSettings({ ...settings, maxAlertsPerDay: Number.parseInt(e.target.value) })}
              className="bg-gray-800"
            />
            <p className="text-xs text-gray-400">
              Limitez le nombre d'alertes que vous recevez pour éviter les notifications excessives
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={loading}>
          {loading ? "Enregistrement..." : "Enregistrer les paramètres"}
        </Button>
      </div>
    </div>
  )
}
