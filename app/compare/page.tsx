"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchCryptos, searchCryptos } from "@/lib/api/coingecko"
import { CompareTable } from "@/components/compare/compare-table"
import { CompareChart } from "@/components/compare/compare-chart"
import { Skeleton } from "@/components/ui/skeleton"
import { X } from "lucide-react"
import { useCurrency } from "@/hooks/use-currency"

export default function ComparePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedCryptos, setSelectedCryptos] = useState<any[]>([])
  const [allCryptos, setAllCryptos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const { currency } = useCurrency()

  useEffect(() => {
    const loadCryptos = async () => {
      setLoading(true)
      try {
        const data = await fetchCryptos(currency)
        setAllCryptos(data)
      } catch (error) {
        console.error("Erreur lors du chargement des cryptos:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCryptos()
  }, [currency])

  useEffect(() => {
    const search = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([])
        return
      }

      setSearching(true)
      try {
        const { coins } = await searchCryptos(searchTerm)
        setSearchResults(coins.slice(0, 5))
      } catch (error) {
        console.error("Erreur lors de la recherche:", error)
      } finally {
        setSearching(false)
      }
    }

    const timeoutId = setTimeout(search, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const handleAddCrypto = (cryptoId: string) => {
    if (selectedCryptos.length >= 3) {
      alert("Vous ne pouvez comparer que 3 cryptomonnaies à la fois")
      return
    }

    if (selectedCryptos.some((c) => c.id === cryptoId)) {
      return
    }

    const crypto = allCryptos.find((c) => c.id === cryptoId)
    if (crypto) {
      setSelectedCryptos([...selectedCryptos, crypto])
      setSearchTerm("")
      setSearchResults([])
    }
  }

  const handleRemoveCrypto = (cryptoId: string) => {
    setSelectedCryptos(selectedCryptos.filter((c) => c.id !== cryptoId))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Comparer les cryptomonnaies</h1>
        <Skeleton className="mb-8 h-[100px] w-full rounded-xl" />
        <Skeleton className="mb-8 h-[400px] w-full rounded-xl" />
        <Skeleton className="h-[300px] w-full rounded-xl" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Comparer les cryptomonnaies</h1>

      <Card className="mb-8 border-gray-800 bg-gray-900/50">
        <CardHeader>
          <CardTitle>Sélectionnez jusqu'à 3 cryptomonnaies à comparer</CardTitle>
          <CardDescription>Recherchez par nom ou symbole et ajoutez à la comparaison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search">Rechercher une cryptomonnaie</Label>
            <div className="relative">
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Bitcoin, Ethereum, BTC, ETH..."
                className="bg-gray-800"
              />
              {searchResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-800 bg-gray-900 shadow-lg">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex cursor-pointer items-center p-3 hover:bg-gray-800"
                      onClick={() => handleAddCrypto(result.id)}
                    >
                      <img
                        src={result.thumb || "/placeholder.svg"}
                        alt={result.name}
                        className="mr-3 h-6 w-6 rounded-full"
                      />
                      <div>
                        <div className="font-medium">{result.name}</div>
                        <div className="text-xs uppercase text-gray-400">{result.symbol}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {searching && searchTerm.length >= 2 && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-800 bg-gray-900 p-3 text-center shadow-lg">
                  Recherche en cours...
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedCryptos.map((crypto) => (
              <div key={crypto.id} className="flex items-center rounded-full bg-gray-800 px-3 py-1">
                <img src={crypto.image || "/placeholder.svg"} alt={crypto.name} className="mr-2 h-5 w-5 rounded-full" />
                <span className="mr-2 text-sm">{crypto.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 rounded-full p-0 hover:bg-gray-700"
                  onClick={() => handleRemoveCrypto(crypto.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {selectedCryptos.length === 0 && (
              <div className="text-sm text-gray-400">Aucune cryptomonnaie sélectionnée</div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedCryptos.length > 0 && (
        <>
          <Card className="mb-8 border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle>Comparaison graphique</CardTitle>
            </CardHeader>
            <CardContent>
              <CompareChart cryptos={selectedCryptos} />
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle>Comparaison détaillée</CardTitle>
            </CardHeader>
            <CardContent>
              <CompareTable cryptos={selectedCryptos} />
            </CardContent>
          </Card>
        </>
      )}

      {selectedCryptos.length === 0 && (
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <CardTitle className="mb-2 text-xl">Sélectionnez des cryptomonnaies pour les comparer</CardTitle>
            <CardDescription className="mb-6 text-center">
              Utilisez la barre de recherche ci-dessus pour ajouter jusqu'à 3 cryptomonnaies à comparer
            </CardDescription>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {allCryptos.slice(0, 3).map((crypto) => (
                <Button
                  key={crypto.id}
                  variant="outline"
                  className="flex items-center justify-center"
                  onClick={() => handleAddCrypto(crypto.id)}
                >
                  <img
                    src={crypto.image || "/placeholder.svg"}
                    alt={crypto.name}
                    className="mr-2 h-5 w-5 rounded-full"
                  />
                  {crypto.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
