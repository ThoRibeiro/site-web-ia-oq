"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { mockCryptoData } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { useCurrency } from "@/hooks/use-currency"

interface CreateAlertFormProps {
  disabled?: boolean
}

export function CreateAlertForm({ disabled = false }: CreateAlertFormProps) {
  const [selectedCrypto, setSelectedCrypto] = useState("")
  const [condition, setCondition] = useState<"above" | "below">("above")
  const [price, setPrice] = useState("")
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { currencySymbol } = useCurrency()

  const handleCreateAlert = () => {
    if (disabled) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour créer des alertes",
        variant: "destructive",
      })
      return
    }

    if (!selectedCrypto || !price) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Alerte créée",
        description: "Votre alerte de prix a été créée avec succès",
      })
      setLoading(false)
      // Reset form
      setSelectedCrypto("")
      setPrice("")
    }, 1000)
  }

  const selectedCryptoData = mockCryptoData.find((crypto) => crypto.id === selectedCrypto)

  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardHeader>
        <CardTitle>Créer une alerte</CardTitle>
        <CardDescription>Configurez une alerte de prix pour une cryptomonnaie</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="crypto">Cryptomonnaie</Label>
          <Select value={selectedCrypto} onValueChange={setSelectedCrypto} disabled={disabled || loading}>
            <SelectTrigger id="crypto" className="bg-gray-800">
              <SelectValue placeholder="Sélectionnez une crypto" />
            </SelectTrigger>
            <SelectContent>
              {mockCryptoData.map((crypto) => (
                <SelectItem key={crypto.id} value={crypto.id}>
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCryptoData && (
          <div className="rounded-md border border-gray-800 bg-gray-900/30 p-3 text-sm">
            <p>
              Prix actuel: {currencySymbol}
              {formatCurrency(selectedCryptoData.current_price)}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label>Condition</Label>
          <RadioGroup
            value={condition}
            onValueChange={(value) => setCondition(value as "above" | "below")}
            className="flex flex-col space-y-1"
            disabled={disabled || loading}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="above" id="above" />
              <Label htmlFor="above" className="font-normal">
                Prix au-dessus de
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="below" id="below" />
              <Label htmlFor="below" className="font-normal">
                Prix en-dessous de
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Prix ({currencySymbol})</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="Entrez un prix"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-gray-800"
            disabled={disabled || loading}
          />
        </div>

        <div className="space-y-2">
          <Label>Notifications</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="email-notification"
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: !!checked })}
                disabled={disabled || loading}
              />
              <Label htmlFor="email-notification" className="font-normal">
                Email
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="push-notification"
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: !!checked })}
                disabled={disabled || loading}
              />
              <Label htmlFor="push-notification" className="font-normal">
                Notification push
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleCreateAlert}
          disabled={disabled || loading || !selectedCrypto || !price}
        >
          {loading ? "Création en cours..." : "Créer l'alerte"}
        </Button>
      </CardFooter>
    </Card>
  )
}
